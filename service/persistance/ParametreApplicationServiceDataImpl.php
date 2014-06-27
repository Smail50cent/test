<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

include_once $path . 'service/persistance/ParametreApplicationServiceData.php';
include_once $path . 'service/persistance/ConnexionBDD.php';
include_once $path . 'service/logique/entity/ParametreApplication.php';

class ParametreApplicationServiceDataImpl implements ParametreApplicationServiceData {

    public function getAll() {
        $paramapps = array();
        $bdd = new ConnexionBDD();
        $return = $bdd->executeGeneric("SELECT * FROM parametre_application ");
        $i = 0;
        while ($ligne = $return->fetch()) {
            $paramapp = new ParametreApplication();
            $paramapp->setId(intval($ligne->id));
            $paramapp->setNom_parametre($ligne->nom_parametre);
            $paramapp->setValeur_parametre($ligne->valeur_parametre);
            $paramapps[$i] = $paramapp;
            $i++;
        }
        return $paramapps;
    }

    public function getById($id) {
        $bdd = new ConnexionBDD();
        $retour = $bdd->executeGeneric("SELECT * FROM parametre_application WHERE id=" . $id);
        $paramapp = new ParametreApplication();
        $ligne = $retour->fetch();
        $paramapp->setId(intval($ligne->id));
        $paramapp->setNom_parametre($ligne->nom_parametre);
        $paramapp->setValeur_parametre($ligne->valeur_parametre);
        return $paramapp;
    }

    public function getByNomParametre($nom) {
        $bdd = new ConnexionBDD();
        $retour = $bdd->executeGeneric("SELECT * FROM parametre_application WHERE nom_parametre ='" . $nom."'");
        return $this->parseParametreApplication($retour);
    }

    private function parseParametreApplication($resultSet) {
        $liste = array();
        $ret;
        while ($ligne = $resultSet->fetch()) {
            $paramapp = new ParametreApplication();
            $paramapp->setId(intval($ligne->id));
            $paramapp->setNom_parametre($ligne->nom_parametre);
            $paramapp->setValeur_parametre($ligne->valeur_parametre);
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
