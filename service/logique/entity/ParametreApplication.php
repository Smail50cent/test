<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

class ParametreApplication {

    public $id;
    public $nom_parametre;
    public $valeur_parametre;
    public $etablissement;

    public function getId() {
        return $this->id;
    }

    public function getNom_parametre() {
        return $this->nom_parametre;
    }

    public function getValeur_parametre() {
        return $this->valeur_parametre;
    }

    public function setId($id) {
        $this->id = $id;
    }

    public function setNom_parametre($nom_parametre) {
        $this->nom_parametre = $nom_parametre;
    }

    public function setValeur_parametre($valeur_parametre) {
        $this->valeur_parametre = $valeur_parametre;
    }

    public function getEtablissement() {
        return $this->etablissement;
    }

    public function setEtablissement($etablissement) {
        $this->etablissement = $etablissement;
    }

}
