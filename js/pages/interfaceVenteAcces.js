/**
 *
 * @author Damien Chesneau <contact@damienchesneau.fr>
 */
function onLoadInterfaceVenteAcces() {
    var htmlLi = getLiAccesInterface();
    var personne = JSON.parse(getLocalStorageValue("personnes.serveur"));
    personne.role.level = parseInt(personne.role.level);
    if (personne != null) {
        switch (personne.role.level) {
            case 1:
//                console.log("case 1");
                loadGestionApp(htmlLi);
            case 2:
//                console.log("case 2");
                loadNewCommande(htmlLi);
            case 3:
//                console.log("case 3");
            case 10:
//                console.log("case 10");
        }
        if (personne.role.level == 2) {
            loadNewCommande(htmlLi);
        }
    }
}
function loadGestionApp(html) {
    var newHtml = html;
    newHtml = paramValue(newHtml, "onclick", "goGestionApplication();");
    newHtml = paramValue(newHtml, "id", "interfaceLiGestionApp");
    $("#liste_items").append(newHtml);
    $("#interfaceLiGestionApp").text(strings.getString("label.interfaceacces.gestionapp"));
}
function loadNewCommande(html) {
    var newHtml = html;
    newHtml = paramValue(newHtml, "onclick", "goNouvelleCommande();");
    newHtml = paramValue(newHtml, "id", "interfaceLiPredreNouvelleCommande");
    $("#liste_items").append(newHtml);
    $("#interfaceLiPredreNouvelleCommande").text(strings.getString("label.interfaceventeacces.newCommande"));
}