<?php

/**
 * Description of ConnexionBDD
 *
 * @author Damien Chesneau <contact@damienchesneau.fr>
 */
class ConnexionBDD {

    public static $param = array("start" => 0, "commit" => 1, "rollback" => 2);

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
        try {
            $acces->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            $acces->beginTransaction();
            $selection = $acces->query($query);
            $selection->setFetchMode(PDO::FETCH_OBJ);
            $acces->commit();
            return $selection;
        } catch (Exception $ex) {
            $acces->rollBack();
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
        $acces = $this->getConnexion();
        try {
            $acces->beginTransaction();
            $acces->exec($query);
            $id = $acces->lastInsertId();
            $acces->commitTransaction();
            return $id;
        } catch (Exception $ex) {
            $acces->rollBack();
            echo "Erreur Requete MySQL : ", $ex->getMessage();
            die();
        }
//        $acces = null;       
    }

}
