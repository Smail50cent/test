<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of ReservationDateDisponible
 *
 * @author Damien Chesneau <contact@damienchesneau.fr>
 */
class ReservationDateDisponible {

    public $id;
    public $date;
    public $heureDebut;
    public $heureFin;

    public function getId() {
        return $this->id;
    }

    public function setId($id) {
        $this->id = $id;
    }

    public function getDate() {
        return $this->date;
    }

    public function setDate($date) {
        $this->date = $date;
    }

    public function getHeureDebut() {
        return $this->heureDebut;
    }

    public function setHeureDebut($heureDebut) {
        $this->heureDebut = $heureDebut;
    }

    public function getHeureFin() {
        return $this->heureFin;
    }

    public function setHeureFin($heureFin) {
        $this->heureFin = $heureFin;
    }

}
