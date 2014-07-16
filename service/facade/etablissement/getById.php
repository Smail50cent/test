<?php

if (isset($_GET['id'])) {
    extract($_GET); 
    include_once '../../outils/AppRoot.php';
    include_once $path . 'service/logique/LogiqueFactory.php';
    $groupeSrv = LogiqueFactory::getEtablissementService();
    $data = $groupeSrv->getById($id);
    echo json_encode($data);
}
