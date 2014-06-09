<?php

/**
 * Description of Table
 *
 * @author Damien Chesneau <contact@damienchesneau.fr>
 */
class Table {

    public $id;
    public $numero;
    public $zone;

    public function getId() {
        return $this->id;
    }

    public function setId($id) {
        $this->id = $id;
    }

    public function getNumero() {
        return $this->numero;
    }

    public function setNumero($numero) {
        $this->numero = $numero;
    }

    public function getZone() {
        return $this->zone;
    }

    public function setZone($zone) {
        $this->zone = $zone;
    }

}
