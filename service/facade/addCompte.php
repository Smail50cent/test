<?php

if (isset($_POST["password"])) {
    echo "post received";
    include_once '../logique/LogiqueFactory.php';
    $attcompteSrv = LogiqueFactory::getCompteService();
    $attcompteSrv->addAll($_POST["password"]);
}
