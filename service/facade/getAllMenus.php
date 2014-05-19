<?php
//header('Content-Type: text/json; charset=utf-8');
include_once '../logique/LogiqueFactory.php';
$menuSrv = LogiqueFactory::getMenuService();
$result = $menuSrv->getAll();
echo json_encode($result);
