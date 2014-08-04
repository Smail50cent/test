<?php

/**
 * Description of CategorieServiceDataImpl
 *
 * @author Damien Chesneau <contact@damienchesneau.fr>
 */
include_once $path . 'service/persistance/ProduitServiceData.php';
include_once $path . 'service/persistance/ConnexionBDD.php';
include_once $path . 'service/logique/entity/Produit.php';
include_once $path . 'service/logique/entity/Categorie.php';
include_once $path . 'service/logique/entity/SousCategorie.php';
include_once $path . 'service/logique/entity/AssociationProduitIngredients.php';
include_once $path . 'service/logique/entity/AssociationProduitPrix.php';
include_once $path . 'service/logique/entity/Option.php';
include_once $path . 'service/logique/entity/OptionPossibilite.php';

class ProduitServiceDataImpl implements ProduitServiceData {

    public function getAll() {
        $bdd = new ConnexionBDD();
        $retour = $bdd->executeGeneric("SELECT produit.ID AS produit_id,
produit.NOM AS produit_nom,
produit.options AS produit_options,
produit.level AS produit_level,
categorie.id AS categorie_id,
categorie.nom AS categorie_nom,
categorie.priorite AS categorie_priorite,
souscategorie.ID AS souscategorie_id,
souscategorie.NOM AS souscategorie_nom,  
souscategorie.categorie_id AS souscategorie_categorie_id,
souscategorie.priorite AS souscategorie_priorite,
taux_tva.taux_tva AS produit_taux_tva,
association_produit_prix.id AS association_produit_prix_id,
association_produit_prix.heureDebut AS association_produit_prix_heureDebut,
association_produit_prix.heureFin AS association_produit_prix_heureFin,
association_produit_prix.produit_id AS association_produit_prix_produit_id,
prixHt.id AS prixHt_id,
prixHt.prix AS prixHt_prix,
zone_table.id AS zone_table_id, 
zone_table.nom AS zone_table_nom,
association_produit_ingredient.id AS association_produit_ingredient_id,
association_produit_ingredient.id_produit AS association_produit_ingredient_id_produit,
association_produit_ingredient.id_ingredient AS association_produit_ingredient_id_ingredient,
association_produit_ingredient.isAdded AS association_produit_ingredient_isAdded,
association_produit_ingredient.surcout AS association_produit_ingredient_surcout,
association_produit_ingredient.supprimable AS association_produit_ingredient_supprimable,
association_produit_ingredient.isIngredientSup AS association_produit_ingredient_isIngredientSup,	
association_etablissement_produit.id_etablissement AS association_produit_ingredient_id_etablissement,	
association_etablissement_produit.id_zone AS association_produit_etablissement_id_zone,
association_etablissement_produit.id_zone AS association_produit_etablissement_id_zone,
options.id AS option_id,
options.nom AS option_nom,
options.label AS option_label,
option_possibilite.id AS option_possibilite_id,
option_possibilite.nom AS option_possibilite_nom
FROM produit 
LEFT JOIN association_produit_prix ON association_produit_prix.produit_id = produit.id 
LEFT JOIN souscategorie ON souscategorie.ID = produit.sousCategorie
LEFT JOIN categorie ON categorie.id = produit.CATEGORIE_ID 
LEFT JOIN taux_tva ON taux_tva.id_tva = produit.TVA 
LEFT JOIN prixHt ON prixHt.id = association_produit_prix.prixht_id 
LEFT JOIN association_produit_ingredient ON produit.id= association_produit_ingredient.id_produit
LEFT JOIN zone_table ON zone_table.id= association_produit_prix.zone_table_id 
LEFT JOIN association_etablissement_produit ON association_etablissement_produit.id_produit= produit.ID
LEFT JOIN association_produit_options ON association_produit_options.produit_id = produit.ID
LEFT JOIN options ON options.id = association_produit_options.option_id
LEFT JOIN option_possibilite ON option_possibilite.id_option = options.id");
        return $this->parseProduit($retour, true);
    }

    private function parseProduit($resultSet, $isListeRet) {
        $assoPrixId;
        $idProdAfter = null;
        $liste = array();
        $ret;
        $assoPrix = array();
        $assoIngredient = array();
        $produit = new Produit();
        $i = 0;
        $lignes = $resultSet->fetchAll();
        for ($i = 0; $i < count($lignes); $i++) {
            $ligne = $lignes[$i];
            $produit->setId(intval($ligne->produit_id));
            $categorie = new Categorie();
            $categorie->setId(intval($ligne->categorie_id));
            $categorie->setNom($ligne->categorie_nom);
            $categorie->setPriorite(intval($ligne->categorie_priorite));
            $produit->setCategorie($categorie);
            $produit->setNom($ligne->produit_nom);
            $sousCategorie = new SousCategorie();
            $sousCategorie->setCategorie($ligne->souscategorie_categorie_id);
            $sousCategorie->setId($ligne->souscategorie_id);
            $sousCategorie->setNom($ligne->souscategorie_nom);
            $sousCategorie->setPriorite($ligne->souscategorie_priorite);
            $produit->setSousCategorie($sousCategorie);
            $produit->setTauxTva(floatval($ligne->produit_taux_tva));
            $produit->setLevel($ligne->produit_level);
            if ($ligne->produit_id == $idProdAfter) {
                $assoPrix1 = $this->testsForListePrix($ligne, $produit);
                if ($assoPrix1 != null) {
                    $produit->addAssociationPrixProduit($assoPrix1);
                }
                $assoIng = $this->testsForListeIngredient($ligne, $produit);
                if ($assoIng != null) {
                    $produit->addIngredients($assoIng);
                }
                $assoEtablissements = $this->testsForListeEtablissements($ligne, $produit);
                if ($assoEtablissements != null) {
                    $produit->addEtablissements($assoEtablissements);
                }
                $assoZones = $this->testsForListeZone($ligne, $produit);
                if ($assoZones != null) {
                    $produit->addZone($assoZones);
                }
                $assoOp = $this->testAddOption($ligne, $produit);
                if ($assoOp != null) {
                    $produit->addOption($assoOp);
                }
                if (count($lignes) != ($i + 1)) {
                    if ($ligne->produit_id != $lignes[$i + 1]->produit_id) {
                        $op = $produit->getOptions();

                        if ($op[0]->getId() == 0) {
                            $produit->setOptions(null);
                        }
                        array_push($liste, $produit);
                        $assoPrix = array();
                        $assoIngredient = array();
                        $produit = new Produit();
                    }
                } else {
                    $op = $produit->getOptions();

                    if ($op[0]->getId() == 0) {
                        $produit->setOptions(null);
                    }
                    array_push($liste, $produit);
                    $assoPrix = array();
                    $assoIngredient = array();
                    $produit = new Produit();
                }
            } else if ($i == 0) {
                $assoPrix1 = $this->testsForListePrix($ligne, $produit);
                if ($assoPrix1 != null) {
                    $produit->addAssociationPrixProduit($assoPrix1);
                }
                $assoIng = $this->testsForListeIngredient($ligne, $produit);
                if ($assoIng != null) {
                    $produit->addIngredients($assoIng);
                }
                $assoEtablissements = $this->testsForListeEtablissements($ligne, $produit);
                if ($assoEtablissements != null) {
                    $produit->addEtablissements($assoEtablissements);
                }
                $assoZones = $this->testsForListeZone($ligne, $produit);
                if ($assoZones != null) {
                    $produit->addZone($assoZones);
                }

                $assoOp = $this->testAddOption($ligne, $produit);
                if ($assoOp != null) {
                    $produit->addOption($assoOp);
                }

                if (count($lignes) != ($i + 1)) {
                    if ($ligne->produit_id != $lignes[$i + 1]->produit_id) {
                        $op = $produit->getOptions();

                        if ($op[0]->getId() == 0) {
                            $produit->setOptions(null);
                        }
                        array_push($liste, $produit);
                        $produit = new Produit();
                    }
                } else {
                    array_push($liste, $produit);
                }
            } else if ($ligne->produit_id != $idProdAfter) {
                $assoPrix1 = $this->testsForListePrix($ligne, $produit);
                if ($assoPrix1 != null) {
                    $produit->addAssociationPrixProduit($assoPrix1);
                }
                $assoIng = $this->testsForListeIngredient($ligne, $produit);
                if ($assoIng != null) {
                    $produit->addIngredients($assoIng);
                }
                $assoEtablissements = $this->testsForListeEtablissements($ligne, $produit);
                if ($assoEtablissements != null) {
                    $produit->addEtablissements($assoEtablissements);
                }
                $assoZones = $this->testsForListeZone($ligne, $produit);
                if ($assoZones != null) {
                    $produit->addZone($assoZones);
                }
                $assoOp = $this->testAddOption($ligne, $produit);
                if ($assoOp != null) {
                    $produit->addOption($assoOp);
                }
                if (count($lignes) != ($i + 1)) {
                    if ($ligne->produit_id != $lignes[$i + 1]->produit_id) {
                        $op = $produit->getOptions();

                        if ($op[0]->getId() == 0) {
                            $produit->setOptions(null);
                        }
                        array_push($liste, $produit);
                        $produit = new Produit();
                    }
                } else {
                    $op = $produit->getOptions();

                    if ($op[0]->getId() == 0) {
                        $produit->setOptions(null);
                    }
                    array_push($liste, $produit);
                    $produit = new Produit();
                }
            }
            $idProdAfter = $ligne->produit_id;
        }
        if ($isListeRet) {
            $ret = $liste;
        } else {
            if (count($liste) == 1) {
                $ret = $liste[0];
            } else {
                $ret = $liste;
            }
        }
        return $ret;
    }

    private function testAddOption($ligne, Produit $produit) {
        $isHerePrix = false;
        $i = 0;
        for ($j = 0; $j < count($produit->getOptions()); $j++) {
            $prod = $produit->getOptions();
            if ($prod[$j]->id == $ligne->option_id) {
                $isHerePrix = true;
                $i = $j;
                break;
            }
        }
        if (!$isHerePrix) {
            $op = new Option();
            $op->setId($ligne->option_id);
            $op->setLabel($ligne->option_label);
            $op->setNom($ligne->option_nom);
            return $op;
        } else {
            $isHerePos = false;
            $op=$produit->getOptions();
           $o=$op [$i];
            for ($j = 0; $j < count($o->getPossibilite()); $j++) {
                $prod = $produit->getOptions();
                $pr=$o->getPossibilite();
               
                if ( $pr[$j]->id == $ligne->option_possibilite_id) {
                    $isHerePos = true;
                    break;
                }
            }
            if (!$isHerePos) {
                $posibilite = new OptionPossibilite();
                $posibilite->setId($ligne->option_possibilite_id);
                $posibilite->setNom($ligne->option_possibilite_nom);
                $o->addPossibiliteOptions($posibilite);
            }
            return null;
        }
    }

    private function testsForListePrix($ligne, Produit $produit) {
        $isHerePrix = false;
        for ($j = 0; $j < count($produit->getAssociationPrixProduit()); $j++) {
            $prod = $produit->getAssociationPrixProduit();
            if ($prod[$j]->id == $ligne->association_produit_prix_id) {
                $isHerePrix = true;
                break;
            }
        }if (!$isHerePrix) {
            return ($this->parseAssociation($ligne));
        } else {
            return null;
        }
    }

    private function testsForListeZone($ligne, Produit $produit) {
        $isHerePrix = false;
        for ($j = 0; $j < count($produit->getZones()); $j++) {
            $prod = $produit->getZones();
            if (intval($prod[$j]) == intval($ligne->association_produit_etablissement_id_zone)) {
                $isHerePrix = true;
                break;
            }
        }if (!$isHerePrix) {
            return intval($ligne->association_produit_etablissement_id_zone);
        } else {
            return null;
        }
    }

    private function testsForListeEtablissements($ligne, Produit $produit) {
        $isHerePrix = false;
        if (isset($ligne->association_produit_ingredient_id_etablissement)) {
            for ($j = 0; $j < count($produit->getEtablissements()); $j++) {
                $prod = $produit->getEtablissements();
                if (intval($prod[$j]) == intval($ligne->association_produit_ingredient_id_etablissement)) {
                    $isHerePrix = true;
                    break;
                }
            }
            if (!$isHerePrix) {
                if ($ligne->association_produit_ingredient_id_etablissement == null) {
                    return null;
                } else {
                    return intval($ligne->association_produit_ingredient_id_etablissement);
                }
            } else {
                return null;
            }
        } else {
            return null;
        }
    }

    private function testsForListeIngredient($ligne, Produit $produit) {
        $isHereIng = false;
        for ($j = 0; $j < count($produit->getIngredients()); $j++) {
            $pro = $produit->getIngredients();
            if (intval($pro[$j]->ingredient) == intval($ligne->association_produit_ingredient_id_ingredient)) {
                $isHereIng = true;
                break;
            }
        }
        if (!$isHereIng) {
            return $this->parseAssociationIngredient($ligne);
        } else {
            return null;
        }
    }

    private function parseAssociationIngredient($ligne) {
        return new AssociationProduitIngredients(intval($ligne->produit_id), intval($ligne->association_produit_ingredient_id_ingredient), $ligne->association_produit_ingredient_isAdded, $ligne->association_produit_ingredient_surcout, $ligne->association_produit_ingredient_supprimable, $ligne->association_produit_ingredient_isIngredientSup);
    }

    private function parseAssociation($ligne) {
        $associationProduitPrix = new AssociationProduitPrix();
        $associationProduitPrix->setId($ligne->association_produit_prix_id);
        $dateDebut = null;
        $dateFin = null;
        $heureDebut = null;
        $heureFin = null;
        $minutesDebut = null;
        $minutesFin = null;
        if ($ligne->association_produit_prix_heureDebut != null) {
            $dateDebut = new DateTime($ligne->association_produit_prix_heureDebut);
            $dateDebut = $dateDebut->format('Y-m-d H:i:s');
            $heureDebut = new DateTime($ligne->association_produit_prix_heureDebut);
            $heureDebut = intval($heureDebut->format('H'));
            $minutesDebut = new DateTime($ligne->association_produit_prix_heureDebut);
            $minutesDebut = intval($minutesDebut->format('i'));
            $dateFin = new DateTime($ligne->association_produit_prix_heureFin);
            $dateFin = $dateFin->format('Y-m-d');
            $minutesFin = new DateTime($ligne->association_produit_prix_heureFin);
            $minutesFin = intval($minutesFin->format('i'));
            $heureFin = new DateTime($ligne->association_produit_prix_heureFin);
            $heureFin = intval($heureFin->format('H'));
        }
        $associationProduitPrix->setMinutesDebut($minutesDebut);
        $associationProduitPrix->setMinutesFin($minutesFin);
        $associationProduitPrix->setDateDebut($dateDebut);
        $associationProduitPrix->setHeureDebut($heureDebut);
        $associationProduitPrix->setDateFin($dateFin);
        $associationProduitPrix->setHeureFin($heureFin);
        $prixHT = new PrixHT();
        $prixHT->setId($ligne->prixHt_id);
        $prixHT->setPrix($ligne->prixHt_prix);
        $associationProduitPrix->setPrixHt($prixHT);
        $zoneTable = new ZoneTable();
        $zoneTable->setId($ligne->zone_table_id);
        $zoneTable->setNom($ligne->zone_table_nom);
        $associationProduitPrix->setZoneTable($zoneTable);
        return $associationProduitPrix;
    }

    public function getById($id) {
        $bdd = new ConnexionBDD();
        $retour = $bdd->executeGeneric("SELECT 
produit.ID AS produit_id,
produit.NOM AS produit_nom,
produit.options AS produit_options,
produit.level AS produit_level,
categorie.id AS categorie_id,
categorie.nom AS categorie_nom,
categorie.priorite AS categorie_priorite,
souscategorie.ID AS souscategorie_id,
souscategorie.NOM AS souscategorie_nom,  
souscategorie.categorie_id AS souscategorie_categorie_id,
souscategorie.priorite AS souscategorie_priorite,
taux_tva.taux_tva AS produit_taux_tva,
association_produit_prix.id AS association_produit_prix_id,
association_produit_prix.heureDebut AS association_produit_prix_heureDebut,
association_produit_prix.heureFin AS association_produit_prix_heureFin,
association_produit_prix.produit_id AS association_produit_prix_produit_id,
prixHt.id AS prixHt_id,
prixHt.prix AS prixHt_prix,
zone_table.id AS zone_table_id, 
zone_table.nom AS zone_table_nom,
association_produit_ingredient.id AS association_produit_ingredient_id,
association_produit_ingredient.id_produit AS association_produit_ingredient_id_produit,
association_produit_ingredient.id_ingredient AS association_produit_ingredient_id_ingredient,
association_produit_ingredient.isAdded AS association_produit_ingredient_isAdded,
association_produit_ingredient.surcout AS association_produit_ingredient_surcout,
association_produit_ingredient.supprimable AS association_produit_ingredient_supprimable,
association_produit_ingredient.isIngredientSup AS association_produit_ingredient_isIngredientSup,
association_etablissement_produit.id_etablissement AS association_produit_ingredient_id_etablissement,
association_etablissement_produit.id_zone AS association_produit_etablissement_id_zone,
options.id AS option_id,
options.nom AS option_nom,
options.label AS option_label,
option_possibilite.id AS option_possibilite_id,
option_possibilite.nom AS option_possibilite_nom
FROM produit 
LEFT JOIN association_produit_prix ON association_produit_prix.produit_id = produit.id 
LEFT JOIN souscategorie ON souscategorie.ID = produit.sousCategorie
LEFT JOIN categorie ON categorie.id = produit.CATEGORIE_ID 
LEFT JOIN taux_tva ON taux_tva.id_tva = produit.TVA 
LEFT JOIN association_produit_options ON association_produit_options.produit_id = produit.ID
LEFT JOIN options ON options.id = association_produit_options.option_id
LEFT JOIN option_possibilite ON option_possibilite.id_option = options.id
LEFT JOIN prixHt ON prixHt.id = association_produit_prix.prixht_id 
LEFT JOIN association_produit_ingredient ON produit.id= association_produit_ingredient.id_produit
LEFT JOIN association_etablissement_produit ON association_etablissement_produit.id_produit= produit.ID
LEFT JOIN zone_table ON zone_table.id= association_produit_prix.zone_table_id WHERE produit.id = " . $id);
        return $this->parseProduit($retour, false);
    }

    public function getProduitByCategorieId($id) {
        $bdd = new ConnexionBDD();
        $retour = $bdd->executeGeneric("SELECT 
produit.ID AS produit_id,
produit.NOM AS produit_nom,
produit.options AS produit_options,
produit.level AS produit_level,
categorie.id AS categorie_id,
categorie.nom AS categorie_nom,
categorie.priorite AS categorie_priorite,
souscategorie.ID AS souscategorie_id,
souscategorie.NOM AS souscategorie_nom,  
souscategorie.categorie_id AS souscategorie_categorie_id,
souscategorie.priorite AS souscategorie_priorite,
taux_tva.taux_tva AS produit_taux_tva,
association_produit_prix.id AS association_produit_prix_id,
association_produit_prix.heureDebut AS association_produit_prix_heureDebut,
association_produit_prix.heureFin AS association_produit_prix_heureFin,
association_produit_prix.produit_id AS association_produit_prix_produit_id,
prixHt.id AS prixHt_id,
prixHt.prix AS prixHt_prix,
zone_table.id AS zone_table_id, 
zone_table.nom AS zone_table_nom,
association_produit_ingredient.id AS association_produit_ingredient_id,
association_produit_ingredient.id_produit AS association_produit_ingredient_id_produit,
association_produit_ingredient.id_ingredient AS association_produit_ingredient_id_ingredient,
association_produit_ingredient.isAdded AS association_produit_ingredient_isAdded,
association_produit_ingredient.surcout AS association_produit_ingredient_surcout,
association_produit_ingredient.supprimable AS association_produit_ingredient_supprimable,
association_produit_ingredient.isIngredientSup AS association_produit_ingredient_isIngredientSup,
association_etablissement_produit.id_etablissement AS association_produit_ingredient_id_etablissement,
association_etablissement_produit.id_zone AS association_produit_etablissement_id_zone,
association_etablissement_produit.id_zone AS association_produit_etablissement_id_zone,
options.id AS option_id,
options.nom AS option_nom,
options.label AS option_label,
option_possibilite.id AS option_possibilite_id,
option_possibilite.nom AS option_possibilite_nom
FROM produit 
LEFT JOIN association_produit_prix ON association_produit_prix.produit_id = produit.id 
LEFT JOIN souscategorie ON souscategorie.ID = produit.sousCategorie
LEFT JOIN categorie ON categorie.id = produit.CATEGORIE_ID 
LEFT JOIN taux_tva ON taux_tva.id_tva = produit.TVA 
LEFT JOIN prixHt ON prixHt.id = association_produit_prix.prixht_id 
LEFT JOIN association_produit_ingredient ON produit.id= association_produit_ingredient.id_produit
LEFT JOIN association_etablissement_produit ON association_etablissement_produit.id_produit= produit.ID
LEFT JOIN zone_table ON zone_table.id= association_produit_prix.zone_table_id 
LEFT JOIN association_produit_options ON association_produit_options.produit_id = produit.ID
LEFT JOIN options ON options.id = association_produit_options.option_id
LEFT JOIN option_possibilite ON option_possibilite.id_option = options.id WHERE produit.CATEGORIE_ID = " . $id);
        return $this->parseProduit($retour, true);
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
        $retour = $bdd->executeGeneric("SELECT 
produit.ID AS produit_id,
produit.NOM AS produit_nom,
produit.options AS produit_options,
produit.level AS produit_level,
categorie.id AS categorie_id,
categorie.nom AS categorie_nom,
categorie.priorite AS categorie_priorite,
souscategorie.ID AS souscategorie_id,
souscategorie.NOM AS souscategorie_nom,  
souscategorie.categorie_id AS souscategorie_categorie_id,
souscategorie.priorite AS souscategorie_priorite,
taux_tva.taux_tva AS produit_taux_tva,
association_produit_prix.id AS association_produit_prix_id,
association_produit_prix.heureDebut AS association_produit_prix_heureDebut,
association_produit_prix.heureFin AS association_produit_prix_heureFin,
association_produit_prix.produit_id AS association_produit_prix_produit_id,
prixHt.id AS prixHt_id,
prixHt.prix AS prixHt_prix,
zone_table.id AS zone_table_id, 
zone_table.nom AS zone_table_nom,
association_produit_ingredient.id AS association_produit_ingredient_id,
association_produit_ingredient.id_produit AS association_produit_ingredient_id_produit,
association_produit_ingredient.id_ingredient AS association_produit_ingredient_id_ingredient,
association_produit_ingredient.isAdded AS association_produit_ingredient_isAdded,
association_produit_ingredient.surcout AS association_produit_ingredient_surcout,
association_produit_ingredient.supprimable AS association_produit_ingredient_supprimable,
association_produit_ingredient.isIngredientSup AS association_produit_ingredient_isIngredientSup,
association_etablissement_produit.id_etablissement AS association_produit_ingredient_id_etablissement,
association_etablissement_produit.id_zone AS association_produit_etablissement_id_zone,
association_etablissement_produit.id_zone AS association_produit_etablissement_id_zone,
options.id AS option_id,
options.nom AS option_nom,
options.label AS option_label,
option_possibilite.id AS option_possibilite_id,
option_possibilite.nom AS option_possibilite_nom
FROM produit 
LEFT JOIN association_produit_prix ON association_produit_prix.produit_id = produit.id 
LEFT JOIN souscategorie ON souscategorie.ID = produit.sousCategorie
LEFT JOIN categorie ON categorie.id = produit.CATEGORIE_ID 
LEFT JOIN taux_tva ON taux_tva.id_tva = produit.TVA 
LEFT JOIN prixHt ON prixHt.id = association_produit_prix.prixht_id 
LEFT JOIN association_produit_ingredient ON produit.id= association_produit_ingredient.id_produit
LEFT JOIN association_etablissement_produit ON association_etablissement_produit.id_produit= produit.ID
LEFT JOIN zone_table ON zone_table.id= association_produit_prix.zone_table_id 
LEFT JOIN association_produit_options ON association_produit_options.produit_id = produit.ID
LEFT JOIN options ON options.id = association_produit_options.option_id
LEFT JOIN option_possibilite ON option_possibilite.id_option = options.id WHERE produit.level > " . $level);
        return $this->parseProduit($retour, true);
    }

    public function DeleteProduit($id) {
        $bdd = new ConnexionBDD();
        $retour = $bdd->executeGeneric("DELETE FROM produit WHERE ID= ".$id." ;"
                . "UPDATE MAJ_TABLES SET `level` = (SELECT MAX(level) as 'level' FROM produit) WHERE `nomTable` = 'produits' ");
        return $retour;
    }

    public function getByCategorieAndEtablissentAndZone($idcategorie, $idetablissement, $idzone) {
        $bdd = new ConnexionBDD();
        $retour = $bdd->executeGeneric("SELECT 
produit.ID AS produit_id,
produit.NOM AS produit_nom,
produit.options AS produit_options,
produit.level AS produit_level,
categorie.id AS categorie_id,
categorie.nom AS categorie_nom,
categorie.priorite AS categorie_priorite,
souscategorie.ID AS souscategorie_id,
souscategorie.NOM AS souscategorie_nom,  
souscategorie.categorie_id AS souscategorie_categorie_id,
souscategorie.priorite AS souscategorie_priorite,
taux_tva.taux_tva AS produit_taux_tva,
association_produit_prix.id AS association_produit_prix_id,
association_produit_prix.heureDebut AS association_produit_prix_heureDebut,
association_produit_prix.heureFin AS association_produit_prix_heureFin,
association_produit_prix.produit_id AS association_produit_prix_produit_id,
prixHt.id AS prixHt_id,
prixHt.prix AS prixHt_prix,
zone_table.id AS zone_table_id, 
zone_table.nom AS zone_table_nom,
association_produit_ingredient.id AS association_produit_ingredient_id,
association_produit_ingredient.id_produit AS association_produit_ingredient_id_produit,
association_produit_ingredient.id_ingredient AS association_produit_ingredient_id_ingredient,
association_produit_ingredient.isAdded AS association_produit_ingredient_isAdded,
association_produit_ingredient.surcout AS association_produit_ingredient_surcout,
association_produit_ingredient.supprimable AS association_produit_ingredient_supprimable,
association_produit_ingredient.isIngredientSup AS association_produit_ingredient_isIngredientSup,
association_etablissement_produit.id_etablissement AS association_produit_ingredient_id_etablissement,
association_etablissement_produit.id_zone AS association_produit_etablissement_id_zone,
association_etablissement_produit.id_zone AS association_produit_etablissement_id_zone,
options.id AS option_id,
options.nom AS option_nom,
options.label AS option_label,
option_possibilite.id AS option_possibilite_id,
option_possibilite.nom AS option_possibilite_nom
FROM produit 
LEFT JOIN association_produit_prix ON association_produit_prix.produit_id = produit.id 
LEFT JOIN souscategorie ON souscategorie.ID = produit.sousCategorie
LEFT JOIN categorie ON categorie.id = produit.CATEGORIE_ID 
LEFT JOIN taux_tva ON taux_tva.id_tva = produit.TVA 
LEFT JOIN prixHt ON prixHt.id = association_produit_prix.prixht_id 
LEFT JOIN association_produit_ingredient ON produit.id= association_produit_ingredient.id_produit
LEFT JOIN zone_table ON zone_table.id= association_produit_prix.zone_table_id 
LEFT JOIN association_etablissement_produit ON association_etablissement_produit.id_produit= produit.ID
LEFT JOIN association_produit_options ON association_produit_options.produit_id = produit.ID
LEFT JOIN options ON options.id = association_produit_options.option_id
LEFT JOIN option_possibilite ON option_possibilite.id_option = options.id
WHERE
produit.CATEGORIE_ID = " . $idcategorie . " AND
association_etablissement_produit.id_etablissement = " . $idetablissement . " AND (
(association_etablissement_produit.`id_zone` = " . $idzone . ") OR (association_etablissement_produit.`id_zone` IS NULL))");
        return $this->parseProduit($retour, true);
    }

    public function addPrix($prix) {
        $bdd = new ConnexionBDD();
        $id = $bdd->executeGeneric("INSERT INTO `prixHt`(`prix`) VALUES (" . $prix . ")");
        return $id;
    }

    public function getTauxTvaId($taux) {
        $bdd = new ConnexionBDD();
        $retour = $bdd->executeGeneric("SELECT * FROM  `taux_tva` WHERE CAST(  `taux_tva` AS DECIMAL ) = CAST(" . $taux . " AS DECIMAL ) ");
        $retour = $retour->fetch();
        return $retour->id_tva;
    }

    public function add(Produit $produit) {
        $reqSql = "";
        $assoPrixProduit = $produit->getAssociationPrixProduit();
        $produitNom = $produit->getNom();
        $categorieId = $produit->getCategorie()->getId();
        $souscategorieId = $produit->getSousCategorie()->getId();
        $tauxTvaid = $this->getTauxTvaId($produit->getTauxTva());
        $level = $produit->getLevel();
        $bdd = new ConnexionBDD();
        $produitId = $bdd->executeGeneric("INSERT INTO `produit`"
                . "(`NOM`, `CATEGORIE_ID`, `sousCategorie`, `TVA`, `level`) VALUES "
                . "('" . $produitNom . "'," . $categorieId . "," . $souscategorieId . "," . $tauxTvaid . ",".$level.")");
        if ($assoPrixProduit != null) {
            for ($i = 0; $i < count($assoPrixProduit); $i++) {
                $prixHt = $assoPrixProduit[$i]->getPrixHt();
                $idPrixHT = $this->addPrix($prixHt);
                $dateDebut = $assoPrixProduit[$i]->getDateDebut();
                if($dateDebut == ""){
                    $dateDebut="null";
                }
                $dateFin = $assoPrixProduit[$i]->getDateFin();
                if($dateFin == ""){
                    $dateFin="null";
                }
                $idZoneTable = null;
                if($assoPrixProduit[$i]->getZoneTable()!=null){
                    $idZoneTable = $assoPrixProduit[$i]->getZoneTable()->getId();
                }else{
                    $idZoneTable ="null";
                }
                $reqSql = $reqSql . " INSERT INTO `association_produit_prix`"
                        . "(`heureDebut`, `heureFin`, `produit_id`, `prixht_id`, `zone_table_id`) VALUES "
                        . "(" . $dateDebut . "," . $dateFin . "," . $produitId . "," . $idPrixHT . "," . $idZoneTable . ");";
            }
        }
        $etablissements = $produit->getEtablissements();
        if ($etablissements != null) {
            for ($i = 0; $i < count($etablissements); $i++) {
                $reqSql = $reqSql . "INSERT INTO `association_etablissement_produit`"
                        . "( `id_produit`, `id_etablissement`, `id_zone`) VALUES "
                        . "(" . $produitId . "," . $etablissements[$i]->getId() . ",".$etablissements[$i]->getZones().");";
            }
        }
        $ingredients = $produit->getIngredients();
        if ($ingredients != null) {
            for ($i = 0; $i < count($ingredients); $i++) {
                $reqSql = $reqSql . "INSERT INTO `association_produit_ingredient`"
                        . "(`id_produit`, `id_ingredient`, `isAdded`, `surcout`, `supprimable`, `isIngredientSup`) VALUES "
                        . "(" . $produitId . "," . $ingredients [$i]->getId() . ",1,0,1,0);";
            }
        }
        $options = $produit->getOptions();
        if ($options != null) {
            for ($i = 0; $i < count($options); $i++) {
                $reqSql = $reqSql . "INSERT INTO `association_produit_options`"
                        . "(`produit_id`, `option_id`) VALUES "
                        . "(" . $produitId . "," . $options[$i]->getId() . ")";
            }
        }
        if ($reqSql != "") {
            //echo $reqSql;
            $bdd = new ConnexionBDD();
            $bdd->executeGeneric($reqSql);
        }
        return $produitId;
    }

}
