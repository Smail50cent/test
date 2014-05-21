<?php

include_once 'TicketService.php';

/**
 * Description of TableServiceImpl
 *
 * @author Damien Chesneau <contact@damienchesneau.fr>
 */
class TicketServiceImpl implements TicketService {

    private $ticketSrv;
    private $personnesInTiciket; //ARRAY

    function __construct() {
        $this->ticketSrv = PersistanceFactory::getTicketService();
    }

    public function addNewTicket($ticket) {
        $personnesInTiciket = array();
        $id = $this->ticketSrv->addCommande($ticket->getTable(), $ticket->getTypeCommande());
        $qop = $ticket->getQuantityOfProduct();

        for ($i = 0; $i < count($qop); $i++) {
            $this->setPersonneInTicketToBdd($qop[$i]->getPersonne(),$id);
        }
    }

    private function setPersonneInTicketToBdd($personne,$id) {
        $find = false;
        $coutPersonnes = count($this->personnesInTiciket);
        if ($coutPersonnes == 0) {
            $find = true;
            $this->ticketSrv->addPersonneCommande($personne, $id, "FALSE");
        } else {
            for ($i = 0; $i < count($this->personnesInTiciket); $i++) {
                if ($this->personnesInTiciket[$i] == $personne) {
                    $find = true;
                    $this->ticketSrv->addPersonneCommande($personne, $id, "FALSE");
                }
            }
        }
        if ($find == true) {
            $this->personnesInTiciket[count($this->personnesInTiciket)] = $personne;
        }
    }

}
