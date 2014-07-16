<?php

include_once $path . 'service/logique/ProdtestService.php';
include_once $path . 'service/persistance/PersistanceFactory.php';
include_once $path.'service/logique/entity/AssociationProduitIngredients.php';

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
        $associationProduitPrixSrv = PersistanceFactory::getAssociationProduitPrixService();
        $optionSrv = PersistanceFactory::getOptionService();
        $apiSrv = PersistanceFactory::getAssociationProduitIngredientService();
        $catsrv = PersistanceFactory::getCategorieService();
        $produits = $this->prodtestSrv->getAll();
        for ($i = 0; $i < count($produits); $i++) {
            $ings = $apiSrv->getByIdProduit($produits[$i]->getId());
            $ingredients = array();
            $j = 0;
            while ($ing = $ings->fetch()) {
                $ingredients[$j] = new AssociationProduitIngredients(intval($ing->id_produit), intval($ing->id_ingredient), $ing->isAdded, $ing->surcout, $ing->supprimable, $ing->isIngredientSup);
                $j++;
            }

            $categorie = $catsrv->getById($produits[$i]->getCategorie_id());
            if ($produits[$i]->getOptions() != 0 || $produits[$i]->getOptions() != "0") {
                $produits[$i]->setOptions($optionSrv->getOptionByIdProduit($produits[$i]->getId()));
            }
            $produits[$i]->setLienAssociationProduitPrix($associationProduitPrixSrv->getByProduit($produits[$i]->getId()));
            $produits[$i]->setCategorie_id($categorie);
            $produits[$i]->setIngredients($ingredients);
        }
        return $produits;
    }

    public function getById($id) {
        $associationProduitPrixSrv = PersistanceFactory::getAssociationProduitPrixService();
        $optionSrv = PersistanceFactory::getOptionService();
        $apiSrv = PersistanceFactory::getAssociationProduitIngredientService();
        $catsrv = PersistanceFactory::getCategorieService();
        $produit = $this->prodtestSrv->getById($id);
        $ings = $apiSrv->getByIdProduit($produit->getId());
        $ingredients = array();
        $j = 0;
        while ($ing = $ings->fetch()) {
            $ingredients[$j] = new AssociationProduitIngredients(intval($ing->id_produit), intval($ing->id_ingredient), $ing->isAdded, $ing->surcout, $ing->supprimable, $ing->isIngredientSup);
            $j++;
        }

        $categorie = $catsrv->getById($produit->getCategorie_id());
        if ($produit->getOptions() != 0 || $produit->getOptions() != "0") {
            $produit->setOptions($optionSrv->getOptionByIdProduit($produit->getId()));
        }
        $produit->setLienAssociationProduitPrix($associationProduitPrixSrv->getByProduit($id));
        $produit->setCategorie_id($categorie);
        $produit->setIngredients($ingredients);
        return $produit;
    }

    public function add($NOM, $CATEGORIE_ID, $sousCategorie, $options, $lienAssociationProduitPrix, $Produit_simple, $Famille_comptable, $TVA) {
        $this->prodtestSrv->add($NOM, $CATEGORIE_ID, $sousCategorie, $options, $lienAssociationProduitPrix, $Produit_simple, $Famille_comptable, $TVA);
    }

    public function getProduitByCategorieId($id) {
        $associationProduitPrixSrv = PersistanceFactory::getAssociationProduitPrixService();
        $optionSrv = PersistanceFactory::getOptionService();
        $apiSrv = PersistanceFactory::getAssociationProduitIngredientService();
        $catsrv = PersistanceFactory::getCategorieService();
        $produits = $this->prodtestSrv->getProduitByCategorieId($id);
        for ($i = 0; $i < count($produits); $i++) {
            $ings = $apiSrv->getByIdProduit($produits[$i]->getId());
            $ingredients = array();
            $j = 0;
            while ($ing = $ings->fetch()) {
                $ingredients[$j] = new AssociationProduitIngredients(intval($ing->id_produit), intval($ing->id_ingredient), $ing->isAdded, $ing->surcout, $ing->supprimable, $ing->isIngredientSup);
                $j++;
            }
            $categorie = $catsrv->getById($produits[$i]->getCategorie_id());
            if ($produits[$i]->getOptions() != 0 || $produits[$i]->getOptions() != "0") {
                $produits[$i]->setOptions($optionSrv->getOptionByIdProduit($produits[$i]->getId()));
            }
            $produits[$i]->setLienAssociationProduitPrix($associationProduitPrixSrv->getByProduit($produits[$i]->getId()));
            $produits[$i]->setCategorie_id($categorie);
            $produits[$i]->setIngredients($ingredients);
        }
        return $produits;
    }

}
