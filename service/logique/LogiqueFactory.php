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
include_once $path . 'service/logique/MajTablesServiceImpl.php';
include_once $path . 'service/logique/ZoneTableServiceImpl.php';
include_once $path . 'service/logique/TypeCommandeServiceImpl.php';
include_once $path . 'service/logique/groupe/GroupeServiceImpl.php';
include_once $path . 'service/logique/etablissement/EtablissementServiceImpl.php';
include_once $path . 'service/logique/option/OptionServiceImpl.php';
include_once $path . 'service/logique/tauxTva/TauxTvaServiceImpl.php';
include_once $path . 'service/logique/style/StyleServiceImpl.php';

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
    private static $majtablesSrv = null;
    private static $zoneTableSrv = null;
    private static $typeCommandeSrv = null;
    private static $etablissementSrv = null;
    private static $groupeSrv = null;
    private static $optSrv = null;
    private static $tauxTvaSrv = null;
    private static $styleSrv = null;

    /**
     * 
     * @return StyleService
     */
    public static function getStyleService() {
        if (LogiqueFactory::$styleSrv == null) {
            LogiqueFactory::$styleSrv = new StyleServiceImpl();
        }
        return LogiqueFactory::$styleSrv;
    }
    /**
     * 
     * @return EtablissementService
     */
    public static function getGroupeService() {
        if (LogiqueFactory::$groupeSrv == null) {
            LogiqueFactory::$groupeSrv = new GroupeServiceImpl();
        }
        return LogiqueFactory::$groupeSrv;
    }
    /**
     * 
     * @return EtablissementService
     */
    public static function getEtablissementService() {
        if (LogiqueFactory::$etablissementSrv == null) {
            LogiqueFactory::$etablissementSrv = new EtablissementServiceImpl();
        }
        return LogiqueFactory::$etablissementSrv;
    }
    /**
     * 
     * @return TypeCommandeService
     */
    public static function getTypeCommandeService() {
        if (LogiqueFactory::$typeCommandeSrv == null) {
            LogiqueFactory::$typeCommandeSrv = new TypeCommandeServiceImpl();
        }
        return LogiqueFactory::$typeCommandeSrv;
    }

    /**
     * 
     * @return ZoneTableService
     */
    public static function getZoneTableService() {
        if (LogiqueFactory::$zoneTableSrv == null) {
            LogiqueFactory::$zoneTableSrv = new ZoneTableServiceImpl();
        }
        return LogiqueFactory::$zoneTableSrv;
    }

    /**
     * 
     * @return ReservationService
     */
    public static function getReservationService() {
        if (LogiqueFactory::$reservationSrv == null) {
            LogiqueFactory::$reservationSrv = new ReservationServiceImpl();
        }
        return LogiqueFactory::$reservationSrv;
    }

    /**
     * 
     * @return ReservationDateDisponibleService
     */
    public static function getReservationDateDisponibleService() {
        if (LogiqueFactory::$reservationDateDisponibleSrv == null) {
            LogiqueFactory::$reservationDateDisponibleSrv = new ReservationDateDisponibleServiceImpl();
        }
        return LogiqueFactory::$reservationDateDisponibleSrv;
    }

    /**
     * 
     * @return ProduitSuggererService
     */
    public static function getProduitSuggererService() {
        if (LogiqueFactory::$produitSuggererSrv == null) {
            LogiqueFactory::$produitSuggererSrv = new ProduitSuggererServiceImpl();
        }
        return LogiqueFactory::$produitSuggererSrv;
    }

    /**
     * 
     * @return CompteProduitFavoriService
     */
    public static function getCompteProduitFavoriService() {
        if (LogiqueFactory::$compteProduitFavoriSrv == null) {
            LogiqueFactory::$compteProduitFavoriSrv = new CompteProduitFavoriServiceImpl();
        }
        return LogiqueFactory::$compteProduitFavoriSrv;
    }

    /**
     * 
     * @return AssociationProduitPrixService
     */
    public static function getAssociationProduitPrixService() {
        if (LogiqueFactory::$associationProduitPrixService == null) {
            LogiqueFactory::$associationProduitPrixService = new AssociationProduitPrixServiceImpl();
        }
        return LogiqueFactory::$associationProduitPrixService;
    }

    /**
     * 
     * @return CompteRoleService
     */
    public static function getCompteRoleService() {
        if (LogiqueFactory::$compteRoleService == null) {
            LogiqueFactory::$compteRoleService = new CompteRoleServiceImpl();
        }
        return LogiqueFactory::$compteRoleService;
    }

    /**
     * 
     * @return ModeDeReglementService
     */
    public static function getModeDeReglementService() {
        if (LogiqueFactory::$modeDeReglementSrv == null) {
            LogiqueFactory::$modeDeReglementSrv = new ModeDeReglementServiceImpl();
        }
        return LogiqueFactory::$modeDeReglementSrv;
    }

    /**
     * 
     * @return TicketService
     */
    public static function getTicketService() {
        if (LogiqueFactory::$ticketSrv == null) {
            LogiqueFactory::$ticketSrv = new TicketServiceImpl();
        }
        return LogiqueFactory::$ticketSrv;
    }

    /**
     * 
     * @return TableService
     */
    public static function getTableService() {
        if (LogiqueFactory::$tableSrv == null) {
            LogiqueFactory::$tableSrv = new TableServiceImpl();
        }
        return LogiqueFactory::$tableSrv;
    }

    /**
     * 
     * @return MenuService
     */
    public static function getMenuService() {
        if (LogiqueFactory::$menuSrv == null) {
            LogiqueFactory::$menuSrv = new MenuServiceImpl();
        }
        return LogiqueFactory::$menuSrv;
    }

    /**
     * 
     * @return ProduitService
     */
    public static function getProduitService() {
        if (LogiqueFactory::$produitSrv == null) {
            LogiqueFactory::$produitSrv = new ProduitServiceImpl();
        }
        return LogiqueFactory::$produitSrv;
    }

    /**
     * 
     * @return EntrepriseService
     */
    public static function getEntrepriseService() {
        if (LogiqueFactory::$entrepriseSrv == null) {
            LogiqueFactory::$entrepriseSrv = new EntrepriseServiceImpl();
        }
        return LogiqueFactory::$entrepriseSrv;
    }

    /**
     * 
     * @return CategorieService
     */
    public static function getCategorieService() {
        if (LogiqueFactory::$categorieSrv == null) {
            LogiqueFactory::$categorieSrv = new CategorieServiceImpl();
        }
        return LogiqueFactory::$categorieSrv;
    }

    /**
     * 
     * @return SousCategorieService
     */
    public static function getSousCategorieService() {
        if (LogiqueFactory::$sousCategorieSrv == null) {
            LogiqueFactory::$sousCategorieSrv = new SousCategorieServiceImpl();
        }
        return LogiqueFactory::$sousCategorieSrv;
    }

    /**
     * 
     * @return IngredientService
     */
    public static function getIngredientService() {
        if (LogiqueFactory::$ingredientSrv == null) {
            LogiqueFactory::$ingredientSrv = new IngredientServiceImpl();
        }
        return LogiqueFactory::$ingredientSrv;
    }

    /**
     * 
     * @return CompteService
     */
    public static function getCompteService() {
        if (LogiqueFactory::$compteSrv == null) {
            LogiqueFactory::$compteSrv = new CompteServiceImpl();
        }
        return LogiqueFactory::$compteSrv;
    }

    /**
     * 
     * @return AttributCompteService
     */
    public static function getAttributCompteService() {
        if (LogiqueFactory::$attcompteSrv == null) {
            LogiqueFactory::$attcompteSrv = new AttributCompteServiceImpl();
        }
        return LogiqueFactory::$attcompteSrv;
    }

    /**
     * 
     * @return ParamFormService
     */
    public static function getParamFormService() {
        if (LogiqueFactory::$paramformSrv == null) {
            LogiqueFactory::$paramformSrv = new ParamFormServiceImpl();
        }
        return LogiqueFactory::$paramformSrv;
    }

    /**
     * 
     * @return ParametreApplicationService
     */
    public static function getParamAppService() {
        if (LogiqueFactory::$paramappSrv == null) {
            LogiqueFactory::$paramappSrv = new ParametreApplicationServiceImpl();
        }
        return LogiqueFactory::$paramappSrv;
    }

    /**
     * 
     * @return StringsService
     */
    public static function getStringsService() {
        if (LogiqueFactory::$stringsSrv == null) {
            LogiqueFactory::$stringsSrv = new StringsServiceImpl();
        }
        return LogiqueFactory::$stringsSrv;
    }

    /**
     * 
     * @return ProdtestService
     */
    public static function getProdtestService() {
        if (LogiqueFactory::$prodtestSrv == null) {
            LogiqueFactory::$prodtestSrv = new ProdtestServiceImpl();
        }
        return LogiqueFactory::$prodtestSrv;
    }

    /**
     * 
     * @return MajTablesService
     */
    public static function getMajTablesService() {
        if (LogiqueFactory::$majtablesSrv == null) {
            LogiqueFactory::$majtablesSrv = new MajTablesServiceImpl();
        }
        return LogiqueFactory::$majtablesSrv;
    }
    
    /**
     * 
     * @return OptionService
     */
    public static function getOptionService() {
        if (LogiqueFactory::$optSrv == null) {
            LogiqueFactory::$optSrv = new OptionServiceImpl();
        }
        return LogiqueFactory::$optSrv;
    }
    
    /**
     * 
     * @return TauxTvaService
     */
    public static function getTauxTvaService() {
        if (LogiqueFactory::$tauxTvaSrv == null) {
            LogiqueFactory::$tauxTvaSrv = new TauxTvaServiceImpl();
        }
        return LogiqueFactory::$tauxTvaSrv;
    }

}
