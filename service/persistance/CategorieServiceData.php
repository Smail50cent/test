<?php

/**
 * Description of CategorieService
 *
 * @author Damien Chesneau <contact@damienchesneau.fr>
 */
interface CategorieServiceData {
    public function getAll();
    public function getById($id);
    public function add(Categorie $categorie);
    public function getByEtablissementAndZone($etablissement,$zone);
}
