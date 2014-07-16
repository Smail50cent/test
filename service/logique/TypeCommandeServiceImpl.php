<?php

include_once $path . 'service/logique/TypeCommandeService.php';
include_once $path . 'service/logique/entity/TypeCommande.php';

/**
 * Description of ZoneTableServiceData
 *
 * @author Damien Chesneau <contact@damienchesneau.fr>
 */
class TypeCommandeServiceImpl implements TypeCommandeService {

    private $typeCommandeSrv;

    public function __construct() {
        $this->typeCommandeSrv = PersistanceFactory::getTypeCommandeService();
    }

    public function getAll() {
        return $this->typeCommandeSrv->getAll();
    }

}
