/**
 *
 * @author Damien Chesneau <contact@damienchesneau.fr>
 */
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

function onChoixEnvoieCuisineLoaded(toLoad) {
    var personnesProduits = JSON.parse(getLocalStorageValue("personnesProduitsListe"));
    console.log(personnesProduits);
    var htmlOption = getOptionPersonnes();

    for (var i = 0; i < personnesProduits.length; i++) {
        var itemOption = htmlOption;
        itemOption = paramValue(itemOption, "label", personnesProduits[i].personne.prenom + " " + personnesProduits[i].personne.nom);
        itemOption = paramValue(itemOption, "value", personnesProduits[i].personne.id);
        $("#select_user_id").append(itemOption);
//        if (i = toLoad) {
//            remplirWithProduit(personnesProduits[i].products);
//        }
    }
}
function remplirWithProduit(produits) {
    var htmlLiProduit = getLiProduit();
    for (var j = 0; j < produits.length; j++) {
        var itemLiProduit = htmlLiProduit;
        itemLiProduit = paramValue(itemLiProduit, "label_produit", produits[j].nom);
        itemLiProduit = paramValue(itemLiProduit, "id_produit", "item_produit_user_" + produits[j].id);
        $("#liste_produit_user_id").append(itemLiProduit);
    }
}
