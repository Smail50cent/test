var templates = {};
var allTemplatesLoaded = new Array();
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
var dialog_message_error = null;
function getDialogErrorMessage() {
    if (dialog_message_error == null) {
        dialog_message_error = templates.getTemplate("all/other/dialog_message_error");
    }
    return dialog_message_error;
}
var carteproduitsheader_categorie_item = null;
function getHeaderCategorieItem() {
    if (carteproduitsheader_categorie_item == null) {
        carteproduitsheader_categorie_item = templates.getTemplate("carte/produits/header_categorie_item");
    }
    var mycarteproduitsheader_categorie_item = carteproduitsheader_categorie_item;
    return mycarteproduitsheader_categorie_item;
}
var carteproduitsheader_categorie_souscategorie_liste = null;
function getHeaderCategorieSousCategorieListe() {
    if (carteproduitsheader_categorie_souscategorie_liste == null) {
        carteproduitsheader_categorie_souscategorie_liste = templates.getTemplate("carte/produits/header_categorie_souscategorie_liste");
    }
    var mycarteproduitsheader_categorie_souscategorie_liste = carteproduitsheader_categorie_souscategorie_liste;
    return mycarteproduitsheader_categorie_souscategorie_liste;
}
var carteproduitsheader_categorie_souscategorie_item = null;
function getHeaderCategorieSousCategorieItem() {
    if (carteproduitsheader_categorie_souscategorie_item == null) {
        carteproduitsheader_categorie_souscategorie_item = templates.getTemplate("carte/produits/header_categorie_souscategorie_item");
    }
    var mycarteproduitsheader_categorie_souscategorie_item = carteproduitsheader_categorie_souscategorie_item;
    return mycarteproduitsheader_categorie_souscategorie_item;
}
var allotherdialog_message_info = null;
function getDialogMessageInfo() {
    if (allotherdialog_message_info == null) {
        allotherdialog_message_info = templates.getTemplate("all/other/dialog_message_info");
    }
    var myallotherdialog_message_info = allotherdialog_message_info;
    return myallotherdialog_message_info;
}
var allheadertest_connexion_icon_img = null;
function getTestConnexionIconImg() {
    if (allheadertest_connexion_icon_img == null) {
        allheadertest_connexion_icon_img = templates.getTemplate("all/header/test_connexion_icon_img");
    }
    var myallheadertest_connexion_icon_img = allheadertest_connexion_icon_img;
    return myallheadertest_connexion_icon_img;
}
var carterecapitulatifrecapitulatif_produit_item = null;
function getRecapitulatifProduitItem() {
    if (carterecapitulatifrecapitulatif_produit_item == null) {
        carterecapitulatifrecapitulatif_produit_item = templates.getTemplate("carte/recapitulatif/recapitulatif_produit_item");
    }
    var mycarterecapitulatifitem_recap_description_item = carterecapitulatifrecapitulatif_produit_item;
    return mycarterecapitulatifitem_recap_description_item;
}
var carterecapitulatifitem_recap_description_item = null;
function getItemRecapDescriptionItem() {
    if (carterecapitulatifitem_recap_description_item == null) {
        carterecapitulatifitem_recap_description_item = templates.getTemplate("carte/recapitulatif/item_recap_description_item");
    }
    var mycarterecapitulatifitem_recap_description_item = carterecapitulatifitem_recap_description_item;
    return mycarterecapitulatifitem_recap_description_item;
}
var carterecapitulatifitem_option = null;
function getItemOption() {
    if (carterecapitulatifitem_option == null) {
        carterecapitulatifitem_option = templates.getTemplate("carte/recapitulatif/item_option");
    }
    var mycarterecapitulatifitem_option = carterecapitulatifitem_option;
    return mycarterecapitulatifitem_option;
}
var carterecapitulatifbuttonAjouterIngInProduitRecap = null;
function getButtonAjouterIngInProduitRecap() {
    if (carterecapitulatifbuttonAjouterIngInProduitRecap == null) {
        carterecapitulatifbuttonAjouterIngInProduitRecap = templates.getTemplate("carte/recapitulatif/buttonAjouterIngInProduitRecap");
    }
    var mycarterecapitulatifbuttonAjouterIngInProduitRecap = carterecapitulatifbuttonAjouterIngInProduitRecap;
    return mycarterecapitulatifbuttonAjouterIngInProduitRecap;
}
var carteproduitsfooter_where_carte = null;
function getFooterWhereCarte() {
    if (carteproduitsfooter_where_carte == null) {
        carteproduitsfooter_where_carte = templates.getTemplate("carte/produits/footer_where_carte");
    }
    var mycarteproduitsfooter_where_carte = carteproduitsfooter_where_carte;
    return mycarteproduitsfooter_where_carte;
}
var carterecapitulatiffooter_where_recapitulatif = null;
function getFooterWhereRecapitulatif() {
    if (carterecapitulatiffooter_where_recapitulatif == null) {
        carterecapitulatiffooter_where_recapitulatif = templates.getTemplate("carte/recapitulatif/footer_where_recapitulatif");
    }
    var mycarterecapitulatiffooter_where_recapitulatif = carterecapitulatiffooter_where_recapitulatif;
    return mycarterecapitulatiffooter_where_recapitulatif;
}
var cartemenubutton_valider_in_menu = null;
function getButtonValiderInMenu() {
    if (cartemenubutton_valider_in_menu == null) {
        cartemenubutton_valider_in_menu = templates.getTemplate("carte/menu/button_valider_in_menu");
    }
    var mycartemenubutton_valider_in_menu = cartemenubutton_valider_in_menu;
    return mycartemenubutton_valider_in_menu;
}
var carterecapitulatifdialog_info_prix = null;
function getDialogInfoPrix() {
    if (carterecapitulatifdialog_info_prix == null) {
        carterecapitulatifdialog_info_prix = templates.getTemplate("carte/recapitulatif/dialog_info_prix");
    }
    var mycarterecapitulatifdialog_info_prix = carterecapitulatifdialog_info_prix;
    return mycarterecapitulatifdialog_info_prix;
}
var cartemenumenu_detail_produit_item = null;
function getMenuDetailProduitItem() {
    if (cartemenumenu_detail_produit_item == null) {
        cartemenumenu_detail_produit_item = templates.getTemplate("carte/menu/menu_detail_produit_item");
    }
    var mycartemenumenu_detail_produit_item = cartemenumenu_detail_produit_item;
    return mycartemenumenu_detail_produit_item;
}
var cartemenumenu_detail_produit_item_title = null;
function getMenuDetailProduitItemTitle() {
    if (cartemenumenu_detail_produit_item_title == null) {
        cartemenumenu_detail_produit_item_title = templates.getTemplate("carte/menu/menu_detail_produit_item_title");
    }
    var mycartemenumenu_detail_produit_item_title = cartemenumenu_detail_produit_item_title;
    return mycartemenumenu_detail_produit_item_title;
}
var cartediv_slides = null;
function getDivSlides() {
    if (cartediv_slides == null) {
        cartediv_slides = templates.getTemplate("carte/div_slides");
    }
    var mycartediv_slides = cartediv_slides;
    return mycartediv_slides;
}
var cartediv_slide = null;
function getDivSlide() {
    if (cartediv_slide == null) {
        cartediv_slide = templates.getTemplate("carte/div_slide");
    }
    var mycartediv_slide = cartediv_slide;
    return mycartediv_slide;
}
var cartemenucontent_slide_menu = null;
function getContentSlideMenu() {
    if (cartemenucontent_slide_menu == null) {
        cartemenucontent_slide_menu = templates.getTemplate("carte/menu/content_slide_menu");
    }
    var mycartemenucontent_slide_menu = cartemenucontent_slide_menu;
    return mycartemenucontent_slide_menu;
}

