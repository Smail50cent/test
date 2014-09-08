<?php

include_once $path . 'service/logique/CategorieService.php';
include_once $path . 'service/logique/entity/Categorie.php';

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

    public function add(Categorie $categorie) {
        return $this->categorieSrv->add($categorie);
    }

    public function getByEtablissementAndZone($etablissement, $zone) {
        return $this->categorieSrv->getByEtablissementAndZone($etablissement, $zone);
    }

    public function delete($id) {
        $this->categorieSrv->delete($id);
    }

    public function getPriorite($id) {
        return $this->categorieSrv->getPriorite($id);
    }

    public function updatePriority($categories) {
        return $this->categorieSrv->updatePriority($categories);
    }

}
