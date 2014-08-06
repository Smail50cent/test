<?php

/**
 * Description of CategorieService
 *
 * @author Damien Chesneau <contact@damienchesneau.fr>
 */
interface ProduitService {

    public function getById($id);

    public function getAll();

    public function getProduitByCategorieId($id);

    public function addData();

    public function getProduitByLevel($level);

    public function DeleteProduit($id);

    public function getByCategorieAndEtablissentAndZone($idcategorie, $idetablissement, $idzone);
    /**
     * 
     * @param Produit $produit
     */
    public function add(Produit $produit);
    
    public function update(Produit $produit);
}
