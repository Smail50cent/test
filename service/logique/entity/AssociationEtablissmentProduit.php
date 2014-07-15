<?php

/**
 * Description of AssociationEtablissmentProduit
 *
 * @author Damien Chesneau <contact@damienchesneau.fr>
 */
class AssociationEtablissmentProduit {

    private $id;
    private $produit;
    private $etablissement;

    public function getId() {
        return $this->id;
    }

    public function getProduit() {
        return $this->produit;
    }

    public function getEtablissement() {
        return $this->etablissement;
    }

    public function setId($id) {
        $this->id = $id;
    }

    public function setProduit($produit) {
        $this->produit = $produit;
    }

    public function setEtablissement($etablissement) {
        $this->etablissement = $etablissement;
    }

}
