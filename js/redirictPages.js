/**
 *
 * @author Damien Chesneau <contact@damienchesneau.fr>
 */

function RedirictPages(surplace, aemporter, livraison, reservation) {
    this.surplace = surplace;
    this.aemporter = aemporter;
    this.livraison = livraison;
    this.reservation = reservation;
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
    redirct(new RedirictPages(("paramCommande"), null, null, null));
}
function goClientAEmporter() {
    setIdTypeCommande(2);
    redirct(new RedirictPages(null, ("paramCommande"), null, null));
}
function goClientLivraison() {
    setIdTypeCommande(3);
    redirct(new RedirictPages(null, null, ("paramCommande"), null));
}
function goClientReservation() {
    setIdTypeCommande(4);
    redirct(new RedirictPages(null, null, null, ("paramCommande")));
}
function redirictWhereFinishParamCommande() {
    redirct(new RedirictPages("carte"), null, null, null);
}
function redirictWhereFinishCarte() {
    redirct(new RedirictPages("choixEnvoieCuisine"), null, null, null);
}
function redirictWhereFinishChoixEnvoieCuisine() {
    redirct(new RedirictPages("choixPaimentPersonnes"), null, null, null);
}
function redirictPay() {
    redirct(new RedirictPages("reglement"), null, null, null);
}