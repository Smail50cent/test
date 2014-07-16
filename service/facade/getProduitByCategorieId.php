<?php

if (isset($_GET["id"])) {
    
    include_once '../outils/AppRoot.php';include_once $path.'service/logique/LogiqueFactory.php';
    $produitSrv = LogiqueFactory::getProduitService();
    $result;
    if(isset($_GET["idetablissement"]) && isset($_GET["idzone"])){
        $result = $produitSrv->getByCategorieAndEtablissentAndZone($_GET["id"],$_GET["idetablissement"],$_GET["idzone"]);
    }else{
        $result = $produitSrv->getProduitByCategorieId($_GET["id"]);
    }
    echo json_encode($result);
}
