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

}
