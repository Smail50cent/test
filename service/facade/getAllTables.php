<?php

include_once '../logique/LogiqueFactory.php';
$tableSrv = LogiqueFactory::getTableService();
$result = $tableSrv->getAll();
echo json_encode($result);