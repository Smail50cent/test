<?php
/**
 * Description of getAllCategories
 *
 * @author Damien Chesneau <contact@damienchesneau.fr>
 */
header('Content-Type: text/json; charset=utf-8');
include_once '../logique/LogiqueFactory.php';
$produitSrv = LogiqueFactory::getSousCategorieService();
$result = $produitSrv->getAll();
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