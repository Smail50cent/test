<?php

include_once 'ModeDeReglementService.php';

/**
 * Description of TableServiceImpl
 *
 * @author Damien Chesneau <contact@damienchesneau.fr>
 */
class ModeDeReglementServiceImpl implements ModeDeReglementService {

    private $modeDeReglementSrv;

    function __construct() {
        $this->modeDeReglementSrv = PersistanceFactory::getModeDeReglementService();
    }

    public function getAll() {
        return $this->modeDeReglementSrv->getAll();
    }

    public function getById($id) {
        return $this->modeDeReglementSrv->getById($id);
    }

}
