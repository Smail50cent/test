<?php

/**
 * Description of Ingredient
 *
 * @author Damien Chesneau <contact@damienchesneau.fr>
 */
class Ingredient {

    public $id;
    public $nom;

    public function getId() {
        return $this->id;
    }

    public function getNom() {
        return $this->nom;
    }

    public function setId($id) {
        $this->id = $id;
    }

    public function setNom($nom) {
        $this->nom = $nom;
    }

}
