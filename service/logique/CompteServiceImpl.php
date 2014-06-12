<?php

include_once '../logique/entity/Compte.php';
include_once 'CompteService.php';
/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

class CompteServiceImpl implements CompteService {

    private $compteSrv;

    function __construct() {
        $this->compteSrv = PersistanceFactory::getCompteService();
    }

    public function getAll() {
        $compte = $this->compteSrv->getAll();
        return $compte;
    }

    public function getById($id) {
        $compte = $this->compteSrv->getById($id);
        return $compte;
    }

    public function addAll($password,$role) {
        $this->compteSrv->addAll($password,$role);
    }

    public function getUser($email, $password) {
        $ret = null;
        $attrCompteSrv = PersistanceFactory::getAttributCompteService();
        $compteSrv = PersistanceFactory::getCompteService();
        $attrCompteEmail = $attrCompteSrv->getAllByEmail($email);
        $idcompte = $attrCompteEmail->getId_compte();
        $compte = $compteSrv->getById($idcompte);
        $password2 = $compte->getPassword();
        if ($password == $password) {
            $compteUser = new Compte();
            $lignes = $attrCompteSrv->getByIdCompte($idcompte);
            $adresses = array();
            $telephones = array();
            while ($ligne = $lignes->fetch()) {
                switch (intval($ligne->id_form)) {
                    case 1://sexe
                        $compteUser->setSexe($ligne->valeur_champ);
                        break;
                    case 2://nom
                        $compteUser->setNom($ligne->valeur_champ);
                        break;
                    case 3://prenom
                        $compteUser->setPrenom($ligne->valeur_champ);
                        break;
                    case 4://date de naissance
                        $compteUser->setDateDeNaissance($ligne->valeur_champ);
                        break;
                    case 5://adresse    
                        array_push($adresses, $ligne->valeur_champ);
                        break;
                    case 6://tel
                        array_push($telephones, $ligne->valeur_champ);
                        break;
                    case 7://email
                        $compteUser->setEmail($ligne->valeur_champ);
                        break;
                    case 8://photo
                        $compteUser->setPhoto($ligne->valeur_champ);
                        break;
                }
            }
            $compteUser->setAdresses($adresses);
            $compteUser->setTelephones($telephones);
            $ret = $compteUser;
        } else {
            $ret = "ERRORPASSWORD";
        }
        return $ret;
    }

    public function add($compte) {
        
    }

}
