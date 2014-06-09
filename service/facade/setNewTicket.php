<?php

include_once '../logique/entity/Ticket.php';
include_once '../logique/entity/QuantityOfProduct.php';
include_once '../logique/entity/AssociationProduitIngredients.php';
include_once '../logique/entity/Produit.php';
include_once '../logique/entity/SousCategorie.php';
include_once '../logique/entity/Categorie.php';
include_once '../logique/LogiqueFactory.php';
$ticketSrv = LogiqueFactory::getTicketService();

class ToEncode {
    public $id;
    public function __construct($id) {
        $this->id =$id;
    }
}

if (isset($_POST["ticket"])) {
    $ticketToParse = json_decode($_POST["ticket"]);
    $ticket = parseToTicket($ticketToParse);
    $id = $ticketSrv->addNewTicket($ticket);
    echo json_encode(new ToEncode($id));
} else {
    echo 'ERROR';
}

function parseToTicket($toparse) {
    $ticketToParse = $toparse;
    $ticket = new Ticket();
    $ticket->setId($ticketToParse->id);
    $ticket->setTotal($ticketToParse->total);
    $qops = array();
    for ($i = 0; $i < count($ticketToParse->quantityOfProducts); $i++) {
        $qop = new QuantityOfProduct();
        $produitToParse = $ticketToParse->quantityOfProducts[$i]->product;
        $ingredientsToParse = $ticketToParse->quantityOfProducts[$i]->product->ids_ingredients;
        $ingredients = array();
        for ($j = 0; $j < count($ingredientsToParse); $j++) {
            $ingredient = new AssociationProduitIngredients($ingredientsToParse[$j]->produit, $ingredientsToParse[$j]->ingredient, $ingredientsToParse[$j]->isAdded, $ingredientsToParse[$j]->surcout, $ingredientsToParse[$j]->supprimable, $ingredientsToParse[$j]->isIngredientSup);
            $ingredients[$j] = $ingredient;
        }
        $produit = new Produit();
        $produit->setId($produitToParse->id);
        $produit->setIngredients($ingredients);
        $produit->setNom($produitToParse->nom);
        $produit->setOptions($produitToParse->options);
//        $produit->setPrix($produitToParse->prix); A REFAIRE
        $sousCategorie = new SousCategorie();
        $sousCategorie->setId($produitToParse->id_sousCategorie->id);
        $sousCategorie->setNom($produitToParse->id_sousCategorie->nom);
        $sousCategorie->setPriorite($produitToParse->id_sousCategorie->priorite);
        $produit->setSousCategorie($sousCategorie);
        $categorie = new Categorie();
        $categorie->setId($produitToParse->id_categorie->id);
        $categorie->setNom($produitToParse->id_categorie->nom);
        $categorie->setPriorite($produitToParse->id_categorie->priorite);
        $produit->setCategorie($categorie);
        $qop->setProduct($produit);
        $qop->setPersonne($ticketToParse->quantityOfProducts[$i]->personne);
        $qops[$i] = $qop;
    }
    $ticket->setTable($ticketToParse->table);
    $ticket->setTypeCommande($ticketToParse->type_commande);
    $ticket->setQuantityOfProduct($qops);
    return $ticket;
}

?>