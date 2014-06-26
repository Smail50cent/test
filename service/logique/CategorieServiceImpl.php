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
        $sousCat = PersistanceFactory::getSousCategorieService();
        $categories = $this->categorieSrv->getAll();
        for ($i = 0; $i < count($categories); $i++) {
            $ings = $sousCat->getByIdCategortie($categories[$i]->getId());
            $souscategories = array();
            $j = 0;
            while ($ing = $ings->fetch()) {
                $souscategories[$j] = intval($ing->ID);
                $j++;
            }
            $categories[$i]->setSousCategories($souscategories);
        }
        return $categories;
    }

    public function addData() {
        $this->categorieSrv->addData();
    }

}
