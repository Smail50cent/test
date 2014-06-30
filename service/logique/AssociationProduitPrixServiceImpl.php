<?php
include_once $path.'service/logique/AssociationProduitPrixService.php';
include_once $path.'service/persistance/PersistanceFactory.php';
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

    public function getByMenu($menu) {
        return $this->asssociationProduitPrixSrv->getByMenu($menu);
    }

}
