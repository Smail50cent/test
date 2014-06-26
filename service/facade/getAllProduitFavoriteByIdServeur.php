<?php

include_once '../outils/AppRoot.php';
include_once $path . 'service/logique/LogiqueFactory.php';

if (isset($_GET["id"])) {
    $attcompteSrv = LogiqueFactory::getCompteProduitFavoriService();
    $result = $attcompteSrv->getByIdServeur($_GET["id"]);
    echo json_encode($result);
}