myStorage.indexedDB.getMenuByIdForDetailMenu = function(methodToExecuteAfter, idmenu) {
    window.setTimeout(function() {
        if (entitysFinsh[config.getConfig("tableNameMenu")] == false) {
            impl(methodToExecuteAfter, idmenu);
        } else {
            myStorage.indexedDB.getMenuByIdForDetailMenu(methodToExecuteAfter, idmenu);
        }
    }, delay);
    function impl(methodToExecuteAfter, idmenu) {
        myStorage.indexedDB.load();
        var request = indexedDB.open(config.getConfig("indexedDBDatabaseName"), parseInt(config.getConfig("indexedDB.database.version")));
        request.onsuccess = function(e) {
            var db = e.target.result;
            var trans = db.transaction([config.getConfig("tableNameMenu")], myStorage.IDBTransactionModes.READ_ONLY);
            var store = trans.objectStore(config.getConfig("tableNameMenu"));
            var request = store.get(idmenu);
            request.onsuccess = function(e) {
                var result = e.target.result;
                var menu = new Menu();
                console.log(result);
                menu.setNom(result.nom);
                menu.setId(result.id);
                menu.setPrix(result.prix);
                menu.setProduits(result.produits);
                menu.setTauxDeTva(result.tauxDeTva);
                if (methodToExecuteAfter != null) {//Nous avons besoin de l'executer.
                    methodToExecuteAfter(menu);
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

myStorage.indexedDB.getAllMenuForDetailMenu = function(methodToExecuteAfter) {
    window.setTimeout(function() {
        if (entitysFinsh[config.getConfig("tableNameMenu")] == false) {
            impl();
        } else {
            myStorage.indexedDB.getAllMenuForDetailMenu(methodToExecuteAfter);
        }
    }, delay);
    function impl() {
        var idetablissement = parseInt(getLocalStorageValue("client.application.etablissement.id"));
        var idzone = JSON.parse(getLocalStorageValue("paramCommande.numTable")).zone;
        myStorage.indexedDB.load();
        var request = indexedDB.open(config.getConfig("indexedDBDatabaseName"), parseInt(config.getConfig("indexedDB.database.version")));
        request.onsuccess = function(e) {
            var db = e.target.result;
            var trans = db.transaction([config.getConfig("tableNameMenu")], myStorage.IDBTransactionModes.READ_ONLY);
            var store = trans.objectStore(config.getConfig("tableNameMenu"));
            var keyRange = IDBKeyRange.lowerBound(0);
            var cursorRequest = store.openCursor(keyRange);
            var menus = new Array();
            cursorRequest.onsuccess = function(e) {
                var result = e.target.result;
                if (!!result == false) {
                    return;
                }
                var etablissementOk = false;
                for (var i = 0; i < result.value.etablissements.length; i++) {
                    if (result.value.etablissements[i] == idetablissement) {
                        etablissementOk = true;
                        break;
                    }
                }
                var zoneOk = false;
                if (result.value.zones.length == 0) {
                    zoneOk = true;
                } else {
                    for (var i = 0; i < result.value.zones.length; i++) {
                        if (result.value.zones[i] == idzone) {
                            zoneOk = true;
                            break;
                        }
                    }
                }
                if (etablissementOk && zoneOk) {
                    var menu = new Menu();
                    menu.setNom(result.value.nom);
                    menu.setId(result.value.id);
                    menu.setPrix(result.value.prix);
                    menu.setProduits(result.value.produits);
                    menu.setTauxDeTva(result.value.tauxDeTva);
                    menus.push(menu);
                }

                result.continue();
            };
            trans.oncomplete = function(e) {
                if (methodToExecuteAfter != null) {//Nous avons besoin de l'executer.
                    methodToExecuteAfter(menus);
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

myStorage.indexedDB.getMenuById = function(methodToExecuteAfter, idmenu, param) {
    window.setTimeout(function() {
        if (entitysFinsh[config.getConfig("tableNameMenu")] == false) {
            impl(methodToExecuteAfter, idmenu, param);
        } else {
            myStorage.indexedDB.getMenuByIdForDetailMenu(methodToExecuteAfter, idmenu, param);
        }
    }, delay);
    function impl(methodToExecuteAfter, idmenu, param) {
        myStorage.indexedDB.load();
        var request = indexedDB.open(config.getConfig("indexedDBDatabaseName"), parseInt(config.getConfig("indexedDB.database.version")));
        request.onsuccess = function(e) {
            var db = e.target.result;
            var trans = db.transaction([config.getConfig("tableNameMenu")], myStorage.IDBTransactionModes.READ_ONLY);
            var store = trans.objectStore(config.getConfig("tableNameMenu"));
            var request = store.get(idmenu);
            request.onsuccess = function(e) {
                var result = e.target.result;
                var menu = new Menu();
                menu.setNom(result.nom);
                menu.setId(result.id);
                menu.setTauxDeTva(result.tauxDeTva);
                menu.setPrix(result.prix);
                menu.setProduits(result.produits);
                if (methodToExecuteAfter != null) {//Nous avons besoin de l'executer.
                    methodToExecuteAfter(menu, param);
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

myStorage.indexedDB.countMenus = function(method, param) {
    window.setTimeout(function() {
        if (entitysFinsh[config.getConfig("tableNameMenu")] == false) {
            impl(method, param);
        } else {
            myStorage.indexedDB.countMenus(method, param);
        }
    }, delay);
    function impl(method, param) {
        myStorage.indexedDB.load();
        var request = indexedDB.open(config.getConfig("indexedDBDatabaseName"), parseInt(config.getConfig("indexedDB.database.version")));
        request.onsuccess = function(e) {
            var db = e.target.result;
            var trans = db.transaction([config.getConfig("tableNameMenu")], myStorage.IDBTransactionModes.READ_ONLY);
            var store = trans.objectStore(config.getConfig("tableNameMenu"));
            var keyRange = IDBKeyRange.lowerBound(0);
            var cursorRequest = store.openCursor(keyRange);
            var count = 0;
            cursorRequest.onsuccess = function(e) {
                var result = e.target.result;
                result ? ++count && result.continue() : console.log(count);
            };
            trans.oncomplete = function(e) {
                if (method != null) {//Nous avons besoin de l'executer.
                    function Param(count) {
                        this.count = count;
                    }
                    method(new Param(count));
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