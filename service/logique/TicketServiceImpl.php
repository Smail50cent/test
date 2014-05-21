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
        $id = $this->ticketSrv->addCommande($ticket->getTable(), $ticket->getTypeCommande());
        $qop = $ticket->getQuantityOfProduct();
        $max = sizeof($qop);
        for ($i = 0; $i < count($qop); $i++) {
             $this->ticketSrv->addPersonneCommande($qop[$i]->getPersonne(), $id, "FALSE");
        } 
    }

}
