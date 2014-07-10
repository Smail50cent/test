/**
 *
 * @author Damien Chesneau <contact@damienchesneau.fr>
 */
myStorage.indexedDB.addFistTypesCommandes = function() {
//    getConnexionServeur().getMajTable(config.getConfig("tableNameTypeCommande"));
    var connexion = getConnexionServeur();
    connexion.getAllTypeCommandes(addTypeCommande, {impllocal: false});
    function addTypeCommande(typesCommandes, param) {
        myStorage.indexedDB.load();
        var request = indexedDB.open(config.getConfig("indexedDBDatabaseName"));
        request.onsuccess = function(e) {
            var db = e.target.result;
            var trans = db.transaction([config.getConfig("tableNameTypeCommande")], myStorage.IDBTransactionModes.READ_WRITE);
            var store = trans.objectStore(config.getConfig("tableNameTypeCommande"));
            var request;
            var levelMax = 0;
            for (var i = 0; i < typesCommandes.length; i++) {
                if (typesCommandes[i].level > levelMax) {
                    levelMax = typesCommandes[i].level;
                }
                request = store.put(typesCommandes[i]);
            }
            trans.oncomplete = function(e) {
                updateLevelOfTable(config.getConfig("tableNameTypeCommande"), levelMax);
                entitysFinsh[config.getConfig("tableNameTypeCommande")] = false;
                db.close();
            };
            request.onerror = function(e) {
                showErrorMessage(strings.getString("label.error.indexedDB.acces.inpossible"));
            };
        };
        request.onerror = myStorage.indexedDB.onerror;
    }
};
myStorage.indexedDB.getAllTypeCommande = function(method, param) {
    window.setTimeout(function() {
        if (entitysFinsh[config.getConfig("tableNameTypeCommande")] == false) {
            impl(method);
        } else {
            myStorage.indexedDB.getAllTypeCommande(method, param);
        }
    }, delay);
    function impl(method, param) {
        myStorage.indexedDB.load();
        var request = indexedDB.open(config.getConfig("indexedDBDatabaseName"));
        request.onsuccess = function(e) {
            var db = e.target.result;
            var trans = db.transaction([config.getConfig("tableNameTypeCommande")], myStorage.IDBTransactionModes.READ_ONLY);
            var store = trans.objectStore(config.getConfig("tableNameTypeCommande"));
            var keyRange = IDBKeyRange.lowerBound(0);
            var cursorRequest = store.openCursor(keyRange);
            var typesCommandes = new Array();
            cursorRequest.onsuccess = function(e) {
                var result = e.target.result;
                if (!!result == false) {
                    return;
                }
                var typesCommande = new TypeCommande(result.value.id, result.value.label, result.value.labelMenu, result.value.isActif, result.value.idInPageHtml);
                typesCommandes.push(typesCommande);
                result.continue();
            };
            trans.oncomplete = function(e) {
                if (method != null) {//Nous avons besoin de l'executer.
                    method(typesCommandes, param);
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

myStorage.indexedDB.updateTypeCommande = function(method, typeCommande) {
    window.setTimeout(function() {
        if (entitysFinsh[config.getConfig("tableNameTypeCommande")] == false) {
            impl(method, typeCommande);
        } else {
            myStorage.indexedDB.updateTypeCommande(method, typeCommande);
        }
    }, delay);
    function impl(method, typeCommande) {
        var request = indexedDB.open(config.getConfig("indexedDBDatabaseName"));
        request.onsuccess = function(e) {
            var db = e.target.result;
            var trans = db.transaction([config.getConfig("tableNameTypeCommande")], myStorage.IDBTransactionModes.READ_WRITE);
            var store = trans.objectStore(config.getConfig("tableNameTypeCommande"));
            var openCursorReq = store.openCursor(typeCommande.id);
            openCursorReq.onsuccess = function(event) {
                var cursor = event.target.result;
                var _object;
                try {
                    
                    _object = cursor.value;
                    console.log("_object:"+_object+" typeCommande"+typeCommande);
                    _object.idInPageHtml = typeCommande.idInPageHtml;
                    _object.isActif = typeCommande.isActif;
                    _object.id = typeCommande.id;
                    _object.label = typeCommande.label;
                    _object.labelMenu = typeCommande.labelMenu;
                    var updateRequest = cursor.update(_object);
                } catch (e) {
                    myStorage.indexedDB.addTypeCommande(method, typeCommande, null);
                }
                updateRequest.onerror = updateRequest.onblocked = function() {
                    showErrorMessage(strings.getString("label.error.indexedDB.acces.inpossible"));
                };
                updateRequest.onsuccess = function(event) {
                };
                trans.oncomplete = function(e) {
                    if (method != null) {
                        method(typeCommande, null);
                    }
                    db.close();
                };
            };
        };
        request.onerror = myStorage.indexedDB.onerror;
    }
};
myStorage.indexedDB.addTypeCommande = function(method, typesCommande, param) {
    myStorage.indexedDB.load();
    var request = indexedDB.open(config.getConfig("indexedDBDatabaseName"));
    request.onsuccess = function(e) {
        var db = e.target.result;
        var trans = db.transaction([config.getConfig("tableNameTypeCommande")], myStorage.IDBTransactionModes.READ_WRITE);
        var store = trans.objectStore(config.getConfig("tableNameTypeCommande"));
        var request;
        request = store.put(typesCommande);
        trans.oncomplete = function(e) {
            entitysFinsh[config.getConfig("tableNameTypeCommande")] = false;
            if (method != null) {
                method(param);
            }
            db.close();
        };
        request.onerror = function(e) {
            showErrorMessage(strings.getString("label.error.indexedDB.acces.inpossible"));
        };
    };
    request.onerror = myStorage.indexedDB.onerror;
};