<?php

include_once '../outils/AppRoot.php';include_once $path.'service/logique/LogiqueFactory.php';
$tableSrv = LogiqueFactory::getTableService();
$result = $tableSrv->getAll();
echo json_encode($result);