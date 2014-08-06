<?php

include_once '../../outils/AppRoot.php';
include_once $path . 'service/logique/LogiqueFactory.php';
include_once $path . 'service/logique/entity/Etablissement.php';
/**
 * Description of add
 *
 * @author Damien Chesneau <contact@damienchesneau.fr>
 */
if (isset($etablissement)) {
    try {
        $etablissement = json_decode($etablissement);
        $newEtab = new Etablissement();
        $newEtab->setLogo($etablissement->logo);
        $newEtab->setAdresseEtab($etablissement->adresseEtab);
        $newEtab->setGroupe($etablissement->groupe);
        $newEtab->setMessage($etablissement->message);
        $newEtab->setNom($etablissement->nom);
        $newEtab->setSlogan($etablissement->slogan);
        $newEtab->setStyle($etablissement->style);
        $newEtab->setTelephone($etablissement->telephone);
        $zonesTables = array();
        for ($i = 0; $i < count($etablissement->zones); $i++) {
            $zoneTables = new ZoneTable();
            $zoneTables->setNom($etablissement->zones[$i]->nom);
            for ($j = 0; $j < count($etablissement->zones[$i]->tables); $j++) {
                $table = new Table();
                $table->setNumero($etablissement->zones[$i]->tables[$j]);
                $zoneTables->addTable($table);
            }
            array_push($zonesTables, $zoneTables);
        }
        $newEtab->setZones($zonesTables);
        $etabSrv = LogiqueFactory::getEtablissementService();
        $mydata = new MyData();
        $mydata->id = $etabSrv->add($newEtab);
        $ret->data = $mydata;
    } catch (Exception $ex) {
        $ret->error = true;
    }
    echo json_encode($ret);
}

class MyData {

    public $id;

}
