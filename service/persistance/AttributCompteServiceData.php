<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

interface AttributCompteServiceData {

    public function getAll();
    public function getAllByEmail($email);
    public function getById($id);
    public function getByIdCompte($id);
    public function addAll($id_form,$valeur_champ,$default,$id_compte);
}
