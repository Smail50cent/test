<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of SousCategorie
 *
 * @author Damien Chesneau <contact@damienchesneau.fr>
 */
class SousCategorie {

    public $id;
    public $categorie;
    public $priorite;
    public $nom;

    public function setId($id) {
        $this->id = $id;
    }

    public function getId() {
        return $this->id;
    }

    public function setCategorie($categorie) {
        $this->categorie = $categorie;
    }

    public function getCategorie() {
        return $this->categorie;
    }

    public function setPriorite($priorite) {
        $this->priorite = $priorite;
    }

    public function getPriorite() {
        return $this->priorite;
    }

    public function setNom($nom) {
        $this->nom = $nom;
    }

    public function getNom() {
        return $this->nom;
    }
  
}
