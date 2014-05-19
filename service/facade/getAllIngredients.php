<?php
/**
 * Description of getAllCategories
 *
 * @author Damien Chesneau <contact@damienchesneau.fr>
 */
header('Content-Type: text/json; charset=UTF-8');
include_once '../logique/LogiqueFactory.php';
$ingredientSrv = LogiqueFactory::getIngredientService();
$result = $ingredientSrv->getAll();
$total =  $result->rowCount();
echo '[';
$i = 0;
while($ligne = $result->fetch()){  
    $i++;
    echo json_encode($ligne);
    if($total!= $i){
        echo ',';
    }
}
echo ']';