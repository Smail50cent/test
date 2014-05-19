<?php
/**
 * Description of TableService
 *
 * @author Damien Chesneau <contact@damienchesneau.fr>
 */
interface ModeDeReglementService {
    public function getAll();
    public function getById($id);
}
