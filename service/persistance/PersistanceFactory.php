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
include_once 'CompteServiceDataImpl.php';
include_once 'AttributCompteServiceDataImpl.php';
include_once 'ParamFormServiceDataImpl.php';
include_once 'TicketServiceDataImpl.php';
include_once 'ParametreApplicationServiceDataImpl.php';
include_once 'StringsServiceDataImpl.php';

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
    private static $compteSrv = null;
    private static $attcompteSrv = null;
    private static $paramformSrv = null;
    private static $ticketSrv = null;
    private static $paramappSrv = null;
    private static $stringsSrv = null;

    public static function getTicketService() {
        if (PersistanceFactory::$ticketSrv == null) {
            PersistanceFactory::$ticketSrv = new TicketServiceDataImpl();
        }
        return PersistanceFactory::$ticketSrv;
    }

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

    public static function getCompteService() {
        if (PersistanceFactory::$compteSrv == null) {
            PersistanceFactory::$compteSrv = new CompteServiceDataImpl();
        }
        return PersistanceFactory::$compteSrv;
    }

    public static function getAttributCompteService() {
        if (PersistanceFactory::$attcompteSrv == null) {
            PersistanceFactory::$attcompteSrv = new AttributCompteServiceDataImpl();
        }
        return PersistanceFactory::$attcompteSrv;
    }

    public static function getParamFormService() {
        if (PersistanceFactory::$paramformSrv == null) {
            PersistanceFactory::$paramformSrv = new ParamFormServiceDataImpl();
        }
        return PersistanceFactory::$paramformSrv;
    }

    public static function getParamAppService() {
        if (PersistanceFactory::$paramappSrv == null) {
            PersistanceFactory::$paramappSrv = new ParametreApplicationServiceDataImpl();
        }
        return PersistanceFactory::$paramappSrv;
    }
    
    public static function getStringsService() {
        if (PersistanceFactory::$stringsSrv == null) {
            PersistanceFactory::$stringsSrv = new StringsServiceDataImpl();
        }
        return PersistanceFactory::$stringsSrv;
    }    

}
