<?php

if (isset($_GET["nomTable"]) && isset($_GET["level"])) {
    include_once '../outils/AppRoot.php';
    include_once $path . 'service/logique/LogiqueFactory.php';
    $majtablesSrv = LogiqueFactory::getMajTablesService();
    $result = $majtablesSrv->haveMAJ($_GET["nomTable"],$_GET["level"]);
    echo json_encode($result);
}
