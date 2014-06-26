<?php

include_once '../outils/AppRoot.php';include_once $path.'service/logique/LogiqueFactory.php';
if (isset($_GET["id"])) {
    $prodtest = LogiqueFactory::getProdtestService();
    $data = $prodtest->getById($_GET["id"]);
    echo json_encode($data);
}