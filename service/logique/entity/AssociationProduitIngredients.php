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

}
