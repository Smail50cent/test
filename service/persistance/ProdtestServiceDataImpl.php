<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

include_once $path.'service/persistance/ProdtestServiceData.php';
include_once $path.'service/logique/entity/Prodtest.php';
include_once $path.'service/persistance/ConnexionBDD.php';

class ProdtestServiceDataImpl implements ProdtestServiceData {

    public function getAll() {
        $produits = array();
        $bdd = new ConnexionBDD();
        $return = $bdd->executeGeneric("SELECT * FROM produit");
        $i = 0;
        while ($ligne = $return->fetch()) {
            $produit = new Prodtest();
            $produit->setId(intval($ligne->ID));
            $produit->setNom($ligne->NOM);
            $produit->setCategorie_id(intval($ligne->CATEGORIE_ID));
            $produit->setSouscategorie(intval($ligne->sousCategorie));
            $produit->setOptions(intval($ligne->options));
            $produit->setLienAssociationProduitPrix(intval($ligne->lienAssociationProduitPrix));
            $produit->setProduitSimple(intval($ligne->produitsimple));
            $produit->setFamilleComptable($ligne->Famille_comptable);
            $produit->setTva(intval($ligne->TVA));
            $produits[$i] = $produit;
            $i++;
        }
        return $produits;
    }

    public function getById($id) {

        $bdd = new ConnexionBDD();
        $retour = $bdd->executeGeneric("SELECT * FROM produit WHERE id=" . $id);
        $ligne = $retour->fetch();
        $produit = new Prodtest();
        $produit->setId(intval($ligne->ID));
        $produit->setNom($ligne->NOM);
        $produit->setCategorie_id(intval($ligne->CATEGORIE_ID));
        $produit->setSouscategorie(intval($ligne->sousCategorie));
        $produit->setOptions(intval($ligne->options));
        $produit->setLienAssociationProduitPrix(intval($ligne->lienAssociationProduitPrix));
        $produit->setProduitSimple(intval($ligne->produitsimple));
        $produit->setFamilleComptable($ligne->Famille_comptable);
        $produit->setTva(intval($ligne->TVA));

        return $produit;
    }

    public function add($NOM,$CATEGORIE_ID,$sousCategorie,$options,$lienAssociationProduitPrix,$Produit_simple,$Famille_comptable,$TVA) {
        $bdd = new ConnexionBDD();
        $bdd->executeGeneric(" INSERT INTO produit(NOM,CATEGORIE_ID,sousCategorie,options,lienAssociationProduitPrix,produitsimple,Famille_comptable,TVA) VALUES('$NOM','$CATEGORIE_ID','$sousCategorie','$options','$lienAssociationProduitPrix','$Produit_simple','$Famille_comptable','$TVA') ");
    }

}
