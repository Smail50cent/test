<?php

/**
 * Description of CompteRole
 *
 * @author Damien Chesneau <contact@damienchesneau.fr>
 */
class CompteProduitFavori {

    public $id;
    public $personneId;
    public $produit;

    public function __construct() {
        
    }

    public function setId($id) {
        $this->id = $id;
    }

    public function getId() {
        return $this->id;
    }

    public function setPersonneId($id) {
        $this->personneId = $id;
    }

    public function getPersonneId() {
        return $this->personneId;
    }

    public function setProduit($produit) {
        $this->produit = $produit;
    }

    public function getProduit() {
        return $this->produit;
    }

}
