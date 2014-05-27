<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

include_once 'CompteServiceData.php';
include_once 'ConnexionBDD.php';
include_once '../logique/entity/Compte.php';

class CompteServiceDataImpl implements CompteServiceData {

    public function getAll() {
        $comptes = array();
        $bdd = new ConnexionBDD();
        $return = $bdd->executeGeneric("SELECT * FROM compte ");
        $i = 0;
        while ($ligne = $return->fetch()) {
            $compte = new Compte();
            $compte->setId(intval($ligne->id));
            $compte->setPassword($ligne->password);
            $comptes[$i] = $compte;
            $i++;
        }
        return $comptes;
    }

    public function getById($id) {

        $bdd = new ConnexionBDD();
        $retour = $bdd->executeGeneric("SELECT * FROM compte WHERE id=" . $id);
        $compte = new Compte();
        $ligne = $retour->fetch();
        $compte->setId(intval($ligne->id));
        $compte->setPassword($ligne->password);

        return $compte;
    }

    public function addAll($password) {
        $bdd = new ConnexionBDD();
        echo $bdd->executeGeneric(" INSERT INTO compte(password) VALUES('$password') ");
    }

}
