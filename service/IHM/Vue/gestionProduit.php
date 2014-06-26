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
$column = "class=\"column_table_product_structure column_table_product_personalise\"";
echo "<table class=\"table_product_structure table_product_personalise\">>";
echo AllProd::columnHead();
for($i = 0; $i < sizeof($prodata); $i++) {
    echo "<tbody class=\"body_table_product_structure body_table_product_personalise\">";
    echo "<tr class=\"ligne_table_product_structure ligne_table_product_personalise\">";
    echo "<td ".$column.">";
    echo AllProd::fields($prodata[$i]->nom)."</td><td ".$column."> ".  AllProd::fields($prodata[$i]->categorie_id)."</td><td ".$column.">  ".  AllProd::fields($prodata[$i]->souscategorie)." </td><td ".$column."> ";
    echo AllProd::fields($prodata[$i]->options)."</td><td ".$column."> ".  AllProd::fields($prodata[$i]->lienAssociationProduitPrix)."</td><td ".$column."> ".  AllProd::fields($prodata[$i]->produitSimple)."</td><td ".$column."> ".  AllProd::fields($prodata[$i]->familleComptable)." </td><td ".$column."> ";
    echo AllProd::fields($prodata[$i]->tva,1);
    echo "</td>";
    echo "<td ".$column.">".AllProd::buttonGestionProduit()."</td>";
    echo "</tr>";
    echo "</tbody>";
}
echo "</table>";
?>
<?php include 'footer.php'; ?>
