<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

class AttributCompte {

    public $id;
    public $id_form;
    public $valeur_champ;
    public $id_compte;
    public $defaut;

    public function getId_form() {
        return $this->id_form;
    }

    public function setId_form($id_form) {
        $this->id_form = $id_form;
    }

    public function getId() {
        return $this->id;
    }

    public function getValeur_champ() {
        return $this->valeur_champ;
    }

    public function getId_compte() {
        return $this->id_compte;
    }

    public function getDefaut() {
        return $this->defaut;
    }

    public function setId($id) {
        $this->id = $id;
    }

    public function setValeur_champ($valeur_champ) {
        $this->valeur_champ = $valeur_champ;
    }

    public function setId_compte($id_compte) {
        $this->id_compte = $id_compte;
    }

    public function setDefaut($defaut) {
        $this->defaut = $defaut;
    }

}
