<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

interface StringsServiceData {

    public function getAll();

    public function getById($id);

    public function getByLang($lang);

    public function add(Strings $String);
}
