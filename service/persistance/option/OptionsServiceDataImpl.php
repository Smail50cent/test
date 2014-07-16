<?php

/**
 * Description of CategorieServiceDataImpl
 *
 * @author Hamza Legdani <hamza.legdani@gmail.com>
 */
include_once $path . 'service/persistance/option/OptionsServiceData.php';
include_once $path . 'service/persistance/ConnexionBDD.php';

class OptionsServiceDataImpl implements OptionsServiceData {

    public function getAll() {
        $bdd = new ConnexionBDD();
        $retour = $bdd->executeGeneric("SELECT * FROM options ");
        return $this->parseMAJTables($retour);
    }

    public function getById($id) {
        $bdd = new ConnexionBDD();
        $retour = $bdd->executeGeneric("SELECT * FROM options WHERE id=" . $id);
        return $this->parseMAJTables($retour);
    }
    
    public function parseOptions($result) {
        $liste = array();
        $ret;
        while ($ligne = $result->fetch()) {
            $majtables = new Option();
            $majtables->setNomTable($ligne->nomTable);
            $majtables->setLevel(intval($ligne->level));
            array_push($liste, $majtables);
        }
        if (count($liste) == 1) {
            $ret = $liste[0];
        } else {
            $ret = $liste;
        }
        return $ret;
    }

}
