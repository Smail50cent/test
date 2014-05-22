<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

include_once 'ParametreApplicationServiceData.php';
include_once 'ConnexionBDD.php';
include_once '../logique/entity/ParametreApplication.php';

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
            $paramapp->setValeur_paramtre($ligne->valeur_parametre);
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
        $paramapp->setValeur_paramtre($ligne->valeur_parametre);

        return $paramapp;
    }

}