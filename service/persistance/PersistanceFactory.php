<?php

/**
 * Description of DatabaseFactory
 *
 * @author Damien Chesneau <contact@damienchesneau.fr>
 */
include_once 'EntrepriseServiceDataImpl.php';
include_once 'CategorieServiceDataImpl.php';
include_once 'IngredientServiceDataImpl.php';
include_once 'SousCategorieServiceDataImpl.php';
include_once 'ProduitServiceDataImpl.php';
include_once 'AssociationProduitIngredientServiceDataImpl.php';
include_once 'MenuServiceDataImpl.php';
include_once 'OptionServiceDataImpl.php';
include_once 'TablesServiceDataImpl.php';
include_once 'ModeDeReglementServiceDataImpl.php';

class PersistanceFactory {

    private static $entrepriseSrv = null;
    private static $categorieSrv = null;
    private static $ingredientSrv = null;
    private static $sousCategorie = null;
    private static $produitSrv = null;
    private static $AssociationProduitIngredientSrv = null;
    private static $menuSrv = null;
    private static $optionSrv = null;
    private static $tableSrv = null;
    private static $modeDeReglement = null;

    public static function getModeDeReglementService() {
        if (PersistanceFactory::$modeDeReglement == null) {
            PersistanceFactory::$modeDeReglement = new ModeDeReglementServiceDataImpl();
        }
        return PersistanceFactory::$modeDeReglement;
    }
    
    public static function getOptionService() {
        if (PersistanceFactory::$optionSrv == null) {
            PersistanceFactory::$optionSrv = new OptionServiceDataImpl();
        }
        return PersistanceFactory::$optionSrv;
    }

    public static function getTableService() {
        if (PersistanceFactory::$tableSrv == null) {
            PersistanceFactory::$tableSrv = new TablesServiceDataImpl();
        }
        return PersistanceFactory::$tableSrv;
    }
    
    public static function getMenuService() {
        if (PersistanceFactory::$menuSrv == null) {
            PersistanceFactory::$menuSrv = new MenuServiceDataImpl();
        }
        return PersistanceFactory::$menuSrv;
    }

    public static function getAssociationProduitIngredientService() {
        if (PersistanceFactory::$AssociationProduitIngredientSrv == null) {
            PersistanceFactory::$AssociationProduitIngredientSrv = new AssociationProduitIngredientServiceDataImpl();
        }
        return PersistanceFactory::$AssociationProduitIngredientSrv;
    }

    public static function getProduitService() {
        if (PersistanceFactory::$produitSrv == null) {
            PersistanceFactory::$produitSrv = new ProduitServiceDataImpl();
        }
        return PersistanceFactory::$produitSrv;
    }

    public static function getEntrepriseService() {
        if (PersistanceFactory::$entrepriseSrv == null) {
            PersistanceFactory::$entrepriseSrv = new EntrepriseServiceDataImpl();
        }
        return PersistanceFactory::$entrepriseSrv;
    }

    public static function getSousCategorieService() {
        if (PersistanceFactory::$sousCategorie == null) {
            PersistanceFactory::$sousCategorie = new SousCategorieServiceDataImpl();
        }
        return PersistanceFactory::$sousCategorie;
    }

    public static function getCategorieService() {
        if (PersistanceFactory::$categorieSrv == null) {
            PersistanceFactory::$categorieSrv = new CategorieServiceDataImpl();
        }
        return PersistanceFactory::$categorieSrv;
    }

    public static function getIngredientService() {
        if (PersistanceFactory::$ingredientSrv == null) {
            PersistanceFactory::$ingredientSrv = new IngredientServiceDataImpl();
        }
        return PersistanceFactory::$ingredientSrv;
    }

}
