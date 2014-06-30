<?php

include_once $path . 'service/persistance/ReservationServiceData.php';
include_once $path . 'service/persistance/ConnexionBDD.php';
include_once $path . 'service/logique/entity/Reservation.php';

class ReservationServiceDataImpl implements ReservationServiceData {

    private function parseReservation($resultSet) {
        $liste = array();
        $ret;
        while ($ligne = $resultSet->fetch()) {
            $reservation = new Reservation();
            $reservation->setId(intval($ligne->id));
            $reservation->setCompte($ligne->heureDebut);
            $reservation->setDateHeure($ligne->date);
            array_push($liste, $reservation);
        }
        if (count($liste) == 1) {
            $ret = $liste[0];
        } else {
            $ret = $liste;
        }
        return $ret;
    }

    public function getAll() {
        $bdd = new ConnexionBDD();
        $resultSet = $bdd->executeGeneric("SELECT `id`, `compte`, `dateHeure` FROM `reservation` ");
        return $this->parseReservation($resultSet);
    }

    public function getByCompte($compte) {
        $bdd = new ConnexionBDD();
        $resultSet = $bdd->executeGeneric("SELECT `id`, `compte`, `dateHeure` FROM `reservation` WHERE `compte` = ".$compte);
        return $this->parseReservation($resultSet);
    }

    public function getByDateHeure($dateheure) {
        $bdd = new ConnexionBDD();
        $resultSet = $bdd->executeGeneric("SELECT `id`, `compte`, `dateHeure` FROM `reservation` WHERE `dateHeure`=".$dateheure);
        return $this->parseReservation($resultSet);
    }

    public function getById($id) {
        $bdd = new ConnexionBDD();
        $resultSet = $bdd->executeGeneric("SELECT `id`, `compte`, `dateHeure` FROM `reservation` WHERE `id` = ".$id);
        return $this->parseReservation($resultSet);
    }

}
