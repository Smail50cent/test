<?php

include_once 'ProduitService.php';
include_once 'entity/AssociationProduitIngredients.php';

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
        $optionSrv = PersistanceFactory::getOptionService();
        $apiSrv = PersistanceFactory::getAssociationProduitIngredientService();
        $catsrv = PersistanceFactory::getCategorieService();
        $produit = $this->produitSrv->getById($id);
        $ings = $apiSrv->getByIdProduit($produit->getId());
        $ingredients = array();
        $j = 0;
        while ($ing = $ings->fetch()) {
            $ingredients[$j] = new AssociationProduitIngredients(intval($ing->id_produit), intval($ing->id_ingredient), $ing->isAdded, $ing->surcout, $ing->supprimable, $ing->isIngredientSup);
            $j++;
        }
        $categorie = $catsrv->getById($produit->getCategorie());
        if ($produit->getOptions() != 0 || $produit->getOptions() != "0") {
            $produit->setOptions($optionSrv->getOptionByIdProduit($produit->getId()));
        }
        $produit->setCategorie($categorie);
        $produit->setIngredients($ingredients);

        return $produit;
    }

    public function getAll() {
        $optionSrv = PersistanceFactory::getOptionService();
        $apiSrv = PersistanceFactory::getAssociationProduitIngredientService();
        $catsrv = PersistanceFactory::getCategorieService();
        $produits = $this->produitSrv->getAll();
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
            $produits[$i]->setCategorie($categorie);
            $produits[$i]->setIngredients($ingredients);
        }
        return $produits;
    }

    public function getProduitByCategorieId($id) {
        $optionSrv = PersistanceFactory::getOptionService();
        $apiSrv = PersistanceFactory::getAssociationProduitIngredientService();
        $catsrv = PersistanceFactory::getCategorieService();
        $produits = $this->produitSrv->getProduitByCategorieId($id);
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
            $produits[$i]->setCategorie($categorie);
            $produits[$i]->setIngredients($ingredients);
        }
        return $produits;
    }

}
