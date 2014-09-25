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
    $result = $produitSrv->getAll();
    $ret->data = $result->fetchAll();
} catch (Exception $exc) {
    $ret->error = true;
}
echo json_encode($ret);