<?php

include_once '../outils/AppRoot.php';include_once $path.'service/logique/LogiqueFactory.php';
$paramform = LogiqueFactory::getParamFormService();
$result = $paramform->getAll();
echo json_encode($result);

