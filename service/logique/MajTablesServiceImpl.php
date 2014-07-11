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
    private $typeCommandeSrv;

    function __construct() {
        $this->majtableSrv = PersistanceFactory::getMajTablesService();
        $this->produitSrv = PersistanceFactory::getProduitService();
        $this->typeCommandeSrv = PersistanceFactory::getTypeCommandeService();
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
            $data = null;
            switch ($tableName) {
                case "typeCommandes":
                    $data = $this->typeCommandeSrv->getByLevel($level);
                    break;
                case "produits":
                    $data = $this->produitSrv->getProduitByLevel($level);
                    break;
                case "entreprise": break;
            }
            $toRet = new ToRet();
            $toRet->level = $table->level;
            $toRet->data = $data;
            return $toRet;
        } else {
            return FALSE;
        }
    }

}

class ToRet {

    public $level;
    public $data;

}
