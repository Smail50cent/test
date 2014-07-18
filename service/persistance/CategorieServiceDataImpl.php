<?php

/**
 * Description of CategorieServiceDataImpl
 *
 * @author Damien Chesneau <contact@damienchesneau.fr>
 */
include_once $path . 'service/persistance/CategorieServiceData.php';
include_once $path . 'service/persistance/ConnexionBDD.php';
include_once $path . 'service/logique/entity/Categorie.php';
include_once $path . 'service/logique/entity/SousCategorie.php';

class CategorieServiceDataImpl implements CategorieServiceData {

    public function getAll() {
        $bdd = new ConnexionBDD();
        $retour = $bdd->executeGeneric("SELECT
categorie.id AS categorie_id,
categorie.nom AS categorie_nom,
categorie.priorite AS categorie_priorite,
souscategorie.ID AS souscategorie_ID,
souscategorie.NOM AS souscategorie_NOM,
souscategorie.priorite AS souscategorie_priorite,
association_etablissement_categorie.id_etablissement AS association_etablissement_categorie_id_etablissement,
association_etablissement_categorie.id_zone AS association_etablissement_categorie_id_zone
FROM `categorie`
LEFT JOIN souscategorie ON souscategorie.categorie_id = categorie.id
LEFT JOIN association_etablissement_categorie ON association_etablissement_categorie.id_categorie = categorie.id");
        return $this->parse($retour);
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

    public function getByEtablissementAndZone($etablissement, $zone) {
        $bdd = new ConnexionBDD();
        $retour = $bdd->executeGeneric("SELECT
categorie.id AS categorie_id,
categorie.nom AS categorie_nom,
categorie.priorite AS categorie_priorite,
souscategorie.ID AS souscategorie_ID,
souscategorie.NOM AS souscategorie_NOM,
souscategorie.priorite AS souscategorie_priorite,
association_etablissement_categorie.id_etablissement AS association_etablissement_categorie_id_etablissement,
association_etablissement_categorie.id_zone AS association_etablissement_categorie_id_zone
FROM `categorie`
LEFT JOIN souscategorie ON souscategorie.categorie_id = categorie.id
LEFT JOIN association_etablissement_categorie ON association_etablissement_categorie.id_categorie = categorie.id
WHERE association_etablissement_categorie.id_etablissement = " . $etablissement . " 
AND ((association_etablissement_categorie.`id_zone` = " . $zone . ")
OR (association_etablissement_categorie.`id_zone` IS NULL))");
        return $this->parse($retour);
    }

    private function parse($resultSet) {
        $lignes = $resultSet->fetchAll();
        $categorie = new Categorie();
        $idProdAfter = null;
        $liste = array();
        for ($i = 0; $i < count($lignes); $i++) {
            $ligne = $lignes[$i];
            $categorie->setId(intval($ligne->categorie_id));
            $categorie->setNom($ligne->categorie_nom);
            $categorie->setPriorite(intval($ligne->categorie_priorite));
            if ($ligne->categorie_id == $idProdAfter) {
                $assoIng = $this->testsForListeSousCategorie($ligne, $categorie);
                if ($assoIng != null) {
                    $categorie->addSousCategories($assoIng);
                }
                $assoEtablissements = $this->testsForListeEtablissements($ligne, $categorie);
                if ($assoEtablissements != null) {
                    $categorie->addEtablissements($assoEtablissements);
                }
                $assoZones = $this->testsForListeZone($ligne, $categorie);
                if ($assoZones != null) {
                    $categorie->addZone($assoZones);
                }
                if (count($lignes) != ($i + 1)) {
                    if ($ligne->categorie_id != $lignes[$i + 1]->categorie_id) {
                        array_push($liste, $categorie);
                        $categorie = new Categorie();
                    }
                } else {
                    array_push($liste, $categorie);
                    $categorie = new Categorie();
                }
            } else if ($i == 0) {
                $assoPrix1 = $this->testsForListeSousCategorie($ligne, $categorie);
                if ($assoPrix1 != null) {
                    $categorie->addSousCategories($assoPrix1);
                }
                $assoEtablissements = $this->testsForListeEtablissements($ligne, $categorie);
                if ($assoEtablissements != null) {
                    $categorie->addEtablissements($assoEtablissements);
                }
                $assoZones = $this->testsForListeZone($ligne, $categorie);
                if ($assoZones != null) {
                    $categorie->addZone($assoZones);
                }
                if (count($lignes) != ($i + 1)) {
                    if ($ligne->categorie_id != $lignes[$i + 1]->categorie_id) {
                        array_push($liste, $categorie);
                        $categorie = new Categorie();
                    }
                } else {
                    array_push($liste, $categorie);
                }
            } else if ($ligne->categorie_id != $idProdAfter) {
                $assoPrix1 = $this->testsForListeSousCategorie($ligne, $categorie);
                if ($assoPrix1 != null) {
                    $categorie->addSousCategories($assoPrix1);
                }
                $assoEtablissements = $this->testsForListeEtablissements($ligne, $categorie);
                if ($assoEtablissements != null) {
                    $categorie->addEtablissements($assoEtablissements);
                }
                $assoZones = $this->testsForListeZone($ligne, $categorie);
                if ($assoZones != null) {
                    $categorie->addZone($assoZones);
                }
                if (count($lignes) != ($i + 1)) {
                    if ($ligne->categorie_id != $lignes[$i + 1]->categorie_id) {
                        array_push($liste, $categorie);
                        $categorie = new Categorie();
                    }
                } else {
                    array_push($liste, $categorie);
                    $categorie = new Categorie();
                }
            }
            $idProdAfter = $ligne->categorie_id;
        }
        if (count($liste) == 1) {
            $ret = $liste[0];
        } else {
            $ret = $liste;
        }
        return $ret;
    }

    private function testsForListeSousCategorie($ligne, Categorie $produit) {
        $isHerePrix = false;
        for ($j = 0; $j < count($produit->getSousCategories()); $j++) {
            $cats = $produit->getSousCategories();
            if ($cats[$j]->id == $ligne->souscategorie_ID) {
                $isHerePrix = true;
                break;
            }
        }if (!$isHerePrix) {
            return ($this->createSousCategorie($ligne));
        } else {
            return null;
        }
    }

    private function testsForListeZone($ligne, Categorie $produit) {
        $isHerePrix = false;
        for ($j = 0; $j < count($produit->getZones()); $j++) {
            $prod = $produit->getZones();
            if (intval($prod[$j]) == intval($ligne->association_etablissement_categorie_id_zone)) {
                $isHerePrix = true;
                break;
            }
        }if (!$isHerePrix) {
            return intval($ligne->association_etablissement_categorie_id_zone);
        } else {
            return null;
        }
    }

    private function testsForListeEtablissements($ligne, Categorie $produit) {
        $isHerePrix = false;
        if (isset($ligne->association_etablissement_categorie_id_etablissement)) {
            for ($j = 0; $j < count($produit->getEtablissements()); $j++) {
                $prod = $produit->getEtablissements();
                if (intval($prod[$j]) == intval($ligne->association_etablissement_categorie_id_etablissement)) {
                    $isHerePrix = true;
                    break;
                }
            }
            if (!$isHerePrix) {
                if ($ligne->association_etablissement_categorie_id_etablissement == null) {
                    return null;
                } else {
                    return intval($ligne->association_etablissement_categorie_id_etablissement);
                }
            } else {
                return null;
            }
        } else {
            return null;
        }
    }

    private function createSousCategorie($ligne) {
        $sousCategorie = null;
        if ($ligne->souscategorie_ID != null) {
            $sousCategorie = new SousCategorie();
            $sousCategorie->setId(intval($ligne->souscategorie_ID));
            $sousCategorie->setNom($ligne->souscategorie_NOM);
            $sousCategorie->setPriorite(intval($ligne->souscategorie_priorite));
            $sousCategorie->setCategorie(intval($ligne->categorie_id));
        }
        return $sousCategorie;
    }

}
