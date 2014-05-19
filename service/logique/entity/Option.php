<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of Option
 *
 * @author Damien Chesneau <contact@damienchesneau.fr>
 */
class Option {

    public $id;
    public $nom;
    public $label;
    public $possibilites;

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

    public function setLabel($label) {
        $this->label = $label;
    }

    public function getLabel() {
        return $this->label;
    }

    public function setPossibilite($possiblilite) {
        $this->possibilites = $possiblilite;
    }

    public function getPossibilite() {
        return $this->possibilites;
    }

}
