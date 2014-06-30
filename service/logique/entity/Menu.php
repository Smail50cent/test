<?php

/**
 * Description of Menu
 *
 * @author Damien Chesneau <contact@damienchesneau.fr>
 */
class Menu {

    public $id;
    public $nom;
    public $produits; //ARRAY
    public $prix;
    public $tauxDeTva;

    public function setId($id) {
        $this->id = intval($id);
    }

    public function getId() {
        return $this->id;
    }

    public function setNom($nom) {
        $this->nom = $nom;
    }

    public function getNom() {
        return $this->nom;
    }

    public function setProduits($produits) {
        $this->produits = $produits;
    }

    public function setPrix($prix) {
        $this->prix = $prix;
    }

    public function getPrix() {
        return $this->prix;
    }

    public function getProduits() {
        return $this->produits;
    }

    public function setTauxDeTva($taux) {
        $this->tauxDeTva = floatval($taux);
    }

    public function getTauxDeTva() {
        return $this->tauxDeTva;
    }

}
