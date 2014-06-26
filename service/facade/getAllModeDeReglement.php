<?php

//header('-: text/json; charset=utf-8');
include_once '../outils/AppRoot.php';include_once $path.'service/logique/LogiqueFactory.php';
$mdrSrv = LogiqueFactory::getModeDeReglementService();
$result = $mdrSrv->getAll();
echo json_encode($result);
?>