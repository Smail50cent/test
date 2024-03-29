<?php

/**
 * Description of ZoneTableServiceData
 *
 * @author Damien Chesneau <contact@damienchesneau.fr>
 */
interface ZoneTableServiceData {

    public function getAll();

    public function getByIdEtablissement($id);

    public function getByEtablissementNull();

    public function remove($id);

    public function add(ZoneTable $zoneTable);

    public function getById($id);

    public function removeTable($id);

    public function addTable($numero, $zone);
    
    public function update(ZoneTable $zoneTable);
}
