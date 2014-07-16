<?php

/**
 * Description of CategorieServiceDataImpl
 *
 * @author Damien Chesneau <contact@damienchesneau.fr>
 */
include_once $path . 'service/persistance/groupe/GroupeServiceData.php';
include_once $path . 'service/persistance/ConnexionBDD.php';
include_once $path . 'service/logique/entity/Groupe.php';

class GroupeServiceDataImpl implements GroupeServiceData {

    public function getAll() {
        $bdd = new ConnexionBDD();
        $retour = $bdd->executeGeneric("SELECT * FROM `groupe` ");
        return $this->parseGroupe($retour);
    }

    private function parseGroupe($resultSet) {
        $liste = array();
        $ret;
        while ($ligne = $resultSet->fetch()) {
            $groupe = new Groupe();
            $groupe->setId(intval($ligne->id));
            $groupe->setAdresseSiege($ligne->adresseSiege);
            $groupe->setNom($ligne->nom);
            $groupe->setMessage($ligne->message);
            $groupe->setSlogan($ligne->slogan);
            $groupe->setStyle($ligne->style);
            $groupe->setTelephone($ligne->telephone);
            array_push($liste, $groupe);
        }
        $ret = $liste;
        return $ret;
    }

}
