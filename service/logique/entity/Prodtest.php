<?php

/**
 * Description of Prodtest
 *
 * @author 
 */
class Prodtest {

    public $id;
    public $nom;
    public $categorie_id;
    public $souscategorie;
    public $options; //array
    public $lienAssociationProduitPrix; // ARRAY
    public $produitSimple;
    public $familleComptable;
    public $tva;
    
    public function getId() {
        return $this->id;
    }

    public function getNom() {
        return $this->nom;
    }

    public function getCategorie_id() {
        return $this->categorie_id;
    }

    public function getSouscategorie() {
        return $this->souscategorie;
    }

    public function getOptions() {
        return $this->options;
    }

    public function getLienAssociationProduitPrix() {
        return $this->lienAssociationProduitPrix;
    }

    public function getProduitSimple() {
        return $this->produitSimple;
    }

    public function getFamilleComptable() {
        return $this->familleComptable;
    }

    public function getTva() {
        return $this->tva;
    }

    public function setId($id) {
        $this->id = $id;
    }

    public function setNom($nom) {
        $this->nom = $nom;
    }

    public function setCategorie_id($categorie_id) {
        $this->categorie_id = $categorie_id;
    }

    public function setSouscategorie($souscategorie) {
        $this->souscategorie = $souscategorie;
    }

    public function setOptions($options) {
        $this->options = $options;
    }

    public function setLienAssociationProduitPrix($lienAssociationProduitPrix) {
        $this->lienAssociationProduitPrix = $lienAssociationProduitPrix;
    }

    public function setProduitSimple($produitSimple) {
        $this->produitSimple = $produitSimple;
    }

    public function setFamilleComptable($familleComptable) {
        $this->familleComptable = $familleComptable;
    }

    public function setTva($tva) {
        $this->tva = $tva;
    }


}
