<?php

if (isset($_GET["lang"])) {
    include_once '../logique/LogiqueFactory.php';
    include_once 'ParamFormValue.php';
    $paramform = LogiqueFactory::getParamFormService();
    $result = $paramform->getAll();
    $strings = LogiqueFactory::getStringsService();
    $resultStr = $strings->getByLang($_GET["lang"]);

    $myform = fopen("../../config/template/compte/generated_form_inscription", "w+");
    for ($i = 0; $i < sizeof($result); $i++) {
        if ($result[$i]->actif == 1) {
            $val = new ParamFormValue();
            $str = $val->paramValue($result[$i]->file_template_html, "id_template", $result[$i]->id_html);
            $str = $val->paramValue($str, "class_template", $result[$i]->class_html);
            fwrite($myform, "<div id=\"" . $result[$i]->id_form . "_" . $result[$i]->id_html . "\" class=\"" . $result[$i]->id_form . "_" . $result[$i]->class_html . "\">");
            for ($j = 0; $j < sizeof($resultStr); $j++) {
                if ($result[$i]->label == $resultStr[$j]->key_lang) {
                    $str = $val->paramValue($str, "val_key", "{".$resultStr[$j]->key_lang."}");
                }
            }
            fwrite($myform, $str);
            fwrite($myform, "</div>");
        }
    }
    fclose($myform);
}