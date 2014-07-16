<?php

/**
 * Description of CategorieServiceDataImpl
 *
 * @author Damien Chesneau <contact@damienchesneau.fr>
 */
include_once $path . 'service/persistance/OptionServiceData.php';
include_once $path . 'service/persistance/ConnexionBDD.php';
include_once $path . 'service/logique/entity/Option.php';
include_once $path . 'service/logique/entity/OptionPossibilite.php';

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
            $opPos = new OptionPossibilite();
            $opPos->setId($ligne->id);
            $opPos->setNom($ligne->nom);
            $ret[$i] = $opPos;
            $i++;
        }
        return $ret;
    }

    public function getAll() {
        $bdd = new ConnexionBDD();
        $retour = $bdd->executeGeneric("SELECT
        options.id AS option_id,
        options.nom AS option_nom,
        options.label AS option_label,
        option_possibilite.id AS option_possibilite_id,
        option_possibilite.nom AS option_possibilite_nom
        FROM `options`
        LEFT JOIN option_possibilite ON options.id = option_possibilite.id_option");

        $option = new Option();
        $optionPossib = new OptionPossibilite();
        $lignes = $retour->fetchAll();
        $liste = array();
        $ret;
        for ($i = 0; $i < count($lignes); $i++) {
            $ligne = $lignes[$i];
            $option->setId(($ligne->option_id));
            $option->setNom($ligne->option_nom);
            $option->setLabel(($ligne->option_label));
            $optionPossib = new OptionPossibilite();
            $optionPossib->setId($ligne->option_possibilite_id);
            $optionPossib->setNom($ligne->option_possibilite_nom);
            //$option->setPossibilite($optionPossib);
            if (count($lignes) != ($i + 1)) {
                if ($ligne->option_id != $lignes[$i + 1]->option_id) {
                    $option->addPossibiliteOptions($optionPossib);
                    array_push($liste, $option);
                    $option = new Option();
                } else {
                    $option->addPossibiliteOptions($optionPossib);
                }
            } else {
                $option->addPossibiliteOptions($optionPossib);
                array_push($liste, $option);
            }
        }
        if (count($liste) == 1) {
            $ret = $liste[0];
        } else {
            $ret = $liste;
        }
        return $ret;
    }

}
