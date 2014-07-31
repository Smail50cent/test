<?php

/**
 * Description of CategorieService
 *
 * @author Damien Chesneau <contact@damienchesneau.fr>
 */
interface LanguesServiceData {

    public function setDisable($id);

    public function setEnable($id);

    public function getAll();

    public function getByActif();
}
