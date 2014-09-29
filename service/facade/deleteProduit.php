<?php

/* 
 * Decrepted !
 */

if (isset($_POST["ID"])) {
    include_once '../outils/AppRoot.php';
    include_once $path.'service/logique/LogiqueFactory.php';
    $prodSrv = LogiqueFactory::getProduitService();
    $prodSrv->DeleteProduit($_POST["ID"]);
}