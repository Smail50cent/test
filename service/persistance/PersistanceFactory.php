<?php

/**
 * Description of DatabaseFactory
 *
 * @author Damien Chesneau <contact@damienchesneau.fr>
 */
include_once $path . 'service/persistance/CategorieServiceDataImpl.php';
include_once $path . 'service/persistance/EntrepriseServiceDataImpl.php';
include_once $path . 'service/persistance/IngredientServiceDataImpl.php';
include_once $path . 'service/persistance/SousCategorieServiceDataImpl.php';
include_once $path . 'service/persistance/ProduitServiceDataImpl.php';
include_once $path . 'service/persistance/MenuServiceDataImpl.php';
include_once $path . 'service/persistance/TablesServiceDataImpl.php';
include_once $path . 'service/persistance/ModeDeReglementServiceDataImpl.php';
include_once $path . 'service/persistance/CompteServiceDataImpl.php';
include_once $path . 'service/persistance/AttributCompteServiceDataImpl.php';
include_once $path . 'service/persistance/ParamFormServiceDataImpl.php';
include_once $path . 'service/persistance/TicketServiceDataImpl.php';
include_once $path . 'service/persistance/ParametreApplicationServiceDataImpl.php';
include_once $path . 'service/persistance/AssociationProduitIngredientServiceDataImpl.php';
include_once $path . 'service/persistance/StringsServiceDataImpl.php';
include_once $path . 'service/persistance/AssociationProduitPrixServiceDataImpl.php';
include_once $path . 'service/persistance/CompteRoleServiceDataImpl.php';
include_once $path . 'service/persistance/ProdtestServiceDataImpl.php';
include_once $path . 'service/persistance/CompteProduitFavoriServiceDataImpl.php';
include_once $path . 'service/persistance/AssociationProduitIngredientServiceDataImpl.php';
include_once $path . 'service/persistance/ProduitSuggererServiceDataImpl.php';
include_once $path . 'service/persistance/ReservationDateDisponibleServiceDataImpl.php';
include_once $path . 'service/persistance/ReservationServiceDataImpl.php';
include_once $path . 'service/persistance/MajTablesServiceDataImpl.php';
include_once $path . 'service/persistance/zonestables/ZoneTableServiceDataImpl.php';
include_once $path . 'service/persistance/TypeCommandeServiceDataImpl.php';
include_once $path . 'service/persistance/groupe/GroupeServiceDataImpl.php';
include_once $path . 'service/persistance/etablissement/EtablissementServiceDataImpl.php';
include_once $path . 'service/persistance/option/OptionServiceDataImpl.php';
include_once $path . 'service/persistance/TauxTvaServiceDataImpl.php';
include_once $path . 'service/persistance/style/StyleServiceDataImpl.php';
include_once $path . 'service/persistance/langues/LanguesServiceDataImpl.php';

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
    private static $tauxTvaSrv = null;
    private static $associationProduitPrixSrv = null;
    private static $compteRoleSrv = null;
    private static $prodtestSrv = null;
    private static $compteProduitFavoriSrv = null;
    private static $produitSuggererSrv = null;
    private static $reservationDateDisponibleSrv = null;
    private static $reservationSrv = null;
    private static $majtablesSrv = null;
    private static $zoneTablesSrv = null;
    private static $typeCommandeSrv = null;
    private static $groupeSrv = null;
    private static $optSrv = null;
    private static $etablissementSrv = null;
    private static $styleSrv = null;
    private static $languesSrv = null;

    /**
     * 
     * @return LanguesServiceData
     */
    public static function getLanguesService() {
        if (PersistanceFactory::$languesSrv == null) {
            PersistanceFactory::$languesSrv = new LanguesServiceDataImpl();
        }
        return PersistanceFactory::$languesSrv;
    }
    /**
     * 
     * @return StyleServiceDataImpl
     */
    public static function getStyleService() {
        if (PersistanceFactory::$styleSrv == null) {
            PersistanceFactory::$styleSrv = new StyleServiceDataImpl();
        }
        return PersistanceFactory::$styleSrv;
    }
    /**
     * 
     * @return EtablissementServiceData
     */
    public static function getEtablissementService() {
        if (PersistanceFactory::$etablissementSrv == null) {
            PersistanceFactory::$etablissementSrv = new EtablissementServiceDataImpl();
        }
        return PersistanceFactory::$etablissementSrv;
    }

    /**
     * 
     * @return GroupeServiceData
     */
    public static function getGroupeService() {
        if (PersistanceFactory::$groupeSrv == null) {
            PersistanceFactory::$groupeSrv = new GroupeServiceDataImpl();
        }
        return PersistanceFactory::$groupeSrv;
    }

    /**
     * 
     * @return TypeCommandeServiceData
     */
    public static function getTypeCommandeService() {
        if (PersistanceFactory::$typeCommandeSrv == null) {
            PersistanceFactory::$typeCommandeSrv = new TypeCommandeServiceDataImpl();
        }
        return PersistanceFactory::$typeCommandeSrv;
    }

    /**
     * 
     * @return ZoneTableServiceData
     */
    public static function getZoneTableService() {
        if (PersistanceFactory::$zoneTablesSrv == null) {
            PersistanceFactory::$zoneTablesSrv = new ZoneTableServiceDataImpl();
        }
        return PersistanceFactory::$zoneTablesSrv;
    }

    /**
     * 
     * @return ReservationServiceData
     */
    public static function getReservationService() {
        if (PersistanceFactory::$reservationSrv == null) {
            PersistanceFactory::$reservationSrv = new ReservationServiceDataImpl();
        }
        return PersistanceFactory::$reservationSrv;
    }

    /**
     * 
     * @return ReservationServiceData
     */
    public static function getReservationDateDisponibleService() {
        if (PersistanceFactory::$reservationDateDisponibleSrv == null) {
            PersistanceFactory::$reservationDateDisponibleSrv = new ReservationDateDisponibleServiceDataImpl();
        }
        return PersistanceFactory::$reservationDateDisponibleSrv;
    }

    /**
     * 
     * @return CompteProduitFavoriServiceData
     */
    public static function getCompteProduitFavoriService() {
        if (PersistanceFactory::$compteProduitFavoriSrv == null) {
            PersistanceFactory::$compteProduitFavoriSrv = new CompteProduitFavoriServiceDataImpl();
        }
        return PersistanceFactory::$compteProduitFavoriSrv;
    }

    /**
     * 
     * @return ProduitSuggererServiceData
     */
    public static function getProduitSuggererService() {
        if (PersistanceFactory::$produitSuggererSrv == null) {
            PersistanceFactory::$produitSuggererSrv = new ProduitSuggererServiceDataImpl();
        }
        return PersistanceFactory::$produitSuggererSrv;
    }

    /**
     * 
     * @return CompteRoleServiceData
     */
    public static function getCompteRoleService() {
        if (PersistanceFactory::$compteRoleSrv == null) {
            PersistanceFactory::$compteRoleSrv = new CompteRoleServiceDataImpl();
        }
        return PersistanceFactory::$compteRoleSrv;
    }

    /**
     * 
     * @return AssociationProduitIngredientServiceData
     */
    public static function getAssociationProduitPrixService() {
        if (PersistanceFactory::$associationProduitPrixSrv == null) {
            PersistanceFactory::$associationProduitPrixSrv = new AssociationProduitPrixServiceDataImpl();
        }
        return PersistanceFactory::$associationProduitPrixSrv;
    }

    /**
     * 
     * @return TauxTvaService
     */
    public static function getTauxTvaService() {
        if (PersistanceFactory::$tauxTvaSrv == null) {
            PersistanceFactory::$tauxTvaSrv = new TauxTvaServiceDataImpl();
        }
        return PersistanceFactory::$tauxTvaSrv;
    }

    /**
     * 
     * @return TicketServiceData
     */
    public static function getTicketService() {
        if (PersistanceFactory::$ticketSrv == null) {
            PersistanceFactory::$ticketSrv = new TicketServiceDataImpl();
        }
        return PersistanceFactory::$ticketSrv;
    }

    /**
     * 
     * @return ModeDeReglementServiceData
     */
    public static function getModeDeReglementService() {
        if (PersistanceFactory::$modeDeReglement == null) {
            PersistanceFactory::$modeDeReglement = new ModeDeReglementServiceDataImpl();
        }
        return PersistanceFactory::$modeDeReglement;
    }

    /**
     * 
     * @return OptionServiceData
     */
    public static function getOptionService() {
        if (PersistanceFactory::$optionSrv == null) {
            PersistanceFactory::$optionSrv = new OptionServiceDataImpl();
        }
        return PersistanceFactory::$optionSrv;
    }

    /**
     * 
     * @return TableServiceData
     */
    public static function getTableService() {
        if (PersistanceFactory::$tableSrv == null) {
            PersistanceFactory::$tableSrv = new TablesServiceDataImpl();
        }
        return PersistanceFactory::$tableSrv;
    }

    /**
     * 
     * @return MenuServiceData
     */
    public static function getMenuService() {
        if (PersistanceFactory::$menuSrv == null) {
            PersistanceFactory::$menuSrv = new MenuServiceDataImpl();
        }
        return PersistanceFactory::$menuSrv;
    }

    /**
     * 
     * @return AssociationProduitIngredientServiceData
     */
    public static function getAssociationProduitIngredientService() {
        if (PersistanceFactory::$AssociationProduitIngredientSrv == null) {
            PersistanceFactory::$AssociationProduitIngredientSrv = new AssociationProduitIngredientServiceDataImpl();
        }
        return PersistanceFactory::$AssociationProduitIngredientSrv;
    }

    /**
     * 
     * @return ProduitServiceData
     */
    public static function getProduitService() {
        if (PersistanceFactory::$produitSrv == null) {
            PersistanceFactory::$produitSrv = new ProduitServiceDataImpl();
        }
        return PersistanceFactory::$produitSrv;
    }

    /**
     * 
     * @return EntrepriseServiceData
     */
    public static function getEntrepriseService() {
        if (PersistanceFactory::$entrepriseSrv == null) {
            PersistanceFactory::$entrepriseSrv = new EntrepriseServiceDataImpl();
        }
        return PersistanceFactory::$entrepriseSrv;
    }

    /**
     * 
     * @return SousCategorieServiceData
     */
    public static function getSousCategorieService() {
        if (PersistanceFactory::$sousCategorie == null) {
            PersistanceFactory::$sousCategorie = new SousCategorieServiceDataImpl();
        }
        return PersistanceFactory::$sousCategorie;
    }

    /**
     * 
     * @return CategorieServiceData
     */
    public static function getCategorieService() {
        if (PersistanceFactory::$categorieSrv == null) {
            PersistanceFactory::$categorieSrv = new CategorieServiceDataImpl();
        }
        return PersistanceFactory::$categorieSrv;
    }

    /**
     * 
     * @return IngredientServiceData
     */
    public static function getIngredientService() {
        if (PersistanceFactory::$ingredientSrv == null) {
            PersistanceFactory::$ingredientSrv = new IngredientServiceDataImpl();
        }
        return PersistanceFactory::$ingredientSrv;
    }

    /**
     * 
     * @return CompteServiceData
     */
    public static function getCompteService() {
        if (PersistanceFactory::$compteSrv == null) {
            PersistanceFactory::$compteSrv = new CompteServiceDataImpl();
        }
        return PersistanceFactory::$compteSrv;
    }

    /**
     * 
     * @return AttributCompteServiceData
     */
    public static function getAttributCompteService() {
        if (PersistanceFactory::$attcompteSrv == null) {
            PersistanceFactory::$attcompteSrv = new AttributCompteServiceDataImpl();
        }
        return PersistanceFactory::$attcompteSrv;
    }

    /**
     * 
     * @return ParamFormServiceData
     */
    public static function getParamFormService() {
        if (PersistanceFactory::$paramformSrv == null) {
            PersistanceFactory::$paramformSrv = new ParamFormServiceDataImpl();
        }
        return PersistanceFactory::$paramformSrv;
    }

    /**
     * 
     * @return ParametreApplicationServiceData
     */
    public static function getParamAppService() {
        if (PersistanceFactory::$paramappSrv == null) {
            PersistanceFactory::$paramappSrv = new ParametreApplicationServiceDataImpl();
        }
        return PersistanceFactory::$paramappSrv;
    }

    /**
     * 
     * @return StringsServiceData
     */
    public static function getStringsService() {
        if (PersistanceFactory::$stringsSrv == null) {
            PersistanceFactory::$stringsSrv = new StringsServiceDataImpl();
        }
        return PersistanceFactory::$stringsSrv;
    }

    /**
     * 
     * @return ProdtestServiceData
     */
    public static function getProdtestService() {
        if (PersistanceFactory::$prodtestSrv == null) {
            PersistanceFactory::$prodtestSrv = new ProdtestServiceDataImpl();
        }
        return PersistanceFactory::$prodtestSrv;
    }

    /**
     * 
     * @return MajTablesServiceData
     */
    public static function getMajTablesService() {
        if (PersistanceFactory::$majtablesSrv == null) {
            PersistanceFactory::$majtablesSrv = new MajTablesServiceDataImpl();
        }
        return PersistanceFactory::$majtablesSrv;
    }
    
}
