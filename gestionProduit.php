<?php include_once './header.php'; ?>
<div id="content_id" class="content content_structure content_personalize">

    <ul id="content_list_categorie_id" class="content_list_categorie content_list_categorie_structure content_list_categorie_personalize" style="margin-top: 0;">
        <!--li><button></button></li-->
    </ul><p id="content_titre_id" class="content_titre content_titre_structure content_titre_personalize"></p>
    <div id="content_titre_categorie_id" class="content_titre_categorie content_titre_categorie_structure content_titre_categorie_personalize" >
        <div id="content_titre_categorie_left_id" class="content_titre_categorie_left content_titre_categorie_left_structure content_titre_categorie_left_personalize"></div>
        <div id="content_titre_categorie_center_id" class="content_titre_categorie_center content_titre_categorie_center_structure content_titre_categorie_center_personalize"><p id="titre_categorie_id"></p></div>
        <div id="content_titre_categorie_right_id" class="content_titre_categorie_right content_titre_categorie_right_structure content_titre_categorie_right_personalize"></div>

        <div id="confirm_dialog_produit_id" class="confirm_dialog_produit"></div>
        <div id="dialog_add_opt_ingred_id" class="dialog_add_opt_ingred"></div>
        <div id="dialog_add_produit_id" class="dialog_add_produit"></div>
    </div>

    <div id="menu_or_card" class="menu_or_card menu_or_card_structure menu_or_card_personalize ">

        <ul id="content_global_zone_id" class="content_globlal_zone content_globlal_zone_structure content_globlal_zone_personalize">
            <!--            li>
                            <div id="content_produit_zone_id" class="content_produit_zone content_produit_zone_structure content_produit_zone_personalize">
                                <div id="content_produit_zone_left_id" class="content_produit_zone_left content_produit_zone_left_structure content_produit_zone_left_personalize"><input type="button" id="content_produit_btn_left_id" class="content_produit_btn_left content_produit_btn_left_structure content_produit_btn_left_personalize"/></div>
                                <div id="content_produit_zone_right_id" class="content_produit_zone_right"><input type="button" id="content_produit_btn_right_id" class="content_produit_btn_right content_produit_btn_right_structure content_produit_btn_right_personalize"/>
            
                        </div>
                                <div id="ontent_produit_id" class="content_produit content_produit_structure content_produit_personalize">
                        <p id="content_produit_zone_right_prix_id" class="content_produit_zone_right_prix content_produit_zone_right_prix_structure content_produit_zone_right_prix_personalize"> </p>
                                    <p id="content_produit_titre_id" class="content_produit_titre content_produit_titre_structure content_produit_titre_personalize"></p>
                                    <p id="content_produit_description_id" class="content_produit_description content_produit_description_structure content_produit_description_personalize"></p>
                                </div>
                        </li-->
        </ul>
    </div>

</div>
<!--div id="recapitulatif_commande_id" class="recapitulatif_commande recapitulatif_commande_structure recapitulatif_commande_personalize"></div-->
</div>
</div>
<div id="footer_id" class="footer footer_structure footer_personalize">
    <input type="button"  class="btn_recapitulatif_commande btn_recapitulatif_commande_structure btn_recapitulatif_commande_personalize btn_recapitulatif_commande_carte btn_recapitulatif_commande_carte_structure btn_recapitulatif_commande_carte_personalize" id="btn_recapitulatif_commande_id" onclick="recapitulatifClick();" value="Recapitulatif de votre commande"></input>
    <p id="footer_adresse_id" class="footer_adresse footer_adresse_structure footer_adresse_personalize"></p>
    <div id="footer_left_id" class=" footer_left footer_left_structure footer_left_personalize"></div>
    <div id="footer_left_id_trgl" class="footer_left_trgl footer_left_trgl_structure footer_left_trgl_personalize"></div>
    <div id="footer_right_id" class="footer_right footer_right_structure footer_right_personalize"></div>
</div>
<style>
    .sous_categorie_cat_structure  {
        display: none;
    }
    .content_globlal_zone_structure {
        overflow: hidden;
    }
    .genreicClassSlide_structure {
        opacity: 0;
    }
    .slide.active {
        opacity: 1;
    }
    .notransition{
        opacity: 0.8;
    }
    .select_ingredient_structure, .select_option_structure, .select_possibilite_structure{
        width:16em;
        height:12em;
        border:solid 1px #c0c0c0;
        overflow: auto;
    }

    .select_ingredient_structure label, .select_option_structure label, .select_possibilite_structure label {
        display:block;
    }
    .second_dialog {
        z-index: 7000;
    }
    /*    .select_ingredient-on {
            color:#ffffff;
            background-color:#000099;
        }*/
    img.link_add_product_img_structure.link_add_product_img_personalize {
        margin-left: 46%;
        margin-top: 1.5%;
        margin-right: 50%;
        float: none;
    }
</style>
</body>
</html> 
