<?php

include_once '../../outils/AppRoot.php';
include_once $path . 'service/logique/LogiqueFactory.php';
try {
    if (isset($id)) {
        $groupeSrv = LogiqueFactory::getEtablissementService();
        $ret->data = $groupeSrv->getById($id);
    }
} catch (Exception $ex) {
    $ret->error = true;
}
echo json_encode($ret);
