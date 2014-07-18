<?php

include_once $path.'service/logique/CategorieService.php';

/**
 * Description of CategorieServiceImpl
 * @author Damien Chesneau <contact@damienchesneau.fr>
 */
class CategorieServiceImpl implements CategorieService {

    private $categorieSrv;

    function __construct() {
        $this->categorieSrv = PersistanceFactory::getCategorieService();
    }

    public function getAll() {
        return $this->categorieSrv->getAll();
    }

    public function addData() {
        $this->categorieSrv->addData();
    }

    public function getByEtablissementAndZone($etablissement, $zone) {
        return $this->categorieSrv->getByEtablissementAndZone($etablissement, $zone);
    }

}
