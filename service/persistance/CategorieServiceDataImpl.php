<?php

/**
 * Description of CategorieServiceDataImpl
 *
 * @author Damien Chesneau <contact@damienchesneau.fr>
 */
include_once $path.'service/persistance/CategorieServiceData.php';
include_once $path.'service/persistance/ConnexionBDD.php';
include_once $path.'service/logique/entity/Categorie.php';

class CategorieServiceDataImpl implements CategorieServiceData {

    public function getAll() {
        $ret = array();
        $bdd = new ConnexionBDD();
        $retour = $bdd->executeGeneric("SELECT * FROM categorie");
        $i = 0;
        while ($ligne = $retour->fetch()) {
            $categorie = new Categorie();
            $categorie->setId(intval($ligne->id));
            $categorie->setNom($ligne->nom);
            $categorie->setPriorite(intval($ligne->priorite));
            $ret[$i] = $categorie;
            $i++;
        }
        return $ret;
    }

    public function getById($id) {

        $bdd = new ConnexionBDD();
        $retour = $bdd->executeGeneric("SELECT * FROM categorie WHERE id=" . $id);
        $categorie = new Categorie();
        $ligne = $retour->fetch();
        $categorie->setId(intval($ligne->id));
        $categorie->setNom($ligne->nom);
        $categorie->setPriorite(intval($ligne->priorite));
        return $categorie;
    }

    public function addData() {
        $bdd = new ConnexionBDD();
        $bdd->executeGeneric("INSERT INTO dupappcaisse.categorie (nom,priorite) "
                . " SELECT FP.FA_LIBELLE, FP.FA_ORDRE "
                . " FROM prod_bacchus.BAR_FAMILLE_PRODUIT FP ");
    }

}
