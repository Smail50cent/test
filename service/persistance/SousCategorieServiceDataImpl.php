<?php

/**
 * Description of SousCategorieServiceDataImpl
 *
 * @author Damien Chesneau <contact@damienchesneau.fr>
 */
include_once $path.'service/persistance/SousCategorieServiceData.php';
include_once $path.'service/persistance/ConnexionBDD.php';
include_once $path.'service/logique/entity/SousCategorie.php';

class SousCategorieServiceDataImpl implements SousCategorieServiceData {

    public function getAll() {
        $bdd = new ConnexionBDD();
        $retour = $bdd->executeGeneric("SELECT * FROM `souscategorie` LEFT JOIN taux_tva ON souscategorie.tauxDeTva = taux_tva.id_tva");
        return $retour;
    }

    public function getByIdCategortie($id) {
        $bdd = new ConnexionBDD();
        $retour = $bdd->executeGeneric("SELECT * FROM `souscategorie` LEFT JOIN taux_tva ON souscategorie.tauxDeTva = taux_tva.id_tva WHERE souscategorie.categorie_id =" . $id);
        return $retour;
    }

    public function getById($id) {
        $bdd = new ConnexionBDD();
        $retour = $bdd->executeGeneric("SELECT * FROM `souscategorie` LEFT JOIN taux_tva ON souscategorie.tauxDeTva = taux_tva.id_tva WHERE souscategorie.ID =" . $id);
        return $retour;
    }

    public function getByIdParseObj($id) {
        $bdd = new ConnexionBDD();
        $retour = $bdd->executeGeneric("SELECT * FROM `souscategorie` LEFT JOIN taux_tva ON souscategorie.tauxDeTva = taux_tva.id_tva WHERE souscategorie.ID =" . $id);
        $ligne = $retour->fetch();
        $souscat = new SousCategorie();
        $souscat->setId($ligne->ID);
        $souscat->setCategorie($ligne->categorie_id);
        $souscat->setNom($ligne->NOM);
        $souscat->setPriorite($ligne->priorite);
        $souscat->setTauxTva($ligne->taux_tva);
        return $souscat;
    }

    public function addData() {
        $bdd = new ConnexionBDD();
        echo $bdd->executeGeneric("INSERT INTO dupappcaisse.souscategorie (NOM, categorie_id, priorite, tauxDeTva) "
                . " SELECT SC.NOM, SC.categorie_id, SC.priorite, SC.tauxDeTva "
                . " FROM appcaisse.souscategorie SC ");
        
    }

}
