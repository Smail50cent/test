<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

class AssociationEtablissementZones {

    public $idZone;
    public $id;
    public $idEtablissement;

    public function getId() {
        return $this->id;
    }

    public function setId($id) {
        $this->id = $id;
    }

    public function getIdZone() {
        return $this->idZone;
    }

    public function getIdEtablissement() {
        return $this->idEtablissement;
    }

    public function setIdZone($idZone) {
        $this->idZone = $idZone;
    }

    public function setIdEtablissement($idEtablissement) {
        $this->idEtablissement = $idEtablissement;
    }

}
