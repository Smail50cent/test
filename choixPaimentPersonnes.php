<?php include_once './header.php'; ?>
<div id="content_id" class="content content_structure content_personalize" style="margin-top: 5em;">

    <div id="choix_mode_calcul_id" class="choix_mode_calcul choix_mode_calcul_structure choix_mode_calcul_personalize">
        <p id="choix_mode_calcul_titre_id"></p>
        <button id="btn_choix_mode_calcul_division" class="btn_choix_mode_calcul_division btn_choix_mode_calcul_division_structure btn_choix_mode_calcul_division_personalize" onclick="divisionTotal();"/>
        <button id="btn_choix_mode_calcul_part" class="btn_choix_mode_calcul_part btn_choix_mode_calcul_part_structure btn_choix_mode_calcul_part_personalize" onclick="parPersonne();"/>
    </div>
    <div id="content_paiment_personne_id" class="content_paiment_personne content_paiment_personne_structure content_paiment_personne_personalize">
        <div id="produits_non_attr" class="produits_non_attr produits_non_attr_structure produits_non_attr_personalize">
            <p id="liste_produit_non_attribue" class=" liste_produit_non_attribue liste_produit_non_attribue_structure liste_produit_non_attribue_personalize"></p>
            <ul id="liste_prod_non_attribue_id"class="liste_prod_non_attribue liste_prod_non_attribue_structure liste_prod_non_attribue_personalize" >
                
            </ul>
        </div> 
        <ul id="content_paiment_personne_liste_id" class="content_paiment_personne_liste content_paiment_personne_liste_structure content_paiment_personne_liste_personalize">
            
        </ul>

        <p id="total_selection_id"></p>
        <input class="validerPaimentSelection validerPaimentSelection_structure validerPaimentSelectionpersonalize" onclick="validerPaimentSelection();" type="button" id="content_paiment_personne_button_valider_id"></input>
    </div>
</div>

<div id="dialog_attribution_produit" class="dialog_attribution_produit dialog_attribution_produit_structure dialog_attribution_produit_personalize" style="display: none;">
    <p id="titre_rappel_produit" class="titre_rappel_produit titre_rappel_produit_structure titre_rappel_produit_personalize"></p>
    <ul id="liste_utilisateurs_to_choose_id" class="liste_utilisateurs_to_choose liste_utilisateurs_to_choose_structure liste_utilisateurs_to_choose_personalize">
        
    </ul>
    <button id="valider_selection_utilisateurs" class="valider_selection_utilisateurs valider_selection_utilisateurs_structure valider_selection_utilisateurs_personalize" onclick="attributionNouveauProduit();"></button>
</div>
<style>
    .content_paiment_personne_liste_structure li * {
        display: initial;
    }
    .content_paiment_personne_liste_structure li img {
        width: 20px;
        height: 20px;
    }
    .liste_utilisateurs_to_choose_structure li * {
        display: initial;
    }
    .liste_utilisateurs_to_choose_structure li img {
        width: 20px;
        height: 20px;
    }
</style>