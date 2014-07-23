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
zone_table.nom AS zone_table_nom
FROM `etablissement`
LEFT JOIN groupe ON groupe.id = `id_groupe`
LEFT JOIN zone_table ON zone_table.etablissement_id = etablissement.id");
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
            $zoneTable = new ZoneTable();
            $zoneTable->setId($ligne->zone_table_id);
            $zoneTable->setNom($ligne->zone_table_nom);
            $zoneTable->setEtablissement_id($ligne->etablissement_id);
            return $zoneTable;
        } else {
            return null;
        }
    }

}
