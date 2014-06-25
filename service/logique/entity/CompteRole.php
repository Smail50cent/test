<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of CompteRole
 *
 * @author Damien Chesneau <contact@damienchesneau.fr>
 */
class CompteRole {

    public $id;
    public $libelle;
    public $level;

    public function __construct() {
        
    }
    public function setId($id) {
        $this->id = $id;
    }

    public function getId() {
        return $this->id;
    }

    public function setLibelle($libelle) {
        $this->libelle = $libelle;
    }

    public function getLibelle() {
        return $this->libelle;
    }

    public function setLevel($level) {
        $this->level = $level;
    }

    public function getLevel() {
        return $this->level;
    }

}
