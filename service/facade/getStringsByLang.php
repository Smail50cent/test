<?php

if (isset($_GET["lang"])) {
    include_once '../outils/AppRoot.php';include_once $path.'service/logique/LogiqueFactory.php';
    $stringsSrv = LogiqueFactory::getStringsService();
    $result = $stringsSrv->getByLang($_GET["lang"]);
    echo json_encode($result);
}

