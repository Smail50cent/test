<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

include_once $path . 'service/io/strings/StringsServiceIO.php';
include_once $path . 'service/logique/entity/Strings.php';

class StringsServiceIOImpl implements StringsServiceIO {

    public function sendDataToNewFile($filename, $strings) {
        $xmlFileContentStart = "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<strings>\n";
        $xmlFileContentEnd = "</strings>";
        $xmlFileContent = "";
        for ($i = 0; $i < count($strings); $i++) {
            $xmlFileContent = $xmlFileContent . $this->updateEntityToXmlElement($strings[$i]);
        }
        $this->generateFile($filename, $xmlFileContentStart . $xmlFileContent . $xmlFileContentEnd);
    }

    private function updateEntityToXmlElement(Strings $string) {
        return $xmlItemContent = "\t<string key=\"" . $string->getKey_lang() . "\">" . $string->getValue() . "</string>\n";
    }

    private function generateFile($fileName, $content) {
        $ret = null;
        $strOfFile = $content;
        $fichier = fopen("../../../config/strings/" . $fileName, "w+");
        if (fwrite($fichier, $strOfFile)) {
            $ret = true;
        } else {
            $ret = false;
        }
        fclose($fichier);
    }

    public function deleteFilesInStringsFolder() {
        $dossierTempo = "../../../config/strings/";
        $handle = opendir($dossierTempo);
        while (false !== ($fichier = readdir($handle))) {
            if (($fichier != ".") && ($fichier != "..")) {
                unlink($dossierTempo . $fichier);
            }
        }
    }

}
