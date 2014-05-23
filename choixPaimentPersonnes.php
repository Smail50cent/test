<?php include_once './header.php'; ?>
<div id="content_id" class="content" style="margin-top: 5em;">

    <div id="choix_mode_calcul_id" class="choix_mode_calcul">
        <p id="choix_mode_calcul_titre_id"></p>
        <button id="btn_choix_mode_calcul_division" class="btn_choix_mode_calcul_division_class" onclick="divisionTotal();"/>
        <button id="btn_choix_mode_calcul_part" class="btn_choix_mode_calcul_part_class" onclick="parPersonne();"/>
    </div>
    <div id="content_paiment_personne_id">
        <div id="produits_non_attr">
            <p id="liste_produit_non_attribue"></p>
            <ul id="liste_prod_non_attribue_id" >
                
            </ul>
        </div> 
        <ul id="content_paiment_personne_liste_id" class="content_paiment_personne_liste">
            
        </ul>

        <p id="total_selection_id"></p>
        <input class="validerPaimentSelection_class" onclick="validerPaimentSelection();" type="button" id="content_paiment_personne_button_valider_id"></input>
    </div>
</div>

<div id="dialog_attribution_produit" style="display: none;">
    <p id="titre_rappel_produit"></p>
    <ul id="liste_utilisateurs_to_choose_id" class="liste_utilisateurs_to_choose">
        
    </ul>
    <button id="valider_selection_utilisateurs" onclick="attributionNouveauProduit();"></button>
</div>
<style>
    .content_paiment_personne_liste li * {
        display: initial;
    }
    .content_paiment_personne_liste li img {
        width: 20px;
        height: 20px;
    }
    .liste_utilisateurs_to_choose li * {
        display: initial;
    }
    .liste_utilisateurs_to_choose li img {
        width: 20px;
        height: 20px;
    }
</style>