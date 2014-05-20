<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

include_once 'ParamFormServiceData.php';
include_once 'ConnexionBDD.php';
include_once '../logique/entity/ParamForm.php';

class ParamFormServiceDataImpl implements ParamFormServiceData {

    public function getAll() {
        $paramforms = array();
        $bdd = new ConnexionBDD();
        $return = $bdd->executeGeneric("SELECT * FROM param_form ORDER BY ordre ASC");
        $i = 0;
        while ($ligne = $return->fetch()) {
            $paramform = new ParamForm();
            $paramform->setId_form(intval($ligne->id_form));
            $paramform->setActif(intval($ligne->actif));
            $paramform->setDiscrim($ligne->discrim);
            $paramform->setLabel($ligne->label);
            $paramform->setId_label_html($ligne->id_label_html);
            $paramform->setType_html($ligne->type_html);
            $paramform->setClass_html($ligne->class_html);
            $paramform->setStyle_html($ligne->style_html);
            $paramform->setOrdre(intval($ligne->ordre));
            $paramform->setId_html($ligne->id_html);
            $paramform->setFile_template_html($ligne->file_template_html);
            $paramforms[$i] = $paramform;
            $i++;
        }
        return $paramforms;
    }

    public function getById($id) {

        $bdd = new ConnexionBDD();
        $retour = $bdd->executeGeneric("SELECT * FROM param_form WHERE id_form=" . $id);
        $paramform = new ParamForm();
        $ligne = $retour->fetch();
        $paramform->setId_form(intval($ligne->id_form));
        $paramform->setActif(intval($ligne->actif));
        $paramform->setDiscrim($ligne->discrim);
        $paramform->setLabel($ligne->label);
        $paramform->setId_label_html($ligne->id_label_html);
        $paramform->setType_html($ligne->type_html);
        $paramform->setClass_html($ligne->class_html);
        $paramform->setStyle_html($ligne->style_html);
        $paramform->setOrdre(intval($ligne->ordre));
        $paramform->setId_html($ligne->id_html);
        $paramform->setFile_template_html($ligne->file_template_html);

        return $paramform;
    }

}
