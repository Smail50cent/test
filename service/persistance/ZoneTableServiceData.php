<?php

/**
 * Description of ZoneTableServiceData
 *
 * @author Damien Chesneau <contact@damienchesneau.fr>
 */
interface ZoneTableServiceData {

    public function getAll();

    public function getByIdEtablissement($id);
}
