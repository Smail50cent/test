<?php

/**
 * Description of Etablissement
 *
 * @author Damien Chesneau <contact@damienchesneau.fr>
 */
class Etablissement {

    private $id;
    private $nom;
    private $logo;
    private $style;
    private $adresseEtab;
    private $telephone;
    private $message;
    private $groupe;

    public function getGroupe() {
        return $this->groupe;
    }

    public function setGroupe($groupe) {
        $this->groupe = $groupe;
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

    public function getAdresseEtab() {
        return $this->adresseEtab;
    }

    public function getTelephone() {
        return $this->telephone;
    }

    public function getMessage() {
        return $this->message;
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

    public function setAdresseEtab($adresseEtab) {
        $this->adresseEtab = $adresseEtab;
    }

    public function setTelephone($telephone) {
        $this->telephone = $telephone;
    }

    public function setMessage($message) {
        $this->message = $message;
    }

}
