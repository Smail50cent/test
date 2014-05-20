<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

class ParamForm {

    public $id_form;
    public $actif;
    public $discrim;
    public $label;
    public $id_label_html;
    public $type_html;
    public $class_html;
    public $style_html;
    public $ordre;
    public $id_html;
    public $file_template_html;

    public function getLabel() {
        return $this->label;
    }

    public function getFile_template_html() {
        return $this->file_template_html;
    }

    public function setLabel($label) {
        $this->label = $label;
    }

    public function setFile_template_html($file_template_html) {
        $this->file_template_html = $file_template_html;
    }

    public function getId_form() {
        return $this->id_form;
    }

    public function getActif() {
        return $this->actif;
    }

    public function getDiscrim() {
        return $this->discrim;
    }

    public function getCode_champ() {
        return $this->code_champ;
    }

    public function getId_label_html() {
        return $this->id_label_html;
    }

    public function getType_html() {
        return $this->type_html;
    }

    public function getClass_html() {
        return $this->class_html;
    }

    public function getStyle_html() {
        return $this->style_html;
    }

    public function getOrdre() {
        return $this->ordre;
    }

    public function getId_html() {
        return $this->id_html;
    }

    public function setId_form($id_form) {
        $this->id_form = $id_form;
    }

    public function setActif($actif) {
        $this->actif = $actif;
    }

    public function setDiscrim($discrim) {
        $this->discrim = $discrim;
    }

    public function setCode_champ($label) {
        $this->code_champ = $label;
    }

    public function setId_label_html($id_label_html) {
        $this->id_label_html = $id_label_html;
    }

    public function setType_html($type_html) {
        $this->type_html = $type_html;
    }

    public function setClass_html($class_html) {
        $this->class_html = $class_html;
    }

    public function setStyle_html($style_html) {
        $this->style_html = $style_html;
    }

    public function setOrdre($ordre) {
        $this->ordre = $ordre;
    }

    public function setId_html($id_html) {
        $this->id_html = $id_html;
    }

}
