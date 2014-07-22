<?php

interface ParametreApplicationService{
    
    public function getAll($etablissementid); 
    public function getById($id);
    public function getByNomParametre($nom,$etablissementid);
}