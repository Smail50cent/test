<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of AssociationProduitPrix
 *
 * @author Damien Chesneau <contact@damienchesneau.fr>
 */
class AssociationProduitPrix {

    public $id;
    public $heureDebut;
    public $heureFin;
    public $prixHt;
    public $zoneTable;

    public function getZoneTable() {
        return $this->zoneTable;
    }

    public function setZoneTable($zoneTable) {
        $this->zoneTable = $zoneTable;
    }

    public function getId() {
        return $this->id;
    }

    public function setId($id) {
        $this->id = $id;
    }

    public function getHeureDebut() {
        return $this->heureDebut;
    }

    public function setHeureDebut($heureDebut) {
        $this->heureDebut = $heureDebut;
    }

    public function getHeureFin() {
        return $this->heureDebut;
    }

    public function setHeureFin($heureFin) {
        $this->heureFin = $heureFin;
    }

    public function getPrixHt() {
        return $this->prixHt;
    }

    public function setPrixHt($prixHT) {
        $this->prixHt = $prixHT;
    }

}
