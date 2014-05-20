<?php

if (isset($_GET["id"])) {
    include_once '../logique/LogiqueFactory.php';
    $paramform = LogiqueFactory::getParamFormService();
    $result = $paramform->getById($_GET["id"]);
    echo json_encode($result);
}