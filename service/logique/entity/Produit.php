<?php

/**
 * Description of Produit
 *
 * @author Damien Chesneau <contact@damienchesneau.fr>
 */
class Produit {

    public $id;
    public $nom;
    public $categorie;
    public $souscategorie;
    public $options = array(); //array
    public $ingredients = array(); // ARRAY
    public $associationPrixProduit = array();
    public $prix;
    public $tauxTva;
    public $level;
    public $etablissements = array();
    public $zones = array();
    public $assocEtabZone = array();
    
    public function getAssocEtabZone() {
        return $this->assocEtabZone;
    }

    public function setAssocEtabZone($assocEtabZone) {
        $this->assocEtabZone = $assocEtabZone;
    }

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
        $this->id = $id;
    }

    public function setNom($nom) {
        $this->nom = $nom;
    }

    public function setOptions($options) {
        $this->options = $options;
    }

    public function addOption($options) {
        array_push($this->options, $options);
    }

    public function getOptions() {
        return $this->options;
    }

    public function getNom() {
        return $this->nom;
    }

    public function getId() {
        return $this->id;
    }

    public function setIngredients($ingredients) {
        $this->ingredients = $ingredients;
    }

    public function addIngredients($ingredient) {
        array_push($this->ingredients, $ingredient);
    }

    public function getSousCategorie() {
        return $this->souscategorie;
    }

    public function setSousCategorie($id_sousCategorie) {
        $this->souscategorie = $id_sousCategorie;
    }

    public function getIngredients() {
        return $this->ingredients;
    }

    public function setCategorie($categorie) {
        $this->categorie = $categorie;
    }

    public function getCategorie() {
        return $this->categorie;
    }

    public function setPrix($prix) {
        $this->prix = $prix;
    }

    public function getPrix() {
        return $this->prix;
    }

    public function getAssociationPrixProduit() {
        return $this->associationPrixProduit;
    }

    public function getTauxTva() {
        return $this->tauxTva;
    }

    public function setAssociationPrixProduit($associationPrixProduit) {
        $this->associationPrixProduit = $associationPrixProduit;
    }

    public function addAssociationPrixProduit($associationPrixProduit) {
        array_push($this->associationPrixProduit, $associationPrixProduit);
    }

    public function setTauxTva($tauxTva) {
        $this->tauxTva = $tauxTva;
    }

    public function getLevel() {
        return $this->level;
    }

    public function setLevel($level) {
        $this->level = $level;
    }

}
