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
                sousCategorie.setTauxTva(result.taux_tva);
                sousCategorie.setId(result.id);
                if (methodToExecuteAfter != null) {//Nous avons besoin de l'executer.
                    methodToExecuteAfter(sousCategorie);
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
            var idetablissement = parseInt(getLocalStorageValue("client.application.etablissement.id"));
            var idzone = JSON.parse(getLocalStorageValue("paramCommande.numTable")).zone;
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
                var etablissementOk = false;
                for (var i = 0; i < result.value.etablissements.length; i++) {
                    if (result.value.etablissements[i] == idetablissement) {
                        etablissementOk = true;
                        break;
                    }
                }
                var zoneOk = false;
                if (result.value.zones.length == 0) {
                    zoneOk = true;
                } else {
                    for (var i = 0; i < result.value.zones.length; i++) {
                        if (result.value.zones[i] == idzone) {
                            zoneOk = true;
                            break;
                        }
                    }
                }
                if (etablissementOk && zoneOk) {
                    categorie.setId(result.value.id);
                    categorie.setNom(result.value.nom);
                    categorie.setPriorite(result.value.priorite);
                    categorie.setSousCategorie(result.value.souscategorie);
                    categories.push(categorie);
                }
                result.continue();
            }
            ;

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
}
;

myStorage.indexedDB.getAllSousCategories = function(methodToExecuteAfter) {
    window.setTimeout(function() {
        if (entitysFinsh[config.getConfig("tableNameSousCategorie")] == false) {
            impl();
        } else {
            myStorage.indexedDB.getAllSousCategories(methodToExecuteAfter);
        }
    }, delay);
    function impl() {
        myStorage.indexedDB.load();
        var request = indexedDB.open(config.getConfig("indexedDBDatabaseName"));
        request.onsuccess = function(e) {
            var db = e.target.result;
            var trans = db.transaction([config.getConfig("tableNameSousCategorie")], myStorage.IDBTransactionModes.READ_WRITE);
            var store = trans.objectStore(config.getConfig("tableNameSousCategorie"));
            var keyRange = IDBKeyRange.lowerBound(0);
            var cursorRequest = store.openCursor(keyRange);
            var souscategories = new Array();
            cursorRequest.onsuccess = function(e) {
                var souscategorie = new SousCategorie();
                var result = e.target.result;
                if (!!result == false) {
                    return;
                }
                souscategorie.setId(result.value.id);
                souscategorie.setNom(result.value.nom);
                souscategorie.setPriorite(result.value.priorite);
                souscategorie.setCategorie(result.value.categorie);
                souscategorie.setTauxTva(result.value.taux_tva);
                souscategories.push(souscategorie);
                result.continue();
            };

            trans.oncomplete = function(e) {
                if (methodToExecuteAfter != null) {
                    methodToExecuteAfter(souscategories);
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

myStorage.indexedDB.getSousCategorieByIdCat = function(methodToExecuteAfter, idCat) {
    window.setTimeout(function() {
        if (entitysFinsh[config.getConfig("tableNameSousCategorie")] == false) {
            impl();
        } else {
            myStorage.indexedDB.getSousCategorieByIdCat(methodToExecuteAfter, idCat);
        }
    }, delay);
    function impl() {
        myStorage.indexedDB.load();
        var request = indexedDB.open(config.getConfig("indexedDBDatabaseName"));
        request.onsuccess = function(e) {
            var db = e.target.result;
            var trans = db.transaction([config.getConfig("tableNameSousCategorie")], myStorage.IDBTransactionModes.READ_ONLY);
            var store = trans.objectStore(config.getConfig("tableNameSousCategorie"));
            var request = store.index("categorie").get(idCat);
            var souscategories = new Array();
            request.onsuccess = function(e) {
                var souscategorie = new SousCategorie();
                var result = e.target.result;
                if (!!result == false) {
                    return;
                }
                souscategorie.setId(result.value.id);
                souscategorie.setNom(result.value.nom);
                souscategorie.setPriorite(result.value.priorite);
                souscategorie.setCategorie(result.value.categorie);
                souscategorie.setTauxTva(result.value.taux_tva);
                souscategories.push(souscategorie);
                result.continue();

                if (methodToExecuteAfter != null) { //Nous avons besoin de l'executer.
                    methodToExecuteAfter(souscategories);
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