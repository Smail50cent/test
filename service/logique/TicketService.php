<?php

/**
 * Description of TableService
 *
 * @author Damien Chesneau <contact@damienchesneau.fr>
 */
interface TicketService {

    public function addNewTicket($ticket);
    
    public function setPrioriteProduits($personnePriorite);
}
