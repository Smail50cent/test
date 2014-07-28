<?php

include_once $path . 'service/persistance/TauxTvaServiceData.php';
include_once $path . 'service/persistance/ConnexionBDD.php';
include_once $path . 'service/logique/entity/TauxTva.php';
/**
 * Description of TauxTvaServiceImpl
 *
 * @author Damien Chesneau <contact@damienchesneau.fr>
 */
class TauxTvaServiceDataImpl implements TauxTvaServiceData {

    public function getById($id) {
        $bdd = new ConnexionBDD();
        $rep = $bdd->executeGeneric("SELECT * FROM `taux_tva` WHERE `id_tva` = " . $id);
        $ligne = $rep->fetch();
        return $ligne->taux_tva;
    }

    public function getAll() {
        $bdd = new ConnexionBDD();
        $rep = $bdd->executeGeneric("SELECT * FROM `taux_tva` ORDER BY taux_tva");
        return $this->parseTauxTva($rep);
    }

    public function parseTauxTva($result) {

        $liste = array();
        $ret;
        while ($ligne = $result->fetch()) {
            $tauxtva = new TauxTva();
            $tauxtva->setId_tva($ligne->id_tva);
            $tauxtva->setTaux_tva(floatval($ligne->taux_tva));
            array_push($liste, $tauxtva);
        }
        if (count($liste) == 1) {
            $ret = $liste[0];
        } else {
            $ret = $liste;
        }
        return $ret;
    }

}
