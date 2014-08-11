<?php

include_once '../../outils/AppRoot.php';
include_once $path . 'service/logique/LogiqueFactory.php';
try {
    $stringsSrv = LogiqueFactory::getStringsService();
    $languesSrv = PersistanceFactory::getLanguesService();
    $actifs = $languesSrv->getByActif();
    $stringsSrv->generateXMLFileFor($actifs);
} catch (Exception $exc) {
    $ret->error = true;
}
echo json_encode($ret);


