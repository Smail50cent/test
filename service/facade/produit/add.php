<?php

include_once '../../outils/AppRoot.php';
include_once $path . 'service/logique/LogiqueFactory.php';
include_once $path . 'service/logique/entity/Categorie.php';
include_once $path . 'service/logique/entity/SousCategorie.php';
include_once $path . 'service/logique/entity/Produit.php';
include_once $path . 'service/logique/entity/AssociationProduitPrix.php';
/**
 * TO PHP OBJ !
 */
if (isset($_POST['produit'])) {
    include_once '../../outils/AppRoot.php';
    include_once $path . 'service/logique/LogiqueFactory.php';
    $produit = json_decode($_POST["produit"]);
    $prodPhp = new Produit();

    $listAssoc = array();
    for ($i = 0; $i < count($produit->associationPrixProduit); $i++) {
        $assoPrixProduit = new AssociationProduitPrix();
        $assoPrixProduit->setPrixHt($produit->associationPrixProduit[$i]->prixHt->prix);
        array_push($listAssoc, $assoPrixProduit);
    }
    $prodPhp->setAssociationPrixProduit($listAssoc);
    $categorie = new Categorie();
    $categorie->setId($produit->id_categorie->id);
    $prodPhp->setCategorie($categorie);

    $listIngred = array();
    if (count($produit->ids_ingredients) == 0) {
        $prodPhp->setIngredients(null);
    } else {
        for ($i = 0; $i < count($produit->ids_ingredients); $i++) {
            $ingredient = new Ingredient();
            $ingredient->setId($produit->ids_ingredients[$i]->id);
            array_push($listIngred, $ingredient);
        }
        $prodPhp->setIngredients($listIngred);
    }

    $prodPhp->setNom($produit->nom);

    $listOpt = array();
    if (count($produit->options) == 0) {
        $prodPhp->setOptions(null);
    } else {
        for ($i = 0; $i < count($produit->options); $i++) {
            $option = new Option();
            $option->setId($produit->options[$i]->id);
            array_push($listOpt, $option);
        }
        $prodPhp->setOptions($listOpt);
    }

    $souscategorie = new SousCategorie();
    $souscategorie->setId($produit->id_sousCategorie->id);
    $prodPhp->setSousCategorie($souscategorie);
    $prodPhp->setTauxTva($produit->tauxTva);

    $listeEtabZone = array();
    for ($i = 0; $i < count($produit->etablissements); $i++) {
        $etablissement = new Etablissement();
        $etablissement->setId($produit->etablissements[$i]->id);
        if (strlen($produit->etablissements[$i]->zones) == 0) {
            $etablissement->setZones("null");
        } else {
            $etablissement->setZones($produit->etablissements[$i]->zones);
        }
        array_push($listeEtabZone, $etablissement);
    }
    $prodPhp->setEtablissements($listeEtabZone);
    $produitSrv = LogiqueFactory::getProduitService();
    echo $produitSrv->add($prodPhp);
}

