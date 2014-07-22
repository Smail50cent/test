<?php

if (isset($_POST["ingredient_nom"])) {
    include_once '../../outils/AppRoot.php';
    include_once $path . 'service/logique/LogiqueFactory.php';
    $ingredient = json_decode($_POST["ingredient_nom"]);
    $ingredSrv = LogiqueFactory::getIngredientService();
    echo $ingredSrv->add($ingredient);
}

