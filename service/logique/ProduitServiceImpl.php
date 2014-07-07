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
        $associationProduitPrixSrv = PersistanceFactory::getAssociationProduitPrixService();
        $optionSrv = PersistanceFactory::getOptionService();
        $apiSrv = PersistanceFactory::getAssociationProduitIngredientService();
        $catsrv = PersistanceFactory::getCategorieService();
        $produits = $this->produitSrv->getProduitByLevel($level);
        for ($i = 0; $i < count($produits); $i++) {
            $ings = $apiSrv->getByIdProduit($produits[$i]->getId());
            $ingredients = array();
            $j = 0;
            while ($ing = $ings->fetch()) {
                $ingredients[$j] = new AssociationProduitIngredients(intval($ing->id_produit), intval($ing->id_ingredient), $ing->isAdded, $ing->surcout, $ing->supprimable, $ing->isIngredientSup);
                $j++;
            }
            $categorie = $catsrv->getById($produits[$i]->getCategorie());
            if ($produits[$i]->getOptions() != 0 || $produits[$i]->getOptions() != "0") {
                $produits[$i]->setOptions($optionSrv->getOptionByIdProduit($produits[$i]->getId()));
            }
            $produits[$i]->setAssociationProduitPrix($associationProduitPrixSrv->getByProduit($produits[$i]->getId()));
            $produits[$i]->setCategorie($categorie);
            $produits[$i]->setIngredients($ingredients);
        }
        return $produits;
    }

}
