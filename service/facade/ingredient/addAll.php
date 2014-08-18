<?php

include_once '../../outils/AppRoot.php';
include_once $path . 'service/logique/LogiqueFactory.php';
try {
    if (isset($ingredient_nom)) {
        $ingredient = json_decode($ingredient_nom);
        $ingredSrv = LogiqueFactory::getIngredientService();
        $ret->data = $ingredSrv->add($ingredient);
    }
} catch (Exception $exc) {
    $ret->error = true;
}
echo json_encode($ret);

