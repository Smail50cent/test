/**
 *
 * @author Damien Chesneau <contact@damienchesneau.fr>
 */
myStorage.indexedDB.getEntreprise = function(methodToExecuteAfter) {
    window.setTimeout(function() {
        if (entitysFinsh[config.getConfig("tableNameEntreprise")] == false) {
            impl(methodToExecuteAfter);
        } else {
            myStorage.indexedDB.getEntreprise(methodToExecuteAfter);
        }
    }, delay);
    function impl(methodToExecuteAfter) {
        myStorage.indexedDB.load();
        var request = indexedDB.open(config.getConfig("indexedDBDatabaseName"));
        request.onsuccess = function(e) {
            var db = e.target.result;
            var trans = db.transaction([config.getConfig("tableNameEntreprise")], myStorage.IDBTransactionModes.READ_ONLY);
            var store = trans.objectStore(config.getConfig("tableNameEntreprise"));
            var request = store.get(5);
            request.onsuccess = function(e) {
                var result = e.target.result;
                var e = new Entreprise();
                e.setNom(result.nom);
                e.setTelephone(result.telephone);
                e.setTheme(result.theme);
                e.setAdresse(result.adresse);
                e.setSlogan(result.slogan);
                e.setMessage(result.message);
                e.menus = result.menus;
                e.langue = result.langue;
                e.setUseComptes(result.use_comptes);
                if (methodToExecuteAfter != null) {//Nous avons besoin de l'executer.
                    methodToExecuteAfter(e);
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
myStorage.indexedDB.updateEntreprise = function(method, newEntreprise) {
    window.setTimeout(function() {
        if (entitysFinsh[config.getConfig("tableNameEntreprise")] == false) {
            impl(method);
        } else {
            myStorage.indexedDB.updateEntreprise(method);
        }
    }, delay);
    function impl(method) {
        var request = indexedDB.open(config.getConfig("indexedDBDatabaseName"));
        request.onsuccess = function(e) {
            var db = e.target.result;
            var trans = db.transaction([config.getConfig("tableNameEntreprise")], myStorage.IDBTransactionModes.READ_WRITE);
            var store = trans.objectStore(config.getConfig("tableNameEntreprise"));
            var openCursorReq = store.openCursor(5);
            openCursorReq.onsuccess = function(event) {
                var cursor = event.target.result;
                var _object = cursor.value;
                _object.adresse = newEntreprise.adresse;
                _object.theme = newEntreprise.theme;
                _object.nom = newEntreprise.nom;
                _object.telephone = newEntreprise.telephone;
                _object.logo = newEntreprise.logo;
                _object.slogan = newEntreprise.slogan;
                _object.message = newEntreprise.message;
                _object.langue = newEntreprise.langue;
                _object.menus = newEntreprise.menus;
                _object.use_comptes = newEntreprise.menus;
                var updateRequest = cursor.update(_object);
                updateRequest.onerror = updateRequest.onblocked = function() {
                    showErrorMessage(strings.getString("label.error.indexedDB.acces.inpossible"));
                };
                updateRequest.onsuccess = function(event) {
                };
                trans.oncomplete = function(e) {
                    if (method != null) {
                        method(newEntreprise);
                    }
                    db.close();
                };
            };
        };
        request.onerror = myStorage.indexedDB.onerror;
    }

};