<?php
include_once '../../outils/AppRoot.php';
include_once $path.'service/logique/LogiqueFactory.php';
$tauxtvaSrv = LogiqueFactory::getTauxTvaService();
echo json_encode($tauxtvaSrv->getAll());