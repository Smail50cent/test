<?php

include_once '../../outils/AppRoot.php';
include_once $path ."service/logique/LogiqueFactory.php";

class AllProd {

    public function getAllProducts() {
        $prodtest = LogiqueFactory::getProdtestService();
        $data = $prodtest->getAll();
        return $data;
    }
    
    public function getAllCategorie(){
        $categorie = LogiqueFactory::getCategorieService();
        $data = $categorie->getAll();
        $idname = array();
        for ($i=0;$i<sizeof($data);$i++){
            $idname[$data[$i]->id] = $data[$i]->nom;
        }
        return $idname;
    }
  
    static function columnHead() {
        
        $column = "id=\"column_table_product_id\" class=\"column_table_product_structure column_table_product_personalise\"";
        
        $head = "<thead id=\"thead_table_product_id\" class=\"thead_table_product_structure thead_table_product_personalise\">";
        $head .= "<tr id=\"ligne_table_product_id\" class=\"ligne_table_product_structure ligne_table_product_personalise\">";
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

    static function buttonGestionProduit($id) {

        $btmod = "<a href=\"#\" onclick=modProduit() id=\"".$id."\" class=\"modprod_structure modprod_personalise\"><img src=\"../../../img/modify_row.png\" width=35 height=35 id=\"img_modprod_user_id\" alt=\"modifier un produit\" title=\"modifier un produit\"> </a>";
        $btsup = "<a href=\"#\" onclick=delProduit($(this).attr('id')) id=\"".$id."\" class=\"delprod_structure delprod_personalise\"><img src=\"../../../img/db_remove.png\" width=35 height=35 id=\"img_delprod_user_id\" alt=\"supprimer un produit\" title=\"supprimer un produit\"> </a>";

        return $btmod.$btsup;
    }
    
    static function buttonAddProduit() {
        return  $btadd = "<a href=\"#\" onclick=addLigneProduit() id=\"addprod_id\" class=\"addprod_structure addprod_personalise\"><img src=\"../../../img/db_add.png\" width=40 height=40 id=\"img_addprod_user_id\" alt=\"ajouter un produit\" title=\"ajouter un produit\"> </a>";
        
    }
        
    static function columnProduct($val,$name) {
        $class_ligne = "class=\"column_table_product_structure column_table_product_personalise\"";;
        $id_ligne = "id=\"column_table_product_id_".$name."\" ";
        
        return "<td ".$id_ligne." ".$class_ligne."><label>".$val."</label></td>";
    }   
}
