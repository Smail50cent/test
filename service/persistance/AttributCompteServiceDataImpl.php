<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

include_once 'AttributCompteServiceData.php';
include_once 'ConnexionBDD.php';
include_once '../logique/entity/AttributCompte.php';

class AttributCompteServiceDataImpl implements AttributCompteServiceData {

    public function getAll() {
        $attcomptes = array();
        $bdd = new ConnexionBDD();
        $return = $bdd->executeGeneric("SELECT * FROM attribut_compte ");
        $i = 0;

        while ($ligne = $return->fetch()) {

            $attcompte = new AttributCompte();
            $attcompte->setId(intval($ligne->id));
            $attcompte->setId_form($ligne->id_form);
            $attcompte->setValeur_champ($ligne->valeur_champ);
            $attcompte->setDefaut($ligne->defaut);
            $attcompte->setId_compte(intval($ligne->id_compte));
            $attcomptes[$i] = $attcompte;
            $i++;
        }
        return $attcomptes;
    }

    public function getById($id) {

        $bdd = new ConnexionBDD();
        $retour = $bdd->executeGeneric("SELECT * FROM attribut_compte WHERE id=" . $id);
        $attcompte = new AttributCompte();

        $ligne = $retour->fetch();
        $attcompte->setId(intval($ligne->id));
        $attcompte->setId_form($ligne->id_form);
        $attcompte->setValeur_champ($ligne->valeur_champ);
        $attcompte->setDefaut($ligne->defaut);
        $attcompte->setId_compte(intval($ligne->id_compte));

        return $attcompte;
    }

    public function addAll($id_form,$valeur_champ,$defaut,$id_compte) {
        
        $bdd = new ConnexionBDD();
        $bdd->executeGeneric(" INSERT INTO attribut_compte(id_form,valeur_champ,defaut,id_compte) VALUES (". $id_form .",". $valeur_champ .",". $defaut .",". $id_compte .")");
        echo "done";
        
    }

}
