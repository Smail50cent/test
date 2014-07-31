<?php

/**
 * Description of setLangActif
 *
 * @author Damien Chesneau <contact@damienchesneau.fr>
 */
include_once '../../outils/AppRoot.php';
include_once $path . 'service/logique/LogiqueFactory.php';
try {
    if (isset($idlang)) {
        $optSrv = LogiqueFactory::getLanguesService();
        $optSrv->setLangActif($idlang);
        $ret->data = null;
    }
} catch (Exception $exc) {
    $ret->error = true;
}
echo json_encode($ret);
