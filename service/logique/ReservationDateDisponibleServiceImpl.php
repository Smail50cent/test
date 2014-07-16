<?php

include_once $path . 'service/logique/ReservationDateDisponibleService.php';
include_once $path . 'service/logique/entity/ReservationDateDisponible.php';

class ReservationDateDisponibleServiceImpl implements ReservationDateDisponibleService {

    private $reservationDateDisponibleSrv;

    function __construct() {
        $this->reservationDateDisponibleSrv = PersistanceFactory::getReservationDateDisponibleService();
    }

    public function getAll() {
        return $this->reservationDateDisponibleSrv->getAll();
    }

    public function getByDate($date) {
        $ret = null;
        if ($date != null) {
            $ret = $this->reservationDateDisponibleSrv->getByDate($date);
        }
        return $ret;
    }

    public function getById($id) {
        $ret = null;
        if ($id != null) {
            $ret = $this->reservationDateDisponibleSrv->getById($id);
        }
        return $ret;
    }

    public function getByDateNull() {
        return $this->reservationDateDisponibleSrv->getByDateNull();
    }

}
