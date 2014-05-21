<?php

/**
 * Description of ConnexionBDD
 *
 * @author Damien Chesneau <contact@damienchesneau.fr>
 */
class ConnexionBDD {

    private $ip = "192.168.170.61";
    private $databaseType = "mysql";
    private $database = "precaisse";
    private $user = "preCaisse";
    private $password = "alfa";
    public $lastInsertId;

    private function getDatabasesInfo() {
        $ret = array();
        $ret[0] = array("192.168.170.61","mysql","precaisse","preCaisse","alfa");
        $ret[1] = array("192.168.170.61","mysql","bar","preCaisse","alfa");
        return $ret;
    }

    private function getCurrentDatabaseInfo() {
       $t=   $this->getDatabasesInfo();
        return $t[0];
    }
 
    private function getConnexion() {
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
        $this->lastInsertId = $acces->lastInsertId(); // get Inserted ID of Current Row
        $acces = null;
        return $selection;
    }

    public function executeGeneric($query) {
        if (strpos($query, 'INSERT') == TRUE || strpos($query, 'insert') == TRUE) {
            return $this->executeExec($query);
        } else {
            return $this->executeQuery($query);
        }
    }

    private function executeExec($query) {
        $acces = $this->getConnexion();
        $acces->exec($query);
        $this->lastInsertId = $acces->lastInsertId(); // get Inserted ID of Current Row
        $acces = null;
    }
    public function getLastInsertId() {
        return $this->lastInsertId;
    }

}