var cartemenuitem_liste_menus = null;
function getItemListeMenu() {
    if (cartemenuitem_liste_menus == null) {
        cartemenuitem_liste_menus = templates.getTemplate("carte/menu/item_liste_menus");
    }
    var mycartemenuitem_liste_menus = cartemenuitem_liste_menus;
    return mycartemenuitem_liste_menus;
}
var carteproduitscontent_produit = null;
function getContentProduit() {
    if (carteproduitscontent_produit == null) {
        carteproduitscontent_produit = templates.getTemplate("carte/produits/content_produit");
    }
    var mycarteproduitscontent_produit = carteproduitscontent_produit;
    return mycarteproduitscontent_produit;
}
var carteproduitscontent_produit_item = null;
function getContentProduitItem() {
    if (carteproduitscontent_produit_item == null) {
        carteproduitscontent_produit_item = templates.getTemplate("carte/produits/content_produit_item");
    }
    var mycarteproduitscontent_produit_item = carteproduitscontent_produit_item;
    return mycarteproduitscontent_produit_item;
}
var carterecapitulatifliste_recapitulatif = null;
function getListeRecapitulatif() {
    if (carterecapitulatifliste_recapitulatif == null) {
        carterecapitulatifliste_recapitulatif = templates.getTemplate("carte/recapitulatif/liste_recapitulatif");
    }
    var mycarterecapitulatifliste_recapitulatif = carterecapitulatifliste_recapitulatif;
    return mycarterecapitulatifliste_recapitulatif;
}
var carterecapitulatifmodal_ajouter_ingredient = null;
function getModalAjouterIngredient() {
    if (carterecapitulatifmodal_ajouter_ingredient == null) {
        carterecapitulatifmodal_ajouter_ingredient = templates.getTemplate("carte/recapitulatif/modal_ajouter_ingredient");
    }
    var mycarterecapitulatifmodal_ajouter_ingredient = carterecapitulatifmodal_ajouter_ingredient;
    return mycarterecapitulatifmodal_ajouter_ingredient;
}
var carterecapitulatifmodal_ajouter_ingredient_item = null;
function getModalAjouterIngredientItem() {
    if (carterecapitulatifmodal_ajouter_ingredient_item == null) {
        carterecapitulatifmodal_ajouter_ingredient_item = templates.getTemplate("carte/recapitulatif/modal_ajouter_ingredient_item");
    }
    var mycarterecapitulatifmodal_ajouter_ingredient_item = carterecapitulatifmodal_ajouter_ingredient_item;
    return mycarterecapitulatifmodal_ajouter_ingredient_item;
}
var paramCommandeoption_in_choose_table = null;
function getOptionInChooseTable() {
    if (paramCommandeoption_in_choose_table == null) {
        paramCommandeoption_in_choose_table = templates.getTemplate("paramCommande/option_in_choose_table");
    }
    var myparamCommandeoption_in_choose_table = paramCommandeoption_in_choose_table;
    return myparamCommandeoption_in_choose_table;
}
var allotherloading_pict = null;
function getLoadingPict() {
    if (allotherloading_pict == null) {
        allotherloading_pict = templates.getTemplate("all/other/loading_pict");
    }
    var myallotherloading_pict = allotherloading_pict;
    return myallotherloading_pict;
}
var carteetape_affecter_produit_personnefooter_where_affecter_produit = null;
function getFooterWhereAffecterProduit() {
    if (carteetape_affecter_produit_personnefooter_where_affecter_produit == null) {
        carteetape_affecter_produit_personnefooter_where_affecter_produit = templates.getTemplate("carte/etape_affecter_produit_personne/footer_where_affecter_produit");
    }
    var mycarteetape_affecter_produit_personnefooter_where_affecter_produit = carteetape_affecter_produit_personnefooter_where_affecter_produit;
    return mycarteetape_affecter_produit_personnefooter_where_affecter_produit;
}
var carteetape_affecter_produit_personnelect_in_item = null;
function getSelectInItem() {
    if (carteetape_affecter_produit_personnelect_in_item == null) {
        carteetape_affecter_produit_personnelect_in_item = templates.getTemplate("carte/etape_affecter_produit_personne/select_in_item");
    }
    var mycarteetape_affecter_produit_personnelect_in_item = carteetape_affecter_produit_personnelect_in_item;
    return mycarteetape_affecter_produit_personnelect_in_item;
}
var cartetape_affecter_produit_personnoption_in_select_item = null;
function getOptionInSelectItem() {
    if (cartetape_affecter_produit_personnoption_in_select_item == null) {
        cartetape_affecter_produit_personnoption_in_select_item = templates.getTemplate("carte/etape_affecter_produit_personne/option_in_select_item");
    }
    var mycartetape_affecter_produit_personnoption_in_select_item = cartetape_affecter_produit_personnoption_in_select_item;
    return mycartetape_affecter_produit_personnoption_in_select_item;
}
var allheaderhead = null;
function getHead() {
    if (allheaderhead == null) {
        allheaderhead = templates.getTemplate("all/header/head");
    }
    var myallheaderhead = allheaderhead;
    return myallheaderhead;
}
var reglementitem_liste_reglement = null;
function getItemListeReglement() {
    if (reglementitem_liste_reglement == null) {
        reglementitem_liste_reglement = templates.getTemplate("reglement/item_liste_reglement");
    }
    var myreglementitem_liste_reglement = reglementitem_liste_reglement;
    return myreglementitem_liste_reglement;
}
var choixPaimentPersonnesitem_paiment_personnes = null;
function getItemPaimentPersonnes() {
    if (choixPaimentPersonnesitem_paiment_personnes == null) {
        choixPaimentPersonnesitem_paiment_personnes = templates.getTemplate("choixPaimentPersonnes/item_paiment_personnes");
    }
    var mychoixPaimentPersonnesitem_paiment_personnes = choixPaimentPersonnesitem_paiment_personnes;
    return mychoixPaimentPersonnesitem_paiment_personnes;
}
var choixPaimentPersonneoption_produit_non_attribue = null;
function getOptionProduitNonAttribue() {
    if (choixPaimentPersonneoption_produit_non_attribue == null) {
        choixPaimentPersonneoption_produit_non_attribue = templates.getTemplate("choixPaimentPersonnes/option_produit_non_attribue");
    }
    var mychoixPaimentPersonneoption_produit_non_attribue = choixPaimentPersonneoption_produit_non_attribue;
    return mychoixPaimentPersonneoption_produit_non_attribue;
}
var choixPaimentPersonnesattribution_produit = null;
function getAttributionProduit() {
    if (choixPaimentPersonnesattribution_produit == null) {
        choixPaimentPersonnesattribution_produit = templates.getTemplate("choixPaimentPersonnes/attribution_produit");
    }
    var mychoixPaimentPersonnesattribution_produit = choixPaimentPersonnesattribution_produit;
    return mychoixPaimentPersonnesattribution_produit;
}
var compteauth_compte_form = null;
function getAuthCompte() {
    if (compteauth_compte_form == null) {
        compteauth_compte_form = templates.getTemplate("compte/auth_compte_form");
    }
    var mycomptedialog_acces_compte = compteauth_compte_form;
    return mycomptedialog_acces_compte;
}
var comptedialog_acces_compte = null;
function getDialogAccesCompte() {
    if (comptedialog_acces_compte == null) {
        comptedialog_acces_compte = templates.getTemplate("compte/dialog_acces_compte");
    }
    var mycomptedialog_acces_compte = comptedialog_acces_compte;
    return mycomptedialog_acces_compte;
}
var comptebutton_inscri_form_user = null;
function getButtonInscriFormUser() {
    if (comptebutton_inscri_form_user == null) {
        comptebutton_inscri_form_user = templates.getTemplate("compte/button_inscri_form_user");
    }
    var mycomptebutton_inscri_form_user = comptebutton_inscri_form_user;
    return mycomptebutton_inscri_form_user;
}
var comptesocialNetwork_compte_form = null;
function getSocialNetworkForm() {
    if (comptesocialNetwork_compte_form == null) {
        comptesocialNetwork_compte_form = templates.getTemplate("compte/socialNetwork_compte_form");
    }
    var mycomptesocialNetwork_compte_form = comptesocialNetwork_compte_form;
    return mycomptesocialNetwork_compte_form;
}
var compteimage_socialNetwork_user = null;
function getImageSocialNetworkUser() {
    if (compteimage_socialNetwork_user == null) {
        compteimage_socialNetwork_user = templates.getTemplate("compte/image_socialNetwork_user");
    }
    var mycompteimage_socialNetwork_user = compteimage_socialNetwork_user;
    return mycompteimage_socialNetwork_user;
}
var comptebutton_facebook_auth_form_user = null;
function getButtonFacebookAuth() {
    if (comptebutton_facebook_auth_form_user == null) {
        comptebutton_facebook_auth_form_user = templates.getTemplate("compte/button_facebook_auth_form_user");
    }
    var mycomptebutton_facebook_auth_form_user = comptebutton_facebook_auth_form_user;
    return mycomptebutton_facebook_auth_form_user;
}
var comptebutton_twitter_auth_form_user = null;
function getButtonTwitterAuth() {
    if (comptebutton_twitter_auth_form_user == null) {
        comptebutton_twitter_auth_form_user = templates.getTemplate("compte/button_twitter_auth_form_user");
    }
    var mycomptebutton_twitter_auth_form_user = comptebutton_twitter_auth_form_user;
    return mycomptebutton_twitter_auth_form_user;
}
var comptebutton_googleplus_auth_form_user = null;
function getButtonGoogleAuth() {
    if (comptebutton_googleplus_auth_form_user == null) {
        comptebutton_googleplus_auth_form_user = templates.getTemplate("compte/button_googleplus_auth_form_user");
    }
    var mycomptebutton_googleplus_auth_form_user = comptebutton_googleplus_auth_form_user;
    return mycomptebutton_googleplus_auth_form_user;
}
var comptegenerated_form_inscription = null;
function getGeneratedInscriForm() {
    if (comptegenerated_form_inscription == null) {
        comptegenerated_form_inscription = templates.getTemplate("compte/generated_form_inscription");
    }
    var mycomptegenerated_form_inscription = comptegenerated_form_inscription;
    return mycomptegenerated_form_inscription;
}
var choixEnvoieCuisineoption_personnes = null;
function getOptionPersonnes() {
    if (choixEnvoieCuisineoption_personnes == null) {
        choixEnvoieCuisineoption_personnes = templates.getTemplate("choixEnvoieCuisine/option_personnes");
    }
    var mychoixEnvoieCuisineoption_personnes = choixEnvoieCuisineoption_personnes;
    return mychoixEnvoieCuisineoption_personnes;
}
var choixEnvoieCuisineli_produit = null;
function getLiProduit() {
    if (choixEnvoieCuisineli_produit == null) {
        choixEnvoieCuisineli_produit = templates.getTemplate("choixEnvoieCuisine/li_produit");
    }
    var mychoixEnvoieCuisineli_produit = choixEnvoieCuisineli_produit;
    return mychoixEnvoieCuisineli_produit;
}
var compteButton_back_to_auth_form = null;
function getButtonBackToAuth() {
    if (compteButton_back_to_auth_form == null) {
        compteButton_back_to_auth_form = templates.getTemplate("compte/Button_back_to_auth_form");
    }
    var mycompteButton_back_to_auth_form = compteButton_back_to_auth_form;
    return mycompteButton_back_to_auth_form;
}
var compteinscri_form_user = null;
function getInscriFormUser() {
    if (compteinscri_form_user == null) {
        compteinscri_form_user = templates.getTemplate("compte/inscri_form_user");
    }
    var mycompteinscri_form_user = compteinscri_form_user;
    return mycompteinscri_form_user;
}
var cartemenucontent_slide_favorite = null;
function getContentSlideFavorite() {
    if (cartemenucontent_slide_favorite == null) {
        cartemenucontent_slide_favorite = templates.getTemplate("carte/menu/content_slide_favorite");
    }
    var mycartemenucontent_slide_favorite = cartemenucontent_slide_favorite;
    return mycartemenucontent_slide_favorite;
}
var cartemenuitem_select_type_favorite = null;
function getItemSelectFavorite() {
    if (cartemenuitem_select_type_favorite == null) {
        cartemenuitem_select_type_favorite = templates.getTemplate("carte/menu/item_select_type_favorite");
    }
    var mycartemenuitem_select_type_favorite = cartemenuitem_select_type_favorite;
    return mycartemenuitem_select_type_favorite;
}
var choixDateHeureoption_select_date = null;
function getDateHeureOptionDate() {
    if (choixDateHeureoption_select_date == null) {
        choixDateHeureoption_select_date = templates.getTemplate("choixDateHeure/option_select_date");
    }
    var mychoixDateHeureoption_select_date = choixDateHeureoption_select_date;
    return mychoixDateHeureoption_select_date;
}
var gestionproduitdiv_modifier_produit = null;
function getDivModifProduit() {
    if (gestionproduitdiv_modifier_produit == null) {
        gestionproduitdiv_modifier_produit = templates.getTemplate("gestion/produit/div_modifier_produit");
    }
    var mygestionproduitdiv_modifier_produit = gestionproduitdiv_modifier_produit;
    return mygestionproduitdiv_modifier_produit;
}
var gestionproduitdiv_supprimer_produit = null;
function getDivSuppProduit() {
    if (gestionproduitdiv_supprimer_produit == null) {
        gestionproduitdiv_supprimer_produit = templates.getTemplate("gestion/produit/div_supprimer_produit");
    }
    var mygestionproduitdiv_supprimer_produit = gestionproduitdiv_supprimer_produit;
    return mygestionproduitdiv_supprimer_produit;
}
var gestionproduitdiv_ajouter_produit_btn = null;
function getDivAddProduitBtn() {
    if (gestionproduitdiv_ajouter_produit_btn == null) {
        gestionproduitdiv_ajouter_produit_btn = templates.getTemplate("gestion/produit/div_ajouter_produit_btn");
    }
    var mygestionproduitdiv_ajouter_produit_btn = gestionproduitdiv_ajouter_produit_btn;
    return mygestionproduitdiv_ajouter_produit_btn;
}
var gestionproduitdiv_ajouter_produit = null;
function getDivAddProduit() {
    if (gestionproduitdiv_ajouter_produit == null) {
        gestionproduitdiv_ajouter_produit = templates.getTemplate("gestion/produit/div_ajouter_produit");
    }
    var mygestionproduitdiv_ajouter_produit = gestionproduitdiv_ajouter_produit;
    return mygestionproduitdiv_ajouter_produit;
}
var gestionproduitpage1_input_ajouter_produit = null;
function getPage1AddProduit() {
    if (gestionproduitpage1_input_ajouter_produit == null) {
        gestionproduitpage1_input_ajouter_produit = templates.getTemplate("gestion/produit/page1_input_ajouter_produit");
        gestionproduitpage1_input_ajouter_produit1 = paramValue(gestionproduitpage1_input_ajouter_produit, "titleInput", strings.getString("add.produit.page.input.produit.nom.title"));
        gestionproduitpage1_input_ajouter_produit2 = paramValue(gestionproduitpage1_input_ajouter_produit1, "placeHInput", strings.getString("add.produit.page.input.produit.nom.placeholder"));
        gestionproduitpage1_input_ajouter_produit3 = paramValue(gestionproduitpage1_input_ajouter_produit2, "categorie", strings.getString("add.produit.page.show.label.categorie"));
        gestionproduitpage1_input_ajouter_produit4 = paramValue(gestionproduitpage1_input_ajouter_produit3, "souscat", strings.getString("add.produit.page.show.label.souscategorie"));
        gestionproduitpage1_input_ajouter_produit = gestionproduitpage1_input_ajouter_produit4;
    }
    var mygestionproduitpage1_input_ajouter_produit = gestionproduitpage1_input_ajouter_produit;
    return mygestionproduitpage1_input_ajouter_produit;
}
var gestionproduitpage1_show_ajouter_produit = null;
function getPage1ShowAddProduit() {
    if (gestionproduitpage1_show_ajouter_produit == null) {
        gestionproduitpage1_show_ajouter_produit = templates.getTemplate("gestion/produit/page1_show_ajouter_produit");
        gestionproduitpage1_show_ajouter_produit1 = paramValue(gestionproduitpage1_show_ajouter_produit, "categorie", strings.getString("add.produit.page.show.label.categorie"));
        gestionproduitpage1_show_ajouter_produit2 = paramValue(gestionproduitpage1_show_ajouter_produit1, "sousCateg", strings.getString("add.produit.page.show.label.souscategorie"));
        gestionproduitpage1_show_ajouter_produit = gestionproduitpage1_show_ajouter_produit2;
    }
    var mygestionproduitpage1_show_ajouter_produit = gestionproduitpage1_show_ajouter_produit;
    return mygestionproduitpage1_show_ajouter_produit;
}
var gestionproduitingredient_ajouter_produit = null;
function getPageIngredAddProduit() {
    if (gestionproduitingredient_ajouter_produit == null) {
        gestionproduitingredient_ajouter_produit = templates.getTemplate("gestion/produit/ingredient_ajouter_produit");
        gestionproduitingredient_ajouter_produit1 = paramValue(gestionproduitingredient_ajouter_produit,"addIng",strings.getString("add.produit.dialog.title.ingredient"));
        gestionproduitingredient_ajouter_produit2 = paramValue(gestionproduitingredient_ajouter_produit1,"recherche",strings.getString("add.produit.label.ingredient.recherche"));
        gestionproduitingredient_ajouter_produit3 = paramValue(gestionproduitingredient_ajouter_produit2,"titleInput",strings.getString("add.produit.input.ingredient.title"));
        gestionproduitingredient_ajouter_produit = gestionproduitingredient_ajouter_produit3;
    }
    var mygestionproduitingredient_ajouter_produit = gestionproduitingredient_ajouter_produit;
    return mygestionproduitingredient_ajouter_produit;
}
var gestionproduitingredient_checkbox_ajouter_produit = null;
function getIngredCheckBoxAddProduit() {
    if (gestionproduitingredient_checkbox_ajouter_produit == null) {
        gestionproduitingredient_checkbox_ajouter_produit = templates.getTemplate("gestion/produit/ingredient_checkbox_ajouter_produit");
    }
    var mygestionproduitingredient_checkbox_ajouter_produit = gestionproduitingredient_checkbox_ajouter_produit;
    return mygestionproduitingredient_checkbox_ajouter_produit;
}
var gestionproduitoption_checkbox_ajouter_produit = null;
function getOptionCheckBoxAddProduit() {
    if (gestionproduitoption_checkbox_ajouter_produit == null) {
        gestionproduitoption_checkbox_ajouter_produit = templates.getTemplate("gestion/produit/option_checkbox_ajouter_produit");
    }
    var mygestionproduitoption_checkbox_ajouter_produit = gestionproduitoption_checkbox_ajouter_produit;
    return mygestionproduitoption_checkbox_ajouter_produit;
}
var gestionproduitingredOpt_li_ajouter_produit = null;
function getIngredLiAddProduit() {
    if (gestionproduitingredOpt_li_ajouter_produit == null) {
        gestionproduitingredOpt_li_ajouter_produit = templates.getTemplate("gestion/produit/ingredOpt_li_ajouter_produit");
    }
    var mygestionproduitingredOpt_li_ajouter_produit = gestionproduitingredOpt_li_ajouter_produit;
    return mygestionproduitingredOpt_li_ajouter_produit;
}
var gestionproduitoption_ajouter_produit = null;
function getOptionAddProduit() {
    if (gestionproduitoption_ajouter_produit == null) {
        gestionproduitoption_ajouter_produit = templates.getTemplate("gestion/produit/option_ajouter_produit");
        gestionproduitoption_ajouter_produit1 = paramValue(gestionproduitoption_ajouter_produit,"check",strings.getString("add.produit.label.options.cocher"));
        gestionproduitoption_ajouter_produit2 = paramValue(gestionproduitoption_ajouter_produit1,"addOpt",strings.getString("add.produit.label.options.add"));
        gestionproduitoption_ajouter_produit = gestionproduitoption_ajouter_produit2;
    }
    var mygestionproduitoption_ajouter_produit = gestionproduitoption_ajouter_produit;
    return mygestionproduitoption_ajouter_produit;
}
var gestionproduitprix_ajouter_produit = null;
function getPrixAddProduit() {
    if (gestionproduitprix_ajouter_produit == null) {
        gestionproduitprix_ajouter_produit = templates.getTemplate("gestion/produit/prix_ajouter_produit");
        gestionproduitprix_ajouter_produit1 = paramValue(gestionproduitprix_ajouter_produit,"PrixTTC",strings.getString("add.produit.label.prix.ttc"));
        gestionproduitprix_ajouter_produit2 = paramValue(gestionproduitprix_ajouter_produit1,"TVA",strings.getString("add.produit.label.prix.tva"));
        gestionproduitprix_ajouter_produit3 = paramValue(gestionproduitprix_ajouter_produit2,"PrixHT",strings.getString("add.produit.label.prix.ht"));
        gestionproduitprix_ajouter_produit = gestionproduitprix_ajouter_produit3;
    }
    var mygestionproduitprix_ajouter_produit = gestionproduitprix_ajouter_produit;
    return mygestionproduitprix_ajouter_produit;
}
var gestionproduitprix_zone_ajouter_produit = null;
function getPrixZoneAddProduit() {
    if (gestionproduitprix_zone_ajouter_produit == null) {
        gestionproduitprix_zone_ajouter_produit = templates.getTemplate("gestion/produit/prix_zone_ajouter_produit");
    }
    var mygestionproduitprix_zone_ajouter_produit = gestionproduitprix_zone_ajouter_produit;
    return mygestionproduitprix_zone_ajouter_produit;
}
var gestionproduitdiv_ajouter_option = null;
function getDivAddOption() {
    if (gestionproduitdiv_ajouter_option == null) {
        gestionproduitdiv_ajouter_option = templates.getTemplate("gestion/produit/div_ajouter_option");
        gestionproduitdiv_ajouter_option1 = paramValue(gestionproduitdiv_ajouter_option,"nameOpt",strings.getString("add.produit.label.options.add.name"));
        gestionproduitdiv_ajouter_option2 = paramValue(gestionproduitdiv_ajouter_option1,"possOpt",strings.getString("add.produit.label.options.add.possibilite"));
        gestionproduitdiv_ajouter_option = gestionproduitdiv_ajouter_option2;
    }
    var mygestionproduitdiv_ajouter_option = gestionproduitdiv_ajouter_option;
    return mygestionproduitdiv_ajouter_option;
}
var gestionproduitdiv_ajouter_ingredient = null;
function getDivAddIngredient() {
    if (gestionproduitdiv_ajouter_ingredient == null) {
        gestionproduitdiv_ajouter_ingredient = templates.getTemplate("gestion/produit/div_ajouter_ingredient");
        gestionproduitdiv_ajouter_ingredient1 = paramValue(gestionproduitdiv_ajouter_ingredient,"nomIng",strings.getString("add.produit.label.add.ingredient.name")) ;
        gestionproduitdiv_ajouter_ingredient = gestionproduitdiv_ajouter_ingredient1;
    }
    var mygestionproduitdiv_ajouter_ingredient = gestionproduitdiv_ajouter_ingredient;
    return mygestionproduitdiv_ajouter_ingredient;
}
//function getAjouterProduitSelectEtablissements() {
//    return templates.getTemplate("gestion/produit/ajouter_produit_select_etablissements")
//}
var gestionproduitajouter_produit_select_etablissements = null;
function getAjouterProduitSelectEtablissements() {
    if (gestionproduitajouter_produit_select_etablissements == null) {
        gestionproduitajouter_produit_select_etablissements = templates.getTemplate("gestion/produit/ajouter_produit_select_etablissements");
    }
    var mygestionproduitajouter_produit_select_etablissements = gestionproduitajouter_produit_select_etablissements;
    return mygestionproduitajouter_produit_select_etablissements;
}
var gestionproduitdiv_show_etblissements_and_zone = null;
function getDivShowEtblissementsAndZone() {
    if (gestionproduitdiv_show_etblissements_and_zone == null) {
        gestionproduitdiv_show_etblissements_and_zone = templates.getTemplate("gestion/produit/div_show_etblissements_and_zone");
    }
    var mygestionproduitdiv_show_etblissements_and_zone = gestionproduitdiv_show_etblissements_and_zone;
    return mygestionproduitdiv_show_etblissements_and_zone;
}
var gestionproduitli_zones_etablissement = null;
function getLiZonesEtablissement() {
    if (gestionproduitli_zones_etablissement == null) {
        gestionproduitli_zones_etablissement = templates.getTemplate("gestion/produit/li_zones_etablissement");
    }
    var mygestionproduitli_zones_etablissement = gestionproduitli_zones_etablissement;
    return mygestionproduitli_zones_etablissement;
}
var gestionproduitpossibilite_label_ajouter_produit = null;
function getPossibiliteLabelAddProduit() {
    if (gestionproduitpossibilite_label_ajouter_produit == null) {
        gestionproduitpossibilite_label_ajouter_produit = templates.getTemplate("gestion/produit/possibilite_label_ajouter_produit");
    }
    var mygestionproduitpossibilite_label_ajouter_produit = gestionproduitpossibilite_label_ajouter_produit;
    return mygestionproduitpossibilite_label_ajouter_produit;
}
var gestionproduitoption_select_ajouter_produit = null;
function getOptionPossibSelectAddProduit() {
    if (gestionproduitoption_select_ajouter_produit == null) {
        gestionproduitoption_select_ajouter_produit = templates.getTemplate("gestion/produit/option_select_ajouter_produit");
    }
    var mygestionproduitoption_select_ajouter_produit = gestionproduitoption_select_ajouter_produit;
    return mygestionproduitoption_select_ajouter_produit;
}
var gestionalldiv_gestion_dropdown = null;
function getDivGestionDropdown() {
    if (gestionalldiv_gestion_dropdown == null) {
        gestionalldiv_gestion_dropdown = templates.getTemplate("gestion/all/div_gestion_dropdown");
    }
    var mygestionalldiv_gestion_dropdown = gestionalldiv_gestion_dropdown;
    return mygestionalldiv_gestion_dropdown;
}
var interfaceVenteAccesli_acces_interface = null;
function getLiAccesInterface() {
    if (interfaceVenteAccesli_acces_interface == null) {
        interfaceVenteAccesli_acces_interface = templates.getTemplate("interfaceVenteAcces/li_acces_interface");
    }
    var myinterfaceVenteAccesli_acces_interface = interfaceVenteAccesli_acces_interface;
    return myinterfaceVenteAccesli_acces_interface;
}
var gestionallli_dropdown = null;
function getLiDropDown() {
    if (gestionallli_dropdown == null) {
        gestionallli_dropdown = templates.getTemplate("gestion/all/li_dropdown");
    }
    var mygestionallli_dropdown = gestionallli_dropdown;
    return mygestionallli_dropdown;
}
var gestionallli_dropdown_divider = null;
function getLiDropDownDivider() {
    if (gestionallli_dropdown_divider == null) {
        gestionallli_dropdown_divider = templates.getTemplate("gestion/all/li_dropdown_divider");
    }
    var mygestionallli_dropdown_divider = gestionallli_dropdown_divider;
    return mygestionallli_dropdown_divider;
}
var gestionallli_dropdown_img = null;
function getLiDropDownImg() {
    if (gestionallli_dropdown_img == null) {
        gestionallli_dropdown_img = templates.getTemplate("gestion/all/li_dropdown_img");
    }
    var mygestionallli_dropdown_img = gestionallli_dropdown_img;
    return mygestionallli_dropdown_img;
}
var gestionmodeexpertallli_nav_pill = null;
function getBootstrapNavPillLi() {
    if (gestionmodeexpertallli_nav_pill == null) {
        gestionmodeexpertallli_nav_pill = templates.getTemplate("gestion/modeexpert/all/li_nav_pill");
    }
    var mygestionmodeexpertallli_nav_pill = gestionmodeexpertallli_nav_pill;
    return mygestionmodeexpertallli_nav_pill;
}
var gestionmodeexpertgererlessitespage_gerer_sites = null;
function getGererlesSites() {
    if (gestionmodeexpertgererlessitespage_gerer_sites == null) {
        gestionmodeexpertgererlessitespage_gerer_sites = templates.getTemplate("gestion/modeexpert/gererlessites/page_gerer_sites");
    }
    var mygestionmodeexpertgererlessitespage_gerer_sites = gestionmodeexpertgererlessitespage_gerer_sites;
    mygestionmodeexpertgererlessitespage_gerer_sites = paramValue(mygestionmodeexpertgererlessitespage_gerer_sites, "addetablabel", strings.getString("label.gererlesetab.button.add.etab"));

//    Ajouter un établissement 
    return mygestionmodeexpertgererlessitespage_gerer_sites;
}
var gestionmodeexpertgererlessitestable_thead = null;
function getGererlesSitesTableThead() {
    if (gestionmodeexpertgererlessitestable_thead == null) {
        gestionmodeexpertgererlessitestable_thead = templates.getTemplate("gestion/modeexpert/gererlessites/table_thead");
    }
    var mygestionmodeexpertgererlessitestable_thead = gestionmodeexpertgererlessitestable_thead;
    mygestionmodeexpertgererlessitestable_thead = paramValue(mygestionmodeexpertgererlessitestable_thead, "zones", strings.getString("gererlessites.table.zone"));
    mygestionmodeexpertgererlessitestable_thead = paramValue(mygestionmodeexpertgererlessitestable_thead, "groupe", strings.getString("gererlessites.table.groupe"));
    mygestionmodeexpertgererlessitestable_thead = paramValue(mygestionmodeexpertgererlessitestable_thead, "slogan", strings.getString("gererlessites.table.slogan"));
    mygestionmodeexpertgererlessitestable_thead = paramValue(mygestionmodeexpertgererlessitestable_thead, "message", strings.getString("gererlessites.table.message"));
    mygestionmodeexpertgererlessitestable_thead = paramValue(mygestionmodeexpertgererlessitestable_thead, "telephone", strings.getString("gererlessites.table.telephone"));
    mygestionmodeexpertgererlessitestable_thead = paramValue(mygestionmodeexpertgererlessitestable_thead, "adresse", strings.getString("gererlessites.table.adresse"));
    mygestionmodeexpertgererlessitestable_thead = paramValue(mygestionmodeexpertgererlessitestable_thead, "style", strings.getString("gererlessites.table.style"));
    mygestionmodeexpertgererlessitestable_thead = paramValue(mygestionmodeexpertgererlessitestable_thead, "logo", strings.getString("gererlessites.table.logo"));
    mygestionmodeexpertgererlessitestable_thead = paramValue(mygestionmodeexpertgererlessitestable_thead, "nom", strings.getString("gererlessites.table.nom"));
    return mygestionmodeexpertgererlessitestable_thead;
}
var gestionmodeexpertgererlessitestable_tbody_tr = null;
function getGererlesSitesTableTbodyTr() {
    if (gestionmodeexpertgererlessitestable_tbody_tr == null) {
        gestionmodeexpertgererlessitestable_tbody_tr = templates.getTemplate("gestion/modeexpert/gererlessites/table_tbody_tr");
    }
    var mygestionmodeexpertgererlessitestable_tbody_tr = gestionmodeexpertgererlessitestable_tbody_tr;
    return mygestionmodeexpertgererlessitestable_tbody_tr;
}
var gestionmodeexpertallbootstrap_modal = null;
function getBootstrapModal() {
    if (gestionmodeexpertallbootstrap_modal == null) {
        gestionmodeexpertallbootstrap_modal = templates.getTemplate("gestion/modeexpert/all/bootstrap_modal");
    }
    var mygestionmodeexpertallbootstrap_modal = gestionmodeexpertallbootstrap_modal;
    return mygestionmodeexpertallbootstrap_modal;
}
var gestionmodeexpertgererlessitesadd_site_modal_body = null;
function getAddSiteModalBody() {
    if (gestionmodeexpertgererlessitesadd_site_modal_body == null) {
        gestionmodeexpertgererlessitesadd_site_modal_body = templates.getTemplate("gestion/modeexpert/gererlessites/add_site_modal_body");
    }
    var mygestionmodeexpertgererlessitesadd_site_modal_body = gestionmodeexpertgererlessitesadd_site_modal_body;
    return mygestionmodeexpertgererlessitesadd_site_modal_body;
}
var gestionmodeexpertgererlesLanguespage_gerer_langues = null;
function getPageGererLangues() {
    if (gestionmodeexpertgererlesLanguespage_gerer_langues == null) {
        gestionmodeexpertgererlesLanguespage_gerer_langues = templates.getTemplate("gestion/modeexpert/gererlesLangues/page_gerer_langues");
    }
    var mygestionmodeexpertgererlesLanguespage_gerer_langues = gestionmodeexpertgererlesLanguespage_gerer_langues;
    return mygestionmodeexpertgererlesLanguespage_gerer_langues;
}
var gestionmodeexpertgererlesLanguestable_thead = null;
function getLangueTableHead() {
    if (gestionmodeexpertgererlesLanguestable_thead == null) {
        gestionmodeexpertgererlesLanguestable_thead = templates.getTemplate("gestion/modeexpert/gererlesLangues/table_thead");
    }
    var mygestionmodeexpertgererlesLanguestable_thead = gestionmodeexpertgererlesLanguestable_thead;
    mygestionmodeexpertgererlesLanguestable_thead = paramValue(mygestionmodeexpertgererlesLanguestable_thead, "langues", strings.getString("gererleslangues.table.lang"));
    mygestionmodeexpertgererlesLanguestable_thead = paramValue(mygestionmodeexpertgererlesLanguestable_thead, "actions", strings.getString("gererleslangues.table.action"));

    return mygestionmodeexpertgererlesLanguestable_thead;
}
var gestionmodeexpertgererlesLanguestable_tbody_tr = null;
function getLangueTableTrBody() {
    if (gestionmodeexpertgererlesLanguestable_tbody_tr == null) {
        gestionmodeexpertgererlesLanguestable_tbody_tr = templates.getTemplate("gestion/modeexpert/gererlesLangues/table_tbody_tr");
    }
    var mygestionmodeexpertgererlesLanguestable_tbody_tr = gestionmodeexpertgererlesLanguestable_tbody_tr;
    return mygestionmodeexpertgererlesLanguestable_tbody_tr;
}
var gestionmodeexpertgererlessitesli_select_zone = null;
function getGererSitesLiSelectZone() {
    if (gestionmodeexpertgererlessitesli_select_zone == null) {
        gestionmodeexpertgererlessitesli_select_zone = templates.getTemplate("gestion/modeexpert/gererlessites/li_select_zone");
    }
    var mygestionmodeexpertgererlessitesli_select_zone = gestionmodeexpertgererlessitesli_select_zone;
    return mygestionmodeexpertgererlessitesli_select_zone;
}
var gestionmodeexpertgererlessitesli_add_zone = null;
function getGererSitesLiAddZone() {
    if (gestionmodeexpertgererlessitesli_add_zone == null) {
        gestionmodeexpertgererlessitesli_add_zone = templates.getTemplate("gestion/modeexpert/gererlessites/li_add_zone");
    }
    var mugestionmodeexpertgererlessitesli_add_zone = gestionmodeexpertgererlessitesli_add_zone;
    return mugestionmodeexpertgererlessitesli_add_zone;
}
var gestionmodeexpertallbootstrap_modal_small = null;
function getbootstrapModalSmall() {
    if (gestionmodeexpertallbootstrap_modal_small == null) {
        gestionmodeexpertallbootstrap_modal_small = templates.getTemplate("gestion/modeexpert/all/bootstrap_modal_small");
    }
    var mygestionmodeexpertallbootstrap_modal_small = gestionmodeexpertallbootstrap_modal_small;
    return mygestionmodeexpertallbootstrap_modal_small;
}
var gestionmodeexpertgererlestablesli_add_table_in_div = null;
function getGererTablesLiAddTableInDiv() {
    if (gestionmodeexpertgererlestablesli_add_table_in_div == null) {
        gestionmodeexpertgererlestablesli_add_table_in_div = templates.getTemplate("gestion/modeexpert/gererlestables/li_add_table_in_div");
    }
    var mygestionmodeexpertgererlestablesli_add_table_in_div = gestionmodeexpertgererlestablesli_add_table_in_div;
    return mygestionmodeexpertgererlestablesli_add_table_in_div;
}
var gestionmodeexpertallalert_danger = null;
function getAlertDanger() {
    if (gestionmodeexpertallalert_danger == null) {
        gestionmodeexpertallalert_danger = templates.getTemplate("gestion/modeexpert/all/alert_danger");
    }
    var mygestionmodeexpertallalert_danger = gestionmodeexpertallalert_danger;
    return mygestionmodeexpertallalert_danger;
}
var gestionmodeexpertallalert_info = null;
function getAlertInfo() {
    if (gestionmodeexpertallalert_info == null) {
        gestionmodeexpertallalert_info = templates.getTemplate("gestion/modeexpert/all/alert_info");
    }
    var mygestionmodeexpertallalert_info = gestionmodeexpertallalert_info;
    return mygestionmodeexpertallalert_info;
}
var gestionmodeexpertallalert_primary = null;
function getAlertPrimary() {
    if (gestionmodeexpertallalert_primary == null) {
        gestionmodeexpertallalert_primary = templates.getTemplate("gestion/modeexpert/all/alert_primary");
    }
    var mygestionmodeexpertallalert_primary = gestionmodeexpertallalert_primary;
    return mygestionmodeexpertallalert_primary;
}
var gestionmodeexpertallalert_warning = null;
function getAlertWarning() {
    if (gestionmodeexpertallalert_warning == null) {
        gestionmodeexpertallalert_warning = templates.getTemplate("gestion/modeexpert/all/alert_warning");
    }
    var mygestionmodeexpertallalert_warning = gestionmodeexpertallalert_warning;
    return mygestionmodeexpertallalert_warning;
}
var gererTablespage_gerer_tables = null;
function getGererTablesPageGererTables() {
    if (gererTablespage_gerer_tables == null) {
        gererTablespage_gerer_tables = templates.getTemplate("gestion/modeexpert/gererlestables/page_gerer_tables");
    }
    var mygererTablespage_gerer_tables = gererTablespage_gerer_tables;
    return mygererTablespage_gerer_tables;
}

