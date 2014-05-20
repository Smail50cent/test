<?php

include_once '../logique/LogiqueFactory.php';
include_once 'ParamFormValue.php';
$paramform = LogiqueFactory::getParamFormService();
$result = $paramform->getAll();

for ($i = 0; $i < sizeof($result); $i++) {
    if ($result[$i]->actif == 1) {
        $val = new ParamFormValue();
        $str = $val->paramValue($result[$i]->file_template_html, "id_template", $result[$i]->id_html);
        echo $val->paramValue($str, "class_template", $result[$i]->class_html);
        echo "<br>";
    }
}