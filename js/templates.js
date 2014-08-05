var templates = {};

templates.getTemplate = function(name) {
    var ret = null;
    var url = "config/template/" + name;
    $.ajaxSetup({cache: true});
    $.ajax({
        type: "GET",
        url: url,
        dataType: "text",
        async: false,
        success: function(text) {
            ret = text;
        }
    });
    $.ajaxSetup({cache: false});
    return ret;
};
templates.getIHMTemplate = function(name) {
    var ret = null;
    var url = "service/IHM/Vue/" + name;
    $.ajax({
        type: "GET",
        url: url,
        dataType: "text",
        async: false,
        success: function(text) {
            ret = text;
        }
    });
    return ret;
};
function paramValue(string, paramName, value) {
    var ret = true;
    while (ret) {
        if (string.indexOf("{" + paramName + "}") != -1) {
            string = string.replace("{" + paramName + "}", value);
        } else {
            ret = false;
        }
    }
    return string;
}

function getDialogErrorMessage() {
    return html = templates.getTemplate("all/other/dialog_message_error");
}
function getHeaderCategorieItem() {
    return templates.getTemplate("carte/produits/header_categorie_item");
}
function getHeaderCategorieSousCategorieListe() {
    return templates.getTemplate("carte/produits/header_categorie_souscategorie_liste");
}
function getHeaderCategorieSousCategorieItem() {
    return templates.getTemplate("carte/produits/header_categorie_souscategorie_item");
}
function getDialogMessageInfo() {
    return templates.getTemplate("all/other/dialog_message_info");
}
function getTestConnexionIconImg() {
    return templates.getTemplate("all/header/test_connexion_icon_img");
}
function getRecapitulatifProduitItem() {
    return templates.getTemplate("carte/recapitulatif/recapitulatif_produit_item");
}
function getItemRecapDescriptionItem() {
    return templates.getTemplate("carte/recapitulatif/item_recap_description_item");
}
function getItemOption() {
    return templates.getTemplate("carte/recapitulatif/item_option");
}
function getButtonAjouterIngInProduitRecap() {
    return templates.getTemplate("carte/recapitulatif/buttonAjouterIngInProduitRecap");
}
function getFooterWhereCarte() {
    return templates.getTemplate("carte/produits/footer_where_carte");
}
function getFooterWhereRecapitulatif() {
    return templates.getTemplate("carte/recapitulatif/footer_where_recapitulatif");
}
function getButtonValiderInMenu() {
    return templates.getTemplate("carte/menu/button_valider_in_menu");
}
function getDialogInfoPrix() {
    return templates.getTemplate("carte/recapitulatif/dialog_info_prix");
}
function getMenuDetailProduitItem() {
    return templates.getTemplate("carte/menu/menu_detail_produit_item");
}
function getMenuDetailProduitItemTitle() {
    return templates.getTemplate("carte/menu/menu_detail_produit_item_title");
}
function getDivSlides() {
    return templates.getTemplate("carte/div_slides");
}
function getDivSlide() {
    return templates.getTemplate("carte/div_slide");
}
function getContentSlideMenu() {
    return templates.getTemplate("carte/menu/content_slide_menu");
}
function getItemListeMenu() {
    return templates.getTemplate("carte/menu/item_liste_menus");
}
function getContentProduit() {
    return templates.getTemplate("carte/produits/content_produit");
}
function getContentProduitItem() {
    return templates.getTemplate("carte/produits/content_produit_item");
}
function getListeRecapitulatif() {
    return templates.getTemplate("carte/recapitulatif/liste_recapitulatif");
}
function getModalAjouterIngredient() {
    return templates.getTemplate("carte/recapitulatif/modal_ajouter_ingredient");
}
function getModalAjouterIngredientItem() {
    return templates.getTemplate("carte/recapitulatif/modal_ajouter_ingredient_item");
}
function getOptionInChooseTable() {
    return templates.getTemplate("paramCommande/option_in_choose_table");
}
function getLoadingPict() {
    return templates.getTemplate("all/other/loading_pict");
}
function getFooterWhereAffecterProduit() {
    return templates.getTemplate("carte/etape_affecter_produit_personne/footer_where_affecter_produit");
}
function getSelectInItem() {
    return templates.getTemplate("carte/etape_affecter_produit_personne/select_in_item");
}
function getOptionInSelectItem() {
    return templates.getTemplate("carte/etape_affecter_produit_personne/option_in_select_item");
}
function getHead() {
    return templates.getTemplate("all/header/head");
}
function getItemListeReglement() {
    return templates.getTemplate("reglement/item_liste_reglement");
}
function getItemPaimentPersonnes() {
    return templates.getTemplate("choixPaimentPersonnes/item_paiment_personnes");
}
function getOptionProduitNonAttribue() {
    return templates.getTemplate("choixPaimentPersonnes/option_produit_non_attribue");
}
function getAttributionProduit() {
    return templates.getTemplate("choixPaimentPersonnes/attribution_produit");
}
function getAuthCompte() {
    return templates.getTemplate("compte/auth_compte_form");
}
function getDialogAccesCompte() {
    return templates.getTemplate("compte/dialog_acces_compte");
}
function getButtonInscriFormUser() {
    return templates.getTemplate("compte/button_inscri_form_user");
}
function getSocialNetworkForm() {
    return templates.getTemplate("compte/socialNetwork_compte_form");
}
function getImageSocialNetworkUser() {
    return templates.getTemplate("compte/image_socialNetwork_user");
}
function getButtonFacebookAuth() {
    return templates.getTemplate("compte/button_facebook_auth_form_user");
}
function getButtonTwitterAuth() {
    return templates.getTemplate("compte/button_twitter_auth_form_user");
}
function getButtonGoogleAuth() {
    return templates.getTemplate("compte/button_googleplus_auth_form_user");
}
function getGeneratedInscriForm() {
    return templates.getTemplate("compte/generated_form_inscription");
}
function getOptionPersonnes() {
    return templates.getTemplate("choixEnvoieCuisine/option_personnes");
}
function getLiProduit() {
    return templates.getTemplate("choixEnvoieCuisine/li_produit");
}
function getButtonBackToAuth() {
    return templates.getTemplate("compte/Button_back_to_auth_form");
}
function getInscriFormUser() {
    return templates.getTemplate("compte/inscri_form_user");
}
function getContentSlideFavorite() {
    return templates.getTemplate("carte/menu/content_slide_favorite");
}
function getItemSelectFavorite() {
    return templates.getTemplate("carte/menu/item_select_type_favorite");
}
function getDateHeureOptionDate() {
    return templates.getTemplate("choixDateHeure/option_select_date");
}
function getDivModifProduit() {
    return templates.getTemplate("gestion/produit/div_modifier_produit");
}
function getDivSuppProduit() {
    return templates.getTemplate("gestion/produit/div_supprimer_produit");
}
function getDivAddProduitBtn() {
    return templates.getTemplate("gestion/produit/div_ajouter_produit_btn");
}
function getDivAddProduit() {
    return templates.getTemplate("gestion/produit/div_ajouter_produit");
}
function getPage1AddProduit() {
    return templates.getTemplate("gestion/produit/page1_input_ajouter_produit");
}
function getPage1ShowAddProduit() {
    return templates.getTemplate("gestion/produit/page1_show_ajouter_produit");
}
function getPageIngredAddProduit() {
    return templates.getTemplate("gestion/produit/ingredient_ajouter_produit");
}
function getIngredCheckBoxAddProduit() {
    return templates.getTemplate("gestion/produit/ingredient_checkbox_ajouter_produit");
}
function getOptionCheckBoxAddProduit() {
    return templates.getTemplate("gestion/produit/option_checkbox_ajouter_produit");
}
function getIngredLiAddProduit() {
    return templates.getTemplate("gestion/produit/ingredOpt_li_ajouter_produit");
}
function getOptionAddProduit() {
    return templates.getTemplate("gestion/produit/option_ajouter_produit");
}
function getPrixAddProduit() {
    return templates.getTemplate("gestion/produit/prix_ajouter_produit");
}
function getPrixZoneAddProduit() {
    return templates.getTemplate("gestion/produit/prix_zone_ajouter_produit");
}
function getDivAddOption() {
    return templates.getTemplate("gestion/produit/div_ajouter_option");
}
function getDivAddIngredient() {
    return templates.getTemplate("gestion/produit/div_ajouter_ingredient");
}
function getAjouterProduitSelectEtablissements() {
    return templates.getTemplate("gestion/produit/ajouter_produit_select_etablissements")
}
function getAjouterProduitSelectEtablissements() {
    return templates.getTemplate("gestion/produit/ajouter_produit_select_etablissements")
}
function getDivShowEtblissementsAndZone() {
    return templates.getTemplate("gestion/produit/div_show_etblissements_and_zone");
}
function getLiZonesEtablissement() {
    return templates.getTemplate("gestion/produit/li_zones_etablissement");
}
function getPossibiliteLabelAddProduit() {
    return templates.getTemplate("gestion/produit/possibilite_label_ajouter_produit");
}
function getOptionPossibSelectAddProduit() {
    return templates.getTemplate("gestion/produit/option_select_ajouter_produit");
}
function getDivGestionDropdown() {
    return templates.getTemplate("gestion/all/div_gestion_dropdown");
}
function getLiAccesInterface() {
    return templates.getTemplate("interfaceVenteAcces/li_acces_interface");
}
function getLiDropDown() {
    return templates.getTemplate("gestion/all/li_dropdown");
}
function getLiDropDownDivider() {
    return templates.getTemplate("gestion/all/li_dropdown_divider");
}
function getLiDropDownImg() {
    return templates.getTemplate("gestion/all/li_dropdown_img");
}
function getBootstrapNavPillLi() {
    return templates.getTemplate("gestion/modeexpert/all/li_nav_pill");
}

