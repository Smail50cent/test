<?php

include_once '../../outils/AppRoot.php';
include_once $path . 'service/logique/LogiqueFactory.php';
try {
    $groupeSrv = LogiqueFactory::getEtablissementService();
    $ret->data = $groupeSrv->getAll();
} catch (Exception $ex) {
    $ret->error = true;
}
echo json_encode($ret);
