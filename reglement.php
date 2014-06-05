<?php include_once './header.php'; ?>
<div id="content_id" class="content content_structure content_personalize">
    
    <p id="reglement_titre_id" class="reglement_titre reglement_titre_structure reglement_titre_personalize" ></p>
    <p id="reglement_question_id"></p>
    <ul id="reglement_ul_possibilite_id" class="mode_de_reglement_liste mode_de_reglement_liste_structure mode_de_reglement_liste_personalize">
        
    </ul>
    <button id="reglement_btn_valier_id" class="reglement_btn_valier reglement_btn_valier_structure reglement_btn_valier_personalize " onclick="validerReglement();"  />
</div>
<style>
    .content_structure {
        display: inline;
        top: 5em;
    }
    .mode_de_reglement_liste_structure div p{
        display: initial;
    }
</style>