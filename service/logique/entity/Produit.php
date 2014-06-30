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
    public $options; //array
    public $ingredients; // ARRAY
    public $associationPrixProduit;
    public $prix;
    public $tauxTva;
    public function setId($id) {
        $this->id = $id;
    }

    public function setNom($nom) {
        $this->nom = $nom;
    }

    public function setOptions($options) {
        $this->options = $options;
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

    public function setAssociationProduitPrix($aspp) {
        $this->associationPrixProduit = $aspp;
    }

    public function getAssociationProduitPrix() {
        return $this->associationPrixProduit;
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

    public function setTauxTva($tauxTva) {
        $this->tauxTva = $tauxTva;
    }


}
