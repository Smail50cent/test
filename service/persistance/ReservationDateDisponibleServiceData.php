<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

interface ReservationDateDisponibleServiceData {

    public function getByDate($date);

    public function getById($id);

    public function getAll();
}
