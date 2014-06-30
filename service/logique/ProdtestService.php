<?php

/*
 * 
 */

interface ProdtestService {

    public function getById($id);
    public function getAll();
    public function add($NOM,$CATEGORIE_ID,$sousCategorie,$options,$lienAssociationProduitPrix,$Produit_simple,$Famille_comptable,$TVA);
}
