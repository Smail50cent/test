<?php

/**
 * Description of getByEtablissementNull
 *
 * @author Damien Chesneau <contact@damienchesneau.fr>
 */
include_once '../../outils/AppRoot.php';
include_once $path . 'service/logique/LogiqueFactory.php';
try {
    $zoneTableSrv = LogiqueFactory::getZoneTableService();
    $ret->data = $zoneTableSrv->getByEtablissementNull();
} catch (Exception $exc) {
    $ret->error = true;
}
echo json_encode($ret);

