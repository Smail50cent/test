<?php

/**
 * Description of StyleServiceImpl
 *
 * @author Damien Chesneau <contact@damienchesneau.fr>
 */
include_once $path . 'service/logique/style/StyleService.php';

class StyleServiceImpl implements StyleService {

    private $styleSrv;

    public function __construct() {
        $this->styleSrv = PersistanceFactory::getStyleService();
    }

    public function getAll() {
        return $this->styleSrv->getAll();
    }

}
