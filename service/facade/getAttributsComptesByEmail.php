<?php

if (isset($_GET['email'])) {
    include_once '../outils/AppRoot.php';include_once $path.'service/logique/LogiqueFactory.php';
    $attcompteSrv = LogiqueFactory::getAttributCompteService();
    $result = $attcompteSrv->getAllByEmail($_GET['email']);
    echo json_encode($result);
}


