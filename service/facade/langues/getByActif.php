<?php

/**
 * Description of getByActif
 *
 * @author Damien Chesneau <contact@damienchesneau.fr>
 */
include_once '../../outils/AppRoot.php';
include_once $path . 'service/logique/LogiqueFactory.php';
$ret = new Retour();
try {
    $optSrv = LogiqueFactory::getLanguesService();
    $ret->data = $optSrv->getByActif();
} catch (Exception $exc) {
    $ret->error = true;
}
echo json_encode($ret);

