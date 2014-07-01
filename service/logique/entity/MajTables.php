<?php

/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

class MajTables {
    
    public $nomTable;
    public $level;
    
    public function getNomTable() {
        return $this->nomTable;
    }

    public function getLevel() {
        return $this->level;
    }

    public function setNomTable($nomTable) {
        $this->nomTable = $nomTable;
    }

    public function setLevel($level) {
        $this->level = $level;
    }


}

