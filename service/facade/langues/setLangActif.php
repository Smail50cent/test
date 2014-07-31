<?php

/**
 * Description of setLangActif
 *
 * @author Damien Chesneau <contact@damienchesneau.fr>
 */
include_once '../../outils/AppRoot.php';
include_once $path . 'service/logique/LogiqueFactory.php';
$ret = new Retour();
try {
    if (isset($idlang)) {
        $optSrv = LogiqueFactory::getLanguesService();
        $ret->data = null;
    }
} catch (Exception $exc) {
    $ret->error = true;
}
echo json_encode($ret);
