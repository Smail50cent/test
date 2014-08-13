/**
 *
 * @author Damien Chesneau <contact@damienchesneau.fr>
 */

myStorage.indexedDB.addFistTables = function() {
    $.ajax({
        url: getServicePath("serveur.clientaccess.serviceGetAllTables"),
        type: 'GET',
        dataType: 'json',
        async: false,
        success: function(data, textStatus, xhr) {
            for (var i = 0; i < data.length; i++) {
                addTable(data[i]);
            }
        },
        error: function(xhr, textStatus, errorThrown) {
            showErrorMessage(strings.getString("label.error.connexion.serveur"));
        }
    });
    function addTable(table) {
        myStorage.indexedDB.load();
        var request = indexedDB.open(config.getConfig("indexedDBDatabaseName"), parseInt(config.getConfig("indexedDB.database.version")));
        request.onsuccess = function(e) {
            var db = e.target.result;
            var trans = db.transaction([config.getConfig("tableNameTable")], myStorage.IDBTransactionModes.READ_WRITE);
            var store = trans.objectStore(config.getConfig("tableNameTable"));
            var request;
            request = store.put({"id": (table.id), "numero": table.numero,"zone": table.zone} );
            trans.oncomplete = function(e) {
                entitysFinsh[config.getConfig("tableNameTable")] = false;
                db.close();
            };
            request.onerror = function(e) {
                showErrorMessage(strings.getString("label.error.indexedDB.acces.inpossible"));
            };
        };
        request.onerror = myStorage.indexedDB.onerror;
    }
};
myStorage.indexedDB.getAllTables = function(method) {
    window.setTimeout(function() {
        if (entitysFinsh[config.getConfig("tableNameTable")] == false) {
            impl(method);
        } else {
            myStorage.indexedDB.getAllTables(method);
        }
    }, delay);
    function impl(method) {
        myStorage.indexedDB.load();
        var request = indexedDB.open(config.getConfig("indexedDBDatabaseName"), parseInt(config.getConfig("indexedDB.database.version")));
        request.onsuccess = function(e) {
            var db = e.target.result;
            var trans = db.transaction([config.getConfig("tableNameTable")], myStorage.IDBTransactionModes.READ_ONLY);
            var store = trans.objectStore(config.getConfig("tableNameTable"));
            var keyRange = IDBKeyRange.lowerBound(0);
            var cursorRequest = store.openCursor(keyRange);
            var tables = new Array();        
            cursorRequest.onsuccess = function(e) {
                var result = e.target.result;
                if (!!result == false) {
                    return;
                }
                var table = new Table(result.value.id,result.value.numero,result.value.zone);
                tables.push(table);
                result.continue();
            };
            trans.oncomplete = function(e) {
                if (method != null) {//Nous avons besoin de l'executer.
                    method(tables);
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