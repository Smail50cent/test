<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

include_once '../../outils/AppRoot.php';
include_once $path . 'service/logique/LogiqueFactory.php';
include_once $path . 'service/logique/entity/Categorie.php';

try {
    if (isset($categorie)) {
        $categories = array();
        $categorie = json_decode($categorie);
        for ($i = 0; $i < count($categorie); $i++) {
            $catPhp = new Categorie();
            $catPhp->setId($categorie[$i]->id);
            $catPhp->setPriorite($categorie[$i]->priorite);
            $etablissement = new Etablissement();
            $etabs = array();
            $etablissement->setId($categorie[$i]->etablissement);
            array_push($etabs, $etablissement);
            $catPhp->setEtablissements($etabs);
            array_push($categories, $catPhp);
        }
        $categorieSrv = LogiqueFactory::getCategorieService();
        $ret->data = $categorieSrv->updatePriority($categories);
    }
} catch (Exception $ex) {
    $ret->error = true;
}
echo json_encode($ret);
