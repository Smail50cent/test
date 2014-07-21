<?php

include_once '../../outils/AppRoot.php';
include_once $path . 'service/logique/LogiqueFactory.php';
$paramappSrv = LogiqueFactory::getParamAppService();
$result;
if (isset($_GET["etablissementid"])) {
    extract($_GET);
    $result = $paramappSrv->getAll($etablissementid);
} else {
    $result = $paramappSrv->getAll(null);
}
echo json_encode($result);

