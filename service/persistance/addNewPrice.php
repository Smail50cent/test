<?php

include_once '../outils/AppRoot.php';
include_once $path . 'service/persistance/PersistanceFactory.php';
include_once $path . 'service/logique/entity/Strings.php';
$fichier = '../../config/string_fr_FR.xml';
$xml = simplexml_load_file($fichier);
$srv = PersistanceFactory::getStringsService();
for ($i = 0; $i < count($xml->string); $i++) {
    $string = new Strings();
    $string ->setKey_lang($xml->string[$i]['key']);
    $string ->setValue($xml->string[$i]);
    $string ->setLang("fr_FR");
    $srv->add($string);
}