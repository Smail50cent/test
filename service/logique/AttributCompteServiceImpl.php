<?php

include_once 'AttributCompteService.php';
/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

class AttributCompteServiceImpl implements AttributCompteService {

    private $attcompteSrv;

    function __construct() {
        $this->attcompteSrv = PersistanceFactory::getAttributCompteService();
    }

    public function getAll() {
        $attcompte = $this->attcompteSrv->getAll();
        return $attcompte;
    }

    public function getById($id) {
        $attcompte = $this->attcompteSrv->getById($id);
        return $attcompte;
    }

    public function addAll($id_form, $valeur_champ, $defaut, $id_compte) {
        $attcompte = $this->attcompteSrv->addAll($id_form, $valeur_champ, $defaut, $id_compte);
    }

    public function getAllEmails() {
        $attcompte = $this->attcompteSrv->getAllEmails();
        return $attcompte;
    }

    public function getByIdCompte($id) {
        $attcompte = $this->attcompteSrv->getByIdCompte($id);
        return $attcompte;        
    }

}
