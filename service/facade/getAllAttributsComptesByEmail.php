<?php

if (isset($_GET['email'])) {
    include_once '../logique/LogiqueFactory.php';
    $attcompteSrv = LogiqueFactory::getAttributCompteService();
    $result = $attcompteSrv->getAllByEmail($_GET['email']);
    echo json_encode($result);
}


