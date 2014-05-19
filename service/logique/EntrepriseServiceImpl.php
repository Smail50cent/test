<?php

include_once 'EntrepriseService.php';
include_once '../persistance/PersistanceFactory.php';

/**
 *
 * @author Damien Chesneau <contact@damienchesneau.fr>
 */
class EntrepriseServiceImpl implements EntrepriseService {

    private $entrepriseSrv;

    function __construct() {
        $this->entrepriseSrv = PersistanceFactory::getEntrepriseService();
    }

    public function getEntreprise() {
        return $this->entrepriseSrv->getEntreprise();
    }

    public function getMaj() {
        return $this->entrepriseSrv->getMaj();
    }

}
