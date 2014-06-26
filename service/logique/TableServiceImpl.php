<?php

include_once $path.'service/logique/TableService.php';

/**
 * Description of TableServiceImpl
 *
 * @author Damien Chesneau <contact@damienchesneau.fr>
 */
class TableServiceImpl implements TableService {

    private $tableSrv;

    function __construct() {
        $this->tableSrv = PersistanceFactory::getTableService();
    }

    public function getAll() {
        return $this->tableSrv->getAll();
    }

}
