<?php

if (isset($_POST["password"]) && isset($_POST["id_role"])) {
    include_once '../logique/LogiqueFactory.php';
    $attcompteSrv = LogiqueFactory::getCompteService();
    $attcompteSrv->addAll($_POST["password"],$_POST["id_role"]);
}
