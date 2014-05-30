<?php
/**
 * Description of ProduitPriorite
 *
 * @author Damien Chesneau <contact@damienchesneau.fr>
 */
class ProduitPriorite {

    private $produitId;
    private $priorite;

    public function getProduitId() {
        return $this->produitId;
    }

    public function setProduitId($id) {
        $this->produitId = $id;
    }

    public function getPriorite() {
        return $this->produitId;
    }

    public function setPriorite($priorite) {
        $this->produitId = $priorite;
    }

}
