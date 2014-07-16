<?php

include_once $path . 'service/logique/ReservationService.php';
include_once $path . 'service/logique/entity/Reservation.php';

class ReservationServiceImpl implements ReservationService {

    private $reservationSrv;

    function __construct() {
        $this->reservationSrv = PersistanceFactory::getReservationService();
    }

    public function getAll() {
        return $this->reservationSrv->getAll();
    }

    public function getByCompte($compte) {
        $ret = null;
        if ($compte != null) {
            $ret = $this->reservationSrv->getByCompte($compte);
        }
        return $ret;
    }

    public function getByDateHeure($dateheure) {
        $ret = null;
        if ($dateheure != null) {
            $ret = $this->reservationSrv->getByDateHeure($dateheure);
        }
        return $ret;
    }

    public function getById($id) {
        $ret = null;
        if ($id != null) {
            $ret = $this->reservationSrv->getById($id);
        }
        return $ret;
    }

}
