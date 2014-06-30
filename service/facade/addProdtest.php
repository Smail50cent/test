<?php

if (isset($_POST["NOM"]) && isset($_POST["CATEGORIE_ID"]) && isset($_POST["sousCategorie"]) && isset($_POST["options"]) && isset($_POST["lienAssociationProduitPrix"]) && isset($_POST["Produit_simple"]) && isset($_POST["Famille_comptable"]) && isset($_POST["TVA"]) ){
    include_once '../outils/AppRoot.php';include_once $path.'service/logique/LogiqueFactory.php';
    $categSrv = LogiqueFactory::getProdtestService();
    $categSrv->add($_POST["NOM"],$_POST["CATEGORIE_ID"],$_POST["sousCategorie"],$_POST["options"],$_POST["lienAssociationProduitPrix"],$_POST["Produit_simple"],$_POST["Famille_comptable"],$_POST["TVA"]);
}
