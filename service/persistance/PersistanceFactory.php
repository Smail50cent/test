<?php

/**
 * Description of DatabaseFactory
 *
 * @author Damien Chesneau <contact@damienchesneau.fr>
 */
include_once $path.'service/persistance/CategorieServiceDataImpl.php';
include_once $path.'service/persistance/EntrepriseServiceDataImpl.php';
include_once $path.'service/persistance/IngredientServiceDataImpl.php';
include_once $path.'service/persistance/SousCategorieServiceDataImpl.php';
include_once $path.'service/persistance/ProduitServiceDataImpl.php';
include_once $path.'service/persistance/MenuServiceDataImpl.php';
include_once $path.'service/persistance/TablesServiceDataImpl.php';
include_once $path.'service/persistance/ModeDeReglementServiceDataImpl.php';
include_once $path.'service/persistance/CompteServiceDataImpl.php';
include_once $path.'service/persistance/AttributCompteServiceDataImpl.php';
include_once $path.'service/persistance/ParamFormServiceDataImpl.php';
include_once $path.'service/persistance/TicketServiceDataImpl.php';
include_once $path.'service/persistance/ParametreApplicationServiceDataImpl.php';
include_once $path.'service/persistance/AssociationProduitIngredientServiceDataImpl.php';
include_once $path.'service/persistance/StringsServiceDataImpl.php';
include_once $path.'service/persistance/OptionServiceDataImpl.php';
include_once $path.'service/persistance/AssociationProduitPrixServiceDataImpl.php';
include_once $path.'service/persistance/CompteRoleServiceDataImpl.php';
include_once $path.'service/persistance/ProdtestServiceDataImpl.php';
include_once $path.'service/persistance/CompteProduitFavoriServiceDataImpl.php';

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

    public static function getCompteProduitFavoriService() {
        if (PersistanceFactory::$compteProduitFavoriSrv == null) {
            PersistanceFactory::$compteProduitFavoriSrv = new CompteProduitFavoriServiceDataImpl();
        }
        return PersistanceFactory::$compteProduitFavoriSrv;
    }
    
    public static function getCompteRoleService() {
        if (PersistanceFactory::$compteRoleSrv == null) {
            PersistanceFactory::$compteRoleSrv = new CompteRoleServiceDataImpl();
        }
        return PersistanceFactory::$compteRoleSrv;
    }
    public static function getAssociationProduitPrixService() {
        if (PersistanceFactory::$associationProduitPrixSrv == null) {
            PersistanceFactory::$associationProduitPrixSrv = new AssociationProduitPrixServiceDataImpl();
        }
        return PersistanceFactory::$associationProduitPrixSrv;
    }

    public static function getTauxTvaService() {
        if (PersistanceFactory::$tauxTvaSrv == null) {
            PersistanceFactory::$tauxTvaSrv = new TauxTvaServiceImpl();
        }
        return PersistanceFactory::$tauxTvaSrv;
    }

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
    
    public static function getProdtestService() {
        if (PersistanceFactory::$prodtestSrv == null) {
            PersistanceFactory::$prodtestSrv = new ProdtestServiceDataImpl();
        }
        return PersistanceFactory::$prodtestSrv;
    }
}
