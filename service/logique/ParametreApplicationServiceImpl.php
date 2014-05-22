<?php

include_once 'ParametreApplicationService.php';
/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

class ParametreApplicationServiceImpl implements ParametreApplicationService{
    
    private $paramappSrv;
    
    function __construct() {
        $this->paramappSrv = PersistanceFactory::getCompteService();
    }
    
    public function getAll() {
        $paramapp = $this->paramappSrv->getAll();
        return $paramapp;
    }
    
    public function getById($id) {
        $paramapp = $this->paramappSrv->getById($id);
        return $paramapp;
    }

}