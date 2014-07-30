<?php

include_once '../../outils/AppRoot.php';
include_once $path . 'service/logique/LogiqueFactory.php';
$stringsSrv = LogiqueFactory::getStringsService();
$stringsSrv->generateXMLFileFor(array("fr_FR", "en_US"));
