/**
 *
 * @author Damien Chesneau <contact@damienchesneau.fr>
 */
myStorage.indexedDB.addFirstParametreApplication = function() {
    var connexion = getConnexionServeur();
    connexion.getAllParamApps(addParamApplication, {impllocal: false});
    function addParamApplication(paramApplication, param) {
        for (var i = 0; i < paramApplication.length; i++) {
            addParamApplication2(paramApplication[i]);
        }
    }
    function addParamApplication2(paramApp) {
        myStorage.indexedDB.load();
        var request = indexedDB.open(config.getConfig("indexedDBDatabaseName"), parseInt(config.getConfig("indexedDB.database.version")));
        request.onsuccess = function(e) {
            var db = e.target.result;
            var trans = db.transaction([config.getConfig("tableNameParamApplication")], myStorage.IDBTransactionModes.READ_WRITE);
            var store = trans.objectStore(config.getConfig("tableNameParamApplication"));
            var request;
            request = store.put({
                "id": parseInt(paramApp.id),
                "nom_parametre": paramApp.nom_parametre,
                "valeur_parametre": (paramApp.valeur_parametre),
                "etablissement": paramApp.etablissement
            });
            trans.oncomplete = function(e) {
                entitysFinsh[config.getConfig("tableNameParamApplication")] = false;
                db.close();
            };
            request.onerror = function(e) {
                showErrorMessage(strings.getString("label.error.indexedDB.acces.inpossible"));
            };
        };
        request.onerror = myStorage.indexedDB.onerror;
    }
};
myStorage.indexedDB.getParametreApplicationByNom = function(method, nom, param) {
    window.setTimeout(function() {
        if (entitysFinsh[config.getConfig("tableNameParamApplication")] == false) {
            impl(method, nom, param);
        } else {
            myStorage.indexedDB.getParametreApplicationByNom(method, nom, param);
        }
    }, delay);
    function impl(method, nom, param) {
        myStorage.indexedDB.load();
        var request = indexedDB.open(config.getConfig("indexedDBDatabaseName"), parseInt(config.getConfig("indexedDB.database.version")));
        request.onsuccess = function(e) {
            var db = e.target.result;
            var trans = db.transaction([config.getConfig("tableNameParamApplication")], myStorage.IDBTransactionModes.READ_ONLY);
            var store = trans.objectStore(config.getConfig("tableNameParamApplication"));
            var keyRange = IDBKeyRange.lowerBound(0);
            var cursorRequest = store.openCursor(keyRange);
            var parametreApplication = new Array();
            cursorRequest.onsuccess = function(e) {
                var result = e.target.result;
                if (!!result == false) {
                    return;
                }
                if (nom == result.value.nom_parametre) {
                    var myparametreApplication = new ParametreApplication();
                    myparametreApplication.setId(result.value.id);
                    myparametreApplication.setNomParametre(result.value.nom_parametre);
                    myparametreApplication.setEtablissement(result.value.etablissement);
                    myparametreApplication.setValeurParametre(result.value.valeur_parametre);
                    parametreApplication.push(myparametreApplication);
                }
                result.continue();
            };
            trans.oncomplete = function(e) {
                var idetablissement = parseInt(getLocalStorageValue("client.application.etablissement.id"));
                var paramToSend = null;
                for (var i = 0; i < parametreApplication.length; i++) {
                    if (parametreApplication[i].getEtablissement() == idetablissement|| i == parametreApplication.length) {
                        paramToSend = parametreApplication[i];
                    }
                }
                if (method != null) {//Nous avons besoin de l'executer.
                    method(paramToSend, param);
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

myStorage.indexedDB.getAllParametreApplication = function(method, param) {
    entitysFinsh[config.getConfig("tableNameZoneTables")] = false;
    window.setTimeout(function() {
        if (entitysFinsh[config.getConfig("tableNameZoneTables")] == false) {
            impl(method, param);
        } else {
            myStorage.indexedDB.getAllParametreApplication(method, param);
        }
    }, delay);
    function impl(method, param) {
        var idetablissement = parseInt(getLocalStorageValue("client.application.etablissement.id"));
        myStorage.indexedDB.load();
        var request = indexedDB.open(config.getConfig("indexedDBDatabaseName"), parseInt(config.getConfig("indexedDB.database.version")));
        request.onsuccess = function(e) {
            var db = e.target.result;
            var trans = db.transaction([config.getConfig("tableNameParamApplication")], myStorage.IDBTransactionModes.READ_ONLY);
            var store = trans.objectStore(config.getConfig("tableNameParamApplication"));
            var keyRange = IDBKeyRange.lowerBound(0);
            var cursorRequest = store.openCursor(keyRange);
            var parametreApplication = new Array();
            cursorRequest.onsuccess = function(e) {
                var result = e.target.result;
                if (!!result == false) {
                    return;
                }
                if (idetablissement == parseInt(result.etablissement) || result.etablissement == null) {
                    var myparametreApplication = new ParametreApplication();
                    myparametreApplication.setId(result.value.id);
                    myparametreApplication.setNomParametre(result.value.nom_parametre);
                    myparametreApplication.setEtablissement(parseInt(result.etablissement));
                    myparametreApplication.setValeurParametre(parseInt(result.value.valeur_parametre));
                    parametreApplication.push(myparametreApplication);
                }
                result.continue();
            };
            trans.oncomplete = function(e) {
                if (method != null) {//Nous avons besoin de l'executer.
                    method(parametreApplication, param);
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