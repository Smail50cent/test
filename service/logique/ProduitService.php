<?php

/**
 * Description of CategorieService
 *
 * @author Damien Chesneau <contact@damienchesneau.fr>
 */
interface ProduitService {
    public function getById($id);
    public function getAll();
    public function getProduitByCategorieId($id);
    public function addNewTicket($ticket);
}
