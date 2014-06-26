<?php

if (isset($_GET["id"])) {
    include_once '../outils/AppRoot.php';include_once $path.'service/logique/LogiqueFactory.php';
    $mdrSrv = LogiqueFactory::getModeDeReglementService();
    $result = $mdrSrv->getById($_GET["id"]);
    echo json_encode($result);
}
