<?php

//header('Content-Type: text/json; charset=utf-8');
include_once '../outils/AppRoot.php';
include_once $path . 'service/logique/LogiqueFactory.php';
$menuSrv = LogiqueFactory::getMenuService();
$result;
if (isset($_GET["idetablissement"]) && isset($_GET["idzone"])) {
    $result = $menuSrv->getByEtablissementAndZone($_GET["idetablissement"], $_GET["idzone"]);
} else {
    $result = $menuSrv->getAll();
}
echo json_encode($result);