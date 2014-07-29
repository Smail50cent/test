<?php

/**
 * Description of CategorieServiceDataImpl
 *
 * @author Damien Chesneau <contact@damienchesneau.fr>
 */
include_once $path . 'service/persistance/style/StyleServiceData.php';
include_once $path . 'service/persistance/ConnexionBDD.php';
include_once $path . 'service/logique/entity/Style.php';

class StyleServiceDataImpl implements StyleServiceData {

    public function getAll() {
        $bdd = new ConnexionBDD();
        $retour = $bdd->executeGeneric("SELECT `id`, `nom`, `URL`, `actif` FROM `styles_disponibles`");
        return $this->parseStyle($retour);
    }
    private function parseStyle($resultSet) {
        $liste = array();
        while ($ligne = $resultSet->fetch()) {
            $style = new Style();
            $style->setId(intval($ligne->id));
            $style->setNom($ligne->nom);
            $style->setUrl($ligne->URL);
            if($ligne->actif == 0){
                $style->setActif(false);
            }else{
                $style->setActif(true);
            }
            array_push($liste, $style);
        }
        return $liste;
    }

}
