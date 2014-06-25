<?php

include_once $path.'service/logique/SousCategorieService.php';

/**
 * Description of CategorieServiceImpl
 *
 * @author Damien Chesneau <contact@damienchesneau.fr>
 */
class SousCategorieServiceImpl implements SousCategorieService {

    private $categorieSrv;

    function __construct() {
        $this->categorieSrv = PersistanceFactory::getSousCategorieService();
    }

    public function getAll() {
        return $this->categorieSrv->getAll();
    }
    public function getById($id){
        return $this->categorieSrv->getById($id);
    }

    public function addData() {
        $this->categorieSrv->addData();
    }

}
