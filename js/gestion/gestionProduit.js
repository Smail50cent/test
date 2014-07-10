

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
//    var idprod = id.parent().parent().parent().attr('produitid');
//    var connexion = getConnexion();
//    connexion.deleteProduit(idprod);
//    getImplOfConnexionLocal().deleteProduit(idprod);
    alert('produit supprimé');
}
