<?php

if (isset($_GET["level"])) {
    include_once '../outils/AppRoot.php';
    include_once $path . 'service/logique/LogiqueFactory.php';
    $produitSrv = LogiqueFactory::getProduitService();
    $result = $produitSrv->getProduitByLevel($_GET["level"]);
    echo json_encode($result);
}

