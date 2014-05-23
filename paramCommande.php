<?php include_once './header.php'; ?>
<div id="content_id" class="content">
    <div id="choose_lang_id" class="choose_lang">
        <p>Langue :</p> 
        <select id="select_lang">       
        </select>
    </div>
    <ul id="btn_choice" class="btn_choice">
        <li id="nbpersonnes_item">
            <p id="nbpersonnes_label">Combien de personnes pour cette commande ?</p>
            <select id="nbPersonnes" class="select">
            </select>
        </li>
        <li id="numeroTable_item">
            <p id="numerotable_label">A quel table êtes-vous ?</p>
            <select id="numTable" class="select">
            </select>
        </li>
    </ul>
    
    <?php include_once './compte.php'; ?>
        
    </div>
</div>
<?php
include_once './footer.php';
?>