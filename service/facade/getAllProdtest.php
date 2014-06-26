<?php

include_once '../outils/AppRoot.php';include_once $path.'service/logique/LogiqueFactory.php';
$prodtest = LogiqueFactory::getProdtestService();
$result = $prodtest->getAll();
echo json_encode($result);

