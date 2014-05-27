/**
 *
 * @author Damien Chesneau <contact@damienchesneau.fr>
 */
myStorage.indexedDB.addFirstEntrepriseMaj = function() {
    $.ajax({
        url: getServicePath("serveur.clientaccess.serviceGetEntrepriseMaj"),
        type: 'GET',
        dataType: 'json',
        async: true,
        success: function(data, textStatus, xhr) {
            setUpdateLevelOfTable(config.getConfig("tableNameEntreprise"), (data.level));
        },
        error: function(xhr, textStatus, errorThrown) {
            showErrorMessage("Impossible d'accèder au serveur.");
        }
    });
};
myStorage.indexedDB.getEntrepriseMajByTable = function(index, methodToExecuteAfter) {
    window.setTimeout(function() {
        if (entitysFinsh[config.getConfig("tableNameEntrepriseMaj")] == false) {
            impl(index, methodToExecuteAfter);
        } else {
            myStorage.indexedDB.getEntrepriseMajByTable(index, methodToExecuteAfter);
        }
    }, delay);
    function impl(index, methodToExecuteAfter) {
        myStorage.indexedDB.load();
        var request = indexedDB.open(config.getConfig("indexedDBDatabaseName"));
        request.onsuccess = function(e) {
            var db = e.target.result;
            var trans = db.transaction([config.getConfig("tableNameEntrepriseMaj")], myStorage.IDBTransactionModes.READ_ONLY);
            var store = trans.objectStore(config.getConfig("tableNameEntrepriseMaj"));
            var request = store.get(index);
            request.onsuccess = function(e) {
                var result = e.target.result;
                console.log(result.level);
                if (methodToExecuteAfter != null) {//Nous avons besoin de l'executer.
                    methodToExecuteAfter(result.level);
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
myStorage.indexedDB.updateLevel = function(index, newlevel) {
    var request = indexedDB.open(config.getConfig("indexedDBDatabaseName"));
    request.onsuccess = function(e) {
        var db = e.target.result;
        var trans = db.transaction([config.getConfig("tableNameEntrepriseMaj")], myStorage.IDBTransactionModes.READ_WRITE);
        var store = trans.objectStore(config.getConfig("tableNameEntrepriseMaj"));
        var openCursorReq = store.openCursor(index);
        openCursorReq.onsuccess = function(event) {
            var cursor = event.target.result;
            var _object = cursor.value;
            _object.level = newlevel;
            var updateRequest = cursor.update(_object);
            updateRequest.onerror = updateRequest.onblocked = function() {
                showErrorMessage('Error updating');
            };

            updateRequest.onsuccess = function(event) {
            };

            trans.oncomplete = function(e) {
                db.close();
            };
        };
    };
    request.onerror = myStorage.indexedDB.onerror;
};