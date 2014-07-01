<?php

if (isset($_GET["nomTable"])) {
    include_once '../outils/AppRoot.php';
    include_once $path . 'service/logique/LogiqueFactory.php';
    $majtablesSrv = LogiqueFactory::getMajTablesService();
    $result = $majtablesSrv->getBynomTable($_GET["nomTable"]);
    echo json_encode($result);
}
