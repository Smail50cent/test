<?php

include_once $path.'service/persistance/AssociationProduitPrixServiceData.php';
include_once $path.'service/persistance/ConnexionBDD.php';
include_once $path.'service/logique/entity/AssociationProduitPrix.php';
include_once $path.'service/logique/entity/PrixHT.php';
include_once $path.'service/logique/entity/ZoneTable.php';

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
            $dateDebut = null;
            $dateFin = null;
            $heureDebut = null;
            $heureFin = null;
            $minutesDebut = null;
            $minutesFin = null;
            if ($ligne->heureDebut != null) {
                $dateDebut = new DateTime($ligne->heureDebut);
                $dateDebut = $dateDebut->format('Y-m-d H:i:s');

                $heureDebut = new DateTime($ligne->heureDebut);
                $heureDebut = intval($heureDebut->format('H'));

                $minutesDebut = new DateTime($ligne->heureDebut);
                $minutesDebut = intval($minutesDebut->format('i'));
                
                $dateFin = new DateTime($ligne->heureFin);
                $dateFin = $dateFin->format('Y-m-d');
                
                $minutesFin = new DateTime($ligne->heureFin);
                $minutesFin = intval($minutesFin->format('i'));
                
                $heureFin = new DateTime($ligne->heureFin);
                $heureFin = intval($heureFin->format('H'));
            }
            $associationProduitPrix->setMinutesDebut($minutesDebut);
            $associationProduitPrix->setMinutesFin($minutesFin);
            $associationProduitPrix->setDateDebut($dateDebut);
            $associationProduitPrix->setHeureDebut($heureDebut);
            $associationProduitPrix->setDateFin($dateFin);
            $associationProduitPrix->setHeureFin($heureFin);
            $prixHT = new PrixHT();
            $prixHT->setId($ligne->prixht_id);
            $prixHT->setPrix($ligne->prix);
            $associationProduitPrix->setPrixHt($prixHT);
            $zoneTable = new ZoneTable();
            $zoneTable->setId($ligne->zone_table_id);
            $zoneTable->setNom($ligne->nom);
            $associationProduitPrix->setZoneTable($zoneTable);
            $ret[$i] = $associationProduitPrix;
            $i++;
        }
        return $ret;
    }

}
