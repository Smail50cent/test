<?php

/**
 * Description of remove
 *
 * @author Damien Chesneau <contact@damienchesneau.fr>
 */
include_once '../../outils/AppRoot.php';
include_once $path . 'service/logique/entity/ZoneTable.php';
include_once $path . 'service/logique/LogiqueFactory.php';
try {
    $zone = json_decode($zone);
    $zoneTableSrv = LogiqueFactory::getZoneTableService();
    $zoneTables = new ZoneTable();
    $zoneTables->setNom($zone->nom);
    for ($j = 0; $j < count($zone->tables); $j++) {
        $table = new Table();
        $table->setNumero($zone->tables[$j]);
        $zoneTables->addTable($table);
    }
    $retid = new RETID();
    $retid->id = $zoneTableSrv->add($zoneTables);
    $ret->data = $retid;
} catch (Exception $exc) {
    $ret->error = true;
}
echo json_encode($ret);

class RETID {

    public $id;

}
