<?php

/**
 * Description of CategorieService
 *
 * @author Damien Chesneau <contact@damienchesneau.fr>
 */
interface ProduitServiceData {

    public function getAll();

    public function getById($id);

    public function getProduitByCategorieId($id);

    public function addData();

    public function getProduitByLevel($level);

    public function DeleteProduit($id);
    
    public function getByCategorieAndEtablissentAndZone($idcategorie,$idetablissement,$idzone);
}
