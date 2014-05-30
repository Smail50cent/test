<?php

include_once '../logique/LogiqueFactory.php';
$attcompteSrv = LogiqueFactory::getAttributCompteService();
$result = $attcompteSrv->getAllEmails();
echo json_encode($result);

