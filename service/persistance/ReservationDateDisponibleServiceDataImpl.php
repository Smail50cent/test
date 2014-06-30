<?php

include_once $path . 'service/persistance/ReservationDateDisponibleServiceData.php';
include_once $path . 'service/persistance/ConnexionBDD.php';
include_once $path . 'service/logique/entity/ReservationDateDisponible.php';

class ReservationDateDisponibleServiceDataImpl implements ReservationDateDisponibleServiceData {

    public function getAll() {
        $bdd = new ConnexionBDD();
        $resultset =$bdd->executeGeneric("SELECT `id`, `date`, `heureDebut`, `heureFin` FROM `reservation_date_disponible`");
        return $this->parseReservationDateDisponible($resultset);
    }

    public function getByDate($date) {
        $bdd = new ConnexionBDD();
        $resultset =$bdd->executeGeneric("SELECT `id`, `date`, `heureDebut`, `heureFin` FROM `reservation_date_disponible` WHERE date = ".$date);
        return $this->parseReservationDateDisponible($resultset);
    }

    public function getById($id) {
        $bdd = new ConnexionBDD();
        $resultset =$bdd->executeGeneric("SELECT `id`, `date`, `heureDebut`, `heureFin` FROM `reservation_date_disponible` WHERE id = ".$id);
        return $this->parseReservationDateDisponible($resultset);
    }
    private function parseReservationDateDisponible($resultSet) {
        $liste = array();
        $ret;
        while ($ligne = $resultSet->fetch()) {
            $reservationDateDispo = new ReservationDateDisponible();
            $reservationDateDispo->setId(intval($ligne->id));
            $reservationDateDispo->setHeureDebut($ligne->heureDebut);
            $reservationDateDispo->setDate($ligne->date);
            $reservationDateDispo->setHeureFin($ligne->heureFin);
            array_push($liste, $reservationDateDispo);
        }
        if (count($liste) == 1) {
            $ret = $liste[0];
        } else {
            $ret = $liste;
        }
        return $ret;
    }

}
