myStorage.indexedDB.addFistCategories = function() {
    myStorage.indexedDB.load();
    var request = indexedDB.open(config.getConfig("indexedDBDatabaseName"));
    request.onsuccess = function(e) {
        var db = e.target.result;
        var trans = db.transaction([config.getConfig("tableNameCategorie")], myStorage.IDBTransactionModes.READ_WRITE);
        var store = trans.objectStore(config.getConfig("tableNameCategorie"));
        var currentDateTime = new Date();
        var request;
        $.ajax({
            url: "service/facade/getAllCategories.php",
            type: 'GET',
            dataType: 'json',
            async: false,
            success: function(data, textStatus, xhr) {
                for (var i = 0; i < data.length; i++) {
                    request = store.put({
                        "id": parseInt(data[i].id),
                        "nom": data[i].nom,
                        "priorite": data[i].priorite,
                        "souscategorie": data[i].souscategorie
                    });
                }
            },
            error: function(xhr, textStatus, errorThrown) {
                showErrorMessage("Impossible d'accèder au serveur.");
            }
        });
        trans.oncomplete = function(e) {
            entitysFinsh[config.getConfig("tableNameCategorie")] = false;
            db.close();
        };

        request.onerror = function(e) {
            showErrorMessage(strings.getString("label.error.indexedDB.acces.inpossible"));
        };
    };
    request.onerror = myStorage.indexedDB.onerror;
};