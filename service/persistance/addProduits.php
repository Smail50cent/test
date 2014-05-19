<?php
include_once '../logique/entity/Produit.php';
include_once '../logique/entity/AssociationProduitIngredients.php';
include_once 'ConnexionBDD.php';
$produits = array();
$produit40 = new Produit();
$produit40->setId(40);
$produit40->setPrix(3);
$produit40->setCategorie(2);
$bdd = new ConnexionBDD();
$e = array();
//produit,ingredient,inStart,surcout,supprimable
//$e . push(new AssociationProduitIngredients(40, 80, true, 0, true));
//$e . push(new AssociationProduitIngredients(40, 81, true, 0, false));
//$e . push(new AssociationProduitIngredients(40, 82, false, 0.2, true));
//$e . push(new AssociationProduitIngredients(40, 83, false, 0.2, true));
$bdd->executeGeneric("INSERT INTO `association_produit_ingredient`(`id_produit`, `id_ingredient`, `isAdded`, `surcout`, `supprimable`) VALUES (40,80," . true . "," . (0) . "," . true.")");$bdd = new ConnexionBDD();
$bdd->executeGeneric("INSERT INTO `association_produit_ingredient`(`id_produit`, `id_ingredient`, `isAdded`, `surcout`, `supprimable`) VALUES (40,81," . true . "," . (0) . "," . true.")");$bdd = new ConnexionBDD();
$bdd->executeGeneric("INSERT INTO `association_produit_ingredient`(`id_produit`, `id_ingredient`, `isAdded`, `surcout`, `supprimable`) VALUES (40,82," . false . "," . (0) . "," . true.")");$bdd = new ConnexionBDD();
$bdd->executeGeneric("INSERT INTO `association_produit_ingredient`(`id_produit`, `id_ingredient`, `isAdded`, `surcout`, `supprimable`) VALUES (40,83," . false . "," . (0) . "," . true.")");
/*$produit40->setIdsIngredients($e);
$produit40->setSousCategorie(10);
$produit40->setDemanderCuisson(true);
$produit40->setNom("Steack");
$bdd = new ConnexionBDD();
$bdd->executeGeneric("INSERT INTO `produit`(`ID`, `NOM`, `PRIX`, `CATEGORIE_ID`,`sousCategorie`) VALUES (40,Steack,3,2,10)");
//0 ID 1 NOM 2 CATEGORIE 3 SOUS CATEGORIE 4 PRIX 5 INGREDIENTS
$produitArray = array(
    array(2, "Italia", 2, 4, 13.6, array(5, 2, 6, 7, 8, 9, 10, 11, 4)),
    array(3, "Carpaccio de boeuf all'italiana", 1, "undefined", 5.2, array(12, 13)),
    array(4, "Panna cotta", 3, "undefined", 4.9, array(14, 15)),
    array(5, "Ricard 2 cl", 4, "undefined", 4.1, array()),
    array(6, "Chèvre et miel", 2, 4, 13.9, array(2, 16, 17, 18, 9, 4)),
    array(7, "Regina", 2, 4, 16.5, array(19, 20, 2, 1, 8, 4)),
    array(8, "4 Formaggi", 2, 4, 15.6, array(21, 22, 2, 23, 1, 4, 7)),
    array(9, "Crème brûlée", 3, "undefined", 4.7, array()),
    array(10, "Baba au rhum", 3, "undefined", 4, array(24, 25)),
    array(11, "Heineken Pression", 4, 8, 3.2, array()),
    array(12, "Affligem", 4, 8, 3.2, array()),
    array(13, "Martini Prosecco", 4, 9, 3, array()),
    array(14, "Salade roquette et copeaux de fromage italien", 1, 1, 6.3, array(10, 9, 7)),
    array(1, "Margarita", 2, 4, 15.4, array(1, 2, 3, 4)),
    array(15, "Terra e Mare (NUOVO)", 2, 4, 15.2, array(26, 2, 27, 28, 29, 4)),
    array(16, "Prosciutto", 2, 4, 14.2, array(17, 30, 31, 2, 1, 9, 4)),
    array(17, "Frutti di Mare (NUOVO)", 2, 4, 12.2, array(32, 1, 2, 33, 34, 35, 4)),
    array(18, "Con Carne", 2, 4, 12.2, array(1, 2, 36, 37, 4)), //
    array(19, "Speciale Pizzaiolo", 2, 4, 13.4, array(19, 31, 38, 11, 2, 1, 4)),
    array(20, "Del Arte", 2, 4, 15.2, array(1, 2, 39, 9, 10, 4)),
    array(21, "Marocco", 2, 4, 15.82, array(40, 41, 42, 31, 2, 4)),
    array(22, "Salmone", 2, 4, 11.90, array(42, 43, 44, 2, 4)),
    array(23, "Carbonara", 2, 4, 9.8, array(45, 29, 2, 31, 10, 4)),
    array(23, "Catania", 2, 4, 9.8, array(46, 34, 2, 1, 37, 8, 4)),
    array(24, "Chèvre chaud à l’italienne", 1, 2, 6.4, array(47, 48, 49, 10)),
    array(25, "Tomates Mozzarella di Bufala", 1, 2, 6.8, array(50, 7, 9, 51)),
    array(26, "Piccolina Marina (NUOVO)", 1, 2, 5.8, array(49, 52, 53, 43, 35)),
    array(37, "Piccolina Caesar", 1, 2, 5.8, array(49, 29, 9, 54, 55, 56, 57, 10)),
    array(27, "Insalata Caesar", 2, 3, 15.9, array(49, 29, 9, 54, 56, 57, 10, 55)),
    array(28, "Grande assiette de cicchetti", 2, 3, 6, array(7, 59, 51, 49, 10, 61, 62, 63)),
    array(29, "Piadines Salmone", 2, 3, 6, array(58, 59, 60, 30, 7, 9)),
    array(41, "Insalata Generosa (NUOVO)", 2, 3, 8.5, array(49, 9, 29, 64)),
    array(42, "Insalata Vesuvio", 2, 3, 5.3, array(49, 52, 5, 46, 37, 51)),
    array(30, "Spaghetti alla bolognese", 2, 5, 5.3, array(65)),
    array(31, "Tagliatelle alla carbonara", 2, 5, 5.3, array(45, 29, 65)),
    array(32, "Pizza pommes all' Amaretto", 3, 7, 5.3, array(45, 29, 65)),
    array(33, "Pizza aux framboises", 3, 7, 8.7, array(45, 29, 65)),
    array(34, "Coupe glacée 2 ou 3 parfums", 3, 6, 5.9, array()),
    array(38, "Profiteroles italiennes", 3, 6, 4.2, array(69, 70, 71)),
    array(35, "Délice glacé aux fruits rouges", 3, 6, 4.2, array(72, 73, 74, 75, 76)),
    array(36, "fruits rouges glacé", 3, 6, 4.2, array(72, 73, 74, 75, 76))
);
///ID 43
for ($i = 0; $i < count($produitArray); $i++) {
    $pro = new Produit();
    $associationsProduitIngredient = array();
    for ($j = 0; $j < count($produitArray[$i][5]); $j++) {//$produit, $ingredient, $isAdded, $surcout, $supprimable
        $bdd = new ConnexionBDD();
        $associationsProduitIngredient[$j] = new AssociationProduitIngredients($produitArray[$i][0], $produitArray[$i][5][$j], true, 0, true);
        $bdd->executeGeneric("INSERT INTO `association_produit_ingredient`(`id_produit`, `id_ingredient`, `isAdded`, `surcout`, `supprimable`) VALUES (" . $produitArray[$i][0] . "," . $produitArray[$i][5][$j] . "," . true . "," . (0) . "," . true.")");
    }
    $bdd = new ConnexionBDD();
    $bdd->executeGeneric("INSERT INTO `produit`(`ID`, `NOM`, `PRIX`, `CATEGORIE_ID`,`sousCategorie`) VALUES (".$produitArray[$i][0].",'".$produitArray[$i][1]."',".$produitArray[$i][4].",".$produitArray[$i][2].",".$produitArray[$i][3].")");
}
echo 'ok';*/