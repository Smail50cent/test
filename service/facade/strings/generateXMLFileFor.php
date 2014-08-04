<?php

include_once '../../outils/AppRoot.php';
include_once $path . 'service/logique/LogiqueFactory.php';
$stringsSrv = LogiqueFactory::getStringsService();
$languesSrv = PersistanceFactory::getLanguesService();
$actifs = $languesSrv->getByActif();
$stringsSrv->generateXMLFileFor($actifs);