function getGererlesSites() {
    return templates.getTemplate("gestion/modeexpert/gererlessites/page_gerer_sites");
}
function getGererlesSitesTableThead() {
    return templates.getTemplate("gestion/modeexpert/gererlessites/table_thead");
}
function getGererlesSitesTableTbodyTr() {
    return templates.getTemplate("gestion/modeexpert/gererlessites/table_tbody_tr");
}
function getBootstrapModal() {
    return templates.getTemplate("gestion/modeexpert/all/bootstrap_modal");
}
function getAddSiteModalBody() {
    return templates.getTemplate("gestion/modeexpert/gererlessites/add_site_modal_body");
}
function getPageGererLangues() {
    return templates.getTemplate("gestion/modeexpert/gererlesLangues/page_gerer_langues");
}
function getLangueTableHead() {
    return templates.getTemplate("gestion/modeexpert/gererlesLangues/table_thead");
}
function getLangueTableTrBody() {
    return templates.getTemplate("gestion/modeexpert/gererlesLangues/table_tbody_tr");
}
function getGererSitesLiSelectZone() {
    return templates.getTemplate("gestion/modeexpert/gererlessites/li_select_zone");
}
function getGererSitesLiAddZone() {
    return templates.getTemplate("gestion/modeexpert/gererlessites/li_add_zone");
}
function getbootstrapModalSmall(){
    return templates.getTemplate("gestion/modeexpert/all/bootstrap_modal_small");
}