var gestionmodeexpertgererlestablestable_afficher_all_zones_thead = null;
function getGererLesTablesTableAfficherAllZonesThead() {
    if (gestionmodeexpertgererlestablestable_afficher_all_zones_thead == null) {
        gestionmodeexpertgererlestablestable_afficher_all_zones_thead = templates.getTemplate("gestion/modeexpert/gererlestables/table_afficher_all_zones_thead");
    }
    var mygestionmodeexpertgererlestablestable_afficher_all_zones_thead = gestionmodeexpertgererlestablestable_afficher_all_zones_thead;
    return mygestionmodeexpertgererlestablestable_afficher_all_zones_thead;
}
var gestionmodeexpertgererlestablestable_afficher_all_zones_tbody = null;
function getGererLesTablesTableAfficherAllZonesTBody() {
    if (gestionmodeexpertgererlestablestable_afficher_all_zones_tbody == null) {
        gestionmodeexpertgererlestablestable_afficher_all_zones_tbody = templates.getTemplate("gestion/modeexpert/gererlestables/table_afficher_all_zones_tbody");
    }
    var mygestionmodeexpertgererlestablestable_afficher_all_zones_tbody = gestionmodeexpertgererlestablestable_afficher_all_zones_tbody;
    return mygestionmodeexpertgererlestablestable_afficher_all_zones_tbody;
}
var gestionmodeexpertgererlestableli_add_table_in_div = null;
function getGererLesTablesLiAddTableInDiv() {
    if (gestionmodeexpertgererlestableli_add_table_in_div == null) {
        gestionmodeexpertgererlestableli_add_table_in_div = templates.getTemplate("gestion/modeexpert/gererlestables/li_add_table_in_div");
    }
    var mygestionmodeexpertgererlestableli_add_table_in_div = gestionmodeexpertgererlestableli_add_table_in_div;
    return mygestionmodeexpertgererlestableli_add_table_in_div;
}

