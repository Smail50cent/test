<?php

include_once '../logique/LogiqueFactory.php';
$stringsSrv = LogiqueFactory::getStringsService();
$result = $stringsSrv->getAll();
echo json_encode($result);

