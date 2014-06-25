<?php

include_once $path.'service/persistance/TauxTvaService.php';
include_once $path.'service/persistance/ConnexionBDD.php';

/**
 * Description of TauxTvaServiceImpl
 *
 * @author Damien Chesneau <contact@damienchesneau.fr>
 */
class TauxTvaServiceImpl implements TauxTvaService {

    public function getById($id) {
        $bdd = new ConnexionBDD();
        $rep = $bdd->executeGeneric("SELECT * FROM `taux_tva` WHERE `id_tva` = ".$id);
        $ligne = $rep->fetch();
        return $ligne->taux_tva;
    }

}
