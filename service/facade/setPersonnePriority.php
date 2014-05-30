<?php
include_once '../logique/entity/AssociationTicketPersonneProduit.php';


if (isset($_POST["personnePriority"])) {
    $personnePriorityToParse = json_decode($_POST["personnePriority"]);
    print_r($personnePriorityToParse);
}

function parsePersonneProduit($personneProd){
    $associationTicketpersonneProd = new AssociationTicketPersonneProduit();
    $associationTicketpersonneProd->setTicketId($personneProd->ticketid);
    $personneProduits = new PersonneProduits();
    for($i = 0 ; $i < count($personneProduits) ; $i++){
        
    }
}