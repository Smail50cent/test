<?php

/**
 * Description of CategorieServiceDataImpl
 *
 * @author Damien Chesneau <contact@damienchesneau.fr>
 */
include_once 'ProduitServiceData.php';
include_once 'ConnexionBDD.php';
include_once '../logique/entity/Produit.php';

class ProduitServiceDataImpl implements ProduitServiceData {

    public function getAll() {
        $sousCatSrv = PersistanceFactory::getSousCategorieService();
        $ret = array();
        $bdd = new ConnexionBDD();
        $retour = $bdd->executeGeneric("SELECT * FROM produit");
        $i = 0;
        while ($ligne = $retour->fetch()) {
            $produit = new Produit();
            $produit->setCategorie(intval($ligne->CATEGORIE_ID));
            $produit->setId(intval($ligne->ID));
            $produit->setNom($ligne->NOM);
            $produit->setSousCategorie($sousCatSrv->getByIdParseObj($ligne->sousCategorie));
            $produit->setOptions(intval($ligne->options));
            $ret[$i] = $produit;
            $i++;
        }
        return $ret;
    }

    public function getById($id) {
        $sousCatSrv = PersistanceFactory::getSousCategorieService();
        $bdd = new ConnexionBDD();
        $retour = $bdd->executeGeneric("SELECT * FROM produit WHERE ID = " . $id);
        $i = 0;
        $ligne = $retour->fetch();
        $produit = new Produit();
        $produit->setCategorie(intval($ligne->CATEGORIE_ID));
        $produit->setId(intval($ligne->ID));
        $produit->setNom($ligne->NOM);
        $produit->setSousCategorie($sousCatSrv->getByIdParseObj($ligne->sousCategorie));
        $produit->setOptions(intval($ligne->options));
        return $produit;
    }

    public function getProduitByCategorieId($id) {
        $sousCatSrv = PersistanceFactory::getSousCategorieService();
        $ret = array();
        $bdd = new ConnexionBDD();
        $retour = $bdd->executeGeneric("SELECT * FROM produit WHERE CATEGORIE_ID = " . $id);
        $i = 0;
        while ($ligne = $retour->fetch()) {
            $produit = new Produit();
            $produit->setCategorie(intval($ligne->CATEGORIE_ID));
            $produit->setId(intval($ligne->ID));
            $produit->setNom($ligne->NOM);
            $produit->setSousCategorie($sousCatSrv->getByIdParseObj($ligne->sousCategorie));
            $produit->setOptions(intval($ligne->options));
            $ret[$i] = $produit;
            $i++;
        }
        return $ret;
    }

    public function addData() {
        $bdd = new ConnexionBDD();
        $bdd->executeGeneric("INSERT INTO dupappcaisse.produit (NOM, CATEGORIE_ID, Produit_simple, Famille_comptable, TVA) "
                . " SELECT BP.PR_LIBELLE, DC.id, BP.PR_PRODUIT_SIMPLE, BP.PR_FAMILLE_COMPTABLE, BP.PR_TVA  "
                . " FROM prod_bacchus.BAR_PRODUIT BP ,dupappcaisse.categorie DC ,prod_bacchus.BAR_FAMILLE_PRODUIT FP"
                . " WHERE DC.nom = FP.FA_LIBELLE AND FP.FA_CODE = BP.PR_CODE_FAMILLE");
    }

}
