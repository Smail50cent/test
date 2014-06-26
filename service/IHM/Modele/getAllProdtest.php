<?php

include_once '../../outils/AppRoot.php';
include_once $path ."service/logique/LogiqueFactory.php";

class AllProd {

    public $data;

    public function getAll() {
        $prodtest = LogiqueFactory::getProdtestService();
        $this->data = $prodtest->getAll();
        return $this->data;
    }

    static function fields($val,$size=15) {
        return $field = "<input size =".$size." type=text id=value_produit_id value=\"" . $val . "\" >";
    }
    
    static function columnHead() {
        $head = "<thead>";
        $head .= "<tr>";
        $head .= "<th> NOM </th>";
        $head .= "<th> CATEGORIE_ID </th>";
        $head .= "<th> sousCategorie </th>";
        $head .= "<th> options </th>";
        $head .= "<th> lienAssociationProduitPrix </th>";
        $head .= "<th> Produit_simple </th>";
        $head .= "<th> Famille_comptable </th>";
        $head .= "<th> TVA </th>";
        $head .= "<th>". AllProd::buttonAddProduit() ."</th>";
        $head .= "</tr>";
        $head .= "</thead>";
        return $head;
    }

    static function buttonGestionProduit() {

        $btmod = "<a href=\"#\" onclick=modProduit() id=\"modprod_id\" class=\"modprod\"><img src=\"../../../img/modify_column.png\" width=35 height=35 id=\"img_modprod_user_id\" alt=\"modifier un produit\" title=\"modifier un produit\"> </a>";
        $btsup = "<a href=\"#\" onclick=delProduit() id=\"delprod_id\" class=\"delprod\"><img src=\"../../../img/db_remove.png\" width=35 height=35 id=\"img_delprod_user_id\" alt=\"supprimer un produit\" title=\"supprimer un produit\"> </a>";

        return $btmod.$btsup;
    }
    
    static function buttonAddProduit() {
        return  $btadd = "<a href=\"#\" onclick=addProduit() id=\"addprod_id\" class=\"addprod\"><img src=\"../../../img/db_add.png\" width=40 height=40 id=\"img_addprod_user_id\" alt=\"ajouter un produit\" title=\"ajouter un produit\"> </a>";
        
    }
        
        
}
