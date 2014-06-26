<?php

include_once $path.'service/logique/MenuService.php';

/**
 * Description of CategorieServiceImpl
 *
 * @author Damien Chesneau <contact@damienchesneau.fr>
 */
class MenuServiceImpl implements MenuService {

    private $menuSrv;

    function __construct() {
        $this->menuSrv = PersistanceFactory::getMenuService();
    }

    public function getAll() {
        $menus = $this->menuSrv->getAll();
        return $menus;
    }

    public function getById($id) {
        $menus = $this->menuSrv->getById($id);
        return $menus;
    }

}
