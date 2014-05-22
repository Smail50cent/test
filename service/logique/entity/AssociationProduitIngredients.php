<?php

/**
 * Description of AssociationProduitIngredients
 *
 * @author Damien Chesneau <contact@damienchesneau.fr>
 */
class AssociationProduitIngredients {

    public $produit;
    public $ingredient;
    public $surcout;
    public $supprimable;
    public $isAdded;
    public $isIngredientSup;

    public function __construct($produit, $ingredient, $isAdded, $surcout, $supprimable, $isIngredientSup) {
        $this->produit = $produit;
        $this->ingredient = $ingredient;
        $this->surcout = $surcout;
        $this->supprimable = $supprimable;
        $this->isAdded = $isAdded;
        $this->isIngredientSup = $isIngredientSup;
    }

    public function getProduit() {
        return $this->produit;
    }

    public function setProduit($produit) {
        $this->produit = $produit;
    }

    public function getIngredient() {
        return $this->ingredient;
    }

    public function setIngredient($ingredient) {
        $this->ingredient = $ingredient;
    }

    public function getSurcout() {
        return $this->ingredient;
    }

    public function setSurcout($surcout) {
        $this->surcout = $surcout;
    }

    public function isSupprimable() {
        return $this->supprimable;
    }

    public function setSupprimable($supprimable) {
        $this->supprimable = $supprimable;
    }

    public function isAdded() {
        return $this->isAdded;
    }

    public function setIsAdded($isAdded) {
        $this->isAdded = $isAdded;
    }
    
    public function isIngredientSup() {
        return $this->isIngredientSup;
    }

    public function setIngredientSup($isingredientsup) {
        $this->isIngredientSup= $isingredientsup;
    }

}
