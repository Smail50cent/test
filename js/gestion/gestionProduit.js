

function onLoadGP() {

    $('.content_produit_zone_right_structure').empty();
    $('.content_produit_zone_left_structure').empty();

    var modifdiv = getDivModifProduit();
    $('.content_produit_zone_right_structure').append(modifdiv);
    var suppdiv = getDivSuppProduit();
    $('.content_produit_zone_left_structure').append(suppdiv);
}

function ModifyProduct(id) {
    var idprod = id.parent().parent().parent().attr('produitid');
    alert(idprod);
}


function DeleteProduct(id) {
    var idprod = id.parent().parent().parent().attr('produitid');

    scripts.loadScripts("lib.dialog", function() {
        $('#confirm_dialog_produit_id').dialog({
            modal: true, title: 'Voulez vous supprimer ce produit ?', autoOpen: true, position: 'center',
            buttons: {
                Yes: function() {
                    var connexion = getConnexion();
                    connexion.deleteProduit(idprod);
                    getImplOfConnexionLocal().deleteProduit(idprod);
                    id.parent().parent().parent().remove();
                    $(this).dialog("close");
                },
                No: function() {
                    $(this).dialog("close");
                }
            },
            close: function(event, ui) {
                $(this).remove();
            }
        });
    });
}
