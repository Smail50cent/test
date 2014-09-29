<?php

/**
 * @author Damien Chesneau <contact@damienchesneau.fr>
 */
include_once '../../outils/AppRoot.php';
include_once $path . 'service/logique/LogiqueFactory.php';
try {
    if (isset($ID)) {
        $prodSrv = LogiqueFactory::getProduitService();
        $prodSrv->DeleteProduit($ID);
    }
} catch (Exception $ex) {
    $ret->error = true;
}
echo json_encode($ret);
