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
        $result = $bdd->executeGeneric("SELECT "
                . "`id`, `label`, `gmt_level`, `actif`,`type`,`navigator_var`  FROM `langues`");
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
            $langue->setNavigatorVar($ligne->navigator_var);
            $langue->setLabel($ligne->label);
            $langue->setGmtLevel($ligne->gmt_level);
            $langue->setType($ligne->type);
            array_push($langues, $langue);
        }
        return $langues;
    }

    public function setDisable($id) {
        $bdd = new ConnexionBDD();
        $result = $bdd->executeGeneric("UPDATE `langues` SET `actif`= 0 WHERE `id`= ".$id);
    }

    public function setEnable($id) {
        $bdd = new ConnexionBDD();
        $result = $bdd->executeGeneric("UPDATE `langues` SET `actif`= 1 WHERE `id`= ".$id);
    }

    public function getByActif() {
        $bdd = new ConnexionBDD();
        $result = $bdd->executeGeneric("SELECT `id`, `label`, `gmt_level`, `actif`,`type`,`navigator_var` FROM `langues` WHERE actif=1");
        return $this->parseLangue($result);
    }

}
