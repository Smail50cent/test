<?php
/**
 * Description of OptionPossibilite
 *
 * @author Damien Chesneau <contact@damienchesneau.fr>
 */
class OptionPossibilite {

    public $id;
    public $nom;

    public function getId() {
        return $this->id;
    }

    public function setId($id) {
        $this->id = $id;
    }
    
    public function getNom() {
        return $this->nom;
    }

    public function setNom($nom) {
        $this->nom = $nom;
    }

}
