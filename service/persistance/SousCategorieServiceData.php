<?php

/**
 * Description of CategorieService
 *
 * @author Damien Chesneau <contact@damienchesneau.fr>
 */
interface SousCategorieServiceData {

    public function getAll();

    public function getByIdCategortie($id);
    
    public function getByIdParseObj($id);
    
    public function getById($id);
}
