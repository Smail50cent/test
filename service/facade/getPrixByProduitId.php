<?php

include_once '../logique/LogiqueFactory.php';
if (isset($_GET["id"])) {
    $asppSrv = LogiqueFactory::getAssociationProduitPrixService();
    $data = $asppSrv->getByProduit($_GET["id"]);
    echo json_encode($data);
}
