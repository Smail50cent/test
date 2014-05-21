<?php

/**
 * Description of Ticket
 *
 * @author Damien Chesneau <contact@damienchesneau.fr>
 */
class Ticket {

    public $id;
    public $quantityOfProduct;
    public $total;
    public $table;
    public $typeCommande;

    public function getId() {
        return $this->id;
    }

    public function getQuantityOfProduct() {
        return $this->quantityOfProduct;
    }

    public function setId($id) {
        $this->id = $id;
    }

    public function setQuantityOfProduct($quantityOfProduct) {
        $this->quantityOfProduct = $quantityOfProduct;
    }

    public function getTotal() {
        return $this->total;
    }

    public function setTotal($total) {
        $this->total = $total;
    }

    public function getTable() {
        return $this->table;
    }

    public function setTable($table) {
        $this->table = $table;
    }

    public function getTypeCommande() {
        return $this->typeCommande;
    }

    public function setTypeCommande($typeCommande) {
        $this->typeCommande = $typeCommande;
    }

}
