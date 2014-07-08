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

class ProduitServiceDataImpl implements ProduitServiceData {

    public function getAll() {
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
association_produit_ingredient.isIngredientSup AS association_produit_ingredient_isIngredientSup
FROM produit 
LEFT JOIN association_produit_prix ON association_produit_prix.produit_id = produit.id 
LEFT JOIN souscategorie ON souscategorie.ID = produit.sousCategorie
LEFT JOIN categorie ON categorie.id = produit.CATEGORIE_ID 
LEFT JOIN taux_tva ON taux_tva.id_tva = produit.TVA 
LEFT JOIN prixHt ON prixHt.id = association_produit_prix.prixht_id 
LEFT JOIN association_produit_ingredient ON produit.id= association_produit_ingredient.id_produit
LEFT JOIN zone_table ON zone_table.id= association_produit_prix.zone_table_id
");
        return $this->parseProduit($retour);
    }

    private function parseProduit($resultSet) {
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
            $produit->setOptions(intval($ligne->produit_options));
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
                if (count($lignes) != ($i + 1)) {
                    if ($ligne->produit_id != $lignes[$i + 1]->produit_id) {
                        array_push($liste, $produit);
                        $assoPrix = array();
                        $assoIngredient = array();
                        $produit = new Produit();
                    }
                } else {
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
                if ($ligne->produit_id != $lignes[$i + 1]->produit_id) {
                    array_push($liste, $produit);
                    $produit = new Produit();
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
                if (count($lignes) != ($i + 1)) {
                    if ($ligne->produit_id != $lignes[$i + 1]->produit_id) {
                        array_push($liste, $produit);
                        $produit = new Produit();
                    }
                } else {
                    array_push($liste, $produit);
                    $produit = new Produit();
                }
            }
            $idProdAfter = $ligne->produit_id;
        }
        if (count($liste) == 1) {
            $ret = $liste[0];
        } else {
            $ret = $liste;
        }
        return $ret;
    }

    private function testsForListePrix($ligne, Produit $produit) {
        $isHerePrix = false;
        for ($j = 0; $j < count($produit->getAssociationPrixProduit()); $j++) {
            if ($produit->getAssociationPrixProduit()[$j]->id == $ligne->association_produit_prix_id) {
                $isHerePrix = true;
                break;
            }
        }if (!$isHerePrix) {
            return ($this->parseAssociation($ligne));
        } else {
            return null;
        }
    }

    private function testsForListeIngredient($ligne, Produit $produit) {
        $isHereIng = false;
        for ($j = 0; $j < count($produit->getIngredients()); $j++) {
            if (intval($produit->getIngredients()[$j]->ingredient) == intval($ligne->association_produit_ingredient_id_ingredient)) {
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
association_produit_ingredient.isIngredientSup AS association_produit_ingredient_isIngredientSup
FROM produit 
LEFT JOIN association_produit_prix ON association_produit_prix.produit_id = produit.id 
LEFT JOIN souscategorie ON souscategorie.ID = produit.sousCategorie
LEFT JOIN categorie ON categorie.id = produit.CATEGORIE_ID 
LEFT JOIN taux_tva ON taux_tva.id_tva = produit.TVA 
LEFT JOIN prixHt ON prixHt.id = association_produit_prix.prixht_id 
LEFT JOIN association_produit_ingredient ON produit.id= association_produit_ingredient.id_produit
LEFT JOIN zone_table ON zone_table.id= association_produit_prix.zone_table_id WHERE produit.id = " . $id);
        return $this->parseProduit($retour);
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
association_produit_ingredient.isIngredientSup AS association_produit_ingredient_isIngredientSup
FROM produit 
LEFT JOIN association_produit_prix ON association_produit_prix.produit_id = produit.id 
LEFT JOIN souscategorie ON souscategorie.ID = produit.sousCategorie
LEFT JOIN categorie ON categorie.id = produit.CATEGORIE_ID 
LEFT JOIN taux_tva ON taux_tva.id_tva = produit.TVA 
LEFT JOIN prixHt ON prixHt.id = association_produit_prix.prixht_id 
LEFT JOIN association_produit_ingredient ON produit.id= association_produit_ingredient.id_produit
LEFT JOIN zone_table ON zone_table.id= association_produit_prix.zone_table_id WHERE produit.CATEGORIE_ID = " . $id);
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
association_produit_ingredient.isIngredientSup AS association_produit_ingredient_isIngredientSup
FROM produit 
LEFT JOIN association_produit_prix ON association_produit_prix.produit_id = produit.id 
LEFT JOIN souscategorie ON souscategorie.ID = produit.sousCategorie
LEFT JOIN categorie ON categorie.id = produit.CATEGORIE_ID 
LEFT JOIN taux_tva ON taux_tva.id_tva = produit.TVA 
LEFT JOIN prixHt ON prixHt.id = association_produit_prix.prixht_id 
LEFT JOIN association_produit_ingredient ON produit.id= association_produit_ingredient.id_produit
LEFT JOIN zone_table ON zone_table.id= association_produit_prix.zone_table_id WHERE produit.level >= " . $level);
        return $this->parseProduit($retour);
    }

}
