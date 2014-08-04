/**
 *
 * @author Damien Chesneau <contact@damienchesneau.fr>
 */
// GESTION LANGUES
function addStr() {
    var valEn = $("#en_val").val();
    var valFr = $("#fr_val").val();
    var valKey = $("#key_val").val();
    getConnexionServeur().addNewString(null, valKey, valFr, valEn, null);
}
function loadGestionLangues() {
    updateActivedLi(4);
    var htmlGererLesSites = getPageGererLangues();
    htmlGererLesSites = paramValue(htmlGererLesSites, "title", "Gérer les langues");
    $("#new_container").html(htmlGererLesSites);
    getConnexion().getAllLangues(printLangues, null);
    function printLangues(langs, param) {
        var htmlTableHead = getLangueTableHead();
        $("#table_gererleslangues_all").html("");
        $("#table_gererleslangues_all").append(htmlTableHead);
        var htmlTrBody = getLangueTableTrBody();
        for (var i = 0; i < langs.length; i++) {
            var myDiv = htmlTrBody;
            myDiv = paramValue(myDiv, "langue", langs[i].label);
            myDiv = paramValue(myDiv, "idLang", langs[i].id);
            if (langs[i].actif == true) {
                myDiv = paramValue(myDiv, "addClass", "glyphicon glyphicon-ok");
                myDiv = paramValue(myDiv, "onclick", "setLangDisable(" + langs[i].id + ");");

            } else {
                myDiv = paramValue(myDiv, "onclick", "setLangActif(" + langs[i].id + ");");
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