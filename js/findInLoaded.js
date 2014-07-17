var sousCategorieLoaded = new Array();
getSousCategoriesByIdCategorieInListe = function(id) {
    var souscategories = new Array();
    for (var i = 0; i < sousCategorieLoaded.length; i++) {
        if (sousCategorieLoaded[i].categorie == id) {
            souscategories.push(sousCategorieLoaded[i]);
        }
    }
    return souscategories;
};
var produitsInMenuLoaded = new Array();
getProduitInMenuLoadedById = function(id) {
    for (var i = 0; i < produitsInMenuLoaded.length; i++) {
        if (produitsInMenuLoaded[i].getId() == id) {
            return produitsInMenuLoaded[i];
        }
    }
};
var categorieLoaded = new Array();
getCategoriesLoadedById = function(id) {
    for (var i = 0; i < categories.length; i++) {
        if (categories[i].getId() == id) {
            return categories[i];
        }
    }
};