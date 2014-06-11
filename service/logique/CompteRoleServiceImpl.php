<?php

include_once 'CompteRoleService.php';
include_once '../logique/entity/CompteRole.php';

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
