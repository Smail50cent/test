<?php

include_once 'CompteService.php';
/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

class CompteServiceImpl implements CompteService{
    
    private $compteSrv;
    
    function __construct() {
        $this->compteSrv = PersistanceFactory::getCompteService();
    }
    
    public function getAll() {
        $compte = $this->compteSrv->getAll();
        return $compte;
    }
    
    public function getById($id) {
        $compte = $this->compteSrv->getById($id);
        return $compte;
    }
}