<?php

/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

class AppRoot {
    
    
    public $isAppRoot = true;
    public $NameApp = "appcaisse";
    
    public function getPATH() {
        if ($this->isAppRoot) {
            return $_SERVER["DOCUMENT_ROOT"]."/".$this->NameApp."/";
        }else {
            return $_SERVER["DOCUMENT_ROOT"]."/";
        }
    }
}

$root = new AppRoot();
static $path ;
$path = $root->getPATH();