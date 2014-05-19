myStorage.indexedDB.getProduitByIdForDetailMenu = function(method, isexecute, produitid, i, produits) {
    window.setTimeout(function() {
        if (entitysFinsh[config.getConfig("tableNameProduit")] == false) {
            impl();
        } else {
            myStorage.indexedDB.getProduitByIdForDetailMenu(methodToExecuteAfter);
        }
    }, delay);
    function impl() {
        myStorage.indexedDB.load();
        var request = indexedDB.open(config.getConfig("indexedDBDatabaseName"));
        request.onsuccess = function(e) {
            var db = e.target.result;
            var trans = db.transaction([config.getConfig("tableNameProduit")], myStorage.IDBTransactionModes.READ_ONLY);
            var store = trans.objectStore(config.getConfig("tableNameProduit"));
            var request = store.get(produitid);
            request.onsuccess = function(e) {
                var result = e.target.result;
                var produit = new Produit();
                produit.setNom(result.nom);
                produit.setId(result.id);
                produit.setPrix(result.prix);
                var categorie = new Categorie();
                categorie.setNom(result.categorie.nom);
                categorie.setId(result.categorie.id);
                categorie.setPriorite(result.categorie.priorite);
                categorie.setSousCategorie(result.categorie.souscategorie);
                produit.setCategorie(categorie);
                produit.setSousCategorie(result.categorie);
                produit.setIdsIngredients(result.ingredients);
                produit.setOptions(result.options);
                produits[i] = produit;
                produitsInMenuLoaded.push(produit);
                if (method != null && isexecute == true) {//Nous avons besoin de l'executer.
                    method(produits);
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
myStorage.indexedDB.getProduitByIdCategorieForPrintProduits = function(method,idcat) {
    window.setTimeout(function() {
        if (entitysFinsh[config.getConfig("tableNameProduit")] == false) {
            impl(method,idcat);
        } else {
            myStorage.indexedDB.getProduitByIdCategorieForPrintProduits(method,idcat);
        }
    }, delay);
    function impl(method,idcat) {
        myStorage.indexedDB.load();
        var request = indexedDB.open(config.getConfig("indexedDBDatabaseName"));
        request.onsuccess = function(e) {
            var db = e.target.result;
            var trans = db.transaction([config.getConfig("tableNameProduit")], myStorage.IDBTransactionModes.READ_ONLY);
            var store = trans.objectStore(config.getConfig("tableNameProduit"));
            var produitsByCategorie = new Array();
            var arr = new Array();
            arr.push(idcat);
            var request = trans.objectStore(config.getConfig("tableNameProduit")).index("categorie").openCursor(IDBKeyRange.only(arr, "prev"));
            request.onsuccess = function(e) {
                var result = e.target.result;
                if (result != null) {
                    var produit = new Produit();
                    
                    produit.setNom(result.value.nom);
                    produit.setId(result.value.id);
                    produit.setPrix(parseFloat(result.value.prix));
                    var categorie = new Categorie();
                    categorie.setNom(result.value.categorie.nom);
                    categorie.setId(result.value.categorie.id);
                    categorie.setPriorite(parseInt(result.value.categorie.priorite));
                    console.log("bdd");
                    console.log(result.value);
                    categorie.setSousCategorie(result.value.categorie.souscategorie);
                    produit.setCategorie(categorie);
                    produit.setSousCategorie(result.value.souscategorie);
                    produit.setIdsIngredients(result.value.ingredients);
                    produit.setOptions(result.value.options);
                    produitsByCategorie.push(produit);
                    
                    result.continue();
                }
            };
            trans.oncomplete = function(e) {
                if (method != null) {//Nous avons besoin de l'executer.
                    
                    method(produitsByCategorie);
                }
                db.close();
            };

            request.onerror = function(e) {
                showErrorMessage(strings.getString("label.error.indexedDB.acces.inpossible"));
            };
        };
        request.onerror = myStorage.indexedDB.onerror;
    }
};
myStorage.indexedDB.getProduitByIdGeneric = function(method,produitID,param) {
    window.setTimeout(function() {
        if (entitysFinsh[config.getConfig("tableNameProduit")] == false) {
            impl();
        } else {
            myStorage.indexedDB.getProduitByIdGeneric(method,produitID,param);
        }
    }, delay);
    function impl() {
        myStorage.indexedDB.load();
        var request = indexedDB.open(config.getConfig("indexedDBDatabaseName"));
        request.onsuccess = function(e) {
            var db = e.target.result;
            var trans = db.transaction([config.getConfig("tableNameProduit")], myStorage.IDBTransactionModes.READ_ONLY);
            var store = trans.objectStore(config.getConfig("tableNameProduit"));
            var request = store.get(produitID);
            request.onsuccess = function(e) {
                var result = e.target.result;
                var produit = new Produit();
                produit.setNom(result.nom);
                produit.setId(result.id);
                produit.setPrix(parseFloat(result.prix));
                var categorie = new Categorie();
                categorie.setNom(result.categorie.nom);
                categorie.setId(result.categorie.id);
                categorie.setPriorite(result.categorie.priorite);
                categorie.setSousCategorie(result.categorie.souscategorie);
                produit.setCategorie(categorie);
                produit.setSousCategorie(result.categorie);
                produit.setOptions(result.options);
                produit.setIdsIngredients(result.ingredients);
                if (method != null ) {//Nous avons besoin de l'executer.
                    method(produit,param);
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