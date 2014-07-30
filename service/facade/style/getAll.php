<?php

/**
 * Description of getAll
 *
 * @author Damien Chesneau <contact@damienchesneau.fr>
 */
include_once '../../outils/AppRoot.php';
include_once $path . 'service/logique/LogiqueFactory.php';
$ret = new ToRet1();
try {
    $styleSrv = LogiqueFactory::getStyleService();
    $ret->data = $styleSrv->getAll();
} catch (Exception $exc) {
    $ret->error=true;
}

echo json_encode($ret);

class ToRet1 {

    public $data;
    public $error=false;

}
