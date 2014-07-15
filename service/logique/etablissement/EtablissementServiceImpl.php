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
        $this->etablissementSrv = PersistanceFactory::getGroupeService();
    }

    public function getAll() {
        return $this->etablissementSrv->getAll();
    }

    
    }
