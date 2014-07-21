<?php

include_once $path . 'service/logique/option/OptionService.php';
include_once $path . 'service/logique/entity/Option.php';

/**
 * Description of OptionServiceImpl
 *
 * @author Hamza Legdani <hamza.legdani@gmail.com>
 */
class OptionServiceImpl implements OptionService {

    private $optSrv;

    public function __construct() {
        $this->optSrv = PersistanceFactory::getOptionService();
    }

    public function getById($id) {
        return $this->optSrv->getById($id);
    }

    public function getOptionByIdProduit($id) {
        return $this->optSrv->getOptionByIdProduit($id);
    }

    public function getAll() {
        return $this->optSrv->getAll();
    }

    public function add($option) {

        $idLastInsert = $this->optSrv->add($option->id, $option->nom, $option->label);
        $idPossib = 0;
        for ($i = 0; $i < count($option->possibilite); $i++) {
            $idPossib = $this->optSrv->addPossibilite($option->possibilite[$i]->id, $option->possibilite[$i]->nom, $idLastInsert);
        }
    return $idPossib;
    }

}
