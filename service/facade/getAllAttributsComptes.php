<?php

include_once '../logique/LogiqueFactory.php';
$attcompteSrv = LogiqueFactory::getAttributCompteService();
$result = $attcompteSrv->getAll();
echo json_encode($result);

