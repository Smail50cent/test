<?php

/**
 * Description of removeTable
 *
 * @author Damien Chesneau <contact@damienchesneau.fr>
 */
include_once '../../outils/AppRoot.php';
include_once $path . 'service/logique/LogiqueFactory.php';
try {
    if (isset($id)) {//idzonetable nom
        $zoneTableSrv = LogiqueFactory::getZoneTableService();
        $ret->data = $zoneTableSrv->removeTable($id);
    }
} catch (Exception $exc) {
    $ret->error = true;
}
echo json_encode($ret);
