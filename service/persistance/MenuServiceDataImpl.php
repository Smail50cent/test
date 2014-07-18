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
        $retour = $bdd->executeGeneric("SELECT 
menu.ID AS menu_id,
menu.NOM AS menu_nom,
prixHt.id AS prixHt_id,
prixHt.prix AS prixHt_prix,
zone_table.id AS zone_table_id, 
zone_table.nom AS zone_table_nom,
menu_produit.produit_ID AS menu_produit_produit_ID,
association_etablissement_produit.id_zone AS association_etablissement_produit_id_zone,
association_etablissement_produit.id_etablissement AS association_etablissement_produit_id_etablissement,
taux_tva.taux_tva AS taux_tva,association_produit_prix.id AS association_produit_prix_id,
association_produit_prix.heureDebut AS association_produit_prix_heureDebut,
association_produit_prix.heureFin AS association_produit_prix_heureFin,
association_produit_prix.produit_id AS association_produit_prix_produit_id
FROM menu 
LEFT JOIN taux_tva ON menu.tauxDeTva = taux_tva.id_tva 
LEFT JOIN menu_produit ON menu_produit.menu_ID = menu.ID
LEFT JOIN association_produit_prix ON association_produit_prix.menu_id = menu.ID
LEFT JOIN zone_table ON zone_table.id= association_produit_prix.zone_table_id 
LEFT JOIN prixHt ON prixHt.id = association_produit_prix.prixht_id
LEFT JOIN association_etablissement_produit ON association_etablissement_produit.id_menu = menu.ID
");
        return $this->parse($retour);
    }

    public function getProduitsByIdMenu($id) {
        $bdd = new ConnexionBDD();
        $retour = $bdd->executeGeneric("SELECT * FROM `menu_produit` WHERE `menu_ID`=" . $id);
        return $retour;
    }

    private function testsForListePrix($ligne, Menu $produit) {
        $isHerePrix = false;
        for ($j = 0; $j < count($produit->getPrix()); $j++) {
            $prod = $produit->getPrix();
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

    public function getByEtablissementAndZone($etablissementid, $zone) {
        $bdd = new ConnexionBDD();
        $resultSet = $bdd->executeGeneric("SELECT 
menu.ID AS menu_id,
menu.NOM AS menu_nom,
prixHt.id AS prixHt_id,
prixHt.prix AS prixHt_prix,
zone_table.id AS zone_table_id, 
zone_table.nom AS zone_table_nom,
menu_produit.produit_ID AS menu_produit_produit_ID,
association_etablissement_produit.id_zone AS association_etablissement_produit_id_zone,
association_etablissement_produit.id_etablissement AS association_etablissement_produit_id_etablissement,
taux_tva.taux_tva AS taux_tva,association_produit_prix.id AS association_produit_prix_id,
association_produit_prix.heureDebut AS association_produit_prix_heureDebut,
association_produit_prix.heureFin AS association_produit_prix_heureFin,
association_produit_prix.produit_id AS association_produit_prix_produit_id
FROM menu 
LEFT JOIN taux_tva ON menu.tauxDeTva = taux_tva.id_tva 
LEFT JOIN menu_produit ON menu_produit.menu_ID = menu.ID
LEFT JOIN association_produit_prix ON association_produit_prix.menu_id = menu.ID
LEFT JOIN zone_table ON zone_table.id= association_produit_prix.zone_table_id 
LEFT JOIN prixHt ON prixHt.id = association_produit_prix.prixht_id
LEFT JOIN association_etablissement_produit ON association_etablissement_produit.id_menu = menu.ID
 WHERE
association_etablissement_produit.id_etablissement = " . $etablissementid . " AND (
(association_etablissement_produit.`id_zone` = " . $zone . ") OR (association_etablissement_produit.`id_zone` IS NULL))");
        return $this->parse($resultSet);
    }

    private function parse($resultSet) {
        $lignes = $resultSet->fetchAll();
        $menu = new Menu();
        $idProdAfter = null;
        $liste = array();
        for ($i = 0; $i < count($lignes); $i++) {
            $ligne = $lignes[$i];
            $menu->setId(intval($ligne->menu_id));
            $menu->setNom($ligne->menu_nom);
            if ($ligne->menu_id == $idProdAfter) {
                $assoIng = $this->testsForListeProduits($ligne, $menu);
                if ($assoIng != null) {
                    $menu->addProduit($assoIng);
                }

                $assoPrix = $this->testsForListePrix($ligne, $menu);
                if ($assoPrix != null) {
                    $menu->addPrix($assoPrix);
                }
                $assoEtablissements = $this->testsForListeEtablissements($ligne, $menu);
                if ($assoEtablissements != null) {
                    $menu->addEtablissements($assoEtablissements);
                }
                $assoZones = $this->testsForListeZone($ligne, $menu);
                if ($assoZones != null) {
                    $menu->addZone($assoZones);
                }
                if (count($lignes) != ($i + 1)) {
                    if ($ligne->menu_id != $lignes[$i + 1]->menu_id) {
                        array_push($liste, $menu);
                        $menu = new Menu();
                    }
                } else {
                    array_push($liste, $menu);
                    $menu = new Menu();
                }
            } else if ($i == 0) {
                $assoIng = $this->testsForListeProduits($ligne, $menu);
                if ($assoIng != null) {
                    $menu->addProduit($assoIng);
                }
                $assoPrix = $this->testsForListePrix($ligne, $menu);
                if ($assoPrix != null) {
                    $menu->addPrix($assoPrix);
                }
                $assoEtablissements = $this->testsForListeEtablissements($ligne, $menu);
                if ($assoEtablissements != null) {
                    $menu->addEtablissements($assoEtablissements);
                }
                $assoZones = $this->testsForListeZone($ligne, $menu);
                if ($assoZones != null) {
                    $menu->addZone($assoZones);
                }
                if (count($lignes) != ($i + 1)) {
                    if ($ligne->menu_id != $lignes[$i + 1]->menu_id) {
                        array_push($liste, $menu);
                        $menu = new Menu();
                    }
                } else {
                    array_push($liste, $menu);
                }
            } else if ($ligne->menu_id != $idProdAfter) {
                $assoIng = $this->testsForListeProduits($ligne, $menu);
                if ($assoIng != null) {
                    $menu->addProduit($assoIng);
                }
                $assoPrix = $this->testsForListePrix($ligne, $menu);
                if ($assoPrix != null) {
                    $menu->addPrix($assoPrix);
                }
                $assoEtablissements = $this->testsForListeEtablissements($ligne, $menu);
                if ($assoEtablissements != null) {
                    $menu->addEtablissements($assoEtablissements);
                }
                $assoZones = $this->testsForListeZone($ligne, $menu);
                if ($assoZones != null) {
                    $menu->addZone($assoZones);
                }
                if (count($lignes) != ($i + 1)) {
                    if ($ligne->menu_id != $lignes[$i + 1]->menu_id) {
                        array_push($liste, $menu);
                        $menu = new Menu();
                    }
                } else {
                    array_push($liste, $menu);
                    $menu = new Menu();
                }
            }
            $idProdAfter = $ligne->menu_id;
        }
        if (count($liste) == 1) {
            $ret = $liste[0];
        } else {
            $ret = $liste;
        }
        return $ret;
    }

    private function testsForListeProduits($ligne, Menu $menu) {
        $isHerePrix = false;
        for ($j = 0; $j < count($menu->getProduits()); $j++) {
            $cats = $menu->getProduits();
            if ($cats[$j] == $ligne->menu_produit_produit_ID) {
                $isHerePrix = true;
                break;
            }
        }if (!$isHerePrix) {
            return intval($ligne->menu_produit_produit_ID);
        } else {
            return null;
        }
    }

    private function testsForListeZone($ligne, Menu $produit) {
        $isHerePrix = false;
        for ($j = 0; $j < count($produit->getZones()); $j++) {
            $prod = $produit->getZones();
            if (intval($prod[$j]) == intval($ligne->association_etablissement_produit_id_zone)) {
                $isHerePrix = true;
                break;
            }
        }if (!$isHerePrix) {
            return intval($ligne->association_etablissement_produit_id_zone);
        } else {
            return null;
        }
    }

    private function testsForListeEtablissements($ligne, Menu $produit) {
        $isHerePrix = false;
        if (isset($ligne->association_etablissement_produit_id_etablissement)) {
            for ($j = 0; $j < count($produit->getEtablissements()); $j++) {
                $prod = $produit->getEtablissements();
                if (intval($prod[$j]) == intval($ligne->association_etablissement_produit_id_etablissement)) {
                    $isHerePrix = true;
                    break;
                }
            }
            if (!$isHerePrix) {
                if ($ligne->association_etablissement_produit_id_etablissement == null) {
                    return null;
                } else {
                    return intval($ligne->association_etablissement_produit_id_etablissement);
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
