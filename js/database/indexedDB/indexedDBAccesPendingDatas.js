/**
 *
 * @author Damien Chesneau <contact@damienchesneau.fr>
 */

myStorage.indexedDB.addTicketToBdd = function(method, ticket, param) {
    var type = config.getConfig("tablePendingDataTypeTicket");
    log(ticket);
    myStorage.indexedDB.load();
    var request = indexedDB.open(config.getConfig("indexedDBDatabaseName"));
    request.onsuccess = function(e) {
        var db = e.target.result;
        var trans = db.transaction([config.getConfig("tableNamePendingData")], myStorage.IDBTransactionModes.READ_WRITE);
        var store = trans.objectStore(config.getConfig("tableNamePendingData"));
        var request;
        request = store.put({
            "id": "menu.id",
            "value": "menu.nom",
            "type": "menu.prix"
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
