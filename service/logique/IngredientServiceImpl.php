<?php

include_once $path.'service/logique/IngredientService.php';
include_once $path.'service/persistance/PersistanceFactory.php';
/**
 * Description of IngredientServiceImpl
 *
 * @author Damien Chesneau <contact@damienchesneau.fr>
 */
class IngredientServiceImpl implements IngredientService {
    
    private $ingredientSrv;

    function __construct() {
        $this->ingredientSrv = PersistanceFactory::getIngredientService();
    }

    public function getAll() {
        return $this->ingredientSrv->getAll();
    }

    public function getById($id) {
        return $this->ingredientSrv->getById($id);
    }

}
