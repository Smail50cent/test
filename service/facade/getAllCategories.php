<?php

/**
 * Description of getAllCategories
 *
 * @author Damien Chesneau <contact@damienchesneau.fr>
 */
//header('Content-Type: text/json; charset=utf-8');
include_once '../outils/AppRoot.php';
include_once $path . 'service/logique/LogiqueFactory.php';
$categorieSrv = LogiqueFactory::getCategorieService();
$result;
if (isset($_GET["idetablissement"]) && isset($_GET["idzone"])) {
    $result = $categorieSrv->getByEtablissementAndZone($_GET["idetablissement"], $_GET["idzone"]);
} else {
    $result = $categorieSrv->getAll();
}

echo json_encode($result);
