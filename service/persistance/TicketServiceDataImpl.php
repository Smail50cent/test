<?php

include_once 'TicketServiceData.php';
include_once 'ConnexionBDD.php';
include_once '../logique/entity/Ticket.php';

/**
 * Description of TablesServiceImpl
 *
 * @author Damien Chesneau <contact@damienchesneau.fr>
 */
class TicketServiceDataImpl implements TicketServiceData {

    public function addCommande($tableid, $type_commande) {
        $bdd = new ConnexionBDD();
        $bdd->executeGeneric("INSERT INTO `commande`(`heurePriseCommande`, `id_table`, `id_type_commande`) VALUES (CURRENT_TIMESTAMP," . $tableid . "," . $type_commande . ")");
    }

    public function addIngredients($ingredient) {
        
    }

}
