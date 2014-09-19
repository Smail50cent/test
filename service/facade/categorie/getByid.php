<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

include_once '../../outils/AppRoot.php';
include_once $path . 'service/logique/LogiqueFactory.php';
include_once $path . 'service/logique/entity/Categorie.php';

try {
    if (isset($id)) {
        $categorieSrv = LogiqueFactory::getCategorieService();
        $ret->data = $categorieSrv->getByIdForUpdate($id);
    }
} catch (Exception $ex) {
    $ret->error = true;
}
echo json_encode($ret);
