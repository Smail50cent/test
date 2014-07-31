<?php

/**
 * Description of add
 *
 * @author Damien Chesneau <contact@damienchesneau.fr>
 */
include_once '../../outils/AppRoot.php';
include_once $path . 'service/logique/LogiqueFactory.php';


if (isset($_GET["fr"]) && isset($_GET["en"]) && isset($_GET["key"])) {
   $ret = new Retour();
    try {
        extract($_GET);
        $stringsSrv = LogiqueFactory::getStringsService();
        $stringsSrv->addNewString($key, $en, $fr);
        $ret->data = null;
    } catch (Exception $ex) {
        $ret->error = true;
    }
    echo json_encode($ret);
}