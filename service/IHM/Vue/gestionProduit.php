<?php include 'header.php'; ?>
<?php

include '../Modele/getAllProdtest.php';
/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
$produits = new AllProd();
$prodata = $produits->getAllProducts();
$categdata = $produits->getAllCategorie();

$column = "class=\"column_table_product_structure column_table_product_personalise\"";
//$test = array();
echo "<table class=\"table_product_structure table_product_personalise\">";
echo AllProd::columnHead();
echo "<tbody id=\"body_table_product_id\" class=\"body_table_product_structure body_table_product_personalise\">";
if (sizeof($prodata) > 0) {
    for ($i = 0; $i < sizeof($prodata); $i++) {

        echo "<tr id=\"ligne_table_product_" . $i . "\" class=\"ligne_table_product_structure ligne_table_product_personalise\">";
        echo AllProd::columnProduct($prodata[$i]->nom, "nom");
        echo AllProd::columnProduct($categdata[$prodata[$i]->categorie_id], "categorie_id");
        echo AllProd::columnProduct($prodata[$i]->souscategorie, "souscategorie");
        echo AllProd::columnProduct($prodata[$i]->options, "options");
        echo AllProd::columnProduct($prodata[$i]->lienAssociationProduitPrix, "lienAssociationProduitPrix");
        echo AllProd::columnProduct($prodata[$i]->produitSimple, "produitSimple");
        echo AllProd::columnProduct($prodata[$i]->familleComptable, "familleComptable");
        echo AllProd::columnProduct($prodata[$i]->tva, "tva");
        echo "<td " . $column . ">" . AllProd::buttonGestionProduit("product_add".$i) . "</td>";

        echo "</tr>";
    }
}else {
    echo "<tr>";
    echo "<td>";
    echo "THERE IS NO DATA TO DISPLAY !";
    echo "</td>";
    echo "</tr>";
}
echo "</tbody>";
echo "</table>";
?>
<?php include 'footer.php'; ?>
