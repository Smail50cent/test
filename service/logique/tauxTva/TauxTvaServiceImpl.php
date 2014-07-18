<?php

include_once $path.'service/logique/tauxTva/TauxTvaService.php';
/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

class TauxTvaServiceImpl implements TauxTvaService {
    
    private $tauxtvaSrv;
    
    function __construct() {
        $this->tauxtvaSrv = PersistanceFactory::getTauxTvaService();
    }

    public function getAll() {
        return $this->tauxtvaSrv->getAll();
    }

    public function getById($id) {
        return $this->tauxtvaSrv->getById($id);
    }

}