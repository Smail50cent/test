<?php

/**
 * Description of Categorie
 *
 * @author Damien Chesneau <contact@damienchesneau.fr>
 */
class ModeDeReglement {

    public $id;
    public $nom;
    public $url;
    public $redirictUrl;
    public function setId($id) {
        $this->id = $id;
    }

    public function getId() {
        return $this->id;
    }

    public function setNom($nom) {
        $this->nom = $nom;
    }

    public function getNom() {
        return $this->nom;
    }

    public function setUrl($url) {
        $this->url = $url;
    }

    public function getUrl() {
        return $this->url;
    }
    public function setRedirictUrl($redirictUrl) {
        $this->redirictUrl = $redirictUrl;
    }

    public function getRedirictUrl() {
        return $this->redirictUrl;
    }
}
