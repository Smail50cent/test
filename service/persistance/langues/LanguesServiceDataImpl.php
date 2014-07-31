<?php

/**
 * Description of CategorieServiceDataImpl
 *
 * @author Damien Chesneau <contact@damienchesneau.fr>
 */
include_once $path . 'service/persistance/langues/LanguesServiceData.php';
include_once $path . 'service/persistance/ConnexionBDD.php';
include_once $path . 'service/logique/entity/Langue.php';

class LanguesServiceDataImpl implements LanguesServiceData {

    public function getAll() {
        $bdd = new ConnexionBDD();
        $result = $bdd->executeGeneric("SELECT `id`, `label`, `gmt_level`, `actif` FROM `langues`");
        return $this->parseLangue($result);
    }

    private function parseLangue($result) {
        $langues = array();
        while ($ligne = $result->fetch()) {
            $langue = new Langue();
            $langue->setId(intval($ligne->id));
            if(intval($ligne->actif)==1){
                $langue->setActif(true);
            }else{
                $langue->setActif(false);
            }
            $langue->setLabel($ligne->label);
            $langue->setGmtLevel($ligne->gmt_level);
            array_push($langues, $langue);
        }
        return $langues;
    }
}
