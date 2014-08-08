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
    li = paramValue(li, "name", strings.getString("menu.modeexpert.gererlessites"));
    $("#nav_menu_right_ul_detail_id").append(li);
    var li = htmlLi;
    li = paramValue(li, "nbNotification", "");
    li = paramValue(li, "onclick", "LoadGestionCatégories();");
    li = paramValue(li, "idli", "2");
    li = paramValue(li, "class", "");//
    li = paramValue(li, "name", strings.getString("modeexpert.menu.gerer.lescategories"));
    $("#nav_menu_right_ul_detail_id").append(li);
    var li = htmlLi;
    li = paramValue(li, "nbNotification", "");
    li = paramValue(li, "onclick", "");
    li = paramValue(li, "idli", "3");
    li = paramValue(li, "class", "");
    li = paramValue(li, "name", strings.getString("modeexpert.gererleslangues.menu"));
    $("#nav_menu_right_ul_detail_id").append(li);
    var li = htmlLi;
    li = paramValue(li, "nbNotification", "");
    li = paramValue(li, "onclick", "loadGestionLangues();");
    li = paramValue(li, "class", "");
    li = paramValue(li, "idli", "4");
    li = paramValue(li, "name", strings.getString("modeexpert.menu.gererleslanguesdisponible"));
    $("#nav_menu_right_ul_detail_id").append(li);
    var li = htmlLi;
    li = paramValue(li, "nbNotification", "");
    li = paramValue(li, "onclick", "");
    li = paramValue(li, "class", "");
    li = paramValue(li, "idli", "5");
    li = paramValue(li, "name", strings.getString("modeexpert.menu.gererconseildeproduits"));
    $("#nav_menu_right_ul_detail_id").append(li);
    var li = htmlLi;
    li = paramValue(li, "nbNotification", "");
    li = paramValue(li, "onclick", "onLoadGestionTables();");
    li = paramValue(li, "idli", "6");
    li = paramValue(li, "class", "");
    li = paramValue(li, "name", strings.getString("modeexpert.menu.tablesandarea"));
    $("#nav_menu_right_ul_detail_id").append(li);
    var li = htmlLi;
    li = paramValue(li, "nbNotification", "");
    li = paramValue(li, "onclick", "");
    li = paramValue(li, "class", "");
    li = paramValue(li, "idli", "7");
    li = paramValue(li, "name", strings.getString("modeexpert.menu.parametreapplication"));
    $("#nav_menu_right_ul_detail_id").append(li);
}
function updateActivedLi(liId){
    $("li[idlimenu='"+liId+"'][menu='true']").attr("class",activeLiClass);
    $("li[idlimenu!='"+liId+"'][menu='true']").attr("class",standardLiClass);
}


