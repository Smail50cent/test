<?php

include_once '../../outils/AppRoot.php';
include_once $path . 'service/logique/LogiqueFactory.php';
$paramappSrv = LogiqueFactory::getParamAppService();
$result;
if (isset($_GET["idetablissement"])) {
    extract($_GET);
    $result = $paramappSrv->getAll($idetablissement);
} else {
    $result = $paramappSrv->getAll(null);
}
echo json_encode($result);

