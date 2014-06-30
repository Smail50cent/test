<?php

include_once '../../outils/AppRoot.php';
include_once $path.'service/logique/LogiqueFactory.php';
$reservationDateDisponibleSrv = LogiqueFactory::getReservationDateDisponibleService();
$result = $reservationDateDisponibleSrv->getByDateNull();
echo json_encode($result);
