<?php

include_once 'TicketService.php';

/**
 * Description of TableServiceImpl
 *
 * @author Damien Chesneau <contact@damienchesneau.fr>
 */
class TicketServiceImpl implements TicketService {

    private $ticketSrv;

    function __construct() {
        $this->ticketSrv = PersistanceFactory::getTicketService();
    }

    public function addNewTicket($ticket) {
        
    }

}
