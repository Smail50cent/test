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

    private $idProdAfter;

    public function getAll() {
        $bdd = new ConnexionBDD();
        $retour = $bdd->executeGeneric("SELECT 
produit.ID AS produit_id,
produit.NOM AS produit_nom,
produit.options AS produit_options,
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
JOIN association_produit_prix ON association_produit_prix.produit_id = produit.id 
JOIN souscategorie ON souscategorie.ID = produit.sousCategorie
JOIN categorie ON categorie.id = produit.CATEGORIE_ID 
JOIN taux_tva ON taux_tva.id_tva = produit.TVA 
LEFT JOIN prixHt ON prixHt.id = association_produit_prix.prixht_id 
LEFT JOIN association_produit_ingredient ON produit.id= association_produit_ingredient.id_produit
LEFT JOIN zone_table ON zone_table.id= association_produit_prix.zone_table_id
");
        return $this->parseProduit($retour);
    }

    private $assoPrixId;
    private $assoIngredientId;
    private $produit;
    private $assoPrix;
    private $assoIngredient;

    private function parseProduit($resultSet) {
        $liste = array();
        $ret;
        $this->assoPrix = array();
        $this->assoIngredient = array();
        $this->produit = new Produit();
        $i = 0;
        while ($ligne = $resultSet->fetch()) {
            $this->produit->setId(intval($ligne->produit_id));
            $categorie = new Categorie();
            $categorie->setId(intval($ligne->categorie_id));
            $categorie->setNom($ligne->categorie_nom);
            $categorie->setPriorite(intval($ligne->categorie_priorite));
            $this->produit->setCategorie($categorie);
            $this->produit->setNom($ligne->produit_nom);
            $sousCategorie = new SousCategorie();
            $sousCategorie->setCategorie($ligne->souscategorie_categorie_id);
            $sousCategorie->setId($ligne->souscategorie_id);
            $sousCategorie->setNom($ligne->souscategorie_nom);
            $sousCategorie->setPriorite($ligne->souscategorie_priorite);
            $this->produit->setSousCategorie($sousCategorie);
            $this->produit->setTauxTva(floatval($ligne->produit_taux_tva));
            $this->produit->setOptions(intval($ligne->produit_options));
            if ($this->idProdAfter == $ligne->produit_id) {// SI LIGNE EGALE A LIGNE PREC
                $isHerePrix = false;
                for ($j = 0; $j < count($this->assoPrix); $j++) {
                    if ($this->assoPrix[$j]->id == $ligne->association_produit_prix_id) {
                        $isHerePrix = true;
                        break;
                    }
                }
                if (!$isHerePrix) {
                    array_push($this->assoPrix, $this->parseAssociation($ligne));
                }
                $isHereIng = false;
                for ($j = 0; $j < count($this->assoIngredient); $j++) {
                    if ($this->assoIngredient[$j]->ingredient == $ligne->association_produit_ingredient_id_ingredient) {
                        $isHereIng = true;
                        break;
                    }
                }
                if (!$isHereIng) {
                    array_push($this->assoIngredient, $this->parseAssociationIngredient($ligne));
                }
            } else {
                    array_push($this->assoPrix, $this->parseAssociation($ligne));
                    array_push($this->assoIngredient, $this->parseAssociationIngredient($ligne));
                    $this->produit->setAssociationProduitPrix($this->assoPrix);
                    $this->produit->setIngredients($this->assoIngredient);
                    array_push($liste, $this->produit);
                    $this->assoPrix = array();
                    $this->assoIngredient = array();
                    $this->produit = new Produit();
            }
            $this->assoIngredientId = $ligne->association_produit_ingredient_id;
            $this->assoPrixId = $ligne->association_produit_prix_id;
            $this->idProdAfter = $ligne->produit_id;
            $i++;
        }
        if (count($liste) == 1) {
            $ret = $liste[0];
        } else {
            $ret = $liste;
        }
        return $ret;
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

}

/*SELECT 
produit.ID as produit_id
FROM produit
JOIN association_produit_prix ON association_produit_prix.produit_id = produit.id 
JOIN souscategorie ON souscategorie.ID = produit.sousCategorie
JOIN categorie ON categorie.id = produit.CATEGORIE_ID 
JOIN taux_tva ON taux_tva.id_tva = produit.TVA
LEFT JOIN prixHt ON prixHt.id = association_produit_prix.prixht_id 
LEFT JOIN zone_table ON association_produit_prix.zone_table_id = zone_table.id*/