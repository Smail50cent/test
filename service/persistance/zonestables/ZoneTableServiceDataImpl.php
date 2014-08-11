<?php

include_once $path . 'service/persistance/zonestables/ZoneTableServiceData.php';
include_once $path . 'service/persistance/ConnexionBDD.php';
include_once $path . 'service/logique/entity/ZoneTable.php';
include_once $path . 'service/logique/entity/Table.php';
include_once $path . 'service/logique/entity/Etablissement.php';

/**
 * Description of ZoneTableServiceData
 *
 * @author Damien Chesneau <contact@damienchesneau.fr>
 */
class ZoneTableServiceDataImpl implements ZoneTableServiceData {

    public function getAll() {
        $bdd = new ConnexionBDD();
        $resultSet = $bdd->executeGeneric("SELECT 
 zone_table.etablissement_id, tables.id AS table_id,
 tables.numero AS table_numero,
 zone_table.nom AS zone_table_nom,
 zone_table.id AS zone_table_id ,
etablissement.nom AS etablissement_nom,
etablissement.logo AS etablissement_logo,
etablissement.style AS etablissement_style,
etablissement.adresseEtab AS etablissement_adresseEtab,
etablissement.telephone AS etablissement_telephone,
etablissement.message AS etablissement_message,
etablissement.slogan AS etablissement_slogan
FROM  `zone_table`
LEFT JOIN tables ON zone_table.id = tables.zone_table_ke
LEFT JOIN etablissement ON etablissement.id = zone_table.`etablissement_id`");
        return $this->parseZoneTable($resultSet);
    }

    private function parseZoneTable($resultSet) {
        $idProdAfter = null;
        $liste = array();
        $ret;
        $zoneTable = new ZoneTable();
        $i = 0;
        $lignes = $resultSet->fetchAll();
        for ($i = 0; $i < count($lignes); $i++) {
            $ligne = $lignes[$i];
            $zoneTable->setId(intval($ligne->zone_table_id));
            $zoneTable->setNom($ligne->zone_table_nom);
            $etablissement = new Etablissement();
            $etablissement->setAdresseEtab($ligne->etablissement_adresseEtab);
            $etablissement->setLogo($ligne->etablissement_logo);
            $etablissement->setMessage($ligne->etablissement_message);
            $etablissement->setNom($ligne->etablissement_nom);
            $etablissement->setSlogan($ligne->etablissement_slogan);
            $etablissement->setStyle($ligne->etablissement_style);
            $etablissement->setTelephone($ligne->etablissement_telephone);
            $zoneTable->setEtablissement_id($etablissement);
            if ($ligne->zone_table_id == $idProdAfter) {
                $table = $this->testsForTable($ligne, $zoneTable);
                if ($table != null) {
                    $zoneTable->addTable($table);
                }
                if (count($lignes) != ($i + 1)) {
                    if ($ligne->zone_table_id != $lignes[$i + 1]->zone_table_id) {
                        array_push($liste, $zoneTable);
                        $zoneTable = new ZoneTable();
                    }
                } else {
                    array_push($liste, $zoneTable);
                    $zoneTable = new ZoneTable();
                }
            } else if ($i == 0) {
                $table = $this->testsForTable($ligne, $zoneTable);
                if ($table != null) {
                    $zoneTable->addTable($table);
                }
                if (count($lignes) < $i + 1) {
                    if ($ligne->zone_table_id != $lignes[$i + 1]->zone_table_id) {
                        array_push($liste, $zoneTable);
                        $zoneTable = new ZoneTable();
                    }
                } else {
//                    if(count($lignes) <= $i + 1)
//                    if ($ligne->zone_table_id != $lignes[$i + 1]->zone_table_id) {
                        array_push($liste, $zoneTable);
                        $zoneTable = new ZoneTable();
//                    }
                }
            } else if ($ligne->table_id != $idProdAfter) {
                $table = $this->testsForTable($ligne, $zoneTable);
                if ($table != null) {
                    $zoneTable->addTable($table);
                }
                if (count($lignes) != ($i + 1)) {
                    if ($ligne->zone_table_id != $lignes[$i + 1]->zone_table_id) {
                        array_push($liste, $zoneTable);
                        $zoneTable = new ZoneTable();
                    }
                } else {
                    array_push($liste, $zoneTable);
                    $zoneTable = new ZoneTable();
                }
            }
            $idProdAfter = $ligne->zone_table_id;
        }
        return $liste;
    }

    private function testsForTable($ligne, ZoneTable $zonetable) {
        $isHere = false;
        for ($j = 0; $j < count($zonetable->getTables()); $j++) {
            $tables = $zonetable->getTables();
            if ($tables[$j]->id == $ligne->table_id) {
                $isHere = true;
                break;
            }
        }if (!$isHere) {
            if ($ligne->table_numero != null) {
                $table = new Table();
                $table->setId($ligne->table_id);
                $table->setNumero($ligne->table_numero);
                $table->setZone($ligne->zone_table_id);
                return $table;
            } else {
                return null;
            }
        } else {
            return null;
        }
    }

    public function getByIdEtablissement($id) {
        $bdd = new ConnexionBDD();
        $resultSet = $bdd->executeGeneric("SELECT 
 zone_table.etablissement_id, tables.id AS table_id,
 tables.numero AS table_numero,
 zone_table.nom AS zone_table_nom,
 zone_table.id AS zone_table_id ,
etablissement.nom AS etablissement_nom,
etablissement.logo AS etablissement_logo,
etablissement.style AS etablissement_style,
etablissement.adresseEtab AS etablissement_adresseEtab,
etablissement.telephone AS etablissement_telephone,
etablissement.message AS etablissement_message,
etablissement.slogan AS etablissement_slogan
FROM  `zone_table`
LEFT JOIN tables ON zone_table.id = tables.zone_table_ke
LEFT JOIN etablissement ON etablissement.id = zone_table.`etablissement_id` WHERE  `etablissement_id` =" . $id);
        return $this->parseZoneTable($resultSet);
    }

    public function getByEtablissementNull() {
        $bdd = new ConnexionBDD();
        $resultSet = $bdd->executeGeneric("SELECT 
 zone_table.etablissement_id, tables.id AS table_id,
 tables.numero AS table_numero,
 zone_table.nom AS zone_table_nom,
 zone_table.id AS zone_table_id ,
etablissement.nom AS etablissement_nom,
etablissement.logo AS etablissement_logo,
etablissement.style AS etablissement_style,
etablissement.adresseEtab AS etablissement_adresseEtab,
etablissement.telephone AS etablissement_telephone,
etablissement.message AS etablissement_message,
etablissement.slogan AS etablissement_slogan
FROM  `zone_table`
LEFT JOIN tables ON zone_table.id = tables.zone_table_ke
LEFT JOIN etablissement ON etablissement.id = zone_table.`etablissement_id` WHERE `etablissement_id` IS NULL");
        return $this->parseZoneTable($resultSet);
    }

    public function remove($id) {
        $bdd = new ConnexionBDD();
        $bdd->executeGeneric("DELETE FROM `zone_table` WHERE `id`=" . $id);
    }

    public function add(ZoneTable $zoneTable) {
        $bdd = new ConnexionBDD();
        $id = $bdd->executeGeneric("INSERT INTO `zone_table`(`nom`) VALUES ('" . $zoneTable->nom . "');");
        $tables = $zoneTable->getTables();
        for ($j = 0; $j < count($tables); $j++) {
            $table = $tables[$j];
            $bdd->executeGeneric("INSERT INTO `tables`(`numero`, `zone_table_ke`) VALUES (" . $table->getNumero() . "," . $id . ")");
        }
        return $id;
    }

    public function getById($id) {
        $bdd = new ConnexionBDD();
        $resultSet = $bdd->executeGeneric("SELECT 
 zone_table.etablissement_id, tables.id AS table_id,
 tables.numero AS table_numero,
 zone_table.nom AS zone_table_nom,
 zone_table.id AS zone_table_id ,
etablissement.nom AS etablissement_nom,
etablissement.logo AS etablissement_logo,
etablissement.style AS etablissement_style,
etablissement.adresseEtab AS etablissement_adresseEtab,
etablissement.telephone AS etablissement_telephone,
etablissement.message AS etablissement_message,
etablissement.slogan AS etablissement_slogan
FROM  `zone_table`
LEFT JOIN tables ON zone_table.id = tables.zone_table_ke
LEFT JOIN etablissement ON etablissement.id = zone_table.`etablissement_id`
WHERE zone_table.id = " . $id);
        return $this->parseZoneTable($resultSet);
    }

    public function removeTable($id) {
        $bdd = new ConnexionBDD();
        $id = $bdd->executeGeneric("UPDATE `tables` SET `zone_table_ke`= NULL WHERE `id`=" . $id);
    }

    public function addTable($numero, $zone) {
        $bdd = new ConnexionBDD();
        return $bdd->executeGeneric("INSERT INTO `tables`(`numero`, `zone_table_ke`) VALUES (" . $numero . "," . $zone . ")");
    }

}
