<?php

include_once 'CompteRoleServiceData.php';
include_once 'ConnexionBDD.php';
include_once '../logique/entity/CompteRole.php';

/**
 * Description of CompteRoleServiceDataImpl
 *
 * @author Damien Chesneau <contact@damienchesneau.fr>
 */
class CompteRoleServiceDataImpl implements CompteRoleServiceData {

    public function getAll() {
        $bdd = new ConnexionBDD();
        $lignes = $bdd->executeGeneric("SELECT * FROM `compte_role` ");
        $compteRoles=array();
        $i=0;
        while ($ligne = $lignes->fetch()){
            $compteRole= new CompteRole($ligne->id,$ligne->libelle,$ligne->level);
            $compteRoles[$i] = $compteRole;
            $i++;
        }
        return $compteRoles;
    }

}
