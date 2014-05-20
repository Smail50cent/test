<?php

include_once '../logique/LogiqueFactory.php';
$compteSrv = LogiqueFactory::getCompteService();
$result = $compteSrv->getAll();
echo json_encode($result);

