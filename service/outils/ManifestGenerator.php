<?php

/**
 * Description of ManifestGenerator
 *
 * @author Damien Chesneau <contact@damienchesneau.fr>
 */
class ManifestGenerator {

    public static $manifestFileName = "site.manifest";

    private function getDirToIgnore() {
        return array("service", "nbproject");
    }

    private function getAllFiles() {
        $fichiersToCache = array();
        $fichersDeScripts = "../../config/scriptsToLoad.xml";
        $strings = (simplexml_load_file($fichersDeScripts));
        for ($i = 0; $i < count($strings->script); $i++) {
            array_push($fichiersToCache, "./js/" . $strings->script[$i]);
        }
        $pagesHtml = "../../config/pages.xml";
        $strings = (simplexml_load_file($pagesHtml));
        for ($i = 0; $i < count($strings->page); $i++) {
            array_push($fichiersToCache, "./" . $strings->page[$i]);
        }
        array_push($fichiersToCache, "./config/config.xml");
        array_push($fichiersToCache, "./config/pages.xml");
        array_push($fichiersToCache, "./config/scriptsToLoad.xml");
        array_push($fichiersToCache, "./config/string_en_US.xml");
        array_push($fichiersToCache, "./config/string_fr_FR.xml");
        array_push($fichiersToCache, "./js/scripts.js");
        array_push($fichiersToCache, "./js/control.js");
        array_push($fichiersToCache, "./css/appli_caisse_pizza_structure.css");
        array_push($fichiersToCache, "./js/lib/jqueryui/css/cupertino/jquery-ui-1.10.4.custom.css");
        $templatePath = "../../config/template/";
        $allFiles = $this->getFilesInFolder($templatePath);
        $cssFiles = $this->getFilesInFolder("../../css/");
        for ($i = 0; $i < count($allFiles); $i++) {
            array_push($fichiersToCache, $allFiles[$i]);
        }
        for ($i = 0; $i < count($cssFiles); $i++) {
            array_push($fichiersToCache, $cssFiles[$i]);
        }
        return $fichiersToCache;
    }

    private function toUsablePath($path) {
        if (strstr($path, "./../../")) {
            $path = substr($path, 6);
        } else if (strstr($path, "./../")) {
            $path = substr($path, 3);
        } else if (strstr($path, "../")) {
            $path = substr($path, 1);
        }
        return $path;
    }

    private function getFilesInFolder($folder) {
        $dirs = $this->getDirToIgnore();
        $filesListe = array();
        if ($dossier = opendir($folder)) {
            $i = 0;
            while (false !== ($fichier = readdir($dossier))) {
                if ($fichier != ".") {
                    $noGetFiles = false;
                    if ($fichier != "..") {
                        for ($j = 0; $j < count($dirs); $j++) {
                            if ($dirs[$j] == $fichier) {
                                $noGetFiles = true;
                                break;
                            }
                        }
                        if (is_dir($folder . $fichier . "/") == true && $noGetFiles == false) {
                            $ret = $this->getFilesInFolder($folder . $fichier . "/");
                            for ($i = 0; $i < count($ret); $i++) {
                                array_push($filesListe, $this->toUsablePath($ret[$i]));
                            }
                        } else {
                            array_push($filesListe, $this->toUsablePath("./" . $folder . $fichier));
                        }
                    }
                }
                $i++;
            }
        }
        return $filesListe;
    }

    private function getContentOfManifest($version) {
        $fileToCache = $this->getAllFiles();
        $strOfFile = "CACHE MANIFEST\n\n";
        $strOfFile = $strOfFile . "# v" . $version . "\n\n";
        $strOfFile = $strOfFile . "CACHE:\n";
        for ($i = 0; $i < count($fileToCache); $i++) {
            $strOfFile = $strOfFile . $fileToCache[$i] . "\n";
        }
        $strOfFile = $strOfFile . "\nNETWORK:\n";
        $strOfFile = $strOfFile . "*\n";
        return $strOfFile;
    }

    public function generateManifest($version) {
        $ret = null;
        $strOfFile = $this->getContentOfManifest($version);
        $fichier = fopen("../../" . ManifestGenerator::$manifestFileName, "w");
        if (fwrite($fichier, $strOfFile)) {
            $ret = true;
        } else {
            $ret = false;
        }
        fclose($fichier);
        return $ret;
    }

}

$generator = new ManifestGenerator();
$generator->generateManifest(1.5);
