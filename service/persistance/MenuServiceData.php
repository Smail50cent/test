<?php

/**
 * Description of MenuServiceData
 *
 * @author Damien Chesneau <contact@damienchesneau.fr>
 */
interface MenuServiceData {

    public function getAll();

    public function getProduitsByIdMenu($id);

    public function getById($id);

    public function getByEtablissementAndZone($etablissementid, $zone);
}
