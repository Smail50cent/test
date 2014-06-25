<?php

include_once '../outils/AppRoot.php';include_once $path.'service/logique/LogiqueFactory.php';
$stringsSrv = LogiqueFactory::getStringsService();
$result = $stringsSrv->getAll();
echo json_encode($result);

