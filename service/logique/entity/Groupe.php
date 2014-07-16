<?php

/**
 * Description of Groupe
 *
 * @author Damien Chesneau <contact@damienchesneau.fr>
 */
class Groupe {

    public $id;
    public $nom;
    public $logo;
    public $style;
    public $adresseSiege;
    public $slogan;
    public $message;
    public $telephone;
    public $etablissements;

    public function getEtablissements() {
        return $this->etablissements;
    }

    public function setEtablissements($etablissements) {
        $this->etablissements = $etablissements;
    }

    public function getId() {
        return $this->id;
    }

    public function getNom() {
        return $this->nom;
    }

    public function getLogo() {
        return $this->logo;
    }

    public function getStyle() {
        return $this->style;
    }

    public function getAdresseSiege() {
        return $this->adresseSiege;
    }

    public function getSlogan() {
        return $this->slogan;
    }

    public function getMessage() {
        return $this->message;
    }

    public function getTelephone() {
        return $this->telephone;
    }

    public function setId($id) {
        $this->id = $id;
    }

    public function setNom($nom) {
        $this->nom = $nom;
    }

    public function setLogo($logo) {
        $this->logo = $logo;
    }

    public function setStyle($style) {
        $this->style = $style;
    }

    public function setAdresseSiege($adresseSiege) {
        $this->adresseSiege = $adresseSiege;
    }

    public function setSlogan($slogan) {
        $this->slogan = $slogan;
    }

    public function setMessage($message) {
        $this->message = $message;
    }

    public function setTelephone($telephone) {
        $this->telephone = $telephone;
    }

}
