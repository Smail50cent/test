<?php

/**
 * Description of CategorieServiceDataImpl
 *
 * @author Damien Chesneau <contact@damienchesneau.fr>
 */
include_once 'CategorieServiceData.php';
include_once 'ConnexionBDD.php';
include_once '../logique/entity/Categorie.php';

class CategorieServiceDataImpl implements CategorieServiceData {

    public function getAll() {
        $ret = array();
        $bdd = new ConnexionBDD();
        $retour = $bdd->executeGeneric("SELECT * FROM categorie");
        $i = 0;
        while ($ligne = $retour->fetch()) {
            $categorie = new Categorie();
            $categorie->setId(intval($ligne->id));
            $categorie->setNom($ligne->nom);
            $categorie->setPriorite(intval($ligne->priorite));
            $ret[$i] = $categorie;
            $i++;
        }
        return $ret;
    }

    public function getById($id) {

        $bdd = new ConnexionBDD();
        $retour = $bdd->executeGeneric("SELECT * FROM categorie WHERE id=" . $id);
        $categorie = new Categorie();
        $ligne = $retour->fetch();
        $categorie->setId(intval($ligne->id));
        $categorie->setNom($ligne->nom);
        $categorie->setPriorite(intval($ligne->priorite));
        return $categorie;
    }

}
