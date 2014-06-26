<?php

if (isset($_GET["id"])) {
    header('Content-Type: text/json; charset=utf-8');
    include_once '../outils/AppRoot.php';include_once $path.'service/logique/LogiqueFactory.php';
    $produitSrv = LogiqueFactory::getSousCategorieService();
    $result = $produitSrv->getById($_GET["id"]);
    $total = $result->rowCount();
//    echo '[';
//    $i = 0;
//    while ($ligne = $result->fetch()) {
//        $i++;
//        echo json_encode($ligne);
//        if ($total != $i) {
//            echo ',';
//        }
//    }
//    echo ']';
    $ligne = $result->fetch();
    echo json_encode($ligne);
}
