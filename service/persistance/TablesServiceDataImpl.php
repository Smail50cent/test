<?php

include_once 'TableServiceData.php';
include_once 'ConnexionBDD.php';
include_once '../logique/entity/Table.php';

/**
 * Description of TablesServiceImpl
 *
 * @author Damien Chesneau <contact@damienchesneau.fr>
 */
class TablesServiceDataImpl implements TableServiceData {

    public function getAll() {
        $tables = array();
        $bdd = new ConnexionBDD();
        $return = $bdd->executeGeneric("SELECT * FROM tables ");
        $i = 0;
        while ($ligne = $return->fetch()) {
            $table = new Table();
            $table->setId(intval($ligne->id));
            $table->setNumero(intval($ligne->numero));
            $tables[$i] = $table;
            $i++;
        }
        return $tables;
    }

}
