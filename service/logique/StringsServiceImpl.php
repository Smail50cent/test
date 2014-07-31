<?php

include_once $path . 'service/logique/StringsService.php';
include_once $path . 'service/io/PhysiqueIOFactory.php';
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

    public function generateXMLFileFor($langues) {
        $srvIO = PhysiqueIOFactory::getStringsService();
        $srvIO->deleteFilesInStringsFolder();
        if (!is_array($langues)) {
            $langues = array($langues);
        }
        for ($i = 0; $i < count($langues); $i++) {
            $strings = $this->getByLang($langues[$i]);
            $srvIO->sendDataToNewFile("string_" . $strings[0]->getLang() . ".xml", $strings);
        }
    }

    public function addNewString($key, $en, $fr) {
        if ($key != null && $en != null & $fr != null) {
            
            $strFr = new Strings();
            $strFr->setKey_lang($key);
            $strFr->setLang("fr_FR");
            $strFr->setValue($fr);
            $this->stringsSrv->add($strFr);
            $strEn = new Strings();
            $strEn->setKey_lang($key);
            $strEn->setLang("en_US");
            $strEn->setValue($en);
            $this->stringsSrv->add($strEn);
            $this->generateXMLFileFor(array("fr_FR", "en_US"));
        }
    }

}
