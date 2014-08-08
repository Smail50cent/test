<?php

include_once $path . 'service/logique/zonestables/ZoneTableService.php';

/**
 * Description of ZoneTableServiceData
 *
 * @author Damien Chesneau <contact@damienchesneau.fr>
 */
class ZoneTableServiceImpl implements ZoneTableService {

    private $zoneTableSrv; //ARRAY

    function __construct() {
        $this->zoneTableSrv = PersistanceFactory::getZoneTableService();
    }

    public function getAll() {
        return $this->zoneTableSrv->getAll();
    }

    public function getByIdEtablissement($id) {
        $ret = null;
        if ($id != null) {
            $ret = $this->zoneTableSrv->getByIdEtablissement($id);
        }
        return $ret;
    }

    public function getByEtablissementNull() {
        return $this->zoneTableSrv->getByEtablissementNull();
    }

    public function remove($id) {
        if ($id != null) {
            $ret = $this->zoneTableSrv->remove($id);
        }
    }

    public function add(\ZoneTable $zoneTable) {
        $ret = null;
        if ($zoneTable != null) {
            $ret = $this->zoneTableSrv->add($zoneTable);
        }
        return $ret;
    }

    public function getById($id) {
        $ret = null;
        if ($id != null) {
            $ret = $this->zoneTableSrv->getById($id);
        }
        return $ret;
    }

}
