<?php

include_once '../../outils/AppRoot.php';
include_once $path . 'service/logique/LogiqueFactory.php';

try {
    $optSrv = LogiqueFactory::getOptionService();
    $ret->data = ($optSrv->getAll());
} catch (Exception $ex) {
    $ret->error = true;
}
echo json_encode($ret);