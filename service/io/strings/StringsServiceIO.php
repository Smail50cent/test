<?php

interface StringsServiceIO {

    public function sendDataToNewFile($filename, $strings);
    
    public function deleteFilesInStringsFolder();
    
    public function createFilesWithLanguagesEnable($langues);
}
