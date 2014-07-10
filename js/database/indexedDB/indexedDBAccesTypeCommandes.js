/**
 *
 * @author Damien Chesneau <contact@damienchesneau.fr>
 */
myStorage.indexedDB.addFistTypesCommandes = function() {
    getConnexionServeur().getMajTable(config.getConfig("tableNameTypeCommande"));
    var connexion = getConnexionServeur();
    connexion.getAllTypeCommandes(addTypeCommande, null);
    function addTypeCommande(typesCommandes, param) {
        console.log(typesCommandes);
        myStorage.indexedDB.load();
        var request = indexedDB.open(config.getConfig("indexedDBDatabaseName"));
        request.onsuccess = function(e) {
            var db = e.target.result;
            var trans = db.transaction([config.getConfig("tableNameTypeCommande")], myStorage.IDBTransactionModes.READ_WRITE);
            var store = trans.objectStore(config.getConfig("tableNameTypeCommande"));
            var request;
            for (var i = 0; i < typesCommandes.length; i++) {
                request = store.put(typesCommandes[i]);
            }
            trans.oncomplete = function(e) {
                entitysFinsh[config.getConfig("tableNameTypeCommande")] = false;
                db.close();
            };
            request.onerror = function(e) {
                showErrorMessage(strings.getString("label.error.indexedDB.acces.inpossible"));
            };
        };
        request.onerror = myStorage.indexedDB.onerror;
    }
};