<?php

/**
 * Description of getAllCategories
 *
 * @author Damien Chesneau <contact@damienchesneau.fr>
 */
//header('Content-Type: text/json; charset=utf-8');
include_once '../logique/LogiqueFactory.php';
$entrepriseSrv = LogiqueFactory::getEntrepriseService();
$result = $entrepriseSrv->getEntreprise();
$ligne = $result->fetch();
if ($ligne->langue == "0") {
    $ligne->langue = true;
} else {
    $ligne->langue = false;
}
if ($ligne->menus == "0") {
    $ligne->menus = true;
} else {
    $ligne->menus = false;
}
echo json_encode($ligne);
