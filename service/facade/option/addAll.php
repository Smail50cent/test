<?php

if (isset($_POST["option"])) {
    include_once '../outils/AppRoot.php';
    include_once $path . 'service/logique/LogiqueFactory.php';
    $option = json_decode($_POST["option"]);
    $optionSrv = LogiqueFactory::getOptionService();
    echo $optionSrv->add($option);
}

