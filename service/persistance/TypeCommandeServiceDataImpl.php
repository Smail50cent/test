<?php

include_once $path . 'service/persistance/TypeCommandeServiceData.php';
include_once $path . 'service/persistance/ConnexionBDD.php';
include_once $path . 'service/logique/entity/TypeCommande.php';

/**
 * Description of ZoneTableServiceData
 *
 * @author Damien Chesneau <contact@damienchesneau.fr>
 */
class TypeCommandeServiceDataImpl implements TypeCommandeServiceData {

    public function getAll() {
        $bdd = new ConnexionBDD();
        $resultSet = $bdd->executeGeneric("SELECT `id`, `label`, `actif`, `label_menu`, `id_in_html_page` FROM `type_commandes` ");
        return $this->parseTypeCommande($resultSet);
    }

    private function parseTypeCommande($resultSet) {
        $liste = array();
        $ret;
        $lignes = $resultSet->fetchAll();
        for ($i = 0; $i < count($lignes); $i++) {
            $ligne = $lignes[$i];
            $typeCommande = new TypeCommande();
            $typeCommande->setId(intval($ligne->id));
            if ($ligne->actif) {
                $typeCommande->setIsActif(true);
            } else {
                $typeCommande->setIsActif(false);
            }
            $typeCommande->setIdInPageHtml($ligne->id_in_html_page);
            $typeCommande->setLabel($ligne->label);
            $typeCommande->setLabelMenu($ligne->label_menu);
            array_push($liste, $typeCommande);
        }
        if (count($liste) == 1) {
            $ret = $liste[0];
        } else {
            $ret = $liste;
        }
        return $ret;
    }

}
