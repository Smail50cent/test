/**
 *
 * @author Damien Chesneau <contact@damienchesneau.fr>
 */
// GESTION LANGUES
function addStr() {
    var valEn = $("#en_val").val();
    var valFr = $("#fr_val").val();
    var valKey = $("#key_val").val();
    if ($("#key_val").val() != "") {
        getConnexionServeur().addNewString(null, valKey, valFr, valEn, null);
        $("#en_val").val("");
        $("#fr_val").val("");
        $("#key_val").val("");
    }

}
function loadGestionLangues() {
    updateActivedLi(4);
    var htmlGererLesSites = getPageGererLangues();
    htmlGererLesSites = paramValue(htmlGererLesSites, "title", strings.getString("title.modeexpert.page.gererlangues"));
    $("#new_container").html(htmlGererLesSites);
    
    getConnexion().getAllLangues(printLangues, null);
    function printLangues(langues, param) {
        var htmlTableHead = getLangueTableHead();
        $("#table_gererleslangues_all").html(htmlTableHead);
        for (var i = 0; i < langues.length; i++) {
            var myDiv = getLangueTableTrBody();
            myDiv = paramValue(myDiv, "langue", langues[i].label);
            myDiv = paramValue(myDiv, "idLang", langues[i].id);
            if (langues[i].actif == true) {
                myDiv = paramValue(myDiv, "addClass", "glyphicon glyphicon-ok");
                myDiv = paramValue(myDiv, "onclick", "setLangDisable(" + langues[i].id + ");");

            } else {
                myDiv = paramValue(myDiv, "onclick", "setLangActif(" + langues[i].id + ");");
                myDiv = paramValue(myDiv, "addClass", "glyphicon glyphicon-minus");
            }
            $("#table_gererleslangues_all").append(myDiv);
        }
    }
}
function setLangActif(id) {
    $("button[idlangue=" + id + "]").attr("onclick", "setLangDisable(" + id + ");");
    $("button[idlangue=" + id + "]").children("span").attr("class", "glyphicon glyphicon-ok");
    getConnexion().setLangEnable(null, id, null);
}
function setLangDisable(id) {
    $("button[idlangue=" + id + "]").attr("onclick", "setLangActif(" + id + ");");
    $("button[idlangue=" + id + "]").children("span").attr("class", "glyphicon glyphicon-minus");
    getConnexion().setLangDiable(null, id, null);
}