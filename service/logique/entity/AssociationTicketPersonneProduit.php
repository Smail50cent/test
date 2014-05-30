<?php

/**
 * Description of AssociationTicketPersonneProduit
 *
 * @author Damien Chesneau <contact@damienchesneau.fr>
 */
class AssociationTicketPersonneProduit {

    private $ticketId;
    private $personneProduit;

    public function getTicketId() {
        return $this->ticketId;
    }

    public function setTicketId($id) {
        $this->ticketId = $id;
    }

    public function getPersonneProduit() {
        return $this->personneProduit;
    }

    public function setPersonneProduit($personneProduit) {
        $this->personneProduit = $personneProduit;
    }

}
