<?php

/**
 * Description of getAll
 *
 * @author Damien Chesneau <contact@damienchesneau.fr>
 */
include_once '../../outils/AppRoot.php';
include_once $path . 'service/logique/LogiqueFactory.php';
try {
    $typeCommandeSrv = LogiqueFactory::getTypeCommandeService();
    $ret->data = $typeCommandeSrv->getAll();
} catch (Exception $ex) {
    $ret->error = true;
}

echo json_encode($ret);
