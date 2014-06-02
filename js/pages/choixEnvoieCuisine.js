/**
 *
 * @author Damien Chesneau <contact@damienchesneau.fr>
 */
function onChoixEnvoieCuisineLoaded(toLoad) {
    scripts.loadScripts("lib.dialog", function() {
        $("#valider_produit_user_id").text(strings.getString("label.envoie.cuisine.valider"));
        $(function() {
            $("#liste_produit_user_id").sortable({
                revert: true
            });
            $("#draggable").draggable({
                connectToSortable: "#liste_produit_user_id",
                helper: "clone",
                revert: "invalid"
            });
            $("ul, li").disableSelection();
        });
        var personnesProduits = JSON.parse(getLocalStorageValue("personnesProduitsListe"));
        $("#select_user_id").change(function() {
            setPriorityForCurrentList();
            remplirWithProduit($(this).val());
        });
        var htmlOption = getOptionPersonnes();
        for (var i = 0; i < personnesProduits.length; i++) {
            var itemOption = htmlOption;
            itemOption = paramValue(itemOption, "label", personnesProduits[i].personne.prenom + " " + personnesProduits[i].personne.nom);
            itemOption = paramValue(itemOption, "value", personnesProduits[i].personne.id);
            $("#select_user_id").append(itemOption);
            if (i == toLoad) {
                remplirWithProduit(personnesProduits[i].personne.id);
            }
        }
    });
}
function remplirWithProduit(id) {
    $("#liste_produit_user_id").html("");
    var personnesProduits = JSON.parse(getLocalStorageValue("personnesProduitsListe"));
    var produits;
    for (var i = 0; i < personnesProduits.length; i++) {
        if (personnesProduits[i].personne.id == id) {
            produits = personnesProduits[i].produitspriotite;
        }
    }
    var htmlLiProduit = getLiProduit();
    for (var j = 0; j < produits.length; j++) {
        var itemLiProduit = htmlLiProduit;
        itemLiProduit = paramValue(itemLiProduit, "label_produit", produits[j].produit.nom);
        itemLiProduit = paramValue(itemLiProduit, "idProduit", produits[j].produit.id);
        itemLiProduit = paramValue(itemLiProduit, "id_produit", "item_produit_user_" + produits[j].produit.id);
        $("#liste_produit_user_id").append(itemLiProduit);
    }
}
function setPriorityForCurrentList() {
    var personnesProduits = JSON.parse(getLocalStorageValue("personnesProduitsListe"));
    var liste = $("#liste_produit_user_id").sortable("widget");
    var id = $("#select_user_id").val();
    for (var i = 0; i < liste.prevObject[0].childNodes.length; i++) {
        var idpro = parseInt(liste.prevObject[0].childNodes[i].attributes[1].value);
        for (var j = 0; j < personnesProduits.length; j++) {
            if (id == personnesProduits[j].personne.id) {
                for (var x = 0; x < personnesProduits[j].produitspriotite.length; x++) {
                    if (personnesProduits[j].produitspriotite[x].produit.id == idpro) {
                        personnesProduits[j].produitspriotite[x].priorite = (i + 1);
                        break;
                    }
                }
                break;
            }
        }
    }
    setLocalStorageValue("personnesProduitsListe", JSON.stringify(personnesProduits));
}
function validerEnvoieCuisine() {
    var personnesProduits = JSON.parse(getLocalStorageValue("personnesProduitsListe"));
    setPriorityForCurrentList();
    var lastTicketId = getLocalStorageValue("id.last.created.ticket");
    var connexion = getConnexion();
    connexion.sendPersonnePriority(null, {"ticketid": lastTicketId, "personneProduits": personnesProduits}, null);
    getRedirict("choixPaimentPersonnes.php", null);
}