<?php

/**
 * Description of addTable
 *
 * @author Damien Chesneau <contact@damienchesneau.fr>
 */
include_once '../../outils/AppRoot.php';
include_once $path . 'service/logique/LogiqueFactory.php';
try {
    if (isset($idzonetable) && isset($numero)) {
        $zoneTableSrv = LogiqueFactory::getZoneTableService();
        $sd = new RETID();
        $sd->id = $zoneTableSrv->addTable($numero, $idzonetable);
        $ret->data = $sd;
    }
} catch (Exception $exc) {
    $ret->error = true;
}
echo json_encode($ret);

class RETID {

    public $id;

}