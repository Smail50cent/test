<?php

include_once '../../outils/AppRoot.php';
include_once $path . 'service/logique/LogiqueFactory.php';
try {
    $tauxtvaSrv = LogiqueFactory::getTauxTvaService();
    $ret->data = $tauxtvaSrv->getAll();
} catch (Exception $exc) {
    $ret->error = true;
}
echo json_encode($ret);
