<?php

include_once $path . 'service/logique/entity/Compte.php';
include_once $path . 'service/logique/langues/LanguesService.php';
/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

class LanguesServiceImpl implements LanguesService {

    private $languesSrv;
    private $stringsSrv;

    function __construct() {
        $this->languesSrv = PersistanceFactory::getLanguesService();
        $this->stringsSrv = LogiqueFactory::getStringsService();
    }

    public function getAll() {
        return $this->languesSrv->getAll();
    }

    public function setLangActif($id) {
        $this->languesSrv->setEnable($id);
        $actifs = $this->languesSrv->getByActif();
        $this->stringsSrv->generateXMLFileFor($actifs);
    }

    public function setLangDiable($id) {
        $this->languesSrv->setDisable($id);
        $actifs = $this->languesSrv->getByActif();
        $this->stringsSrv->generateXMLFileFor($actifs);
    }

    public function getByActif() {
        return $this->languesSrv->getByActif();
    }

}
