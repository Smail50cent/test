<?php
include_once '../outils/AppRoot.php';
    include_once $path.'service/logique/LogiqueFactory.php';
if (isset($_GET["nom"])) {
    extract($_GET);
    $paramform = LogiqueFactory::getParamAppService();
    $result = $paramform->getByNomParametre($nom);
    echo json_encode($result);
}
