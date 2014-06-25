<?php

include_once '../outils/AppRoot.php';include_once $path.'service/logique/LogiqueFactory.php';
$compteSrv = LogiqueFactory::getCompteService();
$result = $compteSrv->getAll();
echo json_encode($result);

