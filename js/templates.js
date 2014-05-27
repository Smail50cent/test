var templates = {};

templates.getTemplate = function(name) {
    var ret = null;
    var url = "config/template/" + name;
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
