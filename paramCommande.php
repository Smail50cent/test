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
    <div id="auth_popup_id" class="auth_popup" title="Login">

        <div id="auth_form_id" class="auth_form"></div>
        <div id="all_snbutton_id" class="all_snbutton">
            <div id ="button_facebook_id" class ="button_facebook"></div>
            <div id ="button_twitter_id" class ="button_twitter"></div>
            <div id ="button_googleplus_id" class ="button_googleplus"></div>
        </div>
    </div>

</div>
</div>
<?php
include_once './footer.php';
?>