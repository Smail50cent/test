<?php

/**
 * Description of MenueService
 *
 * @author Damien Chesneau <contact@damienchesneau.fr>
 */
interface MenuService {

    public function getByEtablissementAndZone($etablissementid, $zone);

    public function getAll();

    public function getById($id);
}
