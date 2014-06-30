<?php

include_once $path.'service/persistance/TicketServiceData.php';
include_once $path.'service/persistance/ConnexionBDD.php';
include_once $path.'service/logique/entity/Ticket.php';

/**
 * Description of TablesServiceImpl
 *
 * @author Damien Chesneau <contact@damienchesneau.fr>
 */
class TicketServiceDataImpl implements TicketServiceData {

    public function addCommande($tableid, $type_commande) {
        $bdd = new ConnexionBDD();
        return $bdd->executeGeneric("INSERT INTO `commande`(`heurePriseCommande`, `id_table`, `id_type_commande`) VALUES (CURRENT_TIMESTAMP," . $tableid . "," . $type_commande . ")");
    }

    public function addAddedIngredients($ingredient, $idCommandeProduit) {
        $bdd = new ConnexionBDD();
        $bdd->executeGeneric("INSERT INTO `commande_produits_ingredients`(`id_ingredient`, `added`, `id_commande_produit`) VALUES (" . $ingredient . ",1," . $idCommandeProduit . ")");
    }

    public function addDeletedIngredients($ingredient, $idCommandeProduit) {
        $bdd = new ConnexionBDD();
        $bdd->executeGeneric("INSERT INTO `commande_produits_ingredients`(`id_ingredient`, `deleted`, `id_commande_produit`) VALUES (" . $ingredient . ",1," . $idCommandeProduit . ")");
    }

    public function addPersonneCommande($personneId, $idCommande, $havePay) {
        $bdd = new ConnexionBDD();
        $bdd->executeGeneric("INSERT INTO `commande_personne`(`id_commande`, `id_compte`, `heurePriseCommande`) VALUES (" . $idCommande . "," . $personneId . ",CURRENT_TIMESTAMP)");
    }

    public function addCommandeProduit($produit, $idCommande) {
        $bdd = new ConnexionBDD();
        return $bdd->executeGeneric("INSERT INTO `commande_produits`(`id_commande`, `id_produit`,`heure_envoie`,`prix_ttc_retenu`) VALUES (" . $idCommande . "," . $produit->getId() . ",0,".$produit->getPrix().")");
    }

    public function addOptionCommande($idOption, $idOptionValue, $idCommandeProduit) {
        $bdd = new ConnexionBDD();
        $bdd->executeGeneric("INSERT INTO `commande_produit_options`( `id_option`, `id_option_value`, `id_commande_produits`) VALUES (" . $idOption . ", " . $idOptionValue . "," . $idCommandeProduit . ")");
    }

    public function updatePriorite($priorite, $idProduit, $idCommande) {
        $bdd = new ConnexionBDD();
        $bdd->executeGeneric("UPDATE `commande_produits` SET `priorite` = ".$priorite." WHERE `id_commande` = ".$idCommande." AND `id_produit` = ".$idProduit);

        
    }

    public function addCommandeMenuProduit($menuid, $produit, $idCommande,$prix) {
        $bdd = new ConnexionBDD();
        return $bdd->executeGeneric("INSERT INTO `commande_produits`(`menu_id`,`id_commande`, `id_produit`,`heure_envoie`,`prix_ttc_retenu`) VALUES (".$menuid."," . $idCommande . "," . $produit->id . ",0,".$prix.")");
    }

}
