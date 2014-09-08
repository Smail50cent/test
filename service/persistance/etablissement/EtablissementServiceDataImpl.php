<?php

/**
 * Description of CategorieServiceDataImpl
 *
 * @author Damien Chesneau <contact@damienchesneau.fr>
 */
include_once $path . 'service/persistance/etablissement/EtablissementServiceData.php';
include_once $path . 'service/persistance/ConnexionBDD.php';
include_once $path . 'service/logique/entity/Etablissement.php';
include_once $path . 'service/logique/entity/Groupe.php';
include_once $path . 'service/logique/entity/ZoneTable.php';

class EtablissementServiceDataImpl implements EtablissementServiceData {

    public function getAll() {
        $bdd = new ConnexionBDD();
        $retour = $bdd->executeGeneric("SELECT 
groupe.id AS groupe_id,
groupe.nom AS groupe_nom,
groupe.style AS groupe_style,
groupe.adresseSiege AS groupe_adresseSiege,
groupe.slogan AS groupe_slogan,
groupe.logo AS groupe_logo,
groupe.message AS groupe_message,
groupe.telephone AS groupe_telephone,
etablissement.id AS etablissement_id,
etablissement.nom AS etablissement_nom,
etablissement.logo AS etablissement_logo,
etablissement.style AS etablissement_style,
etablissement.slogan AS etablissement_slogan,
etablissement.telephone AS etablissement_adresseEtab,
etablissement.telephone AS etablissement_telephone,
etablissement.message AS etablissement_message
 FROM `etablissement` LEFT JOIN groupe ON groupe.id = `id_groupe` ");
        return $this->parseEtablissement($retour);
    }

    public function getAllWithZones() {
        $bdd = new ConnexionBDD();
        $retour = $bdd->executeGeneric("SELECT 
groupe.id AS groupe_id,
groupe.nom AS groupe_nom,
groupe.style AS groupe_style,
groupe.adresseSiege AS groupe_adresseSiege,
groupe.slogan AS groupe_slogan,
groupe.logo AS groupe_logo,
groupe.message AS groupe_message,
groupe.telephone AS groupe_telephone,
etablissement.id AS etablissement_id,
etablissement.nom AS etablissement_nom,
etablissement.logo AS etablissement_logo,
etablissement.style AS etablissement_style,
etablissement.slogan AS etablissement_slogan,
etablissement.telephone AS etablissement_adresseEtab,
etablissement.telephone AS etablissement_telephone,
etablissement.message AS etablissement_message,
zone_table.id AS zone_table_id,
zone_table.nom AS zone_table_nom,
tables.id AS tables_id,
tables.numero AS tables_numero,
tables.zone_table_ke AS tables_zone_table_ke
FROM `etablissement`
LEFT JOIN groupe ON groupe.id = `id_groupe`
LEFT JOIN zone_table ON zone_table.etablissement_id = etablissement.id
LEFT JOIN tables ON tables.zone_table_ke = zone_table.id");
        return $this->parse($retour);
    }

    private function parseEtablissement($resultSet) {
        $liste = array();
        while ($ligne = $resultSet->fetch()) {
            $etablissement = new Etablissement();
            $etablissement->setId(intval($ligne->etablissement_id));
            $etablissement->setAdresseEtab($ligne->etablissement_adresseEtab);
            $etablissement->setNom($ligne->etablissement_nom);
            $etablissement->setMessage($ligne->etablissement_message);
            $etablissement->setSlogan($ligne->etablissement_slogan);
            $etablissement->setStyle($ligne->etablissement_style);
            $etablissement->setLogo($ligne->etablissement_logo);
            $etablissement->setTelephone($ligne->etablissement_telephone);
            $groupe = new Groupe();
            $groupe->setAdresseSiege($ligne->groupe_adresseSiege);
            $groupe->setEtablissements(null);
            $groupe->setId($ligne->groupe_id);
            $groupe->setLogo($ligne->groupe_logo);
            $groupe->setMessage($ligne->groupe_message);
            $groupe->setNom($ligne->groupe_nom);
            $groupe->setSlogan($ligne->groupe_slogan);
            $groupe->setStyle($ligne->groupe_style);
            $groupe->setTelephone($ligne->groupe_telephone);
            $etablissement->setGroupe($groupe);
            array_push($liste, $etablissement);
        }
        return $liste;
    }

    public function getById($id) {
        $bdd = new ConnexionBDD();
        $retour = $bdd->executeGeneric("SELECT 
groupe.id AS groupe_id,
groupe.nom AS groupe_nom,
groupe.style AS groupe_style,
groupe.adresseSiege AS groupe_adresseSiege,
groupe.slogan AS groupe_slogan,
groupe.logo AS groupe_logo,
groupe.message AS groupe_message,
groupe.telephone AS groupe_telephone,
etablissement.id AS etablissement_id,
etablissement.nom AS etablissement_nom,
etablissement.logo AS etablissement_logo,
etablissement.style AS etablissement_style,
etablissement.slogan AS etablissement_slogan,
etablissement.telephone AS etablissement_adresseEtab,
etablissement.telephone AS etablissement_telephone,
etablissement.message AS etablissement_message
 FROM `etablissement` LEFT JOIN groupe ON groupe.id = `id_groupe` WHERE etablissement.id=" . $id);
        return $this->parseEtablissement($retour);
    }

    private function parse($resultSet) {
        $lignes = $resultSet->fetchAll();
        $etablissement = new Etablissement();
        $idProdAfter = null;
        $liste = array();
        for ($i = 0; $i < count($lignes); $i++) {
            $ligne = $lignes[$i];
            $etablissement->setId(intval($ligne->etablissement_id));
            $etablissement->setAdresseEtab($ligne->etablissement_adresseEtab);
            $etablissement->setNom($ligne->etablissement_nom);
            $etablissement->setMessage($ligne->etablissement_message);
            $etablissement->setSlogan($ligne->etablissement_slogan);
            $etablissement->setStyle($ligne->etablissement_style);
            $etablissement->setLogo($ligne->etablissement_logo);
            $etablissement->setTelephone($ligne->etablissement_telephone);
            $groupe = new Groupe();
            $groupe->setAdresseSiege($ligne->groupe_adresseSiege);
            $groupe->setEtablissements(null);
            $groupe->setId($ligne->groupe_id);
            $groupe->setLogo($ligne->groupe_logo);
            $groupe->setMessage($ligne->groupe_message);
            $groupe->setNom($ligne->groupe_nom);
            $groupe->setSlogan($ligne->groupe_slogan);
            $groupe->setStyle($ligne->groupe_style);
            $groupe->setTelephone($ligne->groupe_telephone);
            $etablissement->setGroupe($groupe);
            if ($ligne->etablissement_id == $idProdAfter) {
                $assoZone = $this->testsForListeZones($ligne, $etablissement);
                if ($assoZone != null) {
                    $etablissement->addZone($assoZone);
                }
                $assoTable = $this->testsForTables($ligne, $etablissement);
                if ($assoTable != null) {
                    $zones = $etablissement->getZones();
                    for ($j = 0; $j < count($zones); $j++) {
                        if ($zones[$j]->id == $assoTable->getZone()) {
                            $zones[$j]->addTable($assoTable);
                        }
                    }
                }
                if (count($lignes) != ($i + 1)) {
                    if ($ligne->etablissement_id != $lignes[$i + 1]->etablissement_id) {
                        array_push($liste, $etablissement);
                        $etablissement = new Etablissement();
                    }
                } else {
                    array_push($liste, $etablissement);
                    $etablissement = new Etablissement();
                }
            } else if ($i == 0) {
                $assoZone = $this->testsForListeZones($ligne, $etablissement);
                if ($assoZone != null) {
                    $etablissement->addZone($assoZone);
                }
                $assoTable = $this->testsForTables($ligne, $etablissement);
                if ($assoTable != null) {
                    $zones = $etablissement->getZones();
                    for ($j = 0; $j < count($zones); $j++) {
                        if ($zones[$j]->id == $assoTable->getZone()) {
                            $zones[$j]->addTable($assoTable);
                        }
                    }
                }
                if (count($lignes) != ($i + 1)) {
                    if ($ligne->etablissement_id != $lignes[$i + 1]->etablissement_id) {
                        array_push($liste, $etablissement);
                        $etablissement = new Etablissement();
                    }
                } else {
                    array_push($liste, $etablissement);
                }
            } else if ($ligne->etablissement_id != $idProdAfter) {
                $assoZone = $this->testsForListeZones($ligne, $etablissement);
                if ($assoZone != null) {
                    $etablissement->addZone($assoZone);
                }
                $assoTable = $this->testsForTables($ligne, $etablissement);
                if ($assoTable != null) {
                    $zones = $etablissement->getZones();
                    for ($j = 0; $j < count($zones); $j++) {
                        if ($zones[$j]->id == $assoTable->getZone()) {
                            $zones[$j]->addTable($assoTable);
                        }
                    }
                }
                if (count($lignes) != ($i + 1)) {
                    if ($ligne->etablissement_id != $lignes[$i + 1]->etablissement_id) {
                        array_push($liste, $etablissement);
                        $etablissement = new Etablissement();
                    }
                } else {
                    array_push($liste, $etablissement);
                    $etablissement = new Etablissement();
                }
            }
            $idProdAfter = $ligne->etablissement_id;
        }
        if (count($liste) == 1) {
            $ret = $liste[0];
        } else {
            $ret = $liste;
        }
        return $ret;
    }

    private function testsForListeZones($ligne, Etablissement $etablissement) {
        $isHerePrix = false;
        for ($j = 0; $j < count($etablissement->getZones()); $j++) {
            $cats = $etablissement->getZones();
            if ($cats[$j]->id == $ligne->zone_table_id) {
                $isHerePrix = true;
                break;
            }
        }if (!$isHerePrix) {
            $zoneTable = null;
            if ($ligne->zone_table_id != null) {
                $zoneTable = new ZoneTable();
                $zoneTable->setId($ligne->zone_table_id);
                $zoneTable->setNom($ligne->zone_table_nom);
                $zoneTable->setEtablissement_id($ligne->etablissement_id);
            }
            return $zoneTable;
        } else {
            return null;
        }
    }

    private function testsForTables($ligne, Etablissement $etablissement) {
        $isHerePrix = false;
        for ($j = 0; $j < count($etablissement->getZones()); $j++) {
            $cats = $etablissement->getZones();
            for ($x = 0; $x < count($cats[$j]->getTables()); $x++) {
                if (intval($cats[$j]->tables[$x]->id) == intval($ligne->tables_id)) {
                    $isHerePrix = true;
                    break;
                }
            }
            if ($isHerePrix) {
                break;
            }
        }
        if (!$isHerePrix) {
            $table = null;
            if ($ligne->tables_id != null) {
                $table = new Table();
                $table->setId($ligne->tables_id);
                $table->setNumero($ligne->tables_numero);
                $table->setZone($ligne->tables_zone_table_ke);
            }
            return $table;
        } else {
            return null;
        }
    }

    public function add(Etablissement $etablissement) {
        $bdd = new ConnexionBDD();
        $style = "";
        if ($etablissement->getStyle() == null) {
            $style = "null";
        } else {
            $style = "'" . $etablissement->getStyle() . "'";
        }
        $zones = "";
        if ($etablissement->getZones() == null) {
            $zones = "null";
        } else {
            $zones = "null";
        }
        $logo = "";
        if ($etablissement->getLogo() == null) {
            $logo = "null";
        } else {
            $logo = "'" . $etablissement->getLogo() . "'";
        }
        $adresse = "";
        if ($etablissement->getAdresseEtab() == null) {
            $adresse = "null";
        } else {
            $adresse = "'" . $etablissement->getAdresseEtab() . "'";
        }
        $telephone = "";
        if ($etablissement->getAdresseEtab() == null) {
            $telephone = "null";
        } else {
            $telephone = "'" . $etablissement->getAdresseEtab() . "'";
        }
        $message = "";
        if ($etablissement->getMessage() == null) {
            $message = "null";
        } else {
            $message = "'" . $etablissement->getMessage() . "'";
        }
        $slogan = "";
        if ($etablissement->getSlogan() == null) {
            $slogan = "null";
        } else {
            $slogan = "'" . $etablissement->getSlogan() . "'";
        }
        $id = 0;
        try {
            $bdd->beginTTransaction();
            $id = $bdd->executeGeneric("INSERT INTO `etablissement`"
                    . "(`nom`, `logo`, `style`, `adresseEtab`, `telephone`, `message`, `slogan`, `id_groupe`) "
                    . "VALUES ('" . $etablissement->getNom() . "'," . $logo . ""
                    . "," . $style . "," . $adresse . ","
                    . "" . $telephone . "," . $message . ","
                    . "" . $slogan . "," . $etablissement->getGroupe() . ");");
            $zones = "";
            if ($etablissement->getZones() != null) {
                $zones = $etablissement->getZones();
                for ($i = 0; $i < count($zones); $i++) {
                    $zone = $zones[$i];
                    if (isset($zone->nom)) {
                        $id2 = $bdd->executeGeneric("INSERT INTO `zone_table`(`nom`, `etablissement_id`) VALUES ('" . $zone->nom . "'," . $id . ");");
                        $tables = $zone->getTables();
                        for ($j = 0; $j < count($tables); $j++) {
                            $table = $tables[$j];
                            $bdd->executeGeneric("INSERT INTO `tables`(`numero`, `zone_table_ke`) VALUES (" . $table->getNumero() . "," . $id2 . ")");
                        }
                    } else if (isset($zone->id)) {
                        $bdd->executeGeneric("UPDATE `zone_table` SET `etablissement_id`=" . $id . " WHERE `id`=" . $zone->id);
                    }
                }
            }
            $bdd->commitTransaction();
        } catch (Exception $exc) {
            $bdd->rollbackTransaction();
        }
        return $id;
    }

    public function remove($id) {
        $bdd = new ConnexionBDD();
        $bdd->executeGeneric("DELETE FROM `etablissement` WHERE `id`=" . $id);
    }

    public function update(\Etablissement $etablissement) {
        $bdd = new ConnexionBDD();
        $style = "";
        if ($etablissement->getStyle() == null) {
            $style = "null";
        } else {
            $style = "'" . $etablissement->getStyle() . "'";
        }
        $logo = "";
        if ($etablissement->getLogo() == null) {
            $logo = "null";
        } else {
            $logo = "'" . $etablissement->getLogo() . "'";
        }
        $adresse = "";
        if ($etablissement->getAdresseEtab() == null) {
            $adresse = "null";
        } else {
            $adresse = "'" . $etablissement->getAdresseEtab() . "'";
        }
        $telephone = "";
        if ($etablissement->getAdresseEtab() == null) {
            $telephone = "null";
        } else {
            $telephone = "'" . $etablissement->getAdresseEtab() . "'";
        }
        $message = "";
        if ($etablissement->getMessage() == null) {
            $message = "null";
        } else {
            $message = "'" . $etablissement->getMessage() . "'";
        }
        $slogan = "";
        if ($etablissement->getSlogan() == null) {
            $slogan = "null";
        } else {
            $slogan = "'" . $etablissement->getSlogan() . "'";
        }
        $bdd->executeGeneric("UPDATE `etablissement` "
                . "SET `nom`='" . $etablissement->getNom() . "',`logo`= " . $logo . " ,"
                . "`style`= " . $style . ",`adresseEtab`=" . $adresse . ","
                . "`telephone`=" . $telephone . ",`message`=" . $message . ",`slogan`=" . $slogan . " WHERE `id` = " . $etablissement->getId());
    }

}
