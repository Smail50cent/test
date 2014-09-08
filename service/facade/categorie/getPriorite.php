<?php

/**
 * Description of getPriorite
 *
 * @author Damien Chesneau <hamza.legdani@gmail.com>
 */
include_once '../../outils/AppRoot.php';
include_once $path . 'service/logique/LogiqueFactory.php';
try {
    if (isset($idCat)) {
        $categorieSrv = LogiqueFactory::getCategorieService();
        $ret->data = $categorieSrv->getPriorite($idCat);
    }
} catch (Exception $exc) {
    $ret->error = true;
}
echo json_encode($ret);


