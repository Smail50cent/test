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
include_once $path . 'service/logique/entity/AssociationEtablissementCategorie.php';

class CategorieServiceDataImpl implements CategorieServiceData {

    public function getAll() {
        $bdd = new ConnexionBDD();
        $retour = $bdd->executeGeneric("SELECT
etablissement.nom as etablissement_nom,
categorie.id AS categorie_id,
categorie.nom AS categorie_nom,
association_etablissement_categorie.priorite AS categorie_priorite,
souscategorie.ID AS souscategorie_ID,
souscategorie.NOM AS souscategorie_NOM,
souscategorie.priorite AS souscategorie_priorite,
association_etablissement_categorie.id_etablissement AS association_etablissement_categorie_id_etablissement,
association_etablissement_categorie.id_zone AS association_etablissement_categorie_id_zone
FROM `categorie`
LEFT JOIN souscategorie ON souscategorie.categorie_id = categorie.id
LEFT JOIN association_etablissement_categorie ON association_etablissement_categorie.id_categorie = categorie.id
LEFT JOIN etablissement ON etablissement.id = association_etablissement_categorie.id_etablissement
ORDER BY association_etablissement_categorie_id_etablissement ASC, categorie_priorite ASC");
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

    public function add(Categorie $categorie) {
        $bdd = new ConnexionBDD();
        try {
            $bdd->beginTTransaction();
            $idCategorie = $bdd->executeGeneric("INSERT INTO categorie(nom,priorite) VALUES('" . $categorie->nom . "',0)");
            if ($categorie->getSousCategories() != null) {
                for ($i = 0; $i < count($categorie->getSousCategories()); $i++) {
                    $bdd->executeGeneric("INSERT INTO souscategorie(NOM,categorie_id,priorite)"
                            . "VALUES('" . $categorie->getSousCategories()[$i]->getNom() . "',"
                            . " '" . $idCategorie . "', '" . $categorie->getSousCategories()[$i]->getPriorite() . "') ");
                }
            }
            if ($categorie->getEtablissements() != null) {
                for ($i = 0; $i < count($categorie->getEtablissements()); $i++) {
                    if ($categorie->getEtablissements()[$i]->getZones() != null) {
                        $idassoc = $bdd->executeGeneric("INSERT INTO association_etablissement_categorie(id_categorie,id_etablissement,id_zone,priorite) "
                                . "SELECT '" . $idCategorie . "','" . $categorie->getEtablissements()[$i]->getId() . "','" . $categorie->getEtablissements()[$i]->getZones() . "',"
                                . " MAX(priorite)+1 
                                    FROM association_etablissement_categorie
                                    WHERE id_etablissement = '" . $categorie->getEtablissements()[$i]->getId() . "' 
                                    GROUP BY id_etablissement");
                    } else {
                        $idassoc = $bdd->executeGeneric("INSERT INTO association_etablissement_categorie(id_categorie,id_etablissement,id_zone,priorite) "
                                . "SELECT '" . $idCategorie . "','" . $categorie->getEtablissements()[$i]->getId() . "',NULL,"
                                . " MAX(priorite)+1 
                                    FROM association_etablissement_categorie
                                    WHERE id_etablissement = '" . $categorie->getEtablissements()[$i]->getId() . "' 
                                    GROUP BY id_etablissement");
                    }
                }
            }
            $bdd->commitTransaction();
            return $idCategorie;
        } catch (Exception $ex) {
            $bdd->rollbackTransaction();
            echo "Error During Categorie INSERT" . $ex->getMessage();
        }
    }

    public function getByEtablissementAndZone($etablissement, $zone) {
        $bdd = new ConnexionBDD();
        $retour = $bdd->executeGeneric("SELECT
etablissement.nom as etablissement_nom,
categorie.id AS categorie_id,
categorie.nom AS categorie_nom,
association_etablissement_categorie.priorite AS categorie_priorite,
souscategorie.ID AS souscategorie_ID,
souscategorie.NOM AS souscategorie_NOM,
souscategorie.priorite AS souscategorie_priorite,
association_etablissement_categorie.id_etablissement AS association_etablissement_categorie_id_etablissement,
association_etablissement_categorie.id_zone AS association_etablissement_categorie_id_zone
FROM `categorie`
LEFT JOIN souscategorie ON souscategorie.categorie_id = categorie.id
LEFT JOIN association_etablissement_categorie ON association_etablissement_categorie.id_categorie = categorie.id
LEFT JOIN etablissement ON etablissement.id = association_etablissement_categorie.id_etablissement
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
                if ($assoEtablissements != null) {
                    $etablissement = new Etablissement();
                    $etablissement->setId($assoEtablissements);
                    $etablissement->setNom($ligne->etablissement_nom);
                    if ($assoZones != null) {
                        $etablissement->setZone($assoZones);
                    }
                    $categorie->setAssocEtabZone($etablissement);
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
                if ($assoEtablissements != null) {
                    $etablissement = new Etablissement();
                    $etablissement->setId($assoEtablissements);
                    $etablissement->setNom($ligne->etablissement_nom);
                    if ($assoZones != null) {
                        $etablissement->setZone($assoZones);
                    }
                    $categorie->setAssocEtabZone($etablissement);
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
                if ($assoEtablissements != null) {
                    $etablissement = new Etablissement();
                    $etablissement->setId($assoEtablissements);
                    $etablissement->setNom($ligne->etablissement_nom);
                    if ($assoZones != null) {
                        $etablissement->setZone($assoZones);
                    }
                    $categorie->setAssocEtabZone($etablissement);
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

    public function delete($id) {
        $bdd = new ConnexionBDD();
        $bdd->executeGeneric("DELETE FROM categorie WHERE id=" . $id);
    }

    public function getPriorite($id) {
        $bdd = new ConnexionBDD();
        $assoc = array();
        $retour = $bdd->executeGeneric("SELECT * FROM association_etablissement_categorie WHERE id_categorie=" . $id);
        while ($ligne = $retour->fetch()) {
            $assocEtabCategorie = new AssociationEtablissementCategorie();
            $assocEtabCategorie->setCategorie_id(intval($ligne->id_categorie));
            $assocEtabCategorie->setEtablissement_id(intval($ligne->id_etablissement));
            $assocEtabCategorie->setPriorite(intval($ligne->priorite));
            array_push($assoc, $assocEtabCategorie);
        }
        return $assoc;
    }

    public function updatePriority($categories) {
        $bdd = new ConnexionBDD();
        for ($i = 0; $i < count($categories); $i++) {
            $bdd->executeGeneric("UPDATE association_etablissement_categorie "
                    . "SET priorite = '" . $categories[$i]->getPriorite() . "' "
                    . "WHERE id_categorie = '" . $categories[$i]->getId() . "' "
                    . "AND id_etablissement = '" . $categories[$i]->getEtablissements()[0]->getId() . "' ");
        }
        return true;
    }

    public function getByIdForUpdate($id) {
        $bdd = new ConnexionBDD();
        $retour = $bdd->executeGeneric("SELECT
etablissement.nom as etablissement_nom,
categorie.id AS categorie_id,
categorie.nom AS categorie_nom,
association_etablissement_categorie.priorite AS categorie_priorite,
souscategorie.ID AS souscategorie_ID,
souscategorie.NOM AS souscategorie_NOM,
souscategorie.priorite AS souscategorie_priorite,
association_etablissement_categorie.id_etablissement AS association_etablissement_categorie_id_etablissement,
association_etablissement_categorie.id_zone AS association_etablissement_categorie_id_zone
FROM `categorie`
LEFT JOIN souscategorie ON souscategorie.categorie_id = categorie.id
LEFT JOIN association_etablissement_categorie ON association_etablissement_categorie.id_categorie = categorie.id
LEFT JOIN etablissement ON etablissement.id = association_etablissement_categorie.id_etablissement
WHERE categorie.id =" . $id);
        return $this->parse($retour);
    }

    public function update(Categorie $categorie) {
        $oldCat = $this->getByIdForUpdate($categorie->getId());
        $bdd = new ConnexionBDD();
        $up = 0;
        try {
            $bdd->beginTTransaction();
            $up += $this->updateCategorie($categorie, $oldCat, $bdd);
            $up += $this->updateAssociationEtablissementCategorie($categorie, $oldCat, $bdd);
            $up += $this->updateSousCategorie($categorie, $oldCat, $bdd);
            $bdd->commitTransaction();
            return $up;
        } catch (Exception $ex) {
            $bdd->rollbackTransaction();
        }
    }

    public function updateCategorie(Categorie $categorie, $oldCat, $bdd) {
        $oldnom = $oldCat->nom;
        $nom = $categorie->getNom();
        $id = $categorie->getId();
        $up = 0;
        if (strcmp($nom, $oldnom) !== 0) {
            $bdd->executeGeneric("UPDATE categorie "
                    . "SET nom = '" . $nom . "' "
                    . "WHERE id = '" . $id . "' ");
            $up = 1;
        }
        return $up;
    }

    public function updateAssociationEtablissementCategorie(Categorie $categorie, $oldCat, $bdd) {
        $idCategorie = $categorie->getId();
        $etab = $oldCat->assocEtabZone;
        $newEtab = $categorie->getEtablissements();
        $oldEtab = array();
        $reqSql = "";
        $up = 0;

        if ($etab != null) {
            for ($j = 0; $j < count($etab); $j++) {
                array_push($oldEtab, $etab[$j]);
            }
            if ($newEtab != null) {
                for ($i = 0; $i < count($newEtab); $i++) {
                    $state = 0;
                    for ($j = 0; $j < count($oldEtab); $j++) {
                        if ($newEtab[$i]->getId() == $oldEtab[$j]->id && $newEtab[$i]->getZones() == $oldEtab[$j]->zone) {
                            $state = 1;
                            unset($oldEtab[$j]);
                            $oldEtab = array_values($oldEtab);
                            break;
                        }
                    }
                    if ($state == 0) {
                        if ($newEtab[$i]->getZones() != null) {
                            $bdd->executeGeneric(" INSERT INTO association_etablissement_categorie(id_categorie,id_etablissement,id_zone,priorite) "
                                    . "SELECT '" . $idCategorie . "','" . $newEtab[$i]->getId() . "','" . $newEtab[$i]->getZones() . "',"
                                    . " MAX(priorite)+1 
                                    FROM association_etablissement_categorie
                                    WHERE id_etablissement = '" . $newEtab[$i]->getId() . "' 
                                    GROUP BY id_etablissement;");
                            $up = 1;
                        } else {
                            $bdd->executeGeneric(" INSERT INTO association_etablissement_categorie(id_categorie,id_etablissement,id_zone,priorite) "
                                    . "SELECT '" . $idCategorie . "','" . $newEtab[$i]->getId() . "',NULL,"
                                    . " MAX(priorite)+1 
                                    FROM association_etablissement_categorie
                                    WHERE id_etablissement = '" . $newEtab[$i]->getId() . "' 
                                    GROUP BY id_etablissement;");
                            $up = 1;
                        }
                    }
                }
                for ($j = 0; $j < count($oldEtab); $j++) {
                    if (empty($oldEtab[$j]->zone)) {
                        $bdd->executeGeneric("DELETE FROM `association_etablissement_categorie` WHERE `id_etablissement` = '" . $oldEtab[$j]->id . "' "
                                . "AND `id_zone` IS NULL "
                                . "AND  `id_categorie` = '" . $idCategorie . "'  ");
                        $up = 1;
                    } else {
                        $bdd->executeGeneric("DELETE FROM `association_etablissement_categorie` WHERE `id_etablissement` = '" . $oldEtab[$j]->id . "' "
                                . "AND `id_zone` = '" . $oldEtab[$j]->zone . "' "
                                . "AND  `id_categorie` = '" . $idCategorie . "'  ");
                        $up = 1;
                    }
                }
            }
        } else {
            for ($i = 0; $i < count($newEtab); $i++) {
                if ($newEtab[$i]->getZones() != null) {
                    $bdd->executeGeneric(" INSERT INTO association_etablissement_categorie(id_categorie,id_etablissement,id_zone,priorite) "
                            . "SELECT '" . $idCategorie . "','" . $newEtab[$i]->getId() . "','" . $newEtab[$i]->getZones() . "',"
                            . " MAX(priorite)+1 
                                    FROM association_etablissement_categorie
                                    WHERE id_etablissement = '" . $newEtab[$i]->getId() . "' 
                                    GROUP BY id_etablissement;");
                    $up = 1;
                } else {
                    $bdd->executeGeneric(" INSERT INTO association_etablissement_categorie(id_categorie,id_etablissement,id_zone,priorite) "
                            . "SELECT '" . $idCategorie . "','" . $newEtab[$i]->getId() . "',NULL,"
                            . " MAX(priorite)+1 
                                    FROM association_etablissement_categorie
                                    WHERE id_etablissement = '" . $newEtab[$i]->getId() . "' 
                                    GROUP BY id_etablissement;");
                    $up = 1;
                }
            }
        }
//            if ($reqSql != "") {
//                $bdd->executeGeneric($reqSql);
//                $up = 1;
//            }

        return $up;
    }

    public function updateSousCategorie(Categorie $categorie, $oldCat, $bdd) {
        $idCategorie = $categorie->getId();
        $newSouscategorie = $categorie->getSousCategories();
        $souscategorie = $oldCat->souscategorie;
        $oldsousCat = array();
        $up = 0;

        if ($souscategorie != null) {
            for ($j = 0; $j < count($souscategorie); $j++) {
                array_push($oldsousCat, $souscategorie[$j]);
            }
            if ($newSouscategorie != null) {
                for ($i = 0; $i < count($newSouscategorie); $i++) {
                    $state = 0;
                    for ($j = 0; $j < count($oldsousCat); $j++) {
                        if ($newSouscategorie[$i]->getNom() == $oldsousCat[$j]->nom) {
                            $state = 1;
                            unset($oldsousCat[$j]);
                            $oldsousCat = array_values($oldsousCat);
                            break;
                        }
                    }
                    if ($state == 0) {
                        $bdd->executeGeneric("INSERT INTO souscategorie(NOM,categorie_id,priorite)"
                                . "VALUES('" . $newSouscategorie[$i]->getNom() . "',"
                                . " '" . $idCategorie . "', '" . $newSouscategorie[$i]->getPriorite() . "') ");
                        $up = 1;
                    }
                }
                for ($j = 0; $j < count($oldsousCat); $j++) {
                    $bdd->executeGeneric("DELETE FROM `souscategorie`"
                            . "WHERE `NOM` = '" . $oldsousCat[$j]->nom . "' "
                            . "AND `categorie_id` = '" . $idCategorie . "'");
                    $up = 1;
                }
            } else {
                $bdd->executeGeneric("DELETE FROM `souscategorie`"
                        . "WHERE `categorie_id` = '" . $idCategorie . "'");
                $up = 1;
            }
        } else {
            for ($i = 0; $i < count($newSouscategorie); $i++) {
                $bdd->executeGeneric("INSERT INTO souscategorie(NOM,categorie_id,priorite)"
                        . "VALUES('" . $newSouscategorie[$i]->getNom() . "',"
                        . " '" . $idCategorie . "', '" . $newSouscategorie[$i]->getPriorite() . "') ");
                $up = 1;
            }
        }
    }

}
