<?php

include_once $path . 'service/persistance/ZoneTableServiceData.php';
include_once $path . 'service/persistance/ConnexionBDD.php';
include_once $path . 'service/logique/entity/ZoneTable.php';
include_once $path . 'service/logique/entity/Table.php';

/**
 * Description of ZoneTableServiceData
 *
 * @author Damien Chesneau <contact@damienchesneau.fr>
 */
class ZoneTableServiceDataImpl implements ZoneTableServiceData {

    public function getAll() {
        $bdd = new ConnexionBDD();
        $resultSet = $bdd->executeGeneric("SELECT  zone_table.etablissement_id, tables.id AS table_id, tables.numero AS table_numero, zone_table.nom AS zone_table_nom, zone_table.id AS zone_table_id FROM  `zone_table` LEFT JOIN tables ON zone_table.id = tables.zone_table_ke");
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
            $zoneTable->setEtablissement_id($ligne->etablissement_id);
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
                if ($ligne->zone_table_id != $lignes[$i + 1]->zone_table_id) {
                    array_push($liste, $zoneTable);
                    $zoneTable = new ZoneTable();
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
        if (count($liste) == 1) {
            $ret = $liste[0];
        } else {
            $ret = $liste;
        }
        return $ret;
    }

    private function testsForTable($ligne, ZoneTable $zonetable) {
        $isHere = false;
        for ($j = 0; $j < count($zonetable->getTables()); $j++) {
           $tables =  $zonetable->getTables();
            if ($tables[$j]->id == $ligne->table_id) {
                $isHere = true;
                break;
            }
        }if (!$isHere) {
            $table = new Table();
            $table->setId($ligne->table_id);
            $table->setNumero($ligne->table_numero);
            $table->setZone($ligne->zone_table_id);
            return $table;
        } else {
            return null;
        }
    }

}
