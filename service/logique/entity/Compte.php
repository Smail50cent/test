<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

class Compte {

    public $id;
    public $password;
    public $role;
    public $sexe;
    public $nom;
    public $prenom;
    public $dateDeNaissance;
    public $adresses;
    public $telephones;
    public $email;
    public $photo;

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

    public function setRole($role) {
        $this->role = $role;
    }

    public function getRole() {
        return $this->role;
    }

    public function setSexe($sexe) {
        $this->sexe = $sexe;
    }

    public function getSexe() {
        return $this->sexe;
    }

    public function setNom($nom) {
        $this->nom = $nom;
    }

    public function getNom() {
        return $this->nom;
    }

    public function setPrenom($prenom) {
        $this->prenom = $prenom;
    }

    public function getPrenom() {
        return $this->prenom;
    }

    public function setDateDeNaissance($date) {
        $this->dateDeNaissance = $date;
    }

    public function getDateDenaissance() {
        return $this->dateDeNaissance;
    }

    public function setAdresses($adresses) {
        $this->adresses = $adresses;
    }

    public function getAdresses() {
        return $this->adresses;
    }

    public function setTelephones($telephones) {
        $this->telephones = $telephones;
    }

    public function getTelephones() {
        return $this->telephones;
    }

    public function setEmail($email) {
        $this->email = $email;
    }

    public function getEmail() {
        return $this->email;
    }

    public function setPhoto($photo) {
        $this->photo = $photo;
    }

    public function getPhoto() {
        return $this->photo;
    }

}
