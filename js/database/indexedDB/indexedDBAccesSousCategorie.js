/**
 *
 * @author Damien Chesneau <contact@damienchesneau.fr>
 */
myStorage.indexedDB.getSousCategorieById = function(id, methodToExecuteAfter) {
    window.setTimeout(function() {
        if (entitysFinsh[config.getConfig("tableNameSousCategorie")] == false) {
            impl();
        } else {
            myStorage.indexedDB.getSousCategorieById(id, methodToExecuteAfter);
        }
    }, delay);
    function impl() {
        myStorage.indexedDB.load();
        var request = indexedDB.open(config.getConfig("indexedDBDatabaseName"));
        request.onsuccess = function(e) {
            var db = e.target.result;
            var trans = db.transaction([config.getConfig("tableNameSousCategorie")], myStorage.IDBTransactionModes.READ_ONLY);
            var store = trans.objectStore(config.getConfig("tableNameSousCategorie"));
            var request = store.get(id);
            request.onsuccess = function(e) {
                var result = e.target.result;
                var sousCategorie = new SousCategorie();
                sousCategorie.setCategorie(result.categorie);
                sousCategorie.setNom(result.nom);
                sousCategorie.setPriorite(result.priorite);
                sousCategorie.setId(result.id);
                if (methodToExecuteAfter != null) {//Nous avons besoin de l'executer.
                    methodToExecuteAfter(e);
                }
            };

            trans.oncomplete = function(e) {
                db.close();
            };

            request.onerror = function(e) {
                showErrorMessage("Error Getting: ", e);
            };
        };
        request.onerror = myStorage.indexedDB.onerror;
    }
};
myStorage.indexedDB.getSousCategorieByIdForContentSousCat = function(methodToExecuteAfter, id, idCat) {
    window.setTimeout(function() {
        if (entitysFinsh[config.getConfig("tableNameSousCategorie")] == false) {
            impl();
        } else {
            myStorage.indexedDB.getSousCategorieByIdForContentSousCat(methodToExecuteAfter, id);
        }
    }, delay);
    function impl() {
        myStorage.indexedDB.load();
        var request = indexedDB.open(config.getConfig("indexedDBDatabaseName"));
        request.onsuccess = function(e) {
            var db = e.target.result;
            var trans = db.transaction([config.getConfig("tableNameSousCategorie")], myStorage.IDBTransactionModes.READ_ONLY);
            var store = trans.objectStore(config.getConfig("tableNameSousCategorie"));
            var request = store.get(id);
            request.onsuccess = function(e) {
                var result = e.target.result;
                var sousCategorie = new SousCategorie();
                sousCategorie.setCategorie(result.categorie);
                sousCategorie.setNom(result.nom);
                sousCategorie.setPriorite(result.priorite);
                sousCategorie.setId(result.id);

                if (methodToExecuteAfter != null) { //Nous avons besoin de l'executer.
                    methodToExecuteAfter(sousCategorie, idCat);
                }
            };

            trans.oncomplete = function(e) {
                db.close();
            };

            request.onerror = function(e) {
                showErrorMessage("Error Getting: ", e);
            };
        };
        request.onerror = myStorage.indexedDB.onerror;
    }
};
myStorage.indexedDB.getAllCategories = function(methodToExecuteAfter) {
    window.setTimeout(function() {
        if (entitysFinsh[config.getConfig("tableNameCategorie")] == false) {
            impl();
        } else {
            myStorage.indexedDB.getAllCategories(methodToExecuteAfter);
        }
    }, delay);
    function impl() {
        myStorage.indexedDB.load();
        var request = indexedDB.open(config.getConfig("indexedDBDatabaseName"));
        request.onsuccess = function(e) {
            var db = e.target.result;
            var trans = db.transaction([config.getConfig("tableNameCategorie")], myStorage.IDBTransactionModes.READ_WRITE);
            var store = trans.objectStore(config.getConfig("tableNameCategorie"));
            var keyRange = IDBKeyRange.lowerBound(0);
            var cursorRequest = store.openCursor(keyRange);
            var categories = new Array();
            cursorRequest.onsuccess = function(e) {
                var categorie = new Categorie();
                var result = e.target.result;
                if (!!result == false) {
                    return;
                }
                categorie.setId(result.value.id);
                categorie.setNom(result.value.nom);
                categorie.setPriorite(result.value.priorite);
                categorie.setSousCategorie(result.value.souscategorie);
                categories.push(categorie);
                result.continue();
            };

            trans.oncomplete = function(e) {
                if (methodToExecuteAfter != null) {
                    methodToExecuteAfter(categories);
                } else {
                    showErrorMessage("No method in arguments.");
                }
                db.close();
            };
            cursorRequest.onerror = myStorage.indexedDB.onerror;
        };
        request.onerror = myStorage.indexedDB.onerror;
    }
};