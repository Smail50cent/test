<?php

include_once $path.'service/persistance/ProduitSuggererServiceData.php';
include_once $path.'service/persistance/ConnexionBDD.php';
include_once $path.'service/logique/entity/ProduitSuggerer.php';

/**
 * Description of AssociationProduitPrixServiceDataImpl
 *
 * @author Damien Chesneau <contact@damienchesneau.fr>
 */
class ProduitSuggererServiceDataImpl implements ProduitSuggererServiceData {

    private function parseCompteProduit($resultSet){
        $liste = array();
        $ret;
        while ($ligne = $resultSet->fetch()) {
            $ps = new ProduitSuggerer();
            $ps->setId(intval($ligne->id));
            $ps->setProduit($ligne->id_produit);
            array_push($liste, $ps);
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
        $return = $bdd->executeGeneric("SELECT * FROM `produit_suggere`");
        return $this->parseCompteProduit($return);
    }

}
