<?php

include_once '../outils/AppRoot.php';
include_once $path . 'service/logique/LogiqueFactory.php';
if (isset($_GET["nom"])) {
    extract($_GET);
    $paramform = LogiqueFactory::getParamAppService();
    $result;
    if (isset($_GET["etablissementid"])) {
        $result = $paramform->getByNomParametre($nom, $etablissementid);
    } else {
        $result = $paramform->getByNomParametre($nom, null);
    }
    echo json_encode($result);
}
