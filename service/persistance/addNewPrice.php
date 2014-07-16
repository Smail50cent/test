<?php
include_once '../outils/AppRoot.php';
include_once $path . 'service/persistance/ConnexionBDD.php';

$bdd = new ConnexionBDD();
$lignes = $bdd->executeGeneric("SELECT * FROM `sous` WHERE `ID` > 8");
while ($ligne = $lignes->fetch()) {
    $bdd = new ConnexionBDD();                              
    $bdd->executeGeneric("INSERT INTO `association_etablissement_produit`(`id_produit`, `id_etablissement`) VALUES (" . $ligne->ID . ",2)");
}

