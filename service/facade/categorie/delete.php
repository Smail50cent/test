<?php

include_once '../../outils/AppRoot.php';
include_once $path . 'service/logique/LogiqueFactory.php';
include_once $path . 'service/logique/entity/Categorie.php';

try {
    if (isset($id)) {
        $categorieSrv = LogiqueFactory::getCategorieService();
        $ret->data = $categorieSrv->delete($id);
    }
} catch (Exception $ex) {
    $ret->error = true;
}
echo json_encode($ret);