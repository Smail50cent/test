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

    public function setId($id) {
        $this->id = $id;
    }

    public function setNom($nom) {
        $this->nom = $nom;
    }

    public function setOptions($optons) {
        $this->options = $optons;
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

}
