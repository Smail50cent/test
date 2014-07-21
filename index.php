<?php include_once './header.php'; ?>
<div id="content_id" class="content content_structure content_personalize">
    <div>
        <select id="select_entablissement_id" class="select_entablissement_structure select_personalize">
            
        </select>
    </div>
    <ul id="btn_choice" class="btn_choice_structure btn_choice_personalize">
        <li><a id="indexLiClientsurplace" onclick="goClientSurPlace();"></a></li>
        <li><a id="indexLiClientEmporter" onclick="goClientAEmporter();"></a></li>
        <li><a id="indexLiClientLivraison" onclick="goClientLivraison();"></a></li>
        <li><a id="indexLiClientReservation" onclick="goClientReservation();"></a></li>
        <li><a id="indexLiServeurConnexion" onclick="connexionDunServeur();"></a></li>
    </ul>  
</div>
</body>
</html> 