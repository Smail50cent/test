myStorage.indexedDB.getIngredientById = function(method, id, param) {
    window.setTimeout(function() {
        if (entitysFinsh[config.getConfig("tableNameIngredient")] == false) {
            impl(method, id, param);
        } else {
            myStorage.indexedDB.getSousCategorieByIdForContentSousCat(method, id, param);
        }
    }, delay);
    function impl(method, id, param) {
        myStorage.indexedDB.load();
        var request = indexedDB.open(config.getConfig("indexedDBDatabaseName"));
        request.onsuccess = function(e) {
            var db = e.target.result;
            var trans = db.transaction([config.getConfig("tableNameIngredient")],
            myStorage.IDBTransactionModes.READ_ONLY);
            var store = trans.objectStore(config.getConfig("tableNameIngredient"));
            var request = store.get(id);
            request.onsuccess = function(e) {
                var result = e.target.result;
                var ingredient = new Ingredient();
                ingredient.setNom(result.nom);
                ingredient.setId(result.id);
                if (method != null) {
                    method(ingredient, param);
                }
            };
            trans.oncomplete = function(e) {
                db.close();
            };

            request.onerror = function(e) {
                showErrorMessage(strings.getString("label.error.indexedDB.acces.inpossible"));
            };
        };
        request.onerror = myStorage.indexedDB.onerror;
    }
};

myStorage.indexedDB.getAllIngredients = function(methodToExecuteAfter) {
    window.setTimeout(function() {
        if (entitysFinsh[config.getConfig("tableNameIngredient")] == false) {
            impl();
        } else {
            myStorage.indexedDB.getAllIngredients(methodToExecuteAfter);
        }
    }, delay);
    function impl() {
        myStorage.indexedDB.load();
        var request = indexedDB.open(config.getConfig("indexedDBDatabaseName"));
        request.onsuccess = function(e) {
            var db = e.target.result;
            var trans = db.transaction([config.getConfig("tableNameIngredient")], myStorage.IDBTransactionModes.READ_WRITE);
            var store = trans.objectStore(config.getConfig("tableNameIngredient"));
            var keyRange = IDBKeyRange.lowerBound(0);
            var cursorRequest = store.openCursor(keyRange);
            var ingredients = new Array();
            cursorRequest.onsuccess = function(e) {
                var ingredient = new Ingredient();
                var result = e.target.result;
                if (!!result == false) {
                    return;
                }
                ingredient.setId(result.value.id);
                ingredient.setNom(result.value.nom);
                ingredients.push(ingredient);
                result.continue();
            };

            trans.oncomplete = function(e) {
                if (methodToExecuteAfter != null) {
                    methodToExecuteAfter(ingredients);
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