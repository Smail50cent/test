<?php
include_once '../outils/AppRoot.php';include_once $path.'service/logique/LogiqueFactory.php';
if (isset($_GET['email']) && isset($_GET['password'])) {
    extract($_GET);
    $compteSrv = LogiqueFactory::getCompteService();
    echo $compteSrv->getUser($email, $password);
}

