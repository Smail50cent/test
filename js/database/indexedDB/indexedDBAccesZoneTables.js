/**
 *
 * @author Damien Chesneau <contact@damienchesneau.fr>
 */
myStorage.indexedDB.addFirstZoneTables = function() {
    var connexion = getConnexionServeur();
    connexion.getAllZoneTables(addZoneTables, {impllocal: false});
    function addZoneTables(zonesTables, param) {
        myStorage.indexedDB.load();
        var request = indexedDB.open(config.getConfig("indexedDBDatabaseName"));
        request.onsuccess = function(e) {
            var db = e.target.result;
            var trans = db.transaction([config.getConfig("tableNameZoneTables")], myStorage.IDBTransactionModes.READ_WRITE);
            var store = trans.objectStore(config.getConfig("tableNameZoneTables"));
            var request;
//            var levelMax = 0;
            for (var i = 0; i < zonesTables.length; i++) {
//                if (zonesTables[i].level > levelMax) {
//                    levelMax = zonesTables[i].level;
//                }
                request = store.put(zonesTables[i]);
            }
            trans.oncomplete = function(e) {
//                updateLevelOfTable(config.getConfig("tableNameTypeCommande"), levelMax);
                entitysFinsh[config.getConfig("tableNameZoneTables")] = false;
                db.close();
            };
            request.onerror = function(e) {
                showErrorMessage(strings.getString("label.error.indexedDB.acces.inpossible"));
            };
        };
        request.onerror = myStorage.indexedDB.onerror;
    }
};
myStorage.indexedDB.getAllZoneTables = function(method, param) {
    entitysFinsh[config.getConfig("tableNameZoneTables")] = false;
    window.setTimeout(function() {
        if (entitysFinsh[config.getConfig("tableNameZoneTables")] == false) {
            impl(method, param);
        } else {
            myStorage.indexedDB.getAllZoneTables(method, param);
        }
    }, delay);
    function impl(method, param) {
        myStorage.indexedDB.load();
        var request = indexedDB.open(config.getConfig("indexedDBDatabaseName"));
        request.onsuccess = function(e) {
            var db = e.target.result;
            var trans = db.transaction([config.getConfig("tableNameZoneTables")], myStorage.IDBTransactionModes.READ_ONLY);
            var store = trans.objectStore(config.getConfig("tableNameZoneTables"));
            var keyRange = IDBKeyRange.lowerBound(0);
            var cursorRequest = store.openCursor(keyRange);
            var zonesTables = new Array();
            cursorRequest.onsuccess = function(e) {
                var result = e.target.result;
                if (!!result == false) {
                    return;
                }
                zonesTables.push(result.value);
                result.continue();
            };
            trans.oncomplete = function(e) {
                if (method != null) {//Nous avons besoin de l'executer.
                    method(zonesTables, param);
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
myStorage.indexedDB.getAllZoneTablesByIdEtablissement = function(method, id, param) {
    entitysFinsh[config.getConfig("tableNameZoneTables")] = false;
    window.setTimeout(function() {
        if (entitysFinsh[config.getConfig("tableNameZoneTables")] == false) {
            impl(method, param);
        } else {
            myStorage.indexedDB.getAllZoneTablesByIdEtablissement(method,id, param);
        }
    }, delay);
    function impl(method, param) {
        myStorage.indexedDB.load();
        var request = indexedDB.open(config.getConfig("indexedDBDatabaseName"));
        request.onsuccess = function(e) {
            var db = e.target.result;
            var trans = db.transaction([config.getConfig("tableNameZoneTables")], myStorage.IDBTransactionModes.READ_ONLY);
            var store = trans.objectStore(config.getConfig("tableNameZoneTables"));
            var keyRange = IDBKeyRange.lowerBound(0);
            var cursorRequest = store.openCursor(keyRange);
            var zonesTables = new Array();
            cursorRequest.onsuccess = function(e) {
                var result = e.target.result;
                if (!!result == false) {
                    return;
                }
//                if()Filtrer resultats
                zonesTables.push(result.value);
                result.continue();
            };
            trans.oncomplete = function(e) {
                if (method != null) {//Nous avons besoin de l'executer.
                    method(zonesTables, param);
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