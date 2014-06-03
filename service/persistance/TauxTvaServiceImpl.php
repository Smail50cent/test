<?php

include_once 'TauxTvaService.php';
include_once 'ConnexionBDD.php';

/**
 * Description of TauxTvaServiceImpl
 *
 * @author Damien Chesneau <contact@damienchesneau.fr>
 */
class TauxTvaServiceImpl implements TauxTvaService {

    public function getById($id) {
        $bdd = new ConnexionBDD();
        $bdd->executeGeneric("SELECT * FROM `taux_tva` WHERE `id_tva` = ".$id);
    }

}
