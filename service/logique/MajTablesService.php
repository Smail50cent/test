<?php

/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

interface MajTablesService {
    
    public function getAll();
    public function getBynomTable($nom);
    public function haveMAJ($tableName,$level);
    public function updateLevel($type);
}
