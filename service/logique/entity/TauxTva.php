<?php

/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

class TauxTva {
    
    public $id_tva;
    public $taux_tva;
    
    public function getId_tva() {
        return $this->id_tva;
    }

    public function getTaux_tva() {
        return $this->taux_tva;
    }

    public function setId_tva($id_tva) {
        $this->id_tva = $id_tva;
    }

    public function setTaux_tva($taux_tva) {
        $this->taux_tva = $taux_tva;
    }


}
