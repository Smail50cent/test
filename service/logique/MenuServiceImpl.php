<?php

include_once $path . 'service/logique/MenuService.php';

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
//        $associationProduitPrixSrv = PersistanceFactory::getAssociationProduitPrixService();
//        for ($i = 0; $i < count($menus) ; $i++) {
//            $menus[$i]->setPrix($associationProduitPrixSrv->getByMenu($menus[$i]->getId()));
//        }
        return $menus;
    }

    public function getById($id) {
        $associationProduitPrixSrv = PersistanceFactory::getAssociationProduitPrixService();
        $menu = $this->menuSrv->getById($id);
        $menu->setPrix($associationProduitPrixSrv->getByMenu($menu->getId()));
        return $menu;
    }

    public function getByEtablissementAndZone($etablissementid, $zone) {
        return $this->menuSrv->getByEtablissementAndZone($etablissementid, $zone);
    }

}
