<?php

/**
 * Description of ZoneTableServiceData
 *
 * @author Damien Chesneau <contact@damienchesneau.fr>
 */
interface ZoneTableService {

    public function getAll();

    public function getByIdEtablissement($id);
}
