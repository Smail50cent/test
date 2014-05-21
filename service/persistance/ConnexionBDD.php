<?php

/**
 * Description of ConnexionBDD
 *
 * @author Damien Chesneau <contact@damienchesneau.fr>
 */
class ConnexionBDD {

    private function getDatabasesInfo() {
        $ret = array();
        $ret[0] = array("192.168.170.61", "mysql", "precaisse", "preCaisse", "alfa");
        $ret[1] = array("192.168.170.61", "mysql", "bar", "preCaisse", "alfa");
        return $ret;
    }

    private function getCurrentDatabaseInfo() {
        $t = $this->getDatabasesInfo();
        return $t[0];
    }

    public function getConnexion() {
        $databaseInfo = $this->getCurrentDatabaseInfo();
        try {
            $path = $databaseInfo[1] . ':host=' . $databaseInfo[0] . ';dbname=' . $databaseInfo[2];
            $options = array(
                PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8"
            );
            return new PDO($path, $databaseInfo[3], $databaseInfo[4], $options);
        } catch (Exception $e) {
            echo "Connection à MySQL impossible : ", $e->getMessage();
            die();
        }
    }

    private function executeQuery($query) {
        $acces = $this->getConnexion();
        $acces->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        $selection = $acces->query($query);
        $selection->setFetchMode(PDO::FETCH_OBJ);
        $acces = null;
        return $selection;
    }

    public function executeGeneric($query) {
        if (strpos($query, 'INSERT') !== false || strpos($query, 'insert') !== false) {
            return $this->executeExec($query);
        } else {
            return $this->executeQuery($query);
        }
    }

    public function executeExec($query) {
        $acces = $this->getConnexion();
        $acces->exec($query);
        $id = $acces->lastInsertId();
        $acces = null;
        return $id;
    }

}
