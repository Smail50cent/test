<?php

include_once $path.'service/logique/CompteRoleService.php';
include_once $path.'service/logique/entity/CompteRole.php';

/**
 * Description of CompteRoleServiceDataImpl
 *
 * @author Damien Chesneau <contact@damienchesneau.fr>
 */
class CompteRoleServiceImpl implements CompteRoleService {

    private $compteRoleSrv;
    
    public function __construct() {
        $compteRoleSrv = PersistanceFactory::getCompteRoleService();
    }

    public function getAll() {
        return $this->compteRoleSrv->getAll();
    }

}
