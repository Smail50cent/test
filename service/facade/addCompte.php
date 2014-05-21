<?php

if (isset($_GET["password"])) {
    include_once '../logique/LogiqueFactory.php';
    $attcompteSrv = LogiqueFactory::getCompteService();
    $attcompteSrv->addAll($_GET["password"]);
}
