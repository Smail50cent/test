<?php

include_once '../logique/LogiqueFactory.php';
$paramappSrv = LogiqueFactory::getParamAppService();
$result = $paramappSrv->getAll();
echo json_encode($result);

