<?php

/**
 * Description of CategorieService
 *
 * @author Damien Chesneau <contact@damienchesneau.fr>
 */
interface CategorieService {

    public function getAll();

    public function addData();

    public function getByEtablissementAndZone($etablissement, $zone);
}
