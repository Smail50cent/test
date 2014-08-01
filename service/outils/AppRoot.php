<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

class AppRoot {

    private $isAppRoot = true;
    private $NameApp = "appcaisse";
    private $isGet = true;

    public function getPATH() {
        if ($this->isAppRoot) {
            return $_SERVER["DOCUMENT_ROOT"] . "/" . $this->NameApp . "/";
        } else {
            return $_SERVER["DOCUMENT_ROOT"] . "/";
        }
    }

    public function isGet() {
        return $this->isGet;
    }

}
class Retour {

    public $data;
    public $error = false;

}
$root = new AppRoot();
static $path;
if ($root->isGet()) {
    extract($_GET);
} else {
    extract($_POST);
}
$ret = new Retour();
$path = $root->getPATH();
