<?php

/**
 * Description of CategorieService
 *
 * @author Damien Chesneau <contact@damienchesneau.fr>
 */
interface EtablissementServiceData {

    public function getAll();

    public function getAllWithZones();

    public function getById($id);

    public function add(Etablissement $etablissement);

    public function remove($id);

    public function update(Etablissement $etablissement);
}
