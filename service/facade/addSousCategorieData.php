<?php

include_once '../logique/LogiqueFactory.php';
$souscategorieSrv = LogiqueFactory::getSousCategorieService();
$souscategorieSrv->addData();

