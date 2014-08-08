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
}
