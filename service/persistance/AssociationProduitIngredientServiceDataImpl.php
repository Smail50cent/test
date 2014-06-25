<?php

/**
 * Description of CategorieServiceDataImpl
 *
 * @author Damien Chesneau <contact@damienchesneau.fr>
 */
include_once $path.'service/persistance/AssociationProduitIngredientServiceData.php';
include_once $path.'service/persistance/ConnexionBDD.php';

class AssociationProduitIngredientServiceDataImpl implements AssociationProduitIngredientServiceData{

    public function getByIdProduit($id) {
        $bdd = new ConnexionBDD();
        $retour = $bdd->executeGeneric("SELECT * FROM `association_produit_ingredient` WHERE `id_produit`=".$id);
        return $retour;
    }

}
