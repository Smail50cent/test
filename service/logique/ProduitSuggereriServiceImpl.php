<?php

include_once $path . 'service/logique/ProduitSuggererService.php';
include_once $path . 'service/persistance/PersistanceFactory.php';

/**
 * Description of CompteProduitFavoriServiceImpl
 *
 * @author Damien Chesneau <contact@damienchesneau.fr>
 */
class ProduitSuggererServiceImpl implements ProduitSuggererService {

    private $produitSuggererSrv;
    private $produitSrv;

    public function __construct() {
        $this->produitSuggererSrv = PersistanceFactory::getProduitSuggererService();
        $this->produitSrv = LogiqueFactory::getProduitService();
    }

    public function getAll() {
        $cpf = $this->produitSuggererSrv->getAll();
        for ($i = 0; $i < count($cpf); $i++) {
            $produitid = $cpf[$i]->getProduit();
            $produit = $this->produitSrv->getById($produitid);
            $cpf[$i]->setProduit($produit);
        }
        return $cpf;
    }

}
