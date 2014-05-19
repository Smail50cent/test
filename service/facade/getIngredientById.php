<?php

if (isset($_GET["id"])) {
//    header('Content-Type: text/json; charset=UTF-8');
    include_once '../logique/LogiqueFactory.php';
    $ingredientSrv = LogiqueFactory::getIngredientService();
    $result = $ingredientSrv->getById($_GET["id"]);
    $ligne = $result->fetch();
    echo json_encode($ligne);
}
