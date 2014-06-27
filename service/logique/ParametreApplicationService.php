<?php

interface ParametreApplicationService{
    
    public function getAll();
    public function getById($id);
    public function getByNomParametre($nom);
}