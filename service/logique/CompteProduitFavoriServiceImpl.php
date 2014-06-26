<?php

include_once $path . 'service/logique/CompteProduitFavoriService.php';
include_once $path . 'service/persistance/PersistanceFactory.php';

/**
 * Description of CompteProduitFavoriServiceImpl
 *
 * @author Damien Chesneau <contact@damienchesneau.fr>
 */
class CompteProduitFavoriServiceImpl implements CompteProduitFavoriService {

    private $compteProduitFavoriSrv;
    private $produitSrv;

    public function __construct() {
        $this->compteProduitFavoriSrv = PersistanceFactory::getCompteProduitFavoriService();
        $this->produitSrv = PersistanceFactory::getProduitService();
    }

    public function getByIdServeur($id) {
        $cpf = $this->compteProduitFavoriSrv->getByIdServeur($id);
        for ($i = 0; $i < count($cpf); $i++) {
            $produitid = $cpf[$i]->getProduit();
            $produit = $this->produitSrv->getById($produitid);
            $cpf[$i]->setProduit($produit);
        }
        return $cpf;
    }

}
