<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

class ParamFormValue {

    function paramValue($html, $name, $value) {

        if (file_exists($html)) {
            $file = file_get_contents($html);
            $result = str_replace($name, $value, $file);
        }else {
            $result = str_replace($name, $value, $html);
        }

        //echo $result;

        return $result;
    }

}
