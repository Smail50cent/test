<?php

if (isset($_POST["password"]) && isset($_POST["id_role"])) {
    include_once '../outils/AppRoot.php';
    include_once $path . 'service/logique/LogiqueFactory.php';
    $attcompteSrv = LogiqueFactory::getCompteService();
    echo $attcompteSrv->addAll($_POST["password"], $_POST["id_role"]);
}
