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
        console.log("TO DO");
    };
    this.getAllPendingMethods = function(method, param) {
        myStorage.indexedDB.getAllPendingsDatas(method, param);
    };
    this.deletePendingDataById = function(method, id, param) {
        myStorage.indexedDB.deletePendingData(method, id, param);
    };

}
