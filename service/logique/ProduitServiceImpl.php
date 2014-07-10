<?php

include_once $path . 'service/logique/ProduitService.php';
include_once $path . 'service/logique/entity/AssociationProduitIngredients.php';

/**
 * Description of CategorieServiceImpl
 *
 * @author Damien Chesneau <contact@damienchesneau.fr>
 */
class ProduitServiceImpl implements ProduitService {

    private $produitSrv;

    function __construct() {
        $this->produitSrv = PersistanceFactory::getProduitService();
    }

    public function getById($id) {
        return $this->produitSrv->getById($id);
    }

    public function getAll() {
        return $this->produitSrv->getAll();
    }

    public function getProduitByCategorieId($id) {
        return $this->produitSrv->getProduitByCategorieId($id);
    }

    public function addData() {
        $this->produitSrv->addData();
    }

    public function getProduitByLevel($level) {
        return $this->produitSrv->getProduitByLevel($level);
    }

    public function DeleteProduit($id) {
        $this->produitSrv->DeleteProduit($id);
    }

}
