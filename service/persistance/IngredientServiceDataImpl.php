<?php

include_once $path . 'service/persistance/ConnexionBDD.php';
include_once $path . 'service/persistance/IngredientServiceData.php';
include_once $path . 'service/logique/entity/Ingredient.php';

/**
 * Description of IngredientServiceImpl
 *
 * @author Damien Chesneau <contact@damienchesneau.fr>
 */
class IngredientServiceDataImpl implements IngredientServiceData {

    public function getAll() {
        $bdd = new ConnexionBDD();
        $retour = $bdd->executeGeneric("SELECT * FROM ingredient");
        return $this->parseIngredient($retour);
    }

    public function getById($id) {
        $bdd = new ConnexionBDD();
        $retour = $bdd->executeGeneric("SELECT * FROM ingredient WHERE id = " . $id);
        return $this->parseIngredient($retour);
    }

    private function parseIngredient($resultSet) {
        $liste = array();
        $ret;
        while ($ligne = $resultSet->fetch()) {
            $ingredient = new Ingredient();
            $ingredient->setId(intval($ligne->id));
            $ingredient->setNom($ligne->nom);
            array_push($liste, $ingredient);
        }
        if (count($liste) == 1) {
            $ret = $liste[0];
        } else {
            $ret = $liste;
        }
        return $ret;
    }

}
