<?php include_once './header.php'; ?>
<div id="content_id" class="content content_structure content_personalize">
    <div id="choose_lang_id" class="choose_lang choose_lang_structure choose_lang_personalize">
        <p>Langue :</p> 
         <select id="select_lang" class="select_lang_structure select_lang_personalize">       
        </select>
    </div>
    <ul id="btn_choice" class="btn_choice btn_choice_structure btn_choice_personalize">
        <li id="nbpersonnes_item" class="nbpersonnes_item nbpersonnes_item_structure nbpersonnes_item_personalize">
            <p id="nbpersonnes_label" class="nbpersonnes_label nbpersonnes_label_structure nbpersonnes_label_personalize" >Combien de personnes pour cette commande ?</p>
            <select id="nbPersonnes" class="select select_structure select_personalize">
            </select>
        </li>
        <li id="numeroTable_item" class="numeroTable_item numeroTable_item_structure numeroTable_item_personalize">
            <p id="numerotable_label">A quel table êtes-vous ?</p>
            <select id="numTable" class="select select_structure select_personalize ">
            </select>
        </li>
    </ul>
    
    <?php include_once './compte.php'; ?>
        
    </div>
</div>
<?php
include_once './footer.php';
?>