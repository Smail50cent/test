<?php

/**
 * Description of EntrepriseFactory
 *
 * @author Damien Chesneau <contact@damienchesneau.fr>
 */
include_once $path . 'service/logique/CategorieServiceImpl.php';
include_once $path . 'service/logique/EntrepriseServiceImpl.php';
include_once $path . 'service/logique/IngredientServiceImpl.php';
include_once $path . 'service/logique/SousCategorieServiceImpl.php';
include_once $path . 'service/logique/ProduitServiceImpl.php';
include_once $path . 'service/logique/MenuServiceImpl.php';
include_once $path . 'service/logique/TableServiceImpl.php';
include_once $path . 'service/logique/ModeDeReglementServiceImpl.php';
include_once $path . 'service/logique/CompteServiceImpl.php';
include_once $path . 'service/logique/AttributCompteServiceImpl.php';
include_once $path . 'service/logique/ParamFormServiceImpl.php';
include_once $path . 'service/logique/TicketServiceImpl.php';
include_once $path . 'service/logique/ParametreApplicationServiceImpl.php';
include_once $path . 'service/logique/StringsServiceImpl.php';
include_once $path . 'service/logique/AssociationProduitPrixServiceImpl.php';
include_once $path . 'service/logique/CompteRoleServiceImpl.php';
include_once $path . 'service/logique/ProdtestServiceImpl.php';
include_once $path . 'service/logique/CompteProduitFavoriServiceImpl.php';
include_once $path . 'service/logique/ProduitSuggereriServiceImpl.php';
include_once $path . 'service/logique/ReservationDateDisponibleServiceImpl.php';
include_once $path . 'service/logique/ReservationServiceImpl.php';

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
    private static $stringsSrv = null;
    private static $associationProduitPrixService = null;
    private static $compteRoleService = null;
    private static $prodtestSrv = null;
    private static $compteProduitFavoriSrv = null;
    private static $produitSuggererSrv = null;
    private static $reservationDateDisponibleSrv = null;
    private static $reservationSrv = null;

    public static function getReservationService() {
        if (LogiqueFactory::$reservationSrv == null) {
            LogiqueFactory::$reservationSrv = new ReservationServiceImpl();
        }
        return LogiqueFactory::$reservationSrv;
    }
    
    public static function getReservationDateDisponibleService() {
        if (LogiqueFactory::$reservationDateDisponibleSrv == null) {
            LogiqueFactory::$reservationDateDisponibleSrv = new ReservationDateDisponibleServiceImpl();
        }
        return LogiqueFactory::$reservationDateDisponibleSrv;
    }

    public static function getProduitSuggererService() {
        if (LogiqueFactory::$produitSuggererSrv == null) {
            LogiqueFactory::$produitSuggererSrv = new ProduitSuggererServiceImpl();
        }
        return LogiqueFactory::$produitSuggererSrv;
    }

    public static function getCompteProduitFavoriService() {
        if (LogiqueFactory::$compteProduitFavoriSrv == null) {
            LogiqueFactory::$compteProduitFavoriSrv = new CompteProduitFavoriServiceImpl();
        }
        return LogiqueFactory::$compteProduitFavoriSrv;
    }

    public static function getAssociationProduitPrixService() {
        if (LogiqueFactory::$associationProduitPrixService == null) {
            LogiqueFactory::$associationProduitPrixService = new AssociationProduitPrixServiceImpl();
        }
        return LogiqueFactory::$associationProduitPrixService;
    }

    public static function getCompteRoleService() {
        if (LogiqueFactory::$compteRoleService == null) {
            LogiqueFactory::$compteRoleService = new CompteRoleServiceImpl();
        }
        return LogiqueFactory::$compteRoleService;
    }

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

    public static function getStringsService() {
        if (LogiqueFactory::$stringsSrv == null) {
            LogiqueFactory::$stringsSrv = new StringsServiceImpl();
        }
        return LogiqueFactory::$stringsSrv;
    }

    public static function getProdtestService() {
        if (LogiqueFactory::$prodtestSrv == null) {
            LogiqueFactory::$prodtestSrv = new ProdtestServiceImpl();
        }
        return LogiqueFactory::$prodtestSrv;
    }

}
