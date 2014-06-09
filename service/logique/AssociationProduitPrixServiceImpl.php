<?php
include_once 'AssociationProduitPrixService.php';
include_once '../persistance/PersistanceFactory.php';
/**
 * Description of AssociationProduitPrixServiceDataImpl
 *
 * @author Damien Chesneau <contact@damienchesneau.fr>
 */
class AssociationProduitPrixServiceImpl implements AssociationProduitPrixService {

    private $asssociationProduitPrixSrv;

    public function __construct() {
        $this->asssociationProduitPrixSrv = PersistanceFactory::getAssociationProduitPrixService();
    }
    public function getByProduit($produit) {
        return $this->asssociationProduitPrixSrv->getByProduit($produit);
    }

}
