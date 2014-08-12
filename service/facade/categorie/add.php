<?php

include_once '../../outils/AppRoot.php';
include_once $path . 'service/logique/LogiqueFactory.php';
include_once $path . 'service/logique/entity/Categorie.php';
try {
    if (isset($categorie)) {
        $categorie = json_decode($categorie);
        $categoriephp = new Categorie();
        $categoriephp->setNom($categorie->nom);
        $categoriephp->setPriorite($categorie->priorite);
        $categorieSrv = LogiqueFactory::getCategorieService();
        $rett = new retid();
        $rett->id = $categorieSrv->add($categoriephp);
        $ret->data = $rett;
    }
} catch (Exception $exc) {
    $ret->error = true;
}
echo json_encode($ret);

class retid {

    public $id;

}
