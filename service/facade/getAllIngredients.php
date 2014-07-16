<?php

/**
 * Description of getAllCategories
 *
 * @author Damien Chesneau <contact@damienchesneau.fr>
 */
//header('Content-Type: text/json; charset=UTF-8');
include_once '../outils/AppRoot.php';
include_once $path . 'service/logique/LogiqueFactory.php';
$ingredientSrv = LogiqueFactory::getIngredientService();
$result = $ingredientSrv->getAll();
echo json_encode($result);
