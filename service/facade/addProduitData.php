<?php

include_once '../logique/LogiqueFactory.php';
$categorieSrv = LogiqueFactory::getProduitService();
$categorieSrv->addData();

