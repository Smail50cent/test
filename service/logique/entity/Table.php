<?php
/**
 * Description of Table
 *
 * @author Damien Chesneau <contact@damienchesneau.fr>
 */
class Table {

    public $id;
    public $numero;

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

}
