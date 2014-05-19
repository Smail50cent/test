<?php

/**
 * Description of Categorie
 *
 * @author Damien Chesneau <contact@damienchesneau.fr>
 */
class Categorie {

    public $id;
    public $nom;
    public $priorite;
    public $souscategorie;

    public function setId($id) {
        $this->id = $id;
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

    public function setPriorite($priorite) {
        $this->priorite = $priorite;
    }

    public function getPriorite() {
        return $this->priorite;
    }

    public function setSousCategories($souscategories) {
        $this->souscategorie = $souscategories;
    }

    public function getSousCategories() {
        return $this->souscategorie;
    }

}
