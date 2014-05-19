<?php

/**
 * Description of CategorieServiceDataImpl
 *
 * @author Damien Chesneau <contact@damienchesneau.fr>
 */
include_once 'MenuServiceData.php';
include_once 'ConnexionBDD.php';
include_once '../logique/entity/Menu.php';

class MenuServiceDataImpl implements MenuServiceData {

    public function getAll() {
        $ret = array();
        $bdd = new ConnexionBDD();
        $retour = $bdd->executeGeneric("SELECT * FROM menu");
        $i = 0;
        while ($ligne = $retour->fetch()) {
            $menu = new Menu();
            $menu->setId(intval($ligne->ID));
            $menu->setNom($ligne->NOM);
            $menu->setPrix($ligne->PRIX);
            $produitsret = $this->getProduitsByIdMenu(intval($ligne->ID));
            $produits = array();
            $j = 0;
            while ($produitret = $produitsret->fetch()) {
                $produits[$j] = intval($produitret->produit_ID);
                $j++;
            }
            $menu->setProduits($produits);
            $ret[$i] = $menu;
            $i++;
        }
        return $ret;
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
        $retour = $bdd->executeGeneric("SELECT * FROM menu WHERE ID=".$id);
        $ligne = $retour->fetch();
        $menu = new Menu();
        $menu->setId(intval($ligne->ID));
        $menu->setNom($ligne->NOM);
        $menu->setPrix($ligne->PRIX);
        $produitsret = $this->getProduitsByIdMenu(intval($ligne->ID));
        $produits = array();
        $j = 0;
        while ($produitret = $produitsret->fetch()) {
            $produits[$j] = intval($produitret->produit_ID);
            $j++;
        }
        $menu->setProduits($produits);
        return $menu;
    }

}
