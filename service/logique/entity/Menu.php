<?php

/**
 * Description of Menu
 *
 * @author Damien Chesneau <contact@damienchesneau.fr>
 */
class Menu {

    public $id;
    public $nom;
    public $produits = array(); //ARRAY
    public $prix = array();
    public $tauxDeTva;
    public $etablissements = array();
    public $zones = array();

    public function getZones() {
        return $this->zones;
    }

    public function setZones($zones) {
        $this->zones = $zones;
    }

    public function addZone($zone) {
        array_push($this->zones, $zone);
    }

    public function getEtablissements() {
        return $this->etablissements;
    }

    public function setEtablissements($etablissements) {
        $this->etablissements = $etablissements;
    }

    public function addEtablissements($etablissements) {
        array_push($this->etablissements, $etablissements);
    }

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

    public function addProduit($produit) {
        array_push($this->produits, $produit);
    }

    public function setPrix($prix) {
        $this->prix = $prix;
    }

    public function addPrix($prix) {
        array_push($this->prix, $prix);
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
