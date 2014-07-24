/**
 *
 * @author Damien Chesneau <contact@damienchesneau.fr>
 */
function onLoadInterfaceVenteAcces(){
    var personne = JSON.parse(getLocalStorageValue("personnes.serveur"));
    console.log(personne);
    $("#interfaceLiPredreNouvelleCommande").text(strings.getString("label.interfaceventeacces.newCommande"));
}
