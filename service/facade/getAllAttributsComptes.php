<?php

include_once '../outils/AppRoot.php';include_once $path.'service/logique/LogiqueFactory.php';
$attcompteSrv = LogiqueFactory::getAttributCompteService();
$result = $attcompteSrv->getAll();
echo json_encode($result);

