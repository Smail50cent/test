<?php

include_once $path.'service/logique/ProdtestService.php';
include_once $path.'service/persistance/PersistanceFactory.php';
/**
 * Description of 
 *
 * @author 
 */
class ProdtestServiceImpl implements ProdtestService {

    private $prodtestSrv;

    function __construct() {
        $this->prodtestSrv = PersistanceFactory::getProdtestService();
    }

    public function getAll() {
        $prodtest = $this->prodtestSrv->getAll();
        return $prodtest;
    }

    public function getById($id) {
        $prodtest = $this->prodtestSrv->getById($id);
        return $prodtest;        
    }

    public function add($NOM,$CATEGORIE_ID,$sousCategorie,$options,$lienAssociationProduitPrix,$Produit_simple,$Famille_comptable,$TVA) {
        $this->prodtestSrv->add($NOM,$CATEGORIE_ID,$sousCategorie,$options,$lienAssociationProduitPrix,$Produit_simple,$Famille_comptable,$TVA);
    }

}
