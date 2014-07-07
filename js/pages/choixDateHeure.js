/**
 *
 * @author Damien Chesneau <contact@damienchesneau.fr>
 */
var listePropositonDate = new Array();
var listeHeures;

function onChoixdateHeureLoaded() {
    var connexion = getConnexion();
    $("#select_minutes_id").hide();
    $("#select_hours_id").hide();
    $("#btnValiderReservation_id").text(strings.getString("label.menu.validmenu"));
    $("#btnValiderReservation_id").hide();
    $("#btnValiderReservation_id").click(onClickBtnValider);
    connexion.getParametreApplicationByNom(printDate, "nb.jours.possibilite.reservation", null);
}
function printDate(paramApplication, liste) {
    $("#select_jours_id").change(onSelectDateChange);
    $("#select_hours_id").change(onSelectHoursChange);
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
        listePropositonDate.push(new Array(jour, mois, annee));
        item2 = paramValue(item2, "value", i);
        item2 = paramValue(item2, "valeur", jour + "/" + mois + "/" + annee);
        $("#select_jours_id").append(item2);
    }
}
function onSelectDateChange() {
    $("#select_hours_id").show();
    listeHeures = new Array();
    $("#select_hours_id").html("");
    var htmlOption = getDateHeureOptionDate();
    var item5 = htmlOption;
    item5 = paramValue(item5, "valeur", strings.getString("label.choose.table.option"));
    $("#select_hours_id").append(item5);
    var val = ($(this).val());
    var connexion = getConnexion();
    connexion.getReservationDisponibleWhereDateNull(function(liste, param) {
        for (var i = 0; i < liste.length; i++) {
            var timeDeb = (liste[i].heureDebut);
            var heuresDeb = parseInt(timeDeb.substring(0, 2));
            var minutesDeb = parseInt(timeDeb.substring(3, 5));
            var timeFin = (liste[i].heureFin);
            var heuresFin = parseInt(timeFin.substring(0, 2));
            var minutesFin = parseInt(timeFin.substring(3, 5));
            listeHeures.push(new Array(heuresDeb, minutesDeb, heuresFin, minutesFin));
            for (var i = heuresDeb; i < heuresFin; i++) {
                var item1 = htmlOption;
                item1 = paramValue(item1, "valeur", i);
                item1 = paramValue(item1, "value", i);
                $("#select_hours_id").append(item1);
            }
            var item2 = htmlOption;
            item2 = paramValue(item2, "valeur", heuresFin);
            item2 = paramValue(item2, "value", heuresFin);
            $("#select_hours_id").append(item2);
        }
    }, null);
}
function onSelectHoursChange() {
    $("#select_minutes_id").show();
    $("#select_minutes_id").html("");
    $("#select_minutes_id").change(function() {
        $("#btnValiderReservation_id").show();
    });
    var htmlOption = getDateHeureOptionDate();
    var item1 = htmlOption;
    item1 = paramValue(item1, "valeur", strings.getString("label.choose.table.option"));
    $("#select_minutes_id").append(item1);
    var listeHeure;
    var val = parseInt(($(this).val()));
    for (var i = 0; i < listeHeures.length; i++) {
        if (listeHeures[i][0] <= val && listeHeures[i][2]) {
            listeHeure = listeHeures[i];
            break;
        }
    }
    var connexion = getConnexion();
    connexion.getParametreApplicationByNom(function(paramApplication, param) {
        var interval = parseInt(paramApplication.getValeur_parametre());
        var minuteFin = listeHeure[3];
        console.log(listeHeure);
        var divid = 60 / interval;
        for (var i = 0; i < divid; i++) {
            var value = i * interval;
            if (value <= minuteFin) {
                var item2 = htmlOption;
                item2 = paramValue(item2, "valeur", value);
                item2 = paramValue(item2, "value", value);
                $("#select_minutes_id").append(item2);
            }
        }
    }, "interval.heure.reservation", null);
}
function onClickBtnValider() {
    var minutes = parseInt($("#select_minutes_id").val());
    var heure = parseInt($("#select_hours_id").val());
    var ijour = parseInt($("#select_jours_id").val());
    if (listePropositonDate[ijour][1].toString().length == 1) {
        listePropositonDate[ijour][1] = "0" + listePropositonDate[ijour][1];
    }
    if (listePropositonDate[ijour][0].toString().length == 1) {
        listePropositonDate[ijour][0] = "0" + listePropositonDate[ijour][0];
    }
    if (minutes.toString().length == 1) {
        minutes = "0" + minutes;
    }
    if (heure.toString().length == 1) {
        heure = "0" + heure;
    }
    var finalDate = listePropositonDate[ijour][2] + "-" + listePropositonDate[ijour][1] + "-" + listePropositonDate[ijour][0] + " " + heure + ":" + minutes + ":00";
    setLocalStorageValue("reservation.date.heure", finalDate);
}