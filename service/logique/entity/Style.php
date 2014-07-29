<?php

/**
 * Description of Style
 *
 * @author Damien Chesneau <contact@damienchesneau.fr>
 */
class Style {

    public $id;
    public $nom;
    public $url;
    public $actif;
    
    public function getActif() {
        return $this->actif;
    }

    public function setActif($actif) {
        $this->actif = $actif;
    }

        public function getId() {
        return $this->id;
    }

    public function getNom() {
        return $this->nom;
    }

    public function getUrl() {
        return $this->url;
    }

    public function setId($id) {
        $this->id = $id;
    }

    public function setNom($nom) {
        $this->nom = $nom;
    }

    public function setUrl($url) {
        $this->url = $url;
    }

}
