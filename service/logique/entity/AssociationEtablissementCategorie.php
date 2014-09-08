<?php

/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

class AssociationEtablissementCategorie {
    
    public $etablissement_id;
    public $zone_id;
    public $categorie_id;
    public $priorite;
    
    public function getEtablissement_id() {
        return $this->etablissement_id;
    }

    public function getZone_id() {
        return $this->zone_id;
    }

    public function getCategorie_id() {
        return $this->categorie_id;
    }

    public function getPriorite() {
        return $this->priorite;
    }

    public function setEtablissement_id($etablissement_id) {
        $this->etablissement_id = $etablissement_id;
    }

    public function setZone_id($zone_id) {
        $this->zone_id = $zone_id;
    }

    public function setCategorie_id($categorie_id) {
        $this->categorie_id = $categorie_id;
    }

    public function setPriorite($priorite) {
        $this->priorite = $priorite;
    }

}