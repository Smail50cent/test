<?php

include_once $path.'service/persistance/CompteProduitFavoriServiceData.php';
include_once $path.'service/persistance/ConnexionBDD.php';
include_once $path.'service/logique/entity/CompteProduitFavori.php';

/**
 * Description of AssociationProduitPrixServiceDataImpl
 *
 * @author Damien Chesneau <contact@damienchesneau.fr>
 */
class CompteProduitFavoriServiceDataImpl implements CompteProduitFavoriServiceData {

    
    public function getByIdServeur($id) {
        $comptes = array();
        $bdd = new ConnexionBDD();
        $return = $bdd->executeGeneric("SELECT * FROM `compte_produit_favori` WHERE `id_compte` = ".$id);
        return $this->parseCompteProduit($return);
    }
    
    private function parseCompteProduit($resultSet){
        $liste = array();
        $ret;
        while ($ligne = $resultSet->fetch()) {
            $compteProduitFavori = new CompteProduitFavori();
            $compteProduitFavori->setId(intval($ligne->id));
            $compteProduitFavori->setPersonneId($ligne->id_compte);
            $compteProduitFavori->setProduit($ligne->id_produit);
            array_push($liste, $compteProduitFavori);
        }
        if (count($liste) == 1) {
            $ret = $liste[0];
        } else {
            $ret = $liste;
        }
        return $ret;
    }
}
