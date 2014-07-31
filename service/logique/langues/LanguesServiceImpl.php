<?php

include_once $path.'service/logique/entity/Compte.php';
include_once $path.'service/logique/langues/LanguesService.php';
/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

class LanguesServiceImpl implements LanguesService {

    private $languesSrv;

    function __construct() {
        $this->languesSrv = PersistanceFactory::getLanguesService();
    }

    public function getAll() {
        return $this->languesSrv->getAll();
    }

}
