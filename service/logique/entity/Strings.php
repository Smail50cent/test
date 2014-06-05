<?php

/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

class Strings {
    
    public $id;
    public $lang;
    public $value;
    public $key_lang;
    
    public function getId() {
        return $this->id;
    }

    public function getLang() {
        return $this->lang;
    }

    public function getValue() {
        return $this->value;
    }

    public function getKey_lang() {
        return $this->key_lang;
    }

    public function setId($id) {
        $this->id = $id;
    }

    public function setLang($lang) {
        $this->lang = $lang;
    }

    public function setValue($value) {
        $this->value = $value;
    }

    public function setKey_lang($key_lang) {
        $this->key_lang = $key_lang;
    }

}

