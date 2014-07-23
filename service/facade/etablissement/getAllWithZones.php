<?php

/**
 * Description of getAllWithZones
 *
 * @author Damien Chesneau <contact@damienchesneau.fr>
 */
include_once '../../outils/AppRoot.php';
include_once $path.'service/logique/LogiqueFactory.php';
$groupeSrv = LogiqueFactory::getEtablissementService();
$data = $groupeSrv->getAllWithZones();
echo json_encode($data);