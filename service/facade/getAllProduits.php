<?php
// $_SERVER['SERVER_NAME'];
/**
 * Description of getAllCategories
 *
 * @author Damien Chesneau <contact@damienchesneau.fr>
 */
//header('Content-Type: text/json; charset=utf-8');
include_once '../logique/LogiqueFactory.php';
$produitSrv = LogiqueFactory::getProduitService();
$result = $produitSrv->getAll();
$total = count($result);
echo json_encode($result);

