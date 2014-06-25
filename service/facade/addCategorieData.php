<?php

include_once '../outils/AppRoot.php';include_once $path.'service/logique/LogiqueFactory.php';
$categorieSrv = LogiqueFactory::getCategorieService();
$categorieSrv->addData();

