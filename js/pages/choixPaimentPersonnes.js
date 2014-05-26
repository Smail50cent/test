/**
 *
 * @author Damien Chesneau <contact@damienchesneau.fr>
 */
var disc = "";
function onChoixPaimentPersonnesStart(nbCouverts, ticket) {
    $("#choix_mode_calcul_titre_id").text(strings.getString("label.choixPaimentPersonne.titre"));
    $("#btn_choix_mode_calcul_part").text(strings.getString("label.choix.paiment.parpersonne"));
    $("#btn_choix_mode_calcul_division").text(strings.getString("label.choix.paiment.divisiontotal"));
    $("#content_paiment_personne_id").hide();
    $("#content_paiment_personne_button_valider_id").val(strings.getString("label.choix.paiment.button.valider.all"));
}
function parPersonne() {
    disc = "PAR_PERSONNE";
    $("#content_paiment_personne_liste_id").html("");
    $("#liste_prod_non_attribue_id").html("");
    removeChoix();
    var html = getItemPaimentPersonnes();
    var prixparPersonnes = calculerTotalParPersonne();
    var htmlOptionProduitnnAttr = getOptionProduitNonAttribue();
    if (prixparPersonnes != null) {
        for (var i = 0; i < prixparPersonnes.length; i++) {
            if (prixparPersonnes[i].type == "PRIXPARPERSONNE") {
                printItem(html, prixparPersonnes[i].personne.prenom + " " + prixparPersonnes[i].personne.nom, prixparPersonnes[i].totalpersonne, prixparPersonnes[i].personne.id);
            } else if (prixparPersonnes[i].type == "PRODUITNONATTRIBUE") {
                var myHtmlOptionProduitnnAttr = htmlOptionProduitnnAttr;
                myHtmlOptionProduitnnAttr = paramValue(myHtmlOptionProduitnnAttr, "idqop", prixparPersonnes[i].idqop);
                myHtmlOptionProduitnnAttr = paramValue(myHtmlOptionProduitnnAttr, "labelProduit", prixparPersonnes[i].produit.nom);
                myHtmlOptionProduitnnAttr = paramValue(myHtmlOptionProduitnnAttr, "labelButton", strings.getString("label.button.produit.non.attr.attribuer"));
                $("#liste_prod_non_attribue_id").append(myHtmlOptionProduitnnAttr);
            }
        }
        $("#content_paiment_personne_id").show();
    }
}
function calculerTotalParPersonne() {
    var personnes = JSON.parse(getLocalStorageValue("reste.personnes.paiment"));
    return personnes;
}
function divisionTotal() {
    disc = "DIVISION_TOTAL";
    $("#content_paiment_personne_liste_id").html("");
    $("#liste_prod_non_attribue_id").remove();
    removeChoix();
    var html = getItemPaimentPersonnes();
    var total = calculerTotalTicket();
    var personnes = JSON.parse(getLocalStorageValue("personnes.couverts"));
    var partParPersonnes = total / (personnes.length);
    for (var i = 0; i < personnes.length; i++) {
        printItem(html, personnes[i].prenom + " " + personnes[i].nom, partParPersonnes, personnes[i].id);
    }
    $("#content_paiment_personne_id").show();
}

function calculerTotalTicket() {
    var total = 0;
    var prixparPersonnes = calculerTotalParPersonne();
    if (prixparPersonnes != null) {
        for (var i = 0; i < prixparPersonnes.length; i++) {
            if (prixparPersonnes[i].type == "PRIXPARPERSONNE") {
                total += prixparPersonnes[i].totalpersonne;
            } else if (prixparPersonnes[i].type == "PRODUITNONATTRIBUE") {
                total += prixparPersonnes[i].produit.prix;
            }
        }
    }
    return total;
}

function printItem(html, personne, prix, idpersonne) {
    var newHtml = html;
    newHtml = paramValue(newHtml, "nomPersonne", personne);
    newHtml = paramValue(newHtml, "prix", fntp(prix));
    newHtml = paramValue(newHtml, "src", "./img/picto_sansimg.jpg");
    newHtml = paramValue(newHtml, "idPersonne", idpersonne);
    newHtml = paramValue(newHtml, "valueButton", strings.getString("label.choix.paiment.button.valider.paiment"));
    $("#content_paiment_personne_liste_id").append(newHtml);
}
function removeChoix() {
    $("#choix_mode_calcul_id").remove();
}
var total = 0;

