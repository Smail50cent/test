<?php

/**
 * Description of getAll
 *
 * @author Damien Chesneau <contact@damienchesneau.fr>
 */
include_once '../../outils/AppRoot.php';
include_once $path . 'service/logique/LogiqueFactory.php';
try {
    $ingredientSrv = LogiqueFactory::getIngredientService();
    $ret->data = $ingredientSrv->getAll();
} catch (Exception $exc) {
    $ret->error = true;
}
echo json_encode($ret);
