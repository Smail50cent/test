/**
 *
 * @author Damien Chesneau <contact@damienchesneau.fr>
 */
function onChoixdateHeureLoaded() {
    var connexion = getConnexion();
    connexion.getReservationDisponibleWhereDateNull(function(liste, param) {
        connexion.getParametreApplicationByNom(printDate, "nb.jours.possibilite.reservation", liste);
    }, null);
}
function printDate(paramApplication, liste) {
    var nbJours = paramApplication.getValeur_parametre();

    var htmlOption = getDateHeureOptionDate();
    var item1 = htmlOption;
    item1 = paramValue(item1, "valeur", strings.getString("label.choose.table.option"));
    var date = new Date();
    var jour = date.getDate();
    var mois = date.getMonth() + 1;
    var annee = date.getFullYear();
    $("#select_jours_id").append(item1);
    for (var i = 0; i < nbJours; i++) {
        if ((mois == 1 || mois == 3 || mois == 5 || mois == 7 || mois == 8 || mois == 10 || mois == 12) && jour == 31) {
            mois = mois + 1;
            jour = 1;
        } else if ((mois == 4 || mois == 6 || mois == 9 || mois == 11) && jour == 30) {
            mois = mois + 1;
            jour = 1;
        } else if ((mois == 2) && jour == 29) {
            mois = mois + 1;
            jour = 1;
        } else {
            jour = jour + 1;
        }
        var item2 = htmlOption;
        item2 = paramValue(item2, "valeur",  jour + "/" + mois + "/" + annee);
        $("#select_jours_id").append(item2);
    }
}