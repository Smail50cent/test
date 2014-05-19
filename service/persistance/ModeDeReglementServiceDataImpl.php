<?php

include_once 'ModeDeReglementServiceData.php';
include_once 'ConnexionBDD.php';
include_once '../logique/entity/ModeDeReglement.php';

/**
 * Description of TablesServiceImpl
 *
 * @author Damien Chesneau <contact@damienchesneau.fr>
 */
class ModeDeReglementServiceDataImpl implements ModeDeReglementServiceData {

    public function getAll() {
        $modesdereglement = array();
        $bdd = new ConnexionBDD();
        $return = $bdd->executeGeneric("SELECT * FROM mode_de_reglement ");
        $i = 0;
        while ($ligne = $return->fetch()) {
            $modeDeReglement = new ModeDeReglement();
            $modeDeReglement->setId(intval($ligne->id));
            $modeDeReglement->setNom($ligne->nom);
            $modeDeReglement->setUrl($ligne->url);
            $modeDeReglement->setRedirictUrl($ligne->redirict_url);
            $modesdereglement[$i] = $modeDeReglement;
            $i++;
        }
        return $modesdereglement;
    }

    public function getById($id) {
        $bdd = new ConnexionBDD();
        $return = $bdd->executeGeneric("SELECT * FROM mode_de_reglement WHERE id = " . $id);
        $ligne = $return->fetch();
        $modeDeReglement = new ModeDeReglement();
        $modeDeReglement->setId(intval($ligne->id));
        $modeDeReglement->setNom($ligne->nom);
        $modeDeReglement->setUrl($ligne->url);
        $modeDeReglement->setRedirictUrl($ligne->redirict_url);
        return $modeDeReglement;
    }

}
