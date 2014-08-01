<?php

/**
 * Description of Langue
 *
 * @author Damien Chesneau <contact@damienchesneau.fr>
 */
class Langue {

    public $id;
    public $label;
    public $gmt_level;
    public $actif;
    public $type;
    public $navigatorVar;

    public function getNavigatorVar() {
        return $this->navigatorVar;
    }

    public function setNavigatorVar($navigatorVar) {
        $this->navigatorVar = $navigatorVar;
    }

    public function getType() {
        return $this->type;
    }

    public function setType($type) {
        $this->type = $type;
    }

    public function getId() {
        return $this->id;
    }

    public function getLabel() {
        return $this->label;
    }

    public function getGmtLevel() {
        return $this->gmt_level;
    }

    public function getActif() {
        return $this->actif;
    }

    public function setId($id) {
        $this->id = $id;
    }

    public function setLabel($label) {
        $this->label = $label;
    }

    public function setGmtLevel($gmt_level) {
        $this->gmt_level = $gmt_level;
    }

    public function setActif($actif) {
        $this->actif = $actif;
    }

}
