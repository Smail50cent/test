<?php

/**
 * Description of ConnexionBDD
 *
 * @author Damien Chesneau <contact@damienchesneau.fr>
 */
class ConnexionBDD {

    public static $param = array("start" => 0, "commit" => 1, "rollback" => 2);
    public $acces;
    
    private function getDatabasesInfo() {
        $ret = array();
        $ret[0] = array("192.168.170.61", "mysql", "appcaisse2", "preCaisse", "alfa");
        $ret[1] = array("192.168.170.61", "mysql", "bar", "preCaisse", "alfa");
        $ret[2] = array("192.168.170.61", "mysql", "dupappcaisse", "preCaisse", "alfa");
        $ret[3] = array("192.168.170.61", "mysql", "migration_appcaisse", "preCaisse", "alfa");
        $ret[4] = array("192.168.170.61", "mysql", "migration_appcaisse", "root", "fmoz6po");
        return $ret;
    }

    private function getCurrentDatabaseInfo() {
        $t = $this->getDatabasesInfo();
        return $t[3];
    }
    
    function __construct() {
        $this->acces = $this->getConnexion();
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
    
    public function commitTransaction() {
        $this->acces->commit();
    }
    
    public function rollbackTransaction() {
        $this->acces->rollBack();
    }
    
    public function beginTTransaction() {
        $this->acces->beginTransaction();
    }
    
    private function executeQuery($query) {
        try {
            $this->acces->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            $selection = $this->acces->query($query);
            $selection->setFetchMode(PDO::FETCH_OBJ);
            return $selection;
        } catch (Exception $ex) {
            $this->acces->rollBack();
            echo "Erreur Requete MySQL : ", $ex->getMessage();
            die();
        }
    }

    public function executeGeneric($query) {
        if (strpos($query, 'INSERT') !== false || strpos($query, 'insert') !== false) {
            return $this->executeExec($query);
        } else {
            return $this->executeQuery($query);
        }
    }

    private function executeExec($query) {
        try {
            $this->acces->exec($query);
            $id = $this->acces->lastInsertId();
            return $id;
        } catch (Exception $ex) {
            $this->acces->rollBack();
            echo "Erreur Requete MySQL : ", $ex->getMessage();
            die();
        }
//        $acces = null;       
    }

}
