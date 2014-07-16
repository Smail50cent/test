myStorage.indexedDB.getAllOptions = function(methodToExecuteAfter) {
    window.setTimeout(function() {
        if (entitysFinsh[config.getConfig("tableNameOptions")] == false) {
            impl();
        } else {
            myStorage.indexedDB.getAllOptions(methodToExecuteAfter);
        }
    }, delay);
    function impl() {
        myStorage.indexedDB.load();
        var request = indexedDB.open(config.getConfig("indexedDBDatabaseName"));
        request.onsuccess = function(e) {
            var db = e.target.result;
            var trans = db.transaction([config.getConfig("tableNameOptions")], myStorage.IDBTransactionModes.READ_WRITE);
            var store = trans.objectStore(config.getConfig("tableNameOptions"));
            var keyRange = IDBKeyRange.lowerBound(0);
            var cursorRequest = store.openCursor(keyRange);
            var options = new Array();
            cursorRequest.onsuccess = function(e) {
                var option = new Option();
                var result = e.target.result;
                if (!!result == false) {
                    return;
                }
                option.setId(result.value.id);
                option.setNom(result.value.nom);
                option.setLabel(result.value.label);
                option.setPossibilites(result.value.possibilites);
                options.push(option);
                result.continue();
            };

            trans.oncomplete = function(e) {
                if (methodToExecuteAfter != null) {
                    methodToExecuteAfter(ingredients);
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