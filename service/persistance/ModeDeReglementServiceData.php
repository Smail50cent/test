<?php

/**
 * Description of TableServiceData
 *
 * @author Damien Chesneau <contact@damienchesneau.fr>
 */
interface ModeDeReglementServiceData {
    public function getAll();
    public function getById($id);
}
