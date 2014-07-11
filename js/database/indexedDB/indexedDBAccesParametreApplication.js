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
        var request = indexedDB.open(config.getConfig("indexedDBDatabaseName"));
        request.onsuccess = function(e) {
            var db = e.target.result;
            var trans = db.transaction([config.getConfig("tableNameParamApplication")], myStorage.IDBTransactionModes.READ_WRITE);
            var store = trans.objectStore(config.getConfig("tableNameParamApplication"));
            var request;
//            var levelMax = 0;
//                if (typesCommandes[i].level > levelMax) {
//                    levelMax = typesCommandes[i].level;
//                }
            request = store.put({
                "id": parseInt(paramApp.id),
                "nom_parametre": paramApp.nom_parametre,
                "valeur_parametre": (paramApp.valeur_parametre)
            });
            trans.oncomplete = function(e) {
//                updateLevelOfTable(config.getConfig("tableNameParamApplication"), levelMax);
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
        var request = indexedDB.open(config.getConfig("indexedDBDatabaseName"));
        request.onsuccess = function(e) {
            var db = e.target.result;
            var trans = db.transaction([config.getConfig("tableNameParamApplication")], myStorage.IDBTransactionModes.READ_ONLY);
            var store = trans.objectStore(config.getConfig("tableNameParamApplication"));
            var index = store.index("nom_parametre");
            var request = index.get(nom.toString());
            request.onsuccess = function(e) {
                var result = e.target.result;
                var parametreApplication = new ParametreApplication();
                parametreApplication.setId(result.id);
                parametreApplication.setNomParametre(result.nom_parametre);
                parametreApplication.setValeurParametre(parseInt(result.valeur_parametre));
                if (method != null) {//Nous avons besoin de l'executer.
                    method(parametreApplication, param);
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
        myStorage.indexedDB.load();
        var request = indexedDB.open(config.getConfig("indexedDBDatabaseName"));
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
                var myparametreApplication = new ParametreApplication();
                myparametreApplication.setId(result.value.id);
                myparametreApplication.setNomParametre(result.value.nom_parametre);
                myparametreApplication.setValeurParametre(parseInt(result.value.valeur_parametre));
                parametreApplication.push(myparametreApplication);
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