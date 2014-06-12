<?php

include_once '../logique/LogiqueFactory.php';
$categorieSrv = LogiqueFactory::getCategorieService();
$categorieSrv->addData();

