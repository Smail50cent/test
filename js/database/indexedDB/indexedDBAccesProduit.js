myStorage.indexedDB.getProduitByIdForDetailMenu = function(method, isexecute, produitid, i, produits) {
    window.setTimeout(function() {
        if (entitysFinsh[config.getConfig("tableNameProduit")] == false) {
            impl(method, isexecute, produitid, i, produits);
        } else {
            myStorage.indexedDB.getProduitByIdForDetailMenu(method, isexecute, produitid, i, produits);
        }
    }, delay);
    function impl(method, isexecute, produitid, i, produits) {
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
                produit.setTauxTva(result.tauxTva);
                var categorie = new Categorie();
                categorie.setNom(result.categorie.nom);
                categorie.setId(result.categorie.id);
                categorie.setPriorite(result.categorie.priorite);
                categorie.setSousCategorie(result.categorie.souscategorie);
                produit.setCategorie(categorie);
                produit.setIdsIngredients(result.ingredients);
                produit.setOptions(result.options);
                produit.setAssociationPrixProduit(result.associationPrixProduit);
                produits[i] = produit;
                produitsInMenuLoaded.push(produit);
                curentReq++;
                if (method != null) {//Nous avons besoin de l'executer.
                    if (curentReq == produits.length) {
                        method(produits);
                    }
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
myStorage.indexedDB.getProduitByIdCategorieForPrintProduits = function(method, idcat) {
    window.setTimeout(function() {
        if (entitysFinsh[config.getConfig("tableNameProduit")] == false) {
            impl(method, idcat);
        } else {
            myStorage.indexedDB.getProduitByIdCategorieForPrintProduits(method, idcat);
        }
    }, delay);
    function impl(method, idcat) {
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
                    produit.setTauxTva(result.value.tauxTva);
                    var categorie = new Categorie();
                    categorie.setNom(result.value.categorie.nom);
                    categorie.setId(result.value.categorie.id);
                    categorie.setPriorite(parseInt(result.value.categorie.priorite));
                    produit.setCategorie(categorie);
                    produit.setAssociationPrixProduit(result.value.associationPrixProduit);
                    produit.setSousCategorie(result.value.souscategorie);
                    produit.setIdsIngredients(result.value.ingredients);
                    produit.setOptions(result.value.options);
                    produitsByCategorie.push(produit);
                    result.continue();
                }
            };
            trans.oncomplete = function(e) {
                if (method != null) {//Nous avons besoin de l'executer.
//                    if (produitsByCategorie.length != 0) {
                    method(produitsByCategorie);
//                    }
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
myStorage.indexedDB.getProduitByIdGeneric = function(method, produitID, param) {
    window.setTimeout(function() {
        if (entitysFinsh[config.getConfig("tableNameProduit")] == false) {
            impl(method, produitID, param);
        } else {
            myStorage.indexedDB.getProduitByIdGeneric(method, produitID, param);
        }
    }, delay);
    function impl(method, produitID, param) {
        myStorage.indexedDB.load();
        var request = indexedDB.open(config.getConfig("indexedDBDatabaseName"));
        request.onsuccess = function(e) {
            var db = e.target.result;
            var trans = db.transaction([config.getConfig("tableNameProduit")],
                    myStorage.IDBTransactionModes.READ_ONLY);
            var store = trans.objectStore(config.getConfig("tableNameProduit"));
            var request = store.get(produitID);
            request.onsuccess = function(e) {
                var result = e.target.result;
                var produit = new Produit();
                produit.setNom(result.nom);
                produit.setTauxTva(result.tauxTva);
                produit.setId(result.id);
                var categorie = new Categorie();
                categorie.setNom(result.categorie.nom);
                categorie.setId(result.categorie.id);
                categorie.setPriorite(result.categorie.priorite);
                categorie.setSousCategorie(result.categorie.souscategorie);
                produit.setCategorie(categorie);
                produit.setSousCategorie(result.categorie);
                produit.setOptions(result.options);
                produit.setAssociationPrixProduit(result.associationPrixProduit);
                //console.log(result);
                produit.setIdsIngredients(result.ingredients);
                if (method != null) {
                    method(produit, param);
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
myStorage.indexedDB.updateProduit = function(method, newProduit) {
    window.setTimeout(function() {
        if (entitysFinsh[config.getConfig("tableNameProduit")] == false) {
            impl(method, newProduit);
        } else {
            myStorage.indexedDB.updateProduit(method, newProduit);
        }
    }, delay);
    function impl(method, newProduit) {
        var request = indexedDB.open(config.getConfig("indexedDBDatabaseName"));
        request.onsuccess = function(e) {
            var db = e.target.result;
            var trans = db.transaction([config.getConfig("tableNameProduit")], myStorage.IDBTransactionModes.READ_WRITE);
            var store = trans.objectStore(config.getConfig("tableNameProduit"));
            var openCursorReq = store.openCursor(newProduit.id);
            openCursorReq.onsuccess = function(event) {
                var cursor = event.target.result;
                var _object;
                try {
                    _object = cursor.value;
                    _object.nom = newProduit.nom;
                    _object.tauxTva = newProduit.tauxTva;
                    _object.id = newProduit.id;
                    _object.categorie.nom = newProduit.categorie.nom;
                    _object.categorie.id = newProduit.categorie.id;
                    _object.categorie.priorite = newProduit.categorie.priorite;
                    _object.categorie.souscategorie = newProduit.categorie.souscategorie;
                    _object.options = newProduit.options;
                    _object.associationPrixProduit = newProduit.associationPrixProduit;
                    _object.ingredients = newProduit.ingredients;
                    var updateRequest = cursor.update(_object);
                } catch (e) {
                    myStorage.indexedDB.addProduit(method, newProduit, null);
                }
                updateRequest.onerror = updateRequest.onblocked = function() {
                    showErrorMessage(strings.getString("label.error.indexedDB.acces.inpossible"));
                };
                updateRequest.onsuccess = function(event) {
                };
                trans.oncomplete = function(e) {
                    if (method != null) {
                        method(newProduit, null);
                    }
                    db.close();
                };
            };
        };
        request.onerror = myStorage.indexedDB.onerror;
    }
};
myStorage.indexedDB.countProduits = function(method, param) {
    impl(method, param);
    function impl(method, param) {
        myStorage.indexedDB.load();
        var request = indexedDB.open(config.getConfig("indexedDBDatabaseName"));
        request.onsuccess = function(e) {
            var db = e.target.result;
            var trans = db.transaction([config.getConfig("tableNameProduit")], myStorage.IDBTransactionModes.READ_ONLY);
            var store = trans.objectStore(config.getConfig("tableNameProduit"));
            var keyRange = IDBKeyRange.lowerBound(0);
            var cursorRequest = store.openCursor(keyRange);
            var count = 0;
            cursorRequest.onsuccess = function(e) {
                var result = e.target.result;
                result ? ++count && result.continue() : console.log(count);
            };
            trans.oncomplete = function(e) {
                if (method != null) {//Nous avons besoin de l'executer.
                    function Param(count) {
                        this.count = count;
                    }
                    method(new Param(count));
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
myStorage.indexedDB.deleteProduit = function(id) {
    myStorage.indexedDB.load();
    var request = indexedDB.open(config.getConfig("indexedDBDatabaseName"),3);
    request.onsuccess = function(e) {
        console.log("succes ",id);
        var db = e.target.result;
        var trans = db.transaction([config.getConfig("tableNameProduit")], myStorage.IDBTransactionModes.READ_WRITE);
        var store = trans.objectStore(config.getConfig("tableNameProduit"));
        var request = store.delete(parseInt(id));
       
        trans.oncomplete = function(e) {
            db.close();
        };
        request.onerror = function(e) {
            console.log(e);
            //<showErrorMessage(strings.getString("label.error.indexedDB.acces.inpossible"));
        };
    };
//    request.onerror = myStorage.indexedDB.onerror;
};
myStorage.indexedDB.addProduit = function(method, produit, param) {
    myStorage.indexedDB.load();
    var request = indexedDB.open(config.getConfig("indexedDBDatabaseName"));
    request.onsuccess = function(e) {
        var db = e.target.result;
        var trans = db.transaction([config.getConfig("tableNameProduit")], myStorage.IDBTransactionModes.READ_WRITE);
        var store = trans.objectStore(config.getConfig("tableNameProduit"));
        var request;
        request = store.put({
            "id": parseInt(produit.id),
            "nom": produit.nom,
            "categorie": (produit.categorie),
            "souscategorie": (produit.souscategorie),
            "options": produit.options,
            "ingredients": produit.ingredients,
            "associationPrixProduit": produit.associationPrixProduit,
            "tauxTva": produit.tauxTva,
            "level": produit.level
        });
        trans.oncomplete = function(e) {
            db.close();
            if (method != null) {
                method(param);
            }
            entitysFinsh[config.getConfig("tableNameProduit")] = false;
        };
        request.onerror = function(e) {
            showErrorMessage(strings.getString("label.error.indexedDB.acces.inpossible"));
        };
    };
    request.onerror = myStorage.indexedDB.onerror;
}
