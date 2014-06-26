<?php

/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

include_once '../outils/AppRoot.php';include_once $path.'service/logique/LogiqueFactory.php';
$entrepriseSrv = LogiqueFactory::getEntrepriseService();
$result = $entrepriseSrv->getMaj();
$ligne = $result->fetch();
echo json_encode($ligne);
