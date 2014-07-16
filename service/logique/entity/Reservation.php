<?php

/**
 * Description of Reservation
 *
 * @author Damien Chesneau <contact@damienchesneau.fr>
 */
class Reservation {

    public $id;
    public $compte;
    public $dateHeure;

    public function getId() {
        return $this->id;
    }

    public function setId($id) {
        $this->id = $id;
    }

    public function getCompte() {
        return $this->compte;
    }

    public function setCompte($compte) {
        $this->compte = $compte;
    }

    public function getDateHeure() {
        return $this->dateHeure;
    }

    public function setDateHeure($dateHeure) {
        $this->dateHeure = $dateHeure;
    }

}
