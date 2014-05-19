<?php

if (isset($_GET["id"])) {
    include_once '../logique/LogiqueFactory.php';
    $produitSrv = LogiqueFactory::getProduitService();
    $result = $produitSrv->getById($_GET["id"]);
    echo json_encode($result);
}

