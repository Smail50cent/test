<?php

include_once $path.'service/logique/ParamFormService.php';
/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

class ParamFormServiceImpl implements ParamFormService{
    
    private $paramformSrv;
    
    function __construct() {
        $this->paramformSrv = PersistanceFactory::getParamFormService();
    }
    
    public function getAll() {
        $paramform = $this->paramformSrv->getAll();
        return $paramform;
    }
    
    public function getById($id) {
        $paramform = $this->paramformSrv->getById($id);
        return $paramform;
    }
}