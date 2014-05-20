<?php

/**
 * Description of TableServiceData
 *
 * @author Damien Chesneau <contact@damienchesneau.fr>
 */
interface TicketServiceData {
    public function addIngredients($ingredient);
    public function addCommande($ticket);
}
