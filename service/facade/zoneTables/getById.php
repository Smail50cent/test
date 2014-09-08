<?php

/**
 * @author Damien Chesneau <contact@damienchesneau.fr>
 */
include_once '../../outils/AppRoot.php';
include_once $path . 'service/logique/LogiqueFactory.php';
try {
    if (isset($id)) {
        $zoneTableSrv = LogiqueFactory::getZoneTableService();
        $ret->data = $zoneTableSrv->getById($id);
    }
} catch (Exception $exc) {
    $ret->error = true;
}
echo json_encode($ret);
