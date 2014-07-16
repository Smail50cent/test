<?php

include_once '../outils/AppRoot.php';
include_once $path . 'service/logique/LogiqueFactory.php';
$majtables = LogiqueFactory::getMajTablesService();
$result = $majtables->getAll();
echo json_encode($result);

