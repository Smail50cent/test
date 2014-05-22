/**
 *
 * @author Damien Chesneau <contact@damienchesneau.fr>
 */

myStorage.indexedDB.addTicketToBdd = function(method, ticket, param) {
    myStorage.indexedDB.load();
    var request = indexedDB.open(config.getConfig("indexedDBDatabaseName"));
    log(ticket);
    var type = config.getConfig("tablePendingDataTypeTicket");
    request.onsuccess = function(e) {
        var db = e.target.result;
        var trans = db.transaction([config.getConfig("tableNamePendingData")], myStorage.IDBTransactionModes.READ_WRITE);
        var store = trans.objectStore(config.getConfig("tableNamePendingData"));
        var request;
        request = store.put({"type": type, "value": ticket});
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