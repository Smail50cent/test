<?php

if (isset($_GET["id"])) {
    include_once '../logique/LogiqueFactory.php';
    $stringsSrv = LogiqueFactory::getStringsService();
    $result = $stringsSrv->getById($_GET["id"]);
    echo json_encode($result);
}