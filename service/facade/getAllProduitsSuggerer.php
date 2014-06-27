<?php

include_once '../outils/AppRoot.php';
include_once $path.'service/logique/LogiqueFactory.php';
$produitSrv = LogiqueFactory::getProduitSuggererService();
$result = $produitSrv->getAll();
echo json_encode($result);
