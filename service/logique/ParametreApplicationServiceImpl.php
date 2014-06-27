<?php

include_once $path . 'service/logique/ParametreApplicationService.php';
/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

class ParametreApplicationServiceImpl implements ParametreApplicationService {

    private $paramappSrv;

    function __construct() {
        $this->paramappSrv = PersistanceFactory::getParamAppService();
    }

    public function getAll() {
        $paramapp = $this->paramappSrv->getAll();
        return $paramapp;
    }

    public function getById($id) {
        $paramapp = $this->paramappSrv->getById($id);
        return $paramapp;
    }

    public function getByNomParametre($nom) {
        $ret;
        if ($nom != null) {
            $ret = $this->paramappSrv->getByNomParametre($nom);
        }else{
            $ret=null;
        }
        return $ret;
    }

}
