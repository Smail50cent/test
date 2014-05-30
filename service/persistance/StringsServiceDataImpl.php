<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

include_once 'StringsServiceData.php';
include_once 'ConnexionBDD.php';
include_once '../logique/entity/Strings.php';

class StringsServiceDataImpl implements StringsServiceData {

    public function getAll() {
        $stringss = array();
        $bdd = new ConnexionBDD();
        $return = $bdd->executeGeneric("SELECT * FROM strings ");
        $i = 0;
        while ($ligne = $return->fetch()) {
            $strings = new Strings();
            $strings->setId(intval($ligne->id));
            $strings->setLang($ligne->lang);
            $strings->setValue($ligne->value);
            $strings->setKey_lang($ligne->key_lang);
            $stringss[$i] = $strings;
            $i++;
        }
        return $stringss;
    }

    public function getById($id) {

        $bdd = new ConnexionBDD();
        $retour = $bdd->executeGeneric("SELECT * FROM strings WHERE id=" . $id);
        $strings = new Strings();
        $ligne = $retour->fetch();
        $strings->setId(intval($ligne->id));
        $strings->setLang($ligne->lang);
        $strings->setValue($ligne->value);
        $strings->setKey_lang($ligne->key_lang);

        return $strings;
    }

}
