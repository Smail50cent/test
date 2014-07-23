<?php

include_once $path . 'service/logique/etablissement/EtablissementService.php';
include_once $path . 'service/persistance/PersistanceFactory.php';

/**
 * Description of GroupeServiceImpl
 *
 * @author Damien Chesneau <contact@damienchesneau.fr>
 */
class EtablissementServiceImpl implements EtablissementService {

    private $etablissementSrv;

    public function __construct() {
        $this->etablissementSrv = PersistanceFactory::getEtablissementService();
    }

    public function getAll() {
        return $this->etablissementSrv->getAll();
    }

    public function getById($id) {
        return $this->etablissementSrv->getById($id);
    }

    public function getAllWithZones() {
        return $this->etablissementSrv->getAllWithZones();
    }

}
