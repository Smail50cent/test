<?php

/**
 * Description of getByIdEtablissement
 *
 * @author Damien Chesneau <contact@damienchesneau.fr>
 */
include_once '../../outils/AppRoot.php';
include_once $path . 'service/logique/LogiqueFactory.php';
if (isset($_GET["idetablissement"])) {
    $ret = new Retour();
    try {
        $zoneTableSrv = LogiqueFactory::getZoneTableService();
        $ret->data = $zoneTableSrv->getByIdEtablissement($_GET["idetablissement"]);
    } catch (Exception $exc) {
        $ret->error = true;
    }
    echo json_encode($ret);
}
