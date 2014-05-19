<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of IngredientService
 *
 * @author Damien Chesneau <contact@damienchesneau.fr>
 */
interface IngredientService {
    public function getAll();
    public function getById($id);
}
