<?php

/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

interface ProdtestServiceData {

    public function getById($id);
    public function getAll();
    public function add($NOM,$CATEGORIE_ID,$sousCategorie,$options,$lienAssociationProduitPrix,$Produit_simple,$Famille_comptable,$TVA);
    public function getProduitByCategorieId($id);
}