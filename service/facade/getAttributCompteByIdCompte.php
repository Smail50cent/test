<?php

if (isset($_GET["id_compte"])) {
    include_once '../outils/AppRoot.php';include_once $path.'service/logique/LogiqueFactory.php';
    $attcompteSrv = LogiqueFactory::getAttributCompteService();
    $result = $attcompteSrv->getByIdCompte($_GET["id_compte"]);
    echo json_encode($result);
}