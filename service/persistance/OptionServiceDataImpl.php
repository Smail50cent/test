<?php

/**
 * Description of CategorieServiceDataImpl
 *
 * @author Damien Chesneau <contact@damienchesneau.fr>
 */
include_once 'OptionServiceData.php';
include_once 'ConnexionBDD.php';
include_once '../logique/entity/Option.php';

class OptionServiceDataImpl implements OptionServiceData {

    public function getOptionByIdProduit($id) {
        $bdd = new ConnexionBDD();
        $retour = $bdd->executeGeneric("SELECT * FROM `association_produit_options` WHERE `produit_id` = " . $id);
        $optionId = array();
        $i = 0;
        while ($ligne = $retour->fetch()) {
            $optionId[$i] = $ligne->option_id;
            $i++;
        }
        $ret = array();
        for ($i = 0; $i < count($optionId); $i++) {
            $ret[$i] = $this->getById($optionId[$i]);
        }
        return $ret;
    }

    public function getById($id) {
        $bdd = new ConnexionBDD();
        $retour = $bdd->executeGeneric("SELECT * FROM `options` WHERE `id` = " . $id);
        $option = new Option();
        $ligne = $retour->fetch();
        $option->setId(($ligne->id));
        $option->setNom($ligne->nom);
        $option->setLabel(($ligne->label));
        $option->setPossibilite($this->getPossibliteByIdOption($id));
        return $option;
    }

    public function getPossibliteByIdOption($id) {
        $bdd = new ConnexionBDD();
        $retour = $bdd->executeGeneric("SELECT * FROM `option_possibilite` WHERE `id_option` = " . $id);
        $ret = array();
        $i = 0;
        while ($ligne = $retour->fetch()) {
            $ret[$i] = $ligne->nom;
            $i++;
        }
        return $ret;
    }

}
