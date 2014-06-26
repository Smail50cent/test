<?php

include_once $path.'service/logique/StringsService.php';
/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

class StringsServiceImpl implements StringsService {

    private $stringsSrv;

    function __construct() {
        $this->stringsSrv = PersistanceFactory::getStringsService();
    }

    public function getAll() {
        $strings = $this->stringsSrv->getAll();
        return $strings;
    }

    public function getById($id) {
        $strings = $this->stringsSrv->getById($id);
        return $strings;
    }

    public function getByLang($lang) {
        $strings = $this->stringsSrv->getByLang($lang);
        return $strings;
    }

}
