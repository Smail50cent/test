<?php

/**
 * Description of AssociationProduitPrixService
 *
 * @author Damien Chesneau <contact@damienchesneau.fr>
 */
interface AssociationProduitPrixServiceData {
    public function getByProduit($produit);
    public function getByMenu($menu);
}
