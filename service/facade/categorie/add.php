<?php

include_once '../../outils/AppRoot.php';
include_once $path . 'service/logique/LogiqueFactory.php';
include_once $path . 'service/logique/entity/Categorie.php';
try {
    if (isset($categorie)) {
        $categorie = json_decode($categorie);
        $categoriephp = new Categorie();
        $categoriephp->setNom($categorie->nom);
        //$categoriephp->setPriorite($categorie->priorite);

        if (count($categorie->souscategorie) == 0) {
            $categoriephp->setSousCategories(null);
        } else {
            $souscategories = array();
            for ($i = 0; $i < count($categorie->souscategorie); $i++) {
                $souscategorie = new SousCategorie();
                $souscategorie->setNom($categorie->souscategorie[$i]->nom);
                $souscategorie->setPriorite($categorie->souscategorie[$i]->priorite);
                //$souscategorie->setTaux_tva($categorie->souscategorie[$i]->taux_tva);
                array_push($souscategories, $souscategorie);
            }
            $categoriephp->setSousCategories($souscategories);
        }

        if (count($categorie->etablissement) == 0) {
            $categoriephp->setEtablissements(null);
        } else {
            $etablissements = array();
            for ($i = 0; $i < count($categorie->etablissement); $i++) {
                $etablissement = new Etablissement();
                $etablissement->setId($categorie->etablissement[$i]->id);
                $etablissement->setZones($categorie->etablissement[$i]->zones);
                array_push($etablissements, $etablissement);
            }
            $categoriephp->setEtablissements($etablissements);
        }

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
