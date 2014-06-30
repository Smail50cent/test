<?php

include_once '../outils/AppRoot.php';
include_once $path . 'service/logique/LogiqueFactory.php';
include_once $path . 'service/logique/entity/Ticket.php';
include_once $path . 'service/logique/entity/QuantityOfProduct.php';
include_once $path . 'service/logique/entity/AssociationProduitIngredients.php';
include_once $path . 'service/logique/entity/Produit.php';
include_once $path . 'service/logique/entity/SousCategorie.php';
include_once $path . 'service/logique/entity/Categorie.php';
include_once $path . 'service/logique/entity/Menu.php';

$ticketSrv = LogiqueFactory::getTicketService();

class ToEncode {

    public $id;

    public function __construct($id) {
        $this->id = $id;
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


function getPrixHtInAssociationMenu($menuid, $tauxTva, $table) {
    $associationProduitPrixSrv = LogiqueFactory::getAssociationProduitPrixService();
    $associationPrixProduit = $associationProduitPrixSrv->getByMenu($menuid);
    $prixHt = 0;
    if (count($associationPrixProduit) != 0) {
        if (count($associationPrixProduit) == 1) {
            $prixHt = floatval($associationPrixProduit[0]->prixHt->prix);
        } else {
            $currentDate = time();
            $priorityPrix = array();
            for ($i = 0; $i < count($associationPrixProduit); $i++) {
                $startDate = 0;
                $endDate = 0;
                if ($associationPrixProduit[$i]->dateDebut != 000) {
                    $startDate = new DateTime($associationPrixProduit[$i]->dateDebut);
                    $startDate = $startDate->getTimestamp();
                    $endDate = new DateTime($associationPrixProduit[$i]->dateFin);
                    $endDate = $endDate->getTimestamp();
                }
                if ($startDate == 000 && $endDate == 000 && ($associationPrixProduit[$i]->zoneTable->id) == null) {
                    $priorityPrix[$i] = array($associationPrixProduit[$i], 4);
                } else if ($startDate == 0 && $endDate == 0 && $associationPrixProduit[i]->zoneTable->id == $table . zone) {
                    $priorityPrix[$i] = array($associationPrixProduit[$i], 3);
                } else if (isInCurentDate($associationPrixProduit[$i]->dateDebut, $associationPrixProduit[$i]->heureDebut, $associationPrixProduit[$i]->minutesDebut, $associationPrixProduit[$i]->dateFin, $associationPrixProduit[$i]->heureFin, $associationPrixProduit[$i]->minutesFin) && $associationPrixProduit[$i]->zone_table_id != $table->zone) {
                    $priorityPrix[$i] = array($associationPrixProduit[$i], 2);
                } else if (isInCurentDate($associationPrixProduit[$i]->dateDebut, $associationPrixProduit[$i]->heureDebut, $associationPrixProduit[$i]->minutesDebut, $associationPrixProduit[$i]->dateFin, $associationPrixProduit[$i]->heureFin, $associationPrixProduit[$i]->minutesFin) && $associationPrixProduit[i]->zone_table_id == $table->zone) {
                    $priorityPrix[$i] = array($associationPrixProduit[$i], 1);
                }
            }
            $pr = "";
            if (count($priorityPrix) != 0) {
                uasort($priorityPrix, 'cmp');
                $pr = $priorityPrix[0][0];
            }
            $prixHt = $pr->prixHt->prix;
        }
    } else {
        $prixHt = 0;
    }
    return calculPrixWithTVA(floatval($prixHt), $tauxTva);
}
function getPrixHtInAssociation($produitid, $tauxTva, $table) {
    $associationProduitPrixSrv = LogiqueFactory::getAssociationProduitPrixService();
    $associationPrixProduit = $associationProduitPrixSrv->getByProduit($produitid);
    $prixHt = 0;
    if (count($associationPrixProduit) != 0) {
        if (count($associationPrixProduit) == 1) {
            $prixHt = floatval($associationPrixProduit[0]->prixHt->prix);
        } else {
            $currentDate = time();
            $priorityPrix = array();
            for ($i = 0; $i < count($associationPrixProduit); $i++) {
                $startDate = 0;
                $endDate = 0;
                if ($associationPrixProduit[$i]->dateDebut != 000) {
                    $startDate = new DateTime($associationPrixProduit[$i]->dateDebut);
                    $startDate = $startDate->getTimestamp();
                    $endDate = new DateTime($associationPrixProduit[$i]->dateFin);
                    $endDate = $endDate->getTimestamp();
                }
                if ($startDate == 000 && $endDate == 000 && ($associationPrixProduit[$i]->zoneTable->id) == null) {
                    $priorityPrix[$i] = array($associationPrixProduit[$i], 4);
                } else if ($startDate == 0 && $endDate == 0 && $associationPrixProduit[i]->zoneTable->id == $table . zone) {
                    $priorityPrix[$i] = array($associationPrixProduit[$i], 3);
                } else if (isInCurentDate($associationPrixProduit[$i]->dateDebut, $associationPrixProduit[$i]->heureDebut, $associationPrixProduit[$i]->minutesDebut, $associationPrixProduit[$i]->dateFin, $associationPrixProduit[$i]->heureFin, $associationPrixProduit[$i]->minutesFin) && $associationPrixProduit[$i]->zone_table_id != $table->zone) {
                    $priorityPrix[$i] = array($associationPrixProduit[$i], 2);
                } else if (isInCurentDate($associationPrixProduit[$i]->dateDebut, $associationPrixProduit[$i]->heureDebut, $associationPrixProduit[$i]->minutesDebut, $associationPrixProduit[$i]->dateFin, $associationPrixProduit[$i]->heureFin, $associationPrixProduit[$i]->minutesFin) && $associationPrixProduit[i]->zone_table_id == $table->zone) {
                    $priorityPrix[$i] = array($associationPrixProduit[$i], 1);
                }
            }
            $pr = "";
            if (count($priorityPrix) != 0) {
                uasort($priorityPrix, 'cmp');
                $pr = $priorityPrix[0][0];
            }
            $prixHt = $pr->prixHt->prix;
        }
    } else {
        $prixHt = 0;
    }
    return calculPrixWithTVA(floatval($prixHt), $tauxTva);
}

function cmp($a, $b) {
    if ($a[1] == $b[1]) {
        return 0;
    }
    return ($a[1] < $b[1]) ? -1 : 1;
}

function isInCurentDate($dateDebut, $heureDebut, $minutesDebut, $dateFin, $heureFin, $minutesFin) {
    $ret = false;
    $currentDate = new DateTime();
    $currentDate = $currentDate->getTimestamp();
    $startDate = new DateTime($dateDebut);
    $startDate = $startDate->getTimestamp();
    $endDate = new DateTime($dateFin);
    $endDate = $endDate->getTimestamp();
    if ($currentDate > $startDate && $currentDate < $endDate) {
        $hourCur = date("H");
        $minutesCur = date("m");
        if ($hourCur >= $heureDebut) {
            $startOk = true;
            if ($hourCur > $heureDebut) {
                $startOk = true;
            } else {
                if ($hourCur == $heureDebut && $minutesCur >= $minutesDebut) {
                    $startOk = true;
                } else {
                    $startOk = false;
                }
            }
            $endOk = true;
            if ($startOk == true) {
                if ($hourCur <= $heureFin) {
                    $endOk = true;
                    if ($hourCur == $heureFin) {
                        if ($minutesCur <= $minutesFin) {
                            $endOk = true;
                        } else {
                            $endOk = false;
                        }
                    }
                } else {
                    $endOk = false;
                }
            }
            if ($endOk) {
                $ret = true;
            }
        }
    }
    return $ret;
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
        if (property_exists($produitToParse, "produits")) {
            $qop->setProduct($ticketToParse->quantityOfProducts[$i]->product);
            $menuToParse = $ticketToParse->quantityOfProducts[$i]->product;
            $produitsInMenu = array();
            $menu = new Menu();
            $menu->setId($menuToParse->id);
            $menu->setNom($menuToParse->nom);
            $menu->setPrix(getPrixHtInAssociationMenu(intval($menuToParse->id), $menuToParse->tauxDeTva, $ticketToParse->table));
            for ($j = 0; $j < count($ticketToParse->quantityOfProducts[$i]->product->produits); $j++) {
                $produit = parseSingleProduct($ticketToParse->quantityOfProducts[$i]->product->produits[$j], $ticketToParse->table, $menuToParse->tauxDeTva);
                array_push($produitsInMenu, $produit);
            }
            $menu->setProduits($produitToParse);
            $qop->setProduct($menu);
        } else {
            $produit = parseSingleProduct($ticketToParse->quantityOfProducts[$i]->product, $ticketToParse->table, $ticketToParse->quantityOfProducts[$i]->product->id_sousCategorie->tauxTva);
            $qop->setProduct($produit);
        }
        $qop->setPersonne($ticketToParse->quantityOfProducts[$i]->personne);
        $qops[$i] = $qop;
    }
    $ticket->setTable(json_decode($ticketToParse->table));
    $ticket->setTypeCommande($ticketToParse->type_commande);
    $ticket->setQuantityOfProduct($qops);
    return $ticket;
}

function parseSingleProduct($product, $table, $tauxTva) {
    $ingredientsToParse = $product->ids_ingredients;
    $ingredients = array();
    for ($j = 0; $j < count($ingredientsToParse); $j++) {
        $ingredient = new AssociationProduitIngredients($ingredientsToParse[$j]->produit, $ingredientsToParse[$j]->ingredient, $ingredientsToParse[$j]->isAdded, $ingredientsToParse[$j]->surcout, $ingredientsToParse[$j]->supprimable, $ingredientsToParse[$j]->isIngredientSup);
        $ingredients[$j] = $ingredient;
    }
    $produit = new Produit();
    $produit->setId($product->id);
    $produit->setIngredients($ingredients);
    $produit->setNom($product->nom);
    $produit->setOptions($product->options);
    $produit->setPrix(getPrixHtInAssociation($product->id, $tauxTva, $table));
    $sousCategorie = new SousCategorie();
    $sousCategorie->setId($product->id_sousCategorie->id);
    $sousCategorie->setNom($product->id_sousCategorie->nom);
    $sousCategorie->setPriorite($product->id_sousCategorie->priorite);
    $produit->setSousCategorie($sousCategorie);
    $categorie = new Categorie();
    $categorie->setId($product->id_categorie->id);
    $categorie->setNom($product->id_categorie->nom);
    $categorie->setPriorite($product->id_categorie->priorite);
    $produit->setCategorie($categorie);
    return $produit;
}

function calculPrixWithTVA($prixHT, $tauxTVA) {
    $tauxTVA = floatval($tauxTVA);
    return (($tauxTVA / 100) * $prixHT) + $prixHT;
}

?>