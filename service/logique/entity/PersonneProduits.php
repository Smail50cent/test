<?php

/**
 * Description of PersonnePriority
 *
 * @author Damien Chesneau <contact@damienchesneau.fr>
 */
class PersonneProduits {

    private $personneId;
    private $produits;

    public function getPersonneId() {
        return $this->personneId;
    }

    public function setPersonneId($id) {
        $this->personneId = $id;
    }

    public function getProduits() {
        return $this->produits;
    }

    public function setProduits($produits) {
        $this->produits = $produits;
    }

}
