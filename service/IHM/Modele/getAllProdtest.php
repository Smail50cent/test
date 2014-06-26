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
        
        $column = "class=\"column_table_product_structure column_table_product_personalise\"";
        
        $head = "<thead class=\"thead_table_product_structure thead_table_product_personalise\">";
        $head .= "<tr class=\"ligne_table_product_structure ligne_table_product_personalise\">";
        $head .= "<th ".$column."> NOM </th>";
        $head .= "<th ".$column."> CATEGORIE_ID </th>";
        $head .= "<th ".$column."> sousCategorie </th>";
        $head .= "<th ".$column."> options </th>";
        $head .= "<th ".$column."> lienAssociationProduitPrix </th>";
        $head .= "<th ".$column."> Produit_simple </th>";
        $head .= "<th ".$column."> Famille_comptable </th>";
        $head .= "<th ".$column."> TVA </th>";
        $head .= "<th ".$column.">". AllProd::buttonAddProduit() ."</th>";
        $head .= "</tr>";
        $head .= "</thead>";
        return $head;
    }

    static function buttonGestionProduit() {

        $btmod = "<a href=\"#\" onclick=modProduit() id=\"modprod_id\" class=\"modprod_structure modprod_personalise\"><img src=\"../../../img/modify_column.png\" width=35 height=35 id=\"img_modprod_user_id\" alt=\"modifier un produit\" title=\"modifier un produit\"> </a>";
        $btsup = "<a href=\"#\" onclick=delProduit() id=\"delprod_id\" class=\"delprod_structure delprod_personalise\"><img src=\"../../../img/db_remove.png\" width=35 height=35 id=\"img_delprod_user_id\" alt=\"supprimer un produit\" title=\"supprimer un produit\"> </a>";

        return $btmod.$btsup;
    }
    
    static function buttonAddProduit() {
        return  $btadd = "<a href=\"#\" onclick=addProduit() id=\"addprod_id\" class=\"addprod_structure addprod_personalise\"><img src=\"../../../img/db_add.png\" width=40 height=40 id=\"img_addprod_user_id\" alt=\"ajouter un produit\" title=\"ajouter un produit\"> </a>";
        
    }
        
        
}
