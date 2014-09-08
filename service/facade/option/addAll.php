<?php

include_once '../../outils/AppRoot.php';
include_once $path . 'service/logique/LogiqueFactory.php';
try {
    if (isset($option)) {
        $option = json_decode($option);
        $optionSrv = LogiqueFactory::getOptionService();
        $ret->data = $optionSrv->add($option);
    }
} catch (Exception $ex) {
    $ret->error = true;
}
echo json_encode($ret);


