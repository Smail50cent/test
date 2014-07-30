<?php

include_once $path . 'service/logique/ZoneTableService.php';

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
        $ret=null;
        if($id!=null){
           $ret= $this->zoneTableSrv->getByIdEtablissement($id);
        }
        return $ret;
    }

}
