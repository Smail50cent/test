<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

include_once $path.'service/persistance/CompteServiceData.php';
include_once $path.'service/persistance/ConnexionBDD.php';
include_once $path.'service/logique/entity/Compte.php';
include_once $path.'service/logique/entity/CompteRole.php';

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

    private function parseCompte($resultSet) {
        $liste = array();
        $ret;
        while ($ligne = $resultSet->fetch()) {
            $compte = new Compte();
            $compteRole = new CompteRole();
            $compte->setId(intval($ligne->id));
            $compte->setPassword($ligne->password);
            $compteRole->setId($ligne->id_role);
            $compteRole->setLevel($ligne->level);
            $compteRole->setLibelle($ligne->libelle);
            $compte->setRole($compteRole);
            array_push($liste, $compte);
        }
        if (count($liste) == 1) {
            $ret = $liste[0];
        } else {
            $ret = $liste;
        }
        return $ret;
    }

    public function getById($id) {
        $bdd = new ConnexionBDD();
        $retour = $bdd->executeGeneric("SELECT * FROM  `compte` LEFT JOIN compte_role ON compte_role.id = compte.id_role WHERE compte.id=" . $id);
        return $this->parseCompte($retour);
    }

    public function addAll($password, $role) {
        $bdd = new ConnexionBDD();
        return $bdd->executeGeneric(" INSERT INTO compte(password,id_role) VALUES('$password','$role') ");
    }

}
