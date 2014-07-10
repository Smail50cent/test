<?php

include_once $path . 'service/logique/MajTablesService.php';
include_once $path . 'service/persistance/PersistanceFactory.php';

/**
 * Description of IngredientServiceImpl
 *
 * @author Damien Chesneau <contact@damienchesneau.fr>
 */
class MajTablesServiceImpl implements MajTablesService {

    private $majtableSrv;
    private $produitSrv;

    function __construct() {
        $this->majtableSrv = PersistanceFactory::getMajTablesService();
        $this->produitSrv = PersistanceFactory::getProduitService();
    }

    public function getAll() {
        return $this->majtableSrv->getAll();
    }

    public function getBynomTable($nom) {
        return $this->majtableSrv->getBynomTable($nom);
    }

    public function haveMAJ($tableName, $level) {
        $table = $this->majtableSrv->haveMAJ($tableName, $level);
        if ($table->level > $level) {
            $produitByLvl = $this->produitSrv->getProduitByLevel($level);
            return $produitByLvl;
        } else {
            return FALSE;
        }
    }

}
