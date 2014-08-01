<?php

interface LanguesService {

    public function getAll();

    public function setLangActif($id);

    public function setLangDiable($id);

    public function getByActif();
}
