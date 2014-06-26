<?php
/**
 * Description of getAllCategories
 *
 * @author Damien Chesneau <contact@damienchesneau.fr>
 */
//header('Content-Type: text/json; charset=utf-8');
include_once '../outils/AppRoot.php';include_once $path.'service/logique/LogiqueFactory.php';
$produitSrv = LogiqueFactory::getCategorieService();
$result = $produitSrv->getAll();
//$total =  $result->rowCount();
//echo '[';
$i = 0;echo json_encode($result);
//while($ligne = $result->fetch()){  
//    $i++;
//    echo json_encode($ligne);
//    if($total!= $i){
//        echo ',';
//    }
//}
//echo ']';