var gestionmodeexpertgererlestablesdiv_add_zone = null;
function getGererLesTablesDivAddZone() {
    if (gestionmodeexpertgererlestablesdiv_add_zone == null) {
        gestionmodeexpertgererlestablesdiv_add_zone = templates.getTemplate("gestion/modeexpert/gererlestables/div_add_zone");
    }
    var mygestionmodeexpertgererlestablesdiv_add_zone = gestionmodeexpertgererlestablesdiv_add_zone;
    return mygestionmodeexpertgererlestablesdiv_add_zone;
}

var gestionmodeexpertgererlestablesmodal_body_update_zone = null;
function getGererLesTablesModalBodyUpdateZone() {
    if (gestionmodeexpertgererlestablesmodal_body_update_zone == null) {
        gestionmodeexpertgererlestablesmodal_body_update_zone = templates.getTemplate("gestion/modeexpert/gererlestables/modal_body_update_zone");
    }
    var mygestionmodeexpertgererlestablesmodal_body_update_zone = gestionmodeexpertgererlestablesmodal_body_update_zone;
    return mygestionmodeexpertgererlestablesmodal_body_update_zone;
}

var gestionmodeexpertpagegerercategories = null;
function getGererLesCategorie() {
    if (gestionmodeexpertpagegerercategories == null) {
        gestionmodeexpertpagegerercategories = templates.getTemplate("gestion/modeexpert/gererlesCatégories/page_gerer_categories");
    }
    var mygestionmodeexpertpagegerercategories = gestionmodeexpertpagegerercategories;
    return mygestionmodeexpertpagegerercategories;
}
var gestionmodeexpertgererlestablesshow_tables_already_in_zone_table = null;
/**
 * idzonetable Id de la zone de tables<br/>
 * idtable Id de la table
 */
function getGererLesTablesShowTablesAlreadyInZoneTable() {
    if (gestionmodeexpertgererlestablesshow_tables_already_in_zone_table == null) {
        gestionmodeexpertgererlestablesshow_tables_already_in_zone_table = templates.getTemplate("gestion/modeexpert/gererlestables/show_tables_already_in_zone_table");
    }
    var mygestionmodeexpertgererlestablesshow_tables_already_in_zone_table = gestionmodeexpertgererlestablesshow_tables_already_in_zone_table;
    return mygestionmodeexpertgererlestablesshow_tables_already_in_zone_table;
}
var gestionmodeexpertgererlestableli_update_add_new_table = null;
/**
 * idzonetable<br/>
 * placeholder <br/>  
 * idtable <br/>
 */
function getGererLesTablesLiUpdateAddNewTable() {
    if (gestionmodeexpertgererlestableli_update_add_new_table == null) {
        gestionmodeexpertgererlestableli_update_add_new_table = templates.getTemplate("gestion/modeexpert/gererlestables/li_update_add_new_table");
    }
    var mygestionmodeexpertgererlestableli_update_add_new_table = gestionmodeexpertgererlestableli_update_add_new_table;
    return mygestionmodeexpertgererlestableli_update_add_new_table;
}
var gestionmodeexpertgererlesCategoriestable_tbody_tr = null;
function getGererlesCategoriesTableTbodyTr() {
    if (gestionmodeexpertgererlesCategoriestable_tbody_tr == null) {
        gestionmodeexpertgererlesCategoriestable_tbody_tr = templates.getTemplate("gestion/modeexpert/gererlesCatégories/table_tbody_tr");
    }
    var mygestionmodeexpertgererlesCategoriestable_tbody_tr = gestionmodeexpertgererlesCategoriestable_tbody_tr;
    return mygestionmodeexpertgererlesCategoriestable_tbody_tr;
}
var gestionmodeexpertgererlescategoriestable_thead = null;
function getGererlesCategoriesTableThead() {
    if (gestionmodeexpertgererlescategoriestable_thead == null) {
        gestionmodeexpertgererlescategoriestable_thead = templates.getTemplate("gestion/modeexpert/gererlesCatégories/table_thead");
    }
    var mygestionmodeexpertgererlescategoriestable_thead = gestionmodeexpertgererlescategoriestable_thead;
    mygestionmodeexpertgererlescategoriestable_thead = paramValue(mygestionmodeexpertgererlescategoriestable_thead, "nom", strings.getString("modeexpert.label.value.nom"));
    mygestionmodeexpertgererlescategoriestable_thead = paramValue(mygestionmodeexpertgererlescategoriestable_thead, "priorite", strings.getString("modeexpert.label.value.priorite"));
    return mygestionmodeexpertgererlescategoriestable_thead;
}
var gestionmodeexpertgererlescategoriesadd_site_modal_body = null;
function getAddCategorieModalBody() {
    if (gestionmodeexpertgererlescategoriesadd_site_modal_body == null) {
        gestionmodeexpertgererlescategoriesadd_site_modal_body = templates.getTemplate("gestion/modeexpert/gererlesCatégories/add_categorie_modal_body");
    }
    var mygestionmodeexpertgererlescategoriesadd_site_modal_body = gestionmodeexpertgererlescategoriesadd_site_modal_body;
    return mygestionmodeexpertgererlescategoriesadd_site_modal_body;
}