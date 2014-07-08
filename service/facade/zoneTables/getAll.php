<?php

include_once '../../outils/AppRoot.php';
include_once $path.'service/logique/LogiqueFactory.php';
$zoneTableSrv = LogiqueFactory::getZoneTableService();
$result = $zoneTableSrv->getAll();
echo json_encode($result);
