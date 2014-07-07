<?php

/**
 * Description of CategorieServiceDataImpl
 *
 * @author Damien Chesneau <contact@damienchesneau.fr>
 */
include_once $path . 'service/persistance/ProduitServiceData.php';
include_once $path . 'service/persistance/ConnexionBDD.php';
include_once $path . 'service/logique/entity/Produit.php';

class ProduitServiceDataImpl implements ProduitServiceData {

    public function getAll() {
        $bdd = new ConnexionBDD();
        $retour = $bdd->executeGeneric("SELECT * FROM `produit` LEFT JOIN taux_tva ON produit.TVA = taux_tva.id_tva");
        return $this->parseProduit($retour);
    }

    public function parseProduit($resultSet) {
        $sousCatSrv = PersistanceFactory::getSousCategorieService();
        $liste = array();
        $ret;
        while ($ligne = $resultSet->fetch()) {
            $produit = new Produit();
            $produit->setCategorie(intval($ligne->CATEGORIE_ID));
            $produit->setId(intval($ligne->ID));
            $produit->setNom($ligne->NOM);
            if ($ligne->sousCategorie != null || intval($ligne->sousCategorie) != 0) {
                $produit->setSousCategorie($sousCatSrv->getByIdParseObj($ligne->sousCategorie));
            }
            $produit->setTauxTva(floatval($ligne->taux_tva));
            $produit->setOptions(intval($ligne->options));
            $produit->setLevel(intval($ligne->level));
            array_push($liste, $produit);
        }
        if (count($liste) == 1) {
            $ret = $liste[0];
        } else {
            $ret = $liste;
        }
        return $ret;
    }

    public function getById($id) {
        $bdd = new ConnexionBDD();
        $retour = $bdd->executeGeneric("SELECT * FROM `produit` LEFT JOIN taux_tva ON produit.TVA = taux_tva.id_tva WHERE ID = " . $id);
        return $this->parseProduit($retour);
    }

    public function getProduitByCategorieId($id) {
        $bdd = new ConnexionBDD();
        $retour = $bdd->executeGeneric("SELECT * FROM produit LEFT JOIN taux_tva ON produit.TVA = taux_tva.id_tva WHERE CATEGORIE_ID = " . $id);
        return $this->parseProduit($retour);
    }

    public function addData() {
        $bdd = new ConnexionBDD();
        $bdd->executeGeneric("INSERT INTO dupappcaisse.produit (NOM, CATEGORIE_ID, Produit_simple, Famille_comptable, TVA) "
                . " SELECT BP.PR_LIBELLE, DC.id, BP.PR_PRODUIT_SIMPLE, BP.PR_FAMILLE_COMPTABLE, BP.PR_TVA  "
                . " FROM prod_bacchus.BAR_PRODUIT BP ,dupappcaisse.categorie DC ,prod_bacchus.BAR_FAMILLE_PRODUIT FP"
                . " WHERE DC.nom = FP.FA_LIBELLE AND FP.FA_CODE = BP.PR_CODE_FAMILLE");
    }

    public function getProduitByLevel($level) {
        $bdd = new ConnexionBDD();
        $retour = $bdd->executeGeneric("SELECT * FROM produit LEFT JOIN taux_tva ON produit.TVA = taux_tva.id_tva WHERE level >= " . $level);
        return $this->parseProduit($retour);
    }

}
