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
    public $dateDebut;
    public $heureDebut;
    public $minutesDebut;
    public $dateFin;
    public $heureFin;
    public $minutesFin;
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

    public function getDateDebut() {
        return $this->dateDebut;
    }

    public function setDateDebut($dateDebut) {
        $this->dateDebut = $dateDebut;
    }

    public function getDateFin() {
        return $this->dateFin;
    }

    public function setDateFin($dateFin) {
        $this->dateFin = $dateFin;
    }
    
    public function getMinutesDebut() {
        return $this->minutesDebut;
    }

    public function setMinutesDebut($minutesDebut) {
        $this->minutesDebut = $minutesDebut;
    }

    public function getMinutesFin() {
        return $this->minutesFin;
    }

    public function setMinutesFin($minutesFin) {
        $this->minutesFin = $minutesFin;
    }

}
