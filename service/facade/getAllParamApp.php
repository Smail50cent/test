<?php

include_once '../logique/LogiqueFactory.php';
$compteSrv = LogiqueFactory::getParamAppService();
$result = $compteSrv->getAll();
echo json_encode($result);

