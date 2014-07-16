<?php

/**
 * Description of CategorieService
 *
 * @author Damien Chesneau <contact@damienchesneau.fr>
 */
interface OptionServiceData {
    public function getOptionByIdProduit($id);
    public function getById($id);
    public function getAll();
}
