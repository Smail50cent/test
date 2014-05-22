<?php

/**
 * Description of EntrepriseFactory
 *
 * @author Damien Chesneau <contact@damienchesneau.fr>
 */
include_once 'CategorieServiceImpl.php';
include_once 'EntrepriseServiceImpl.php';
include_once 'IngredientServiceImpl.php';
include_once 'SousCategorieServiceImpl.php';
include_once 'ProduitServiceImpl.php';
include_once 'MenuServiceImpl.php';
include_once 'TableServiceImpl.php';
include_once 'ModeDeReglementServiceImpl.php';
include_once 'CompteServiceImpl.php';
include_once 'AttributCompteServiceImpl.php';
include_once 'ParamFormServiceImpl.php';
include_once 'TicketServiceImpl.php';
include_once 'ParametreApplicationServiceImpl.php';

class LogiqueFactory {

    private static $entrepriseSrv = null;
    private static $categorieSrv = null;
    private static $ingredientSrv = null;
    private static $sousCategorieSrv = null;
    private static $produitSrv = null;
    private static $menuSrv = null;
    private static $tableSrv = null;
    private static $modeDeReglementSrv = null;
    private static $compteSrv = null;
    private static $attcompteSrv = null;
    private static $paramformSrv = null;
    private static $ticketSrv = null;
    private static $paramappSrv = null;

    public static function getModeDeReglementService() {
        if (LogiqueFactory::$modeDeReglementSrv == null) {
            LogiqueFactory::$modeDeReglementSrv = new ModeDeReglementServiceImpl();
        }
        return LogiqueFactory::$modeDeReglementSrv;
    }

    public static function getTicketService() {
        if (LogiqueFactory::$ticketSrv == null) {
            LogiqueFactory::$ticketSrv = new TicketServiceImpl();
        }
        return LogiqueFactory::$ticketSrv;
    }

    public static function getTableService() {
        if (LogiqueFactory::$tableSrv == null) {
            LogiqueFactory::$tableSrv = new TableServiceImpl();
        }
        return LogiqueFactory::$tableSrv;
    }

    public static function getMenuService() {
        if (LogiqueFactory::$menuSrv == null) {
            LogiqueFactory::$menuSrv = new MenuServiceImpl();
        }
        return LogiqueFactory::$menuSrv;
    }

    public static function getProduitService() {
        if (LogiqueFactory::$produitSrv == null) {
            LogiqueFactory::$produitSrv = new ProduitServiceImpl();
        }
        return LogiqueFactory::$produitSrv;
    }

    public static function getEntrepriseService() {
        if (LogiqueFactory::$entrepriseSrv == null) {
            LogiqueFactory::$entrepriseSrv = new EntrepriseServiceImpl();
        }
        return LogiqueFactory::$entrepriseSrv;
    }

    public static function getCategorieService() {
        if (LogiqueFactory::$categorieSrv == null) {
            LogiqueFactory::$categorieSrv = new CategorieServiceImpl();
        }
        return LogiqueFactory::$categorieSrv;
    }

    public static function getSousCategorieService() {
        if (LogiqueFactory::$sousCategorieSrv == null) {
            LogiqueFactory::$sousCategorieSrv = new SousCategorieServiceImpl();
        }
        return LogiqueFactory::$sousCategorieSrv;
    }

    public static function getIngredientService() {
        if (LogiqueFactory::$ingredientSrv == null) {
            LogiqueFactory::$ingredientSrv = new IngredientServiceImpl();
        }
        return LogiqueFactory::$ingredientSrv;
    }

    public static function getCompteService() {
        if (LogiqueFactory::$compteSrv == null) {
            LogiqueFactory::$compteSrv = new CompteServiceImpl();
        }
        return LogiqueFactory::$compteSrv;
    }

    public static function getAttributCompteService() {
        if (LogiqueFactory::$attcompteSrv == null) {
            LogiqueFactory::$attcompteSrv = new AttributCompteServiceImpl();
        }
        return LogiqueFactory::$attcompteSrv;
    }

    public static function getParamFormService() {
        if (LogiqueFactory::$paramformSrv == null) {
            LogiqueFactory::$paramformSrv = new ParamFormServiceImpl();
        }
        return LogiqueFactory::$paramformSrv;
    }

    public static function getParamAppService() {
        if (LogiqueFactory::$paramappSrv == null) {
            LogiqueFactory::$paramappSrv = new ParametreApplicationServiceImpl();
        }
        return LogiqueFactory::$paramappSrv;
    }

}
