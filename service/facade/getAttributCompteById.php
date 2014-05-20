<?php

if (isset($_GET["id"])) {
    include_once '../logique/LogiqueFactory.php';
    $attcompteSrv = LogiqueFactory::getAttributCompteService();
    $result = $attcompteSrv->getById($_GET["id"]);
    echo json_encode($result);
}