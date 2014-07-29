<?php

include_once $path . 'service/logique/groupe/GroupeService.php';
include_once $path . 'service/persistance/PersistanceFactory.php';

/**
 * Description of GroupeServiceImpl
 *
 * @author Damien Chesneau <contact@damienchesneau.fr>
 */
class GroupeServiceImpl implements GroupeService {

    private $groupeSrv;

    public function __construct() {
        $this->groupeSrv = PersistanceFactory::getGroupeService();
    }

    public function getAll() {
        return $this->groupeSrv->getAll();
    }

    public function getById($id) {
        $ret = null;
        if($id!=null){
            $ret = $this->groupeSrv->getById($id);
        }
        return $ret;
    }

}
