<?php

/**
 * Description of QuantityOfProduct
 *
 * @author Damien Chesneau <contact@damienchesneau.fr>
 */
class QuantityOfProduct {

    public $id;
    public $product;
    public $personne;
    public $quantity;

    public function getId() {
        return $this->id;
    }

    public function setId($id) {
        $this->id = $id;
    }

    public function getPersonne() {
        return $this->personne;
    }

    public function setPersonne($personne) {
        $this->personne = $personne;
    }

    public function getProduct() {
        return $this->product;
    }

    public function setProduct($product) {
        $this->product = $product;
    }

    public function getQuantity() {
        return $this->quantity;
    }

    public function setQuantity($quantity) {
        $this->quantity = $quantity;
    }

}
