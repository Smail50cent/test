<?php

include_once '../outils/AppRoot.php';include_once $path.'service/logique/LogiqueFactory.php';
if (isset($_GET["id"])) {
    $asppSrv = LogiqueFactory::getAssociationProduitPrixService();
    $data = $asppSrv->getByProduit($_GET["id"]);
    echo json_encode($data);
}
