<?php

include_once $path . 'service/persistance/ParametreApplicationServiceData.php';
include_once $path . 'service/persistance/ConnexionBDD.php';
include_once $path . 'service/logique/entity/ParametreApplication.php';

class ParametreApplicationServiceDataImpl implements ParametreApplicationServiceData {

    public function getAll($etablissementid) {
        $bdd = new ConnexionBDD();
        $return;
        if ($etablissementid != null) {
            $return = $bdd->executeGeneric("SELECT * FROM parametre_application WHERE ((etablissement_id = " . $etablissementid . ") OR (etablissement_id IS NULL))");
        } else {
            $return = $bdd->executeGeneric("SELECT * FROM parametre_application ");
        }
        return $this->parseParametreApplication($return);
    }

    public function getById($id) {
        $bdd = new ConnexionBDD();
        $retour = $bdd->executeGeneric("SELECT * FROM parametre_application WHERE id=" . $id);
        return $this->parseParametreApplication($retour);
    }

    public function getByNomParametre($nom, $etablissementid) {
        $bdd = new ConnexionBDD();
        $retour;
        if ($etablissementid != null) {
            $retour = $bdd->executeGeneric("SELECT * FROM parametre_application WHERE nom_parametre ='" . $nom . "' AND  ((etablissement_id = " . $etablissementid . ") OR (etablissement_id IS NULL))");
        } else {
            $retour = $bdd->executeGeneric("SELECT * FROM parametre_application WHERE nom_parametre ='" . $nom . "'");
        }
        return $this->parseParametreApplication($retour);
    }

    private function parseParametreApplication($resultSet) {
        $liste = array();
        $ret;
        while ($ligne = $resultSet->fetch()) {
            $paramapp = new ParametreApplication();
            $paramapp->setId(intval($ligne->id));
            $paramapp->setEtablissement($ligne->etablissement_id);
            $paramapp->setNom_parametre($ligne->nom_parametre);
            $paramapp->setValeur_parametre($ligne->valeur_parametre);
            if ($ligne->valeur_parametre == "true") {
                $paramapp->setValeur_parametre(true);
            } else if ($ligne->valeur_parametre == "false") {
                $paramapp->setValeur_parametre(false);
            }
            array_push($liste, $paramapp);
        }
        if (count($liste) == 1) {
            $ret = $liste[0];
        } else {
            $ret = $liste;
        }
        return $ret;
    }

}
