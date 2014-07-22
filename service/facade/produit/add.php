<?php

include_once '../../outils/AppRoot.php';
include_once $path . 'service/logique/LogiqueFactory.php';
include_once $path . 'service/logique/entity/Categorie.php';
include_once $path . 'service/logique/entity/SousCategorie.php';
include_once $path . 'service/logique/entity/Produit.php';
include_once $path . 'service/logique/entity/AssociationProduitPrix.php';
$produitSrv = LogiqueFactory::getProduitService();
$produit = new Produit();
$produit->setNom("test1");
$cat = new Categorie();
$cat->setId(1);
$produit->setCategorie($cat);
$souscat= new SousCategorie();
$souscat->setId(1);
$produit->setSousCategorie($souscat);
$produit->setTauxTva("19.6");
$asso = new AssociationProduitPrix();
$asso->setDateDebut(null);
$asso->setDateFin(null);
$asso->setPrixHt(20);
$asso->setZoneTable(null);
$assoPrixProd = array($asso);
$produit->setAssociationPrixProduit($assoPrixProd);
$produitSrv->add($produit);
