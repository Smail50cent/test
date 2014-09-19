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
    public function delete($id);
    public function getPriorite($id);
    public function updatePriority($categories);
    public function getByIdForUpdate($id);
    public function update(Categorie $categorie);
}
