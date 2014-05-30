<?php

/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

class Compte {
    
    public $id;
    public $password;
    
    public function getId() {
        return $this->id;
    }

    public function getPassword() {
        return $this->password;
    }

    public function setId($id) {
        $this->id = $id;
    }

    public function setPassword($passwd) {
        $this->password = $passwd;
    }

}