function calcluerTotalSelection() {
    var personnes = JSON.parse(getLocalStorageValue("personnes.couverts"));
    var personnesAreChoosed = recupererPersonneChoisi();
    caclulerTotal(personnesAreChoosed);
    $("#total_selection_id").text(strings.getString("label.selection.total.paiment") + " " + fntp(total));
}
function recupererPersonneChoisi() {
    var personnesAreChoosed = new Array();
    var personnes = JSON.parse(getLocalStorageValue("personnes.couverts"));
    for (var i = 0; i < personnes.length; i++) {
        var isChecked = $("#name_id_" + personnes[i].id).is(':checked');
        if (isChecked) {
            personnesAreChoosed.push(personnes[i]);
        }
    }
    return personnesAreChoosed;
}
function caclulerTotal(personnesAreChoosed) {
    total = 0;
    var totalParPersonne = JSON.parse(getLocalStorageValue("reste.personnes.paiment"));
    for (var i = 0; i < personnesAreChoosed.length; i++) {
        for (var j = 0; j < totalParPersonne.length; j++) {
            if (totalParPersonne[j].type != "PRODUITNONATTRIBUE") {
                if (personnesAreChoosed[i].id == totalParPersonne[j].personne.id) {
                    total += totalParPersonne[j].totalpersonne;
                }
            }
        }
    }
}
function validerPaimentSelection() {
    var personneChoisi = recupererPersonneChoisi();
    caclulerTotal(personneChoisi);
    var totalParPersonnes = calculerTotalParPersonne();
    for (var j = 0; j < personneChoisi.length; j++) {
        for (var i = 0; i < totalParPersonnes.length; i++) {
            if (personneChoisi[j].ID == totalParPersonnes[i].personne.id) {
                totalParPersonnes.splice(i, 1);
                break;
            }
        }
    }
    setLocalStorageValue("reste.personnes.paiment", JSON.stringify(totalParPersonnes));
    pay(total);
}
function pay(total) {
    setLocalStorageValue("reste.a.regler", total.toString());
    getRedirict("reglement.php", new Array(total.toString()));
}
var qopProduitToAttrib = "";

function attribuerToPersonnes(idqop) {
    qopProduitToAttrib = idqop;
    $("#valider_selection_utilisateurs").text(strings.getString("label.button.produit.non.attr.valider.selection"));
    var htmlItem = getAttributionProduit();
    var personnes = JSON.parse(getLocalStorageValue("personnes.couverts"));
    $("#liste_utilisateurs_to_choose_id").html("");
    for (var i = 0; i < personnes.length; i++) {
        var item = htmlItem;
        item = paramValue(item, "srcImg", "./img/picto_sansimg.jpg");
        item = paramValue(item, "idpers", personnes[i].id);
        item = paramValue(item, "labelPersonne", personnes[i].prenom + " " + personnes[i].nom);
        $("#liste_utilisateurs_to_choose_id").append(item);
    }
    $("#dialog_attribution_produit").dialog();
}

function attributionNouveauProduit() {
    var restePersonnes = calculerTotalParPersonne();
    console.log(restePersonnes);
    var personnesChecked = new Array();
    for (var i = 0; i < restePersonnes.length; i++) {
        if (restePersonnes[i].type.indexOf("PRIXPARPERSONNE") != -1) {
            var isChecked = $("#personne_" + restePersonnes[i].personne.id).is(':checked');
            if (isChecked) {
                var res = clone(restePersonnes[i]);
                personnesChecked.push(restePersonnes[i].personne.id);
            }
        }
    }
    var prixparPersonnes = calculerTotalParPersonne();
    var produit;
    for (var i = 0; i < prixparPersonnes.length; i++) {
        if (prixparPersonnes[i].type == "PRODUITNONATTRIBUE") {
            if (prixparPersonnes[i].idqop == qopProduitToAttrib) {
                produit = prixparPersonnes[i].produit;
                break;
            }
        }
    }
    var coutSupParPersonne = (produit.prix) / (personnesChecked.length);
    for (var i = 0; i < restePersonnes.length; i++) {
        for (var j = 0; j < personnesChecked.length; j++) {
            if (restePersonnes[i].type.indexOf("PRIXPARPERSONNE") != -1) {
                if (restePersonnes[i].personne.id == personnesChecked[j]) {
                    var total = restePersonnes[i].totalpersonne;
                    total += coutSupParPersonne;
                    restePersonnes[i].totalpersonne = total;
                }
            }

        }
    }
    updateTheCookie(restePersonnes, produit);
    parPersonne();
    $("#dialog_attribution_produit").dialog('close');
}
function updateTheCookie(restePersonnes, produit) {
    for (var i = 0; i < restePersonnes.length; i++) {
        if (restePersonnes[i].type == "PRODUITNONATTRIBUE") {
            if (restePersonnes[i].produit.id == produit.id) {
                restePersonnes.splice(i, 1);
            }
        }
    }
    setLocalStorageValue("reste.personnes.paiment", JSON.stringify(restePersonnes));
}
function reglerParPersonne(idpersonne) {
    switch (disc) {
        case "DIVISION_TOTAL":
            var total = calculerTotalTicket();
            var personnes = JSON.parse(getLocalStorageValue("personnes.couverts"));
            var partParPersonnes = total / (personnes.length);
            pay(partParPersonnes);
            break;
        case "PAR_PERSONNE":
            var personnes = calculerTotalParPersonne();
            for (var i = 0; i < personnes.length; i++) {
                if(personnes[i].personne.id == idpersonne){
                    pay(personnes[i].totalpersonne);
                    break;
                }
            }
            break;
    }
}