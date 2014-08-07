<?php

/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

class AssociationEtablissementZones {
    
    public $idZone;
    public $idProduit;
    public $idEtablissement;
    
    public function getIdZone() {
        return $this->idZone;
    }

    public function getIdProduit() {
        return $this->idProduit;
    }

    public function getIdEtablissement() {
        return $this->idEtablissement;
    }

    public function setIdZone($idZone) {
        $this->idZone = $idZone;
    }

    public function setIdProduit($idProduit) {
        $this->idProduit = $idProduit;
    }

    public function setIdEtablissement($idEtablissement) {
        $this->idEtablissement = $idEtablissement;
    }


}
