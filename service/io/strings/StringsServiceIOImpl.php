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

    public function createFilesWithLanguagesEnable($langues) {
        $ret = null;

        $content = "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<languages>\n";
        for ($i = 0; $i < count($langues); $i++) {
            $content = "\t<language>\n";
            $content = "\t\t<id>".$langues[$i]->getId()."</id>\n";
            $content = "\t\t<label>".$langues[$i]->getLabel()."</label>\n";
            $content = "\t\t<actif>".$langues[$i]->getActif()."</actif>\n";
            $content = "\t\t<navigatorVar>".$langues[$i]->getNavigatorVar()."</navigatorVar>\n";
            $content = "\t\t<type>".$langues[$i]->getType()."</type>\n";
            $content = "\t\t<gmtLevel>".$langues[$i]->getGmtLevel()."</gmtLevel>\n";
            $content = "\t</language>\n";
        }  
        $content = "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<languages>\n";
        $strOfFile = $content;
        $fichier = fopen("../../../config/strings/languages_actifs.xml", "w+");
        if (fwrite($fichier, $strOfFile)) {
            $ret = true;
        } else {
            $ret = false;
        }
        fclose($fichier);
        /* <languages>
          <language>
          
          
          
          
          
          
          <language>
          <id>2</id>
          <label>Anglais</label>
          <actif>true</actif>
          <navigatorVar>en</navigatorVar>
          <type>en_US</type>
          </language>
          </languages> */
    }

}
