<?php

if (isset($_GET["id"])) {
    include_once '../logique/LogiqueFactory.php';
    $compteSrv = LogiqueFactory::getCompteService();
    $result = $compteSrv->getById($_GET["id"]);
    echo json_encode($result);
}