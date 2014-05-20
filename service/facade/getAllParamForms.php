<?php

include_once '../logique/LogiqueFactory.php';
$paramform = LogiqueFactory::getParamFormService();
$result = $paramform->getAll();
echo json_encode($result);

