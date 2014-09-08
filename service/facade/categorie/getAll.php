<?php

/**
 * Description of getAllCategories
 *
 * @author Damien Chesneau <contact@damienchesneau.fr>
 */
include_once '../../outils/AppRoot.php';
include_once $path . 'service/logique/LogiqueFactory.php';
try {
    $categorieSrv = LogiqueFactory::getCategorieService();
     $ret->data = $categorieSrv->getAll();
} catch (Exception $exc) {
    $ret->error = true;
}
echo json_encode($ret);
