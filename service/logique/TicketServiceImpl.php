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
        $id = $this->ticketSrv->addCommande($ticket->getTable()->id, $ticket->getTypeCommande());
        $qop = $ticket->getQuantityOfProduct();
        for ($i = 0; $i < count($qop); $i++) {
            $this->setPersonneInTicketToBdd($qop[$i]->getPersonne(), $id);
            $idCommandeProduit = $this->ticketSrv->addCommandeProduit($qop[$i]->getProduct(), $id);
            $ingredients = $qop[$i]->getProduct()->getIngredients();
            for ($j = 0; $j < count($ingredients); $j++) {
                if ($ingredients[$j]->isAdded() == true && $ingredients[$j]->isIngredientSup() == true) {
                    $this->ticketSrv->addAddedIngredients($ingredients[$j]->getIngredient(), $idCommandeProduit);
                } else if ($ingredients[$j]->isAdded() == false && $ingredients[$j]->isIngredientSup() == false) {
                    $this->ticketSrv->addDeletedIngredients($ingredients[$j]->getIngredient(), $idCommandeProduit);
                }
            }
            $options = $qop[$i]->getProduct()->getOptions();
            if (is_array($options)) {
                for ($j = 0; $j < count($options); $j++) {
                    if (is_array($options[$j]->possibilites)) {
                        $this->ticketSrv->addOptionCommande($options[$j]->id, $options[$j]->possibilites[0]->id, $idCommandeProduit);
                    } else {
                        $this->ticketSrv->addOptionCommande($options[$j]->id, $options[$j]->possibilites, $idCommandeProduit);
                    }
                }
            }
        }
        return $id;
    }

    private function setPersonneInTicketToBdd($personne, $id) {
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

    public function setPrioriteProduits($ticketPersonnes) {
        $commandeId = $ticketPersonnes->getTicketId();
        $personneProduits = $ticketPersonnes->getPersonneProduit();
        for ($i = 0; $i < count($personneProduits); $i++) {
            $personneId = $personneProduits[$i]->getPersonneId();
            $produitsPriorite = $personneProduits[$i]->getProduits();
            for($j = 0 ; $j < count($produitsPriorite) ; $j++){
                $produitID = $produitsPriorite[$j]->getProduitId();
                $priorite = $produitsPriorite[$j]->getPriorite();
                $this->ticketSrv->updatePriorite($priorite, $produitID, $commandeId);
            }
        }
    }

    public function setHaveIfPay($havePay) {
        
    }

}
