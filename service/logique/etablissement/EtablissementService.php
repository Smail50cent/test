<?php

/**
 * Description of GroupeService
 *
 * @author Damien Chesneau <contact@damienchesneau.fr>
 */
interface EtablissementService {
    public function getAll();
    public function getById($id);
}
