<?php

/**
 * Description of getAll
 *
 * @author Damien Chesneau <contact@damienchesneau.fr>
 */
include_once '../../outils/AppRoot.php';
include_once $path . 'service/logique/LogiqueFactory.php';
try {
    $produitSrv = LogiqueFactory::getSousCategorieService();
    $ret->data = $produitSrv->getAll();
} catch (Exception $exc) {
    $ret->error = true;
}
echo json_encode($ret);