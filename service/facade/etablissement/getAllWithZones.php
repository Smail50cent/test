<?php

/**
 * Description of getAllWithZones
 *
 * @author Damien Chesneau <contact@damienchesneau.fr>
 */
include_once '../../outils/AppRoot.php';
include_once $path . 'service/logique/LogiqueFactory.php';
try {
    $groupeSrv = LogiqueFactory::getEtablissementService();
    $ret->data = $groupeSrv->getAllWithZones();
} catch (Exception $exc) {
    $ret->error = true;
}
echo json_encode($ret);
