<?php

include_once $path.'service/persistance/ConnexionBDD.php';
include_once $path.'service/persistance/IngredientServiceData.php';

/**
 * Description of IngredientServiceImpl
 *
 * @author Damien Chesneau <contact@damienchesneau.fr>
 */
class IngredientServiceDataImpl implements IngredientServiceData {

    public function getAll() {
        $bdd = new ConnexionBDD();
        $retour = $bdd->executeGeneric("SELECT * FROM ingredient");
        return $retour;
    }
    public function getById($id) {
        $bdd = new ConnexionBDD();
        $retour = $bdd->executeGeneric("SELECT * FROM ingredient WHERE id = ".$id);
        return $retour;
    }
}
