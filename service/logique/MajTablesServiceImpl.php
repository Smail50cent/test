<?php

include_once $path.'service/logique/MajTablesService.php';
include_once $path.'service/persistance/PersistanceFactory.php';
/**
 * Description of IngredientServiceImpl
 *
 * @author Damien Chesneau <contact@damienchesneau.fr>
 */
class MajTablesServiceImpl implements MajTablesService {
    
    private $majtableSrv;

    function __construct() {
        $this->majtableSrv = PersistanceFactory::getMajTablesService();
    }

    public function getAll() {
        return $this->majtableSrv->getAll();
    }

    public function getBynomTable($nom) {
        return $this->majtableSrv->getBynomTable($nom);
    }

}

