<?php

/**
 * Description of EntrepriseService
 *
 * @author Damien Chesneau <contact@damienchesneau.fr>
 */
include_once $path . 'service/persistance/ConnexionBDD.php';
include_once $path . 'service/persistance/MajTablesServiceData.php';
include_once $path . 'service/logique/entity/MajTables.php';
include_once $path . 'service/persistance/ProduitServiceDataImpl.php';
include_once $path . 'service/logique/entity/Produit.php';

class MajTablesServiceDataImpl implements MajTablesServiceData {

    private function parseMAJTables($resultSet) {
        $liste = array();
        $ret;
        while ($ligne = $resultSet->fetch()) {
            $majtables = new MajTables();
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

    public function getAll() {
        $bdd = new ConnexionBDD();
        $retour = $bdd->executeGeneric("SELECT * FROM MAJ_TABLES ");
        return $this->parseMAJTables($retour);
    }

    public function getBynomTable($nom) {
        $bdd = new ConnexionBDD();
        $retour = $bdd->executeGeneric("SELECT * FROM MAJ_TABLES WHERE nomTable='" . $nom . "' ");
        return $this->parseMAJTables($retour);
    }

    public function haveMAJ($tableName,$level) {
        $bdd = new ConnexionBDD();
        $retour = $bdd->executeGeneric("SELECT * FROM MAJ_TABLES WHERE nomTable='" . $tableName . "' ");
        return $this->parseMAJTables($retour);
    }

}
