<?php
include_once '../../outils/AppRoot.php';
include_once $path.'service/logique/LogiqueFactory.php';
$groupeSrv = LogiqueFactory::getEtablissementService();
json_encode($groupeSrv->getAll());