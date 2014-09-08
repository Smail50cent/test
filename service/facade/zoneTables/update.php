<?php

/**
 * Description of removeTable
 *
 * @author Damien Chesneau <contact@damienchesneau.fr>
 */
include_once '../../outils/AppRoot.php';
include_once $path . 'service/logique/LogiqueFactory.php';
try {
    if (isset($idzonetable) && isset($nom)) {
        $zoneTableSrv = LogiqueFactory::getZoneTableService();
        $zoneTable = new ZoneTable();
        $zoneTable->setId($idzonetable);
        $zoneTable->setNom($nom);
        $ret->data = $zoneTableSrv->update($zoneTable);
    }
} catch (Exception $exc) {
    $ret->error = true;
}
echo json_encode($ret);
 