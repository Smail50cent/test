<?php

include_once '../outils/AppRoot.php';
include_once $path . 'service/persistance/PersistanceFactory.php';
include_once $path . 'service/logique/entity/Strings.php';
$srv = PersistanceFactory::getStringsService();
$frs = $srv->getByLang('fr_FR');
$uss = $srv->getByLang('en_US');
for ($i = 0; $i < count($frs); $i++) {
    $present = false;
    for ($j = 0; $j < count($uss); $j++) {
        if ($frs[$i]->getKey_lang() == $uss[$j]->getKey_lang()) {
            $present = true;
        }
    }
    if ($present == false) {
        echo 'key_lang="' . $frs[$i]->getKey_lang(). '" value="' . $frs[$i]->getValue().'"<br>';
    }
}