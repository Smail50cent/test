<?php

/**
 * Description of remove
 *
 * @author Damien Chesneau <contact@damienchesneau.fr>
 */
if (isset($_GET['id'])) {
    extract($_GET); 
    include_once '../../outils/AppRoot.php';
    include_once $path . 'service/logique/LogiqueFactory.php';
    $groupeSrv = LogiqueFactory::getEtablissementService();
    $data = $groupeSrv->remove($id);
}
