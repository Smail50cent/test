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
var standardLiClass="li_nav_menu_structure li_nav_menu_personalize";
var activeLiClass="li_nav_menu_structure li_nav_menu_personalize active";
function loadMenus() {
    var htmlLi = getBootstrapNavPillLi();
    var li = htmlLi;
    li = paramValue(li, "nbNotification", "");
    li = paramValue(li, "onclick", "loadGestionSites();");
    li = paramValue(li, "class", "");
    li = paramValue(li, "idli", "1");
    li = paramValue(li, "name", "Gérer les sites");
    $("#nav_menu_right_ul_detail_id").append(li);
    var li = htmlLi;
    li = paramValue(li, "nbNotification", "");
    li = paramValue(li, "onclick", "");
    li = paramValue(li, "idli", "2");
    li = paramValue(li, "class", "");//
    li = paramValue(li, "name", "Gérer les catégories");
    $("#nav_menu_right_ul_detail_id").append(li);
    var li = htmlLi;
    li = paramValue(li, "nbNotification", "");
    li = paramValue(li, "onclick", "");
    li = paramValue(li, "idli", "3");
    li = paramValue(li, "class", "");
    li = paramValue(li, "name", "Gérer les comptes utilisateurs");
    $("#nav_menu_right_ul_detail_id").append(li);
    var li = htmlLi;
    li = paramValue(li, "nbNotification", "");
    li = paramValue(li, "onclick", "loadGestionLangues();");
    li = paramValue(li, "class", "");
    li = paramValue(li, "idli", "4");
    li = paramValue(li, "name", "Gérer les langues disponibles");
    $("#nav_menu_right_ul_detail_id").append(li);
    var li = htmlLi;
    li = paramValue(li, "nbNotification", "");
    li = paramValue(li, "onclick", "");
    li = paramValue(li, "class", "");
    li = paramValue(li, "idli", "5");
    li = paramValue(li, "name", "Gérer les conseils de produits");
    $("#nav_menu_right_ul_detail_id").append(li);
    var li = htmlLi;
    li = paramValue(li, "nbNotification", "");
    li = paramValue(li, "onclick", "");
    li = paramValue(li, "idli", "6");
    li = paramValue(li, "class", "");
    li = paramValue(li, "name", "Tables et zones de tables");
    $("#nav_menu_right_ul_detail_id").append(li);
    var li = htmlLi;
    li = paramValue(li, "nbNotification", "");
    li = paramValue(li, "onclick", "");
    li = paramValue(li, "class", "");
    li = paramValue(li, "idli", "7");
    li = paramValue(li, "name", "Paramètres de l'application");
    $("#nav_menu_right_ul_detail_id").append(li);
}
function updateActivedLi(liId){
    $("li[idlimenu='"+liId+"'][menu='true']").attr("class",activeLiClass);
    $("li[idlimenu!='"+liId+"'][menu='true']").attr("class",standardLiClass);
}


