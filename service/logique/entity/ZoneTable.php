<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of ZoneTable
 *
 * @author Damien Chesneau <contact@damienchesneau.fr>
 */
class ZoneTable {

    public $id;
    public $nom;
    public $etablissement_id;
    public $tables = array();

    public function getEtablissement_id() {
        return $this->etablissement_id;
    }

    public function setEtablissement_id($etablissement_id) {
        $this->etablissement_id = $etablissement_id;
    }

    public function getId() {
        return $this->id;
    }

    public function setId($id) {
        $this->id = $id;
    }

    public function getNom() {
        return $this->nom;
    }

    public function setNom($nom) {
        $this->nom = $nom;
    }

    public function getTables() {
        return $this->tables;
    }

    public function setTables($tables) {
        $this->tables = $tables;
    }

    public function addTable($table) {
        array_push($this->tables, $table);
    }

}
