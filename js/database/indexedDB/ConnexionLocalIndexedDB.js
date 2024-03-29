/**
 *
 * @author Damien Chesneau <contact@damienchesneau.fr>
 */
function ConnexionLocalIndexedDB() {

    this.getEntreprise = function(methodToExecuteAfter) {
        myStorage.indexedDB.getEntreprise(methodToExecuteAfter);
    };
    this.getCategoriesForContentCategorie = function(onCarteLoadFinish) {
        myStorage.indexedDB.getAllCategories(onCarteLoadFinish);
    };
    this.getAllSousCategories = function(onCarteLoadFinish) {
        myStorage.indexedDB.getAllSousCategories(onCarteLoadFinish);
    };
    this.getSousCategorieByIdCat = function(onCarteLoadFinish, idCat) {
        myStorage.indexedDB.getSousCategorieByIdCat(onCarteLoadFinish, idCat);
    };
    this.getSousCategorieById = function(id, onCarteLoadFinish) {
        myStorage.indexedDB.getSousCategorieById(id, onCarteLoadFinish);
    };
    this.getSousCategoriesByIdCategorieForContentSousCategorie = function(functionToLoad, idsousCat, idCat) {
        myStorage.indexedDB.getSousCategorieByIdForContentSousCat(functionToLoad, idsousCat, idCat);
    };
    this.getMenuByIdForDetailMenu = function(method, idmenu) {
        myStorage.indexedDB.getMenuByIdForDetailMenu(method, idmenu);
    };
    this.getProduitByIdForDetailMenu = function(method, isexecute, produitid, i, produits) {
        myStorage.indexedDB.getProduitByIdForDetailMenu(method, isexecute, produitid, i, produits);
    };
    this.getAllMenuForDetailMenu = function(method) {
        myStorage.indexedDB.getAllMenuForDetailMenu(method);
    };
    this.getProduitByIdCategorieForPrintProduits = function(method, idcat) {
        myStorage.indexedDB.getProduitByIdCategorieForPrintProduits(method, idcat);
    };
    this.getIngredientById = function(method, id, param) {
        myStorage.indexedDB.getIngredientById(method, id, param);
    };
    this.getAllIngredients = function(method) {
        myStorage.indexedDB.getAllIngredients(method);
    };
    this.getProduitByIdGeneric = function(method, id, param) {
        myStorage.indexedDB.getProduitByIdGeneric(method, id, param);
    };
    this.getMenuById = function(method, id, param) {
        myStorage.indexedDB.getMenuById(method, id, param);
    };
    this.updateEntreprise = function(method, entrprise) {
        myStorage.indexedDB.updateEntreprise(method, entrprise);
    };
    this.getAllTables = function(method) {
        myStorage.indexedDB.getAllTables(method);
    };
    this.getAllModesDeReglement = function(method, param) {
        myStorage.indexedDB.getAllModesDeReglement(method, param);
    };
    this.getModeDeReglementById = function(method, id, param) {
        myStorage.indexedDB.getModeDeReglementById(method, id, param);
    };
    this.sendTicketToServeur = function(method, ticket, param) {
        myStorage.indexedDB.addTicketToBdd(method, ticket, param);
    };
    this.getAllComptes = function(method) {
        console.log("TO DO");
    };
    this.getAllParamForms = function(method) {
        console.log("TO DO");
    };
    this.getAllAttributsComptes = function(method) {
        console.log("TO DO");
    };
    this.getAllParamApps = function(method) {
        myStorage.indexedDB.getAllParametreApplication(method, null);
    };
    this.getAllPendingMethods = function(method, param) {
        myStorage.indexedDB.getAllPendingsDatas(method, param);
    };
    this.deletePendingDataById = function(method, id, param) {
        myStorage.indexedDB.deletePendingData(method, id, param);
    };
    this.getCompteById = function(method, id) {
        console.log("TO DO");
    };
    this.getAttributCompteByIdCompte = function(method, id) {
        console.log("TO DO");
    };
    this.sendPersonnePriority = function(method, personnePriority, param) {
        myStorage.indexedDB.addPendingData(method, personnePriority, config.getConfig("tablePendingDataTypeProduitPriorite"), param);
    };
    this.getAllProduitFavoriteByIdServeur = function(method, id, param) {
        console.log("TO DO");
    };
    this.getAllProduitSuggerer = function(method, param) {
        console.log("TO DO");
    };
    this.getParametreApplicationByNom = function(method, nom, param) {
        myStorage.indexedDB.getParametreApplicationByNom(method, nom, param);
    };
    this.updateProduit = function(method, produit) {
        myStorage.indexedDB.updateProduit(method, produit);
    };
    this.getReservationDisponibleWhereDateNull = function(method, param) {
        console.log("TODO");
    };
    this.getAllZoneTables = function(method, param) {
        myStorage.indexedDB.getAllZoneTables(method, param);
    };
    this.deleteProduit = function(id) {
        myStorage.indexedDB.deleteProduit(id);
    };
    this.getAllTypeCommandes = function(method, param) {
        myStorage.indexedDB.getAllTypeCommande(method, param);
    };
    this.updateTypeCommande = function(method, typeCommande) {
        myStorage.indexedDB.updateTypeCommande(method, typeCommande);
    };

    this.addAttributCompte = function(id_form, valeur_champ, defaut, id_compte) {
        myStorage.indexedDB.addPendingData(null, {
            "id_form": id_form,
            "valeur_champ": valeur_champ,
            "defaut": defaut,
            "id_compte": id_compte
        }, config.getConfig("tablePendingDataTypeAttrCompte"), null);
    };
    this.addCompte = function(method, password, id_role, param) {
        myStorage.indexedDB.addPendingData(method, {
            "password": password,
            "id_role": id_role
        }, config.getConfig("tablePendingDataTypeCompte"), param);
        var id = Math.floor((Math.random() * 1000000) + 1);
        method(id, param);
    };
    this.getAllOptions = function(methodToExecuteAfter) {
        myStorage.indexedDB.getAllOptions(methodToExecuteAfter);
    };
    this.getEtablissementById = function(method, id, param) {
        myStorage.indexedDB.getEtablissementById(method, id, param);
    };
    this.getAllTauxTva = function(method) {
        console.log("TO DO");
    };
    this.getAllEtablissements = function(method, param) {
        myStorage.indexedDB.getAllEtablissements(method, param);
    };
    this.addOption = function(method, Option, param) {
        console.log("TO DO");
    };
    this.addIngredient = function(method, ingredient, param) {
        console.log("TO DO");
    };
    this.addProduit = function(method, produit, param) {
        console.log("TO DO");
    };
    this.getAllEtablissementsWithZones = function(method, param) {
        console.log("todo");
    };
    this.getGroupeById = function(method, id, param) {
        console.log("TODO");
    };
    this.sendNewEtablissement = function(method, etablissement, param) {
        console.log("TO DO");
    };
    this.removeEtablissement = function(method, id, param) {
        console.log("TO DO");
    };
    this.updateEtablissement = function(method, etablissement, param) {
        console.log("TO DO");
    };
    this.getZonesTablesByEtablissement = function(method, id, param) {
        myStorage.indexedDB.getAllZoneTablesByIdEtablissement(method, id, param);
//        console.log("TO DO");
    };
    this.getAllLangues = function(method, param) {
        console.log("TO DO");
    };
    this.setLangEnable = function(method, id, param) {
        console.log("TO DO");
    };
    this.setLangDiable = function(method, id, param) {
        console.log("TO DO");
    };
    this.getLangByActif = function(method, param) {
        console.log("TO DO VITE");
    };
    this.addCategorie = function(method, categorie, param) {
        console.log("TO DO");
    };
    this.getAllCategories = function(method, param) {
        console.log("TO DO");
    };
    this.DeleteCategorie = function(method, id, param) {
        console.log("TO DO");
    };
    this.getPrioriteByEtablissment = function(method, id, param) {
        console.log("TO DO");
    };
    this.updatePriorityCategorie = function(method, categorie, param) {
        console.log("TO DO");
    };
    this.getByIdForUpdateCategorie = function(method, id, param) {
        console.log("TO DO");
    };
    this.updateCategorie = function(method, categorie, param) {
        console.log("TO DO");
    };
}
