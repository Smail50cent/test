<?php

/**
 * Description of TableServiceData
 *
 * @author Damien Chesneau <contact@damienchesneau.fr>
 */
interface TicketServiceData {

    public function addAddedIngredients($ingredient,$idCommandeProduit);

    public function addCommande($tableid, $type_commande);

    public function addPersonneCommande($personne, $idCommande, $havePay);

    public function addCommandeProduit($produit, $idCommande);
    
    public function addDeletedIngredients($ingredient, $idCommandeProduit);
}
