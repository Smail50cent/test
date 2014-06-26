<?php include 'header.php'; ?>
<?php

include '../Modele/getAllProdtest.php';
/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
$produits = new AllProd();
$prodata = $produits->getAll();

echo "<table>";
echo AllProd::columnHead();
for($i = 0; $i < sizeof($prodata); $i++) {
    echo "<tbody>";
    echo "<tr>";
    echo "<td>";
    echo AllProd::fields($prodata[$i]->nom)."</td><td> ".  AllProd::fields($prodata[$i]->categorie_id)."</td><td> ".  AllProd::fields($prodata[$i]->souscategorie)." </td><td>";
    echo AllProd::fields($prodata[$i]->options)."</td><td> ".  AllProd::fields($prodata[$i]->lienAssociationProduitPrix)."</td><td> ".  AllProd::fields($prodata[$i]->produitSimple)."</td><td> ".  AllProd::fields($prodata[$i]->familleComptable)." </td><td>";
    echo AllProd::fields($prodata[$i]->tva,1);
    echo "</td>";
    echo "<td class=bt_column>".AllProd::buttonGestionProduit()."</td>";
    echo "</tr>";
    echo "</tbody>";
}
echo "</table>";
?>
<?php include 'footer.php'; ?>
