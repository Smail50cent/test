<?php

/**
 * Description of SousCategorieServiceDataImpl
 *
 * @author Damien Chesneau <contact@damienchesneau.fr>
 */
include_once 'SousCategorieServiceData.php';
include_once 'ConnexionBDD.php';

class SousCategorieServiceDataImpl implements SousCategorieServiceData {

    public function getAll() {
        $bdd = new ConnexionBDD();
        $retour = $bdd->executeGeneric("SELECT * FROM souscategorie");
        return $retour;
    }

    public function getByIdCategortie($id) {
        $bdd = new ConnexionBDD();
        $retour = $bdd->executeGeneric("SELECT * FROM souscategorie WHERE souscategorie.categorie_id =" . $id);
        return $retour;
    }

    public function getById($id) {
        $bdd = new ConnexionBDD();
        $retour = $bdd->executeGeneric("SELECT * FROM souscategorie WHERE souscategorie.ID =" . $id);
        return $retour;
    }

}
