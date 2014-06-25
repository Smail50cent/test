<?php

/**
 * Description of EntrepriseService
 *
 * @author Damien Chesneau <contact@damienchesneau.fr>
 */
include_once $path.'service/persistance/ConnexionBDD.php';
include_once $path.'service/persistance/EntrepriseServiceData.php';
class EntrepriseServiceDataImpl implements EntrepriseServiceData{

    
    public function getEntreprise() {
        $bdd = new ConnexionBDD();
        $retour = $bdd->executeGeneric("SELECT * FROM entreprise WHERE entreprise.id = 5 ");
        return $retour;
    }
    public function getMaj() {
        $bdd = new ConnexionBDD();
        $retour = $bdd->executeGeneric("SELECT * FROM `MAJ_TABLES` WHERE `nomTable` = 'entreprise'");
        return $retour;
    }
    
}
