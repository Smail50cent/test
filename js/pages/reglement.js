/**
 * 
 * @author Damien Chesneau <contact@damienchesneau.fr>
 */

function onReglementLoadStart(prix) {
    $("#reglement_titre_id").text(strings.getString("label.mode.de.reglement.titre1") + " " + fntp(prix) + " " + strings.getString("label.mode.de.reglement.titre2"));
    $("#reglement_btn_valier_id").text(strings.getString("label.mode.de.reglement.valider"));
    var connexion = getConnexion();
    connexion.getAllModesDeReglement(onReglementLoadFinish, null);
}

function onReglementLoadFinish(modeDeReglements, param) {
    var html = getItemListeReglement();
    for (var i = 0; i < modeDeReglements.length; i++) {
        var itemHtml = html;
        itemHtml = paramValue(itemHtml, "id", modeDeReglements[i].getId());
        itemHtml = paramValue(itemHtml, "imgSrc", "./img/" + modeDeReglements[i].getUrl());
        itemHtml = paramValue(itemHtml, "nom", modeDeReglements[i].getNom());
        $("#reglement_ul_possibilite_id").append(itemHtml);
    }
}
function validerReglement() {
    var btn = $("input[name='reglement']");
    var idModeDeReglement;
    for (var i = 0; i < btn.length; i++) {
        if ((btn[i].checked == true)) {
            idModeDeReglement = btn[i].value;
        }
    }
    var connexion = getConnexion();
    connexion.getModeDeReglementById(retirictToPage, idModeDeReglement, null);
    function retirictToPage(modeDeReglement) {
        document.location.href = "./service/" + modeDeReglement.redirictUrl;
    }
}