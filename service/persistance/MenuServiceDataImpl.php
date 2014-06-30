<?php

/**
 * Description of CategorieServiceDataImpl
 *
 * @author Damien Chesneau <contact@damienchesneau.fr>
 */
include_once $path . 'service/persistance/MenuServiceData.php';
include_once $path . 'service/persistance/ConnexionBDD.php';
include_once $path . 'service/logique/entity/Menu.php';

class MenuServiceDataImpl implements MenuServiceData {

    public function getAll() {
        $ret = array();
        $bdd = new ConnexionBDD();
        $retour = $bdd->executeGeneric("SELECT * FROM menu LEFT JOIN taux_tva ON menu.tauxDeTva = taux_tva.id_tva");
        return $this->parseMenu($retour);
    }

    public function getProduitsByIdMenu($id) {
        $bdd = new ConnexionBDD();
//        echo "SELECT * FROM `menu` WHERE `menu_ID`=".$id;
        $retour = $bdd->executeGeneric("SELECT * FROM `menu_produit` WHERE `menu_ID`=" . $id);
        return $retour;
    }

    public function getById($id) {
        $ret = array();
        $bdd = new ConnexionBDD();
        $retour = $bdd->executeGeneric("SELECT * FROM menu LEFT JOIN taux_tva ON menu.tauxDeTva = taux_tva.id_tva WHERE ID=" . $id);
        return $this->parseMenu($retour);
    }

    private function parseMenu($resultSet) {
        $liste = array();
        $ret;
        while ($ligne = $resultSet->fetch()) {
            $menu = new Menu();
            $menu->setId(intval($ligne->ID));
            $menu->setNom($ligne->NOM);
            $menu->setTauxDeTva($ligne->taux_tva);
            $menu->setPrix($ligne->PRIX);
            $produitsret = $this->getProduitsByIdMenu(intval($ligne->ID));
            $produits = array();
            $j = 0;
            while ($produitret = $produitsret->fetch()) {
                $produits[$j] = intval($produitret->produit_ID);
                $j++;
            }
            $menu->setProduits($produits);
            array_push($liste, $menu);
        }
        if (count($liste) == 1) {
            $ret = $liste[0];
        } else {
            $ret = $liste;
        }
        return $ret;
    }

}
