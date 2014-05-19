/**
 *
 * @author Damien Chesneau <contact@damienchesneau.fr>
 */

myStorage.indexedDB.addFistModesDeReglement = function() {
    $.ajax({
        url: getServicePath("serveur.clientaccess.serviceGetAllModesDeReglement"),
        type: 'GET',
        dataType: 'json',
        async: true,
        success: function(data, textStatus, xhr) {
            for (var i = 0; i < data.length; i++) {
                addModeDeReglement(data[i]);
            }
        },
        error: function(xhr, textStatus, errorThrown) {
            showErrorMessage(strings.getString("label.error.connexion.serveur"));
        }
    });
    function addModeDeReglement(modeDeReglement) {
        myStorage.indexedDB.load();
        var request = indexedDB.open(config.getConfig("indexedDBDatabaseName"));
        request.onsuccess = function(e) {
            var db = e.target.result;
            var trans = db.transaction([config.getConfig("tableNameModeDeReglement")], myStorage.IDBTransactionModes.READ_WRITE);
            var store = trans.objectStore(config.getConfig("tableNameModeDeReglement"));
            var request;
            request = store.put({"id": parseInt(modeDeReglement.id), "nom": modeDeReglement.nom, "url": modeDeReglement.url, "redirictUrl": modeDeReglement.redirictUrl});
            trans.oncomplete = function(e) {
                entitysFinsh[config.getConfig("tableNameModeDeReglement")] = false;
                db.close();
            };
            request.onerror = function(e) {
                showErrorMessage(strings.getString("label.error.indexedDB.acces.inpossible"));
            };
        };
        request.onerror = myStorage.indexedDB.onerror;
    }
};

myStorage.indexedDB.getAllModesDeReglement = function(method, param) {
    window.setTimeout(function() {
        if (entitysFinsh[config.getConfig("tableNameModeDeReglement")] == false) {
            impl(method, param);
        } else {
            myStorage.indexedDB.getAllModesDeReglement(method, param);
        }
    }, delay);
    function impl() {
        myStorage.indexedDB.load();
        var request = indexedDB.open(config.getConfig("indexedDBDatabaseName"));
        request.onsuccess = function(e) {
            var db = e.target.result;
            var trans = db.transaction([config.getConfig("tableNameModeDeReglement")], myStorage.IDBTransactionModes.READ_ONLY);
            var store = trans.objectStore(config.getConfig("tableNameModeDeReglement"));
            var keyRange = IDBKeyRange.lowerBound(0);
            var cursorRequest = store.openCursor(keyRange);
            var modesDeReglements = new Array();
            cursorRequest.onsuccess = function(e) {
                var result = e.target.result;
                if (!!result == false) {
                    return;
                }
                var modesDeReglement = new ModeDeReglements();
                modesDeReglement.setNom(result.value.nom);
                modesDeReglement.setId(result.value.id);
                modesDeReglement.setUrl((result.value.url));
                modesDeReglement.setRedirictUrl(result.value.redirictUrl);
                modesDeReglements.push(modesDeReglement);
                result.continue();
            };
            trans.oncomplete = function(e) {
                if (methodToExecuteAfter != null) {//Nous avons besoin de l'executer.
                    methodToExecuteAfter(modesDeReglements, param);
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

myStorage.indexedDB.getModeDeReglementById = function(method, id, param) {
    window.setTimeout(function() {
        if (entitysFinsh[config.getConfig("tableNameModeDeReglement")] == false) {
            impl(method, id, param);
        } else {
            myStorage.indexedDB.getAllModesDeReglement(method, id, param);
        }
    }, delay);
    function impl(method, id, param) {
        myStorage.indexedDB.load();
        var request = indexedDB.open(config.getConfig("indexedDBDatabaseName"));
        request.onsuccess = function(e) {
            var db = e.target.result;
            var trans = db.transaction([config.getConfig("tableNameModeDeReglement")], myStorage.IDBTransactionModes.READ_ONLY);
            var store = trans.objectStore(config.getConfig("tableNameModeDeReglement"));
            var request = store.get(id);
            request.onsuccess = function(e) {
                var result = e.target.result;
                var modesDeReglement = new ModeDeReglements();
                modesDeReglement.setNom(result.nom);
                modesDeReglement.setId(result.id);
                modesDeReglement.setUrl((result.url));
                modesDeReglement.setRedirictUrl(result.redirictUrl);
                if (method != null) {//Nous avons besoin de l'executer.
                    method(param);
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
