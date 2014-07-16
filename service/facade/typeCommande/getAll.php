<?php
/**
 * Description of getAll
 *
 * @author Damien Chesneau <contact@damienchesneau.fr>
 */
include_once '../../outils/AppRoot.php';
include_once $path.'service/logique/LogiqueFactory.php';
$typeCommandeSrv = LogiqueFactory::getTypeCommandeService();
$result = $typeCommandeSrv->getAll();
echo json_encode($result);