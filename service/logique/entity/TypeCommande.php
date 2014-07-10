<?php

/**
 * Description of TypeCommande
 *
 * @author Damien Chesneau <contact@damienchesneau.fr>
 */
class TypeCommande {

    public $id;
    public $label;
    public $isActif;
    public $labelMenu;
    public $idInPageHtml;
    public $level;

    public function getIdInPageHtml() {
        return $this->idInPageHtml;
    }

    public function setIdInPageHtml($idInPageHtml) {
        $this->idInPageHtml = $idInPageHtml;
    }

    public function getId() {
        return $this->id;
    }

    public function getLabel() {
        return $this->label;
    }

    public function getIsActif() {
        return $this->isActif;
    }

    public function getLabelMenu() {
        return $this->labelMenu;
    }

    public function setId($id) {
        $this->id = $id;
    }

    public function setLabel($label) {
        $this->label = $label;
    }

    public function setIsActif($isActif) {
        $this->isActif = $isActif;
    }

    public function setLabelMenu($labelMenu) {
        $this->labelMenu = $labelMenu;
    }

    public function getLevel() {
        return $this->level;
    }

    public function setLevel($level) {
        $this->level = $level;
    }

}
