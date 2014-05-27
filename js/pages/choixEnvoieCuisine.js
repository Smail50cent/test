/**
 *
 * @author Damien Chesneau <contact@damienchesneau.fr>
 */


function onChoixEnvoieCuisineLoaded(toLoad) {
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
    console.log(personnesProduits);
    $("#select_user_id").change(function() {
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
}
function remplirWithProduit(id) {
    $("#liste_produit_user_id").html("");
    var personnesProduits = JSON.parse(getLocalStorageValue("personnesProduitsListe"));
    var produits;
    for (var i = 0; i < personnesProduits.length; i++) {
        if (personnesProduits[i].personne.id == id) {
            produits = personnesProduits[i].produitspriotite.produits;
        }
    }
    var htmlLiProduit = getLiProduit();
    for (var j = 0; j < produits.length; j++) {
        var itemLiProduit = htmlLiProduit;
        itemLiProduit = paramValue(itemLiProduit, "label_produit", produits[j].nom);
        itemLiProduit = paramValue(itemLiProduit, "id_produit", "item_produit_user_" + produits[j].id);
        $("#liste_produit_user_id").append(itemLiProduit);
    }
}
function validerEnvoieCuisine() {
    getLocalStorageValue("id.last.created.ticket");
    getRedirict("choixPaimentPersonnes.php",null);
}