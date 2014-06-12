<?php

/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

interface CompteService{
    public function getUser($email,$password);
    public function getAll();
    public function getById($id);
    public function addAll($password,$role);
    public function add($compte);
}