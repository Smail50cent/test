<?php

if (isset($_GET["id"])) {
    include_once '../logique/LogiqueFactory.php';
    $menuSrv = LogiqueFactory::getMenuService();
    $result = $menuSrv->getById($_GET["id"]);
    echo json_encode($result);
}
