<?php

include_once 'ConnexionBDD.php';

$bdd = new ConnexionBDD();
$lignes = $bdd->executeGeneric("SELECT `ID`,`PRIX` FROM `produit`");
echo "total=" . $lignes->rowCount();
$i = 0;
while ($ligne = $lignes->fetch()) {
    $lastID = $bdd->executeGeneric("INSERT INTO `prixHt`(`prix`) VALUES (" . $ligne->PRIX . ")");
    $lastID2 = $bdd->executeGeneric("INSERT INTO `association_produit_prix`(`produit_id`, `prixht_id`) VALUES (" . $ligne->PRIX . "," . $lastID . " ) ");
    $i++;
}
echo " i=" . $i;
