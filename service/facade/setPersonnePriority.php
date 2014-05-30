<?php

include_once '../logique/entity/AssociationTicketPersonneProduit.php';
include_once '../logique/entity/PersonneProduits.php';
include_once '../logique/entity/ProduitPriorite.php';
include_once '../logique/LogiqueFactory.php';

if (isset($_POST["personnePriority"])) {
    $ticketSrv = LogiqueFactory::getTicketService();
    $personnePriorityToParse = json_decode($_POST["personnePriority"]);
    $personneProduit = parsePersonneProduit($personnePriorityToParse);
    $ticketSrv->setPrioriteProduits($personneProduit);
}

function parsePersonneProduit($personneProd) {
    $associationTicketpersonneProd = new AssociationTicketPersonneProduit();
    $associationTicketpersonneProd->setTicketId($personneProd->ticketid);
    $personneProduit = array();
    for ($i = 0; $i < count($personneProd->personneProduits); $i++) {
        $produitsPriorite = array();
        for ($j = 0; $j < count($personneProd->personneProduits[$i]->produitspriotite); $j++) {
            $personnePriorite = new ProduitPriorite();
            $personnePriorite->setPriorite($personneProd->personneProduits[$i]->produitspriotite[$j]->priorite);
            $personnePriorite->setProduitId($personneProd->personneProduits[$i]->produitspriotite[$j]->produit->id);
            $produitsPriorite[$j] = $personnePriorite;
        }
        $personneProduits = new PersonneProduits();
        $personneProduits->setProduits($produitsPriorite);
        $personneProduits->setPersonneId($personneProd->personneProduits[$i]->personne->id);
        $personneProduit[$i] = $personneProduits;
    }
    $associationTicketpersonneProd->setPersonneProduit($personneProduit);
    return $associationTicketpersonneProd;
}
