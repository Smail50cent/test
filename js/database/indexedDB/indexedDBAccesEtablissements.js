/**
 *
 * @author Damien Chesneau <contact@damienchesneau.fr>
 */


myStorage.indexedDB.addFirstEtablissements = function() {
    $.ajax({
        url: getServicePath("serveur.clientaccess.serviceGetAllEtablissements"),
        type: 'GET',
        dataType: 'json',
        async: true,
        success: function(data, textStatus, xhr) {
            for (var i = 0; i < data.length; i++) {
                addEtablissement(data[i]);
            }
        },
        error: function(xhr, textStatus, errorThrown) {
            showErrorMessage(strings.getString("label.error.connexion.serveur"));
        }
    });
    function addEtablissement(etablissement) {
        myStorage.indexedDB.load();
        var request = indexedDB.open(config.getConfig("indexedDBDatabaseName"), parseInt(config.getConfig("indexedDB.database.version")));
        request.onsuccess = function(e) {
            var db = e.target.result;
            var trans = db.transaction([config.getConfig("tableNameEtablissements")], myStorage.IDBTransactionModes.READ_WRITE);
            var store = trans.objectStore(config.getConfig("tableNameEtablissements"));
            var request;
            request = store.put({"id": parseInt(etablissement.id),
                "nom": etablissement.nom,
                "logo": etablissement.logo,
                "style": etablissement.style,
                "adresseEtab": etablissement.adresseEtab,
                "telephone": etablissement.telephone,
                "message": etablissement.message,
                "groupe": etablissement.groupe,
                "slogan": etablissement.slogan
            });
            trans.oncomplete = function(e) {
                entitysFinsh[config.getConfig("tableNameEtablissements")] = false;
                db.close();
            };
            request.onerror = function(e) {
                showErrorMessage(strings.getString("label.error.indexedDB.acces.inpossible"));
            };
        };
        request.onerror = myStorage.indexedDB.onerror;
    }
};

myStorage.indexedDB.getEtablissementById = function(method, id, param) {
    window.setTimeout(function() {
        if (entitysFinsh[config.getConfig("tableNameEtablissements")] == false) {
            impl(method, id, param);
        } else {
            myStorage.indexedDB.getEtablissementById(method, id, param);
        }
    }, delay);
    function impl(method, id, param) {
        myStorage.indexedDB.load();
        var request = indexedDB.open(config.getConfig("indexedDBDatabaseName"), parseInt(config.getConfig("indexedDB.database.version")));
        request.onsuccess = function(e) {
            var db = e.target.result;
            var trans = db.transaction([config.getConfig("tableNameEtablissements")], myStorage.IDBTransactionModes.READ_ONLY);
            var store = trans.objectStore(config.getConfig("tableNameEtablissements"));
            var request = store.get(parseInt(id));
            request.onsuccess = function(e) {
                var result = e.target.result;
                var etablissement = result;
                if (method != null) {
                    method(etablissement, param);
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
myStorage.indexedDB.getAllEtablissements = function(methodToExecuteAfter, param) {
    window.setTimeout(function() {
        if (entitysFinsh[config.getConfig("tableNameEtablissements")] == false) {
            impl(methodToExecuteAfter, param);
        } else {
            myStorage.indexedDB.getAllEtablissements(methodToExecuteAfter, param);
        }
    }, delay);
    function impl(methodToExecuteAfter, param) {
        myStorage.indexedDB.load();
        var request = indexedDB.open(config.getConfig("indexedDBDatabaseName"), parseInt(config.getConfig("indexedDB.database.version")));
        request.onsuccess = function(e) {
            var db = e.target.result;
            var trans = db.transaction([config.getConfig("tableNameEtablissements")], myStorage.IDBTransactionModes.READ_WRITE);
            var store = trans.objectStore(config.getConfig("tableNameEtablissements"));
            var keyRange = IDBKeyRange.lowerBound(0);
            var cursorRequest = store.openCursor(keyRange);
            var etablissements = new Array();
            cursorRequest.onsuccess = function(e) {
                var option = new Option();
                var result = e.target.result;
                if (!!result == false) {
                    return;
                }
                var e = new Etablissement();
                e.id = result.value.id;
                e.nom = result.value.nom;
                e.logo = result.value.logo;
                e.style = result.value.style;
                e.adresseEtab = result.value.adresseEtab;
                e.telephone = result.value.telephone;
                e.message = result.value.message;
                e.slogan = result.value.slogan;
                e.groupe = result.value.groupe;
                etablissements.push(e);
                result.continue();
            };
            trans.oncomplete = function(e) {
                if (methodToExecuteAfter != null) {
                    methodToExecuteAfter(etablissements, param);
                }
                db.close();
            };
            cursorRequest.onerror = myStorage.indexedDB.onerror;
        };
        request.onerror = myStorage.indexedDB.onerror;
    }
};