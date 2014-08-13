/**
 *
 * @author Damien Chesneau <contact@damienchesneau.fr>
 */

myStorage.indexedDB.addTicketToBdd = function(method, ticket, param) {
    var type = config.getConfig("tablePendingDataTypeTicket");
    myStorage.indexedDB.load();
    var id = JSON.stringify(ticket).hashCode();
    var request = indexedDB.open(config.getConfig("indexedDBDatabaseName"), parseInt(config.getConfig("indexedDB.database.version")));
    request.onsuccess = function(e) {
        var db = e.target.result;
        var trans = db.transaction([config.getConfig("tableNamePendingData")], myStorage.IDBTransactionModes.READ_WRITE);
        var store = trans.objectStore(config.getConfig("tableNamePendingData"));
        var request;
        request = store.put({
            "id": id,
            "value": JSON.stringify(ticket),
            "type": type
        });
        trans.oncomplete = function(e) {

            db.close();
        };
        request.onerror = function(e) {
            showErrorMessage(strings.getString("label.error.indexedDB.acces.inpossible"));
        };
    };
    request.onerror = myStorage.indexedDB.onerror;
};
myStorage.indexedDB.getAllPendingsDatas = function(method, param) {
    function PendingData() {
        this.value;
        this.type;
    }
    myStorage.indexedDB.load();
    var request = indexedDB.open(config.getConfig("indexedDBDatabaseName"), parseInt(config.getConfig("indexedDB.database.version")));
    request.onsuccess = function(e) {
        var db = e.target.result;
        var trans = db.transaction([config.getConfig("tableNamePendingData")], myStorage.IDBTransactionModes.READ_ONLY);
        var store = trans.objectStore(config.getConfig("tableNamePendingData"));
        var keyRange = IDBKeyRange.lowerBound(0);
        var cursorRequest = store.openCursor(keyRange);
        var pendingsDatas = new Array();
        cursorRequest.onsuccess = function(e) {
            var result = e.target.result;
            if (!!result == false) {
                return;
            }
            var pendingData = new PendingData();
            pendingData.value = JSON.parse(result.value.value);
            pendingData.type = (result.value.type);
            pendingsDatas.push(pendingData);
            result.continue();
        };
        trans.oncomplete = function(e) {
            if (method != null) {//Nous avons besoin de l'executer.
                method(pendingsDatas);
            }
            db.close();
        };
        request.onerror = function(e) {
            showErrorMessage(strings.getString("label.error.indexedDB.acces.inpossible"));
        };
    };
    request.onerror = myStorage.indexedDB.onerror;

};
myStorage.indexedDB.deletePendingData = function(method, id, param) {
    myStorage.indexedDB.load();
    var request = indexedDB.open(config.getConfig("indexedDBDatabaseName"), parseInt(config.getConfig("indexedDB.database.version")));
    request.onsuccess = function(e) {
        var db = e.target.result;
        var trans = db.transaction([config.getConfig("tableNamePendingData")], myStorage.IDBTransactionModes.READ_WRITE);
        var store = trans.objectStore(config.getConfig("tableNamePendingData"));
        var request = store.delete(id);
        trans.oncomplete = function(e) {
            db.close();
            if (method != null) {
                method(param);
            }
        };
        request.onerror = function(e) {
            showErrorMessage(strings.getString("label.error.indexedDB.acces.inpossible"));
        };
    };
    request.onerror = myStorage.indexedDB.onerror;
};
myStorage.indexedDB.addPendingData = function(method, data, type, param) {
    myStorage.indexedDB.load();
    var id = JSON.stringify(data).hashCode();
    var request = indexedDB.open(config.getConfig("indexedDBDatabaseName"), parseInt(config.getConfig("indexedDB.database.version")));
    request.onsuccess = function(e) {
        var db = e.target.result;
        var trans = db.transaction([config.getConfig("tableNamePendingData")], myStorage.IDBTransactionModes.READ_WRITE);
        var store = trans.objectStore(config.getConfig("tableNamePendingData"));
        var request;
        request = store.put({
            "id": id,
            "value": JSON.stringify(data),
            "type": type
        });
        trans.oncomplete = function(e) {
            db.close();
        };
        request.onerror = function(e) {
            showErrorMessage(strings.getString("label.error.indexedDB.acces.inpossible"));
        };
    };
    request.onerror = myStorage.indexedDB.onerror;
};