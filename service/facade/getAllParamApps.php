<?php

include_once '../outils/AppRoot.php';include_once $path.'service/logique/LogiqueFactory.php';
$paramappSrv = LogiqueFactory::getParamAppService();
$result = $paramappSrv->getAll();
echo json_encode($result);

