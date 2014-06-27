<?php

/**
 * Description of CompteRole
 *
 * @author Damien Chesneau <contact@damienchesneau.fr>
 */
class ProduitSuggerer {

    public $id;
    public $produit;

    public function __construct() {
        
    }

    public function setId($id) {
        $this->id = $id;
    }

    public function getId() {
        return $this->id;
    }

    public function setProduit($produit) {
        $this->produit = $produit;
    }

    public function getProduit() {
        return $this->produit;
    }

}
