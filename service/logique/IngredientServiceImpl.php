<?php

include_once 'IngredientService.php';
include_once '../persistance/PersistanceFactory.php';
/**
 * Description of IngredientServiceImpl
 *
 * @author Damien Chesneau <contact@damienchesneau.fr>
 */
class IngredientServiceImpl implements IngredientServiceData  {
    
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
