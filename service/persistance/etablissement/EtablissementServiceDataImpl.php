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

}
