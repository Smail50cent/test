<?php

include_once '../outils/AppRoot.php';
include_once $path . 'service/logique/LogiqueFactory.php';
if (isset($_GET["nom"])) {
    extract($_GET);
    $paramform = LogiqueFactory::getParamAppService();
    $result;
    if (isset($_GET["idetablissement"])) {
        $result = $paramform->getByNomParametre($nom, $idetablissement);
    } else {
        $result = $paramform->getByNomParametre($nom, null);
    }
    echo json_encode($result);
}
