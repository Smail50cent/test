<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

interface StringsService {

    public function getAll();

    public function getById($id);

    public function getByLang($lang);

    /**
     * 
     * @param array 
     */
    public function generateXMLFileFor($langues);
}
