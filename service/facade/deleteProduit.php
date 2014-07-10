<?php

/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

if (isset($_POST["ID"])) {
    include_once '../outils/AppRoot.php';include_once $path.'service/logique/LogiqueFactory.php';
    $prodSrv = LogiqueFactory::getProduitService();
    $prodSrv->DeleteProduit($_POST["ID"]);
}