/**
 *
 * @author Damien Chesneau <contact@damienchesneau.fr>
 */

function RedirictPages(surplace, aemporter, livraison, reservation, serveur) {
    this.surplace = surplace;
    this.aemporter = aemporter;
    this.livraison = livraison;
    this.reservation = reservation;
    this.serveur = serveur;
}
function getTypeSequence() {
    return parseInt(getLocalStorageValue("type.commande"));
}
function redirct(redirictpages) {
    var e = ((redirictpages.surplace));
    switch (getTypeSequence()) {
        case 1: //typecommande.surplace
            getRedirict(getPage(redirictpages.surplace), null);
            break;
        case 2://typecommande.aemporter
            getRedirict(getPage(redirictpages.aemporter), null);
            break;
        case 3://typecommande.livraison
            getRedirict(getPage(redirictpages.livraison), null);
            break;
        case 4://typecommande.reservation
            getRedirict(getPage(redirictpages.reservation), null);
            break;
        case 5://typecommande.reservation
            getRedirict(getPage(redirictpages.serveur), null);
            break;
        default :
            showErrorMessage(strings.getString("label.error.redirict.statut.incorrect"));
            break;
    }
}
function getPage(page) {
    var ret = null;
    var url = "./config/pages.xml";
    $.ajax({
        type: "GET",
        url: url,
        dataType: "xml",
        async: false,
        success: function(xml) {
            var unit = $(xml).find('pages').find("page[key='" + page + "']");
            ret = unit.text();
        }
    });
    return ret;
}
function setIdTypeCommande(id) {
    setLocalStorageValue("type.commande", id);
}
function goClientSurPlace() {
    setIdTypeCommande(1);
    setLocalStorageValue("personnes.couverts", "");
    redirct(new RedirictPages(("paramCommande"), null, null, null, null));
}
function goClientAEmporter() {
    setIdTypeCommande(2);
    setLocalStorageValue("personnes.couverts", "");
    redirct(new RedirictPages(null, ("paramCommande"), null, null, null));
}
function goClientLivraison() {
    setIdTypeCommande(3);
    setLocalStorageValue("personnes.couverts", "");
    redirct(new RedirictPages(null, null, ("paramCommande"), null, null));
}
function goClientReservation() {
    setLocalStorageValue("personnes.couverts", "");
    setIdTypeCommande(4);
    redirct(new RedirictPages(null, null, null, ("paramCommande"), null));
}
function connexionDunServeur() {
    setLocalStorageValue("personnes.couverts", "");
    setIdTypeCommande(5);
    redirct(new RedirictPages(null, null, null, null, ("pageConnexionServeur")));
}
function redirictWhereFinishParamCommande() {
    redirct(new RedirictPages("carte", null, null, "choixDateHeure", "carte"));
}
function redirictWhereFinishCarte() {
    redirct(new RedirictPages("choixEnvoieCuisine", null, null, null, "choixEnvoieCuisine"));
}
function redirictWhereFinishChoixEnvoieCuisine() {
    redirct(new RedirictPages("choixPaimentPersonnes", null, null, null, "choixPaimentPersonnes"));
}
function goServeurAcces() {
    setLocalStorageValue("personnes.couverts", "");
    setIdTypeCommande(5);
    redirct(new RedirictPages(("paramCommande"), null, null, null, null));
}
function redirictPay() {
    redirct(new RedirictPages("reglement", null, null, null, "reglement"));
}
function redirictWhereServeurConnected() {
    redirct(new RedirictPages(null, null, null, null, "interfaceVenteAcces"));
}
function goNouvelleCommande() {
    redirct(new RedirictPages(null, null, null, null, "paramCommande"));
}
function redrictWhereHavePay() {
    redirct(new RedirictPages("index", "index", "index", "index", "interfaceVenteAcces"));
}
function goGestionApplication() {
    setLocalStorageValue("personnes.couverts", "");
    setIdTypeCommande(5);
    redirct(new RedirictPages(("gestionProduit"), ("gestionProduit"), ("gestionProduit"), ("gestionProduit"), ("gestionProduit")));
}
function disconnectUser() {
    removeLocalStorageItem("personnes.serveur");
    redirct(new RedirictPages("index", "index", "index", "index", "index"));
}
function goGestionCompteUtilisateur() {

}
function goExpertMode() {
    redirct(new RedirictPages("modeexpert", "modeexpert", "modeexpert", "modeexpert", "modeexpert"));
}