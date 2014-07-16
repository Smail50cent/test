<?php
include_once '../../outils/AppRoot.php';
include_once $path.'service/logique/LogiqueFactory.php';
$optSrv = LogiqueFactory::getOptionService();
echo json_encode($optSrv->getAll());