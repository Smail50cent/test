<?php

if (isset($_POST["password"])) {
    include_once '../logique/LogiqueFactory.php';
    $attcompteSrv = LogiqueFactory::getCompteService();
    $attcompteSrv->addAll($_POST["password"]);
}
