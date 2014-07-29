<?php

include_once '../../outils/AppRoot.php';
include_once $path . 'service/logique/LogiqueFactory.php';
include_once $path . 'service/logique/entity/Etablissement.php';
/**
 * Description of add
 *
 * @author Damien Chesneau <contact@damienchesneau.fr>
 */
if (isset($_GET["etablissement"])) {
    extract($_GET);
    $etablissement = json_decode($etablissement);
    $newEtab = new Etablissement();
    $newEtab->setLogo($etablissement->logo);
    $newEtab->setAdresseEtab($etablissement->adresseEtab);
    $newEtab->setGroupe($etablissement->groupe);
    $newEtab->setMessage($etablissement->message);
    $newEtab->setNom($etablissement->nom);
    $newEtab->setSlogan($etablissement->slogan);
    $newEtab->setStyle($etablissement->style);
    $newEtab->setTelephone($etablissement->telephone);
    $etabSrv = LogiqueFactory::getEtablissementService();
    $ret = new ToRet1();
    $ret->id = $etabSrv->add($newEtab);
    echo json_encode($ret);
}

class ToRet1 {

    public $id;
    
}
