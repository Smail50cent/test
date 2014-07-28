/**
 *
 * @author Damien Chesneau <contact@damienchesneau.fr>
 */
function onModeExpertLoaded() {
    scripts.loadScripts("bootstrapall", loadAll());
}
function loadAll() {
    loadMenus();
    loadGestionSites();
}
function loadMenus() {
    var htmlLi = getBootstrapNavPillLi();
    var li = htmlLi;
    li = paramValue(li, "nbNotification", "");
    li = paramValue(li, "href", "");
    li = paramValue(li, "class", "active");
    li = paramValue(li, "name", "Gérer les sites");
    $("#nav_menu_right_ul_detail_id").append(li);
    var li = htmlLi;
    li = paramValue(li, "nbNotification", "");
    li = paramValue(li, "href", "");
    li = paramValue(li, "class", "");
    li = paramValue(li, "name", "Gérer les catégories");
    $("#nav_menu_right_ul_detail_id").append(li);
    var li = htmlLi;
    li = paramValue(li, "nbNotification", "");
    li = paramValue(li, "href", "");
    li = paramValue(li, "class", "");
    li = paramValue(li, "name", "Gérer les comptes utilisateurs");
    $("#nav_menu_right_ul_detail_id").append(li);
    var li = htmlLi;
    li = paramValue(li, "nbNotification", "");
    li = paramValue(li, "href", "");
    li = paramValue(li, "class", "");
    li = paramValue(li, "name", "Gérer les langues disponibles");
    $("#nav_menu_right_ul_detail_id").append(li);
    var li = htmlLi;
    li = paramValue(li, "nbNotification", "");
    li = paramValue(li, "href", "");
    li = paramValue(li, "class", "");
    li = paramValue(li, "name", "Gérer les conseils de produits");
    $("#nav_menu_right_ul_detail_id").append(li);
    var li = htmlLi;
    li = paramValue(li, "nbNotification", "");
    li = paramValue(li, "href", "");
    li = paramValue(li, "class", "");
    li = paramValue(li, "name", "Tables et zones de tables");
    $("#nav_menu_right_ul_detail_id").append(li);
    var li = htmlLi;
    li = paramValue(li, "nbNotification", "");
    li = paramValue(li, "href", "");
    li = paramValue(li, "class", "");
    li = paramValue(li, "name", "Paramètres de l'application");
    $("#nav_menu_right_ul_detail_id").append(li);
}
function loadGestionSites() {
    var htmlGererLesSites = getGererlesSites();
    htmlGererLesSites = paramValue(htmlGererLesSites, "title", "Gérer les sites");
    $("#new_container").html(htmlGererLesSites);
    $("#table_gererlessites_all").append(getGererlesSitesTableThead());
    var htmlTbody = getGererlesSitesTableTbodyTr();
    getConnexion().getAllEtablissements(addItems, null);
    function addItems(etablissements, param) {
        for (var i = 0; i < etablissements.length; i++) {
            if (etablissements[i].nom != null) {
            } else {
                etablissements[i].nom = etablissements[i].groupe.nom;
            }
//            if (etablissements[i].logo != null) {
//            } else {
//                etablissements[i][i].logo = etablissements[i].groupe.logo;
//            }
            if (etablissements[i].style != null) {
            } else {
                etablissements[i].style = etablissements[i].groupe.style;
            }
            if (etablissements[i].slogan != null) {
            } else {
                etablissements[i].slogan = etablissements[i].groupe.slogan;
            }
            if (etablissements[i].message != null ) {
            } else {
                etablissements[i].message = etablissements[i].groupe.message;
            }
            var litbody = htmlTbody;
            litbody = paramValue(litbody, "nom", etablissements[i].nom);
            litbody = paramValue(litbody, "logo", etablissements[i].logo);
            litbody = paramValue(litbody, "style", etablissements[i].style);
            litbody = paramValue(litbody, "adresseEtab", etablissements[i].adresseEtab);
            litbody = paramValue(litbody, "telephone", etablissements[i].telephone);
            litbody = paramValue(litbody, "message", etablissements[i].message);
            litbody = paramValue(litbody, "slogan", etablissements[i].slogan);
            litbody = paramValue(litbody, "groupe", etablissements[i].groupe.nom);
            $("#table_gererlessites_all").append(litbody);
        }
    }
}  