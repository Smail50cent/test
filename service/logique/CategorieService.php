<?php

/**
 * Description of CategorieService
 *
 * @author Damien Chesneau <contact@damienchesneau.fr>
 */
interface CategorieService {

    public function getAll();

    public function add(Categorie $categorie);

    public function getByEtablissementAndZone($etablissement, $zone);

    public function delete($id);

    public function getPriorite($id);

    public function updatePriority($categories);
}
