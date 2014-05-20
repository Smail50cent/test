<?php

if (isset($_GET["id_form"])&&isset($_GET["valeur_champ"])&&isset($_GET["defaut"])&&isset($_GET["id_compte"])) {
    include_once '../logique/LogiqueFactory.php';
    $attcompteSrv = LogiqueFactory::getAttributCompteService();
    $attcompteSrv->addAll($_GET["id_form"],$_GET["valeur_champ"],$_GET["defaut"],$_GET["id_compte"]);
    
}