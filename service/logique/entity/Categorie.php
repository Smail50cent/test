<?php

/**
 * Description of Categorie
 *
 * @author Damien Chesneau <contact@damienchesneau.fr>
 */
class Categorie {

    public $id;
    public $nom;
    public $priorite;
    public $souscategorie = array();
    public $etablissements = array();
    public $zones = array();
    public $assocEtabZone = array();

    public function getAssocEtabZone() {
        return $this->assocEtabZone;
    }

    public function setAssocEtabZone($assocEtabZone) {
        array_push($this->assocEtabZone, $assocEtabZone);
    }

    public function getZones() {
        return $this->zones;
    }

    public function setZones($zones) {
        $this->zones = $zones;
    }

    public function addZone($zone) {
        array_push($this->zones, $zone);
    }

    public function getEtablissements() {
        return $this->etablissements;
    }

    public function setEtablissements($etablissements) {
        $this->etablissements = $etablissements;
    }

    public function addEtablissements($etablissements) {
        array_push($this->etablissements, $etablissements);
    }

    public function setId($id) {
        $this->id = $id;
    }

    public function getId() {
        return $this->id;
    }

    public function setNom($nom) {
        $this->nom = $nom;
    }

    public function getNom() {
        return $this->nom;
    }

    public function setPriorite($priorite) {
        $this->priorite = $priorite;
    }

    public function getPriorite() {
        return $this->priorite;
    }

    public function setSousCategories($souscategories) {
        $this->souscategorie = $souscategories;
    }

    public function addSousCategories($souscategories) {
        array_push($this->souscategorie, $souscategories);
    }

    public function getSousCategories() {
        return $this->souscategorie;
    }

}
