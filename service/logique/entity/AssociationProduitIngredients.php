<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

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

    public function __construct($produit, $ingredient, $isAdded, $surcout, $supprimable) {
        $this->produit = $produit;
        $this->ingredient = $ingredient;
        $this->surcout = $surcout;
        $this->supprimable = $supprimable;
        $this->isAdded = $isAdded;
    }

}
