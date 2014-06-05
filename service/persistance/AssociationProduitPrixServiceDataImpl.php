<?php

include_once 'AssociationProduitPrixServiceData.php';
include_once 'ConnexionBDD.php';
include_once '../logique/entity/AssociationProduitPrix.php';
include_once '../logique/entity/PrixHT.php';
include_once '../logique/entity/ZoneTable.php';

/**
 * Description of AssociationProduitPrixServiceDataImpl
 *
 * @author Damien Chesneau <contact@damienchesneau.fr>
 */
class AssociationProduitPrixServiceDataImpl implements AssociationProduitPrixServiceData {

    public function getByProduit($produit) {
        $con = new ConnexionBDD();
        $retBdd = $con->executeGeneric("SELECT * FROM association_produit_prix LEFT JOIN prixHt ON prixHt.id = association_produit_prix.prixht_id  LEFT JOIN zone_table ON association_produit_prix.zone_table_id = zone_table.id  WHERE `produit_id` = " . $produit);
        $ret = array();
        $i = 0;
        while ($ligne = $retBdd->fetch()) {
            $associationProduitPrix = new AssociationProduitPrix();
            $associationProduitPrix->setId($ligne->id);
            $dateDebut = new DateTime($ligne->heureDebut);
            $dateDebut = $dateDebut->format('Y-m-d H:i:s');
            $dateFin = new DateTime($ligne->heureDebut);
            $dateFin = $dateFin->format('Y-m-d H:i:s');
            $associationProduitPrix->setHeureDebut($dateDebut);
            $associationProduitPrix->setHeureFin($dateFin);
            $prixHT = new PrixHT();
            $prixHT->setId($ligne->prixht_id);
            $prixHT->setPrix($ligne->prix);
            $associationProduitPrix->setPrixHt($prixHT);
            $zoneTable = new ZoneTable();
            $zoneTable->setId($ligne->zoneTable);
            $zoneTable->setNom($ligne->nom);
            $associationProduitPrix->setZoneTable($zoneTable);
            $ret[$i] = $associationProduitPrix;
            $i++;
        }
        return $ret;
    }

}
