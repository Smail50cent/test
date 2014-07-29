<?php
/**
 * Description of getById
 *
 * @author Damien Chesneau <contact@damienchesneau.fr>
 */
if (isset($_GET['id'])) {
    extract($_GET); 
    include_once '../../outils/AppRoot.php';
    include_once $path . 'service/logique/LogiqueFactory.php';
    $produitSrv = LogiqueFactory::getGroupeService();
    $data = $produitSrv->getById($id);
    echo json_encode($data);
}
