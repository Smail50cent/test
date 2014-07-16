var myStorage = {};
myStorage.indexedDB = {};
myStorage.indexedDB.onerror = function(e) {
    showErrorMessage(e);
};
var delay = 0;//temps d'attente avant d'accèder à la base de données 
var delayOnupgradeneeded = 0;
var indexedDB;
var IDBTransaction;
var IDBKeyRange;
var processOnupgradeneeded = true;
var lockedEntreprise = false;
var entitysFinsh = new Array();
setEntityFinishTo(false);
getServicePath = function(serviceKeyName) {
    var ret = "";
    ret += "./";
    ret += config.getConfig("serveur.clientaccess.servicesAccess") + "/";
    ret += config.getConfig(serviceKeyName);
    ret += config.getConfig("serveur.clientaccess.serviceSufixe");
    return ret;
};
myStorage.indexedDB.load = function() {
    indexedDB = window.indexedDB || window.webkitIndexedDB || window.mozIndexedDB || window.OIndexedDB || window.msIndexedDB,
            IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction || window.OIDBTransaction || window.msIDBTransaction,
            IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange || window.msIDBKeyRange;
};
function setEntityFinishTo(bool) {
    entitysFinsh[config.getConfig("tableNameEntreprise")] = bool;
    entitysFinsh[config.getConfig("tableNameEntrepriseMaj")] = bool;
    entitysFinsh[config.getConfig("tableNameIngredient")] = bool;
    entitysFinsh[config.getConfig("tableNameCategorie")] = bool;
    entitysFinsh[config.getConfig("tableNameSousCategorie")] = bool;
    entitysFinsh[config.getConfig("tableNameProduit")] = bool;
    entitysFinsh[config.getConfig("tableNameMenu")] = bool;
    entitysFinsh[config.getConfig("tableNameTable")] = bool;
    entitysFinsh[config.getConfig("tableNameTypeCommande")] = bool;
    entitysFinsh[config.getConfig("tableNameParamApplication")] = bool;
    entitysFinsh[config.getConfig("tableNameZoneTables")] = bool;
    entitysFinsh[config.getConfig("tableNameOptions")] = bool;
}
function verifyFinish() {
    var finish = false;
    if (entitysFinsh[config.getConfig("tableNameEntreprise")] == true) {
        finish = true;
    } else if (entitysFinsh[config.getConfig("tableNameIngredient")] == true) {
        finish = true;
    } else if (entitysFinsh[config.getConfig("tableNameCategorie")] == true) {
        finish = true;
    } else if (entitysFinsh[config.getConfig("tableNameSousCategorie")] == true) {
        finish = true;
    } else if (entitysFinsh[config.getConfig("tableNameProduit")] == true) {
        finish = true;
    } else if (entitysFinsh[config.getConfig("tableNameMenu")] == true) {
        finish = true;
    } else if (entitysFinsh[config.getConfig("tableNameTable")] == true) {
        finish = true;
    } else if (entitysFinsh[config.getConfig("tableNameTypeCommande")] == true) {
        finish = true;
    } else if (entitysFinsh[config.getConfig("tableNameParamApplication")] == true) {
        finish = true;
    } else if (entitysFinsh[config.getConfig("tableNameZoneTables")] == true) {
        finish = true;
    } else if (entitysFinsh[config.getConfig("tableNameOptions")] == true) {
        finish = true;
    }
    return finish;
}
function printOrNorLoading() {
    test();
    function test() {
        window.setTimeout(function() {
            if (verifyFinish()) {
                test();
            }
        }, delay);
    }
}
printOrNorLoading();

myStorage.indexedDB.create = function() {
    verifyFinish();
    myStorage.indexedDB.load();
    delay = delayOnupgradeneeded;
    var request = indexedDB.open(config.getConfig("indexedDBDatabaseName"));
    setEntityFinishTo(true);
    request.onupgradeneeded = function(e) {
        delay = delayOnupgradeneeded;
        var db = e.target.result;
        lockedEntreprise = true;
        setEntityFinishTo(true);
        entitysFinsh[config.getConfig("tableNameEntreprise")] = true;
        if (db.objectStoreNames.contains(config.getConfig("tableNameEntreprise"))) {
            var storeReq = db.deleteObjectStore(config.getConfig("tableNameEntreprise"));
        }
        var store = db.createObjectStore(config.getConfig("tableNameEntreprise"), {keyPath: "id", autoIncrement: true});
        myStorage.indexedDB.addFistEntreprise();

        entitysFinsh[config.getConfig("tableNameTable")] = true;

        if (db.objectStoreNames.contains(config.getConfig("tableNameTable"))) {
            var storeReq = db.deleteObjectStore(config.getConfig("tableNameTable"));
        }
        var store = db.createObjectStore(config.getConfig("tableNameTable"), {keyPath: "id", autoIncrement: true});

        myStorage.indexedDB.addFistTables();

        entitysFinsh[config.getConfig("tableNameEtablissements")] = true;
        if (db.objectStoreNames.contains(config.getConfig("tableNameEtablissements"))) {
            var storeReq = db.deleteObjectStore(config.getConfig("tableNameEtablissements"));
        }
        var store = db.createObjectStore(config.getConfig("tableNameEtablissements"), {keyPath: "id", autoIncrement: true});
//        store.createIndex("id", "id", {unique: false});
        myStorage.indexedDB.addFirstEtablissements();


        entitysFinsh[config.getConfig("tableNameEntrepriseMaj")] = true;
        if (db.objectStoreNames.contains(config.getConfig("tableNameEntrepriseMaj"))) {
            var storeReq = db.deleteObjectStore(config.getConfig("tableNameEntrepriseMaj"));
        }
        var store = db.createObjectStore(config.getConfig("tableNameEntrepriseMaj"), {keyPath: "id", autoIncrement: true});
        myStorage.indexedDB.addFirstEntrepriseMaj();

        entitysFinsh[config.getConfig("tableNameIngredient")] = true;
        if (db.objectStoreNames.contains(config.getConfig("tableNameIngredient"))) {
            var storeReq = db.deleteObjectStore(config.getConfig("tableNameIngredient"));
        }
        var store = db.createObjectStore(config.getConfig("tableNameIngredient"), {keyPath: "id", autoIncrement: true});
        myStorage.indexedDB.addFistIngredients();

        entitysFinsh[config.getConfig("tableNameCategorie")] = true;

        if (db.objectStoreNames.contains(config.getConfig("tableNameCategorie"))) {
            var storeReq = db.deleteObjectStore(config.getConfig("tableNameCategorie"));
        }
        var store = db.createObjectStore(config.getConfig("tableNameCategorie"), {keyPath: "id", autoIncrement: true});
        myStorage.indexedDB.addFistCategories();
        entitysFinsh[config.getConfig("tableNameSousCategorie")] = true;
        if (db.objectStoreNames.contains(config.getConfig("tableNameSousCategorie"))) {
            var storeReq = db.deleteObjectStore(config.getConfig("tableNameSousCategorie"));
        }
        var store = db.createObjectStore(config.getConfig("tableNameSousCategorie"), {keyPath: "id", autoIncrement: true});
        myStorage.indexedDB.addFistSousCategories();

        if (db.objectStoreNames.contains(config.getConfig("tableNameProduit"))) {
            var storeReq = db.deleteObjectStore(config.getConfig("tableNameProduit"));
        }
        var store = db.createObjectStore(config.getConfig("tableNameProduit"), {keyPath: "id", autoIncrement: true});
        store.createIndex('categorie', ['categorie.id'], {unique: false});
        myStorage.indexedDB.addFistProduits();

        if (db.objectStoreNames.contains(config.getConfig("tableNameMenu"))) {
            var storeReq = db.deleteObjectStore(config.getConfig("tableNameMenu"));
        }
        var store = db.createObjectStore(config.getConfig("tableNameMenu"), {keyPath: "id", autoIncrement: true});
        myStorage.indexedDB.addFistMenus();

        if (db.objectStoreNames.contains(config.getConfig("tableNameModeDeReglement"))) {
            var storeReq = db.deleteObjectStore(config.getConfig("tableNameModeDeReglement"));
        }
        var store = db.createObjectStore(config.getConfig("tableNameModeDeReglement"), {keyPath: "id", autoIncrement: true});
        myStorage.indexedDB.addFistModesDeReglement();

        if (db.objectStoreNames.contains(config.getConfig("tableNamePendingData"))) {
            var storeReq = db.deleteObjectStore(config.getConfig("tableNamePendingData"));
        }
        var store = db.createObjectStore(config.getConfig("tableNamePendingData"), {keyPath: "id", autoIncrement: true});

        if (db.objectStoreNames.contains(config.getConfig("tableNameTypeCommande"))) {
            var storeReq = db.deleteObjectStore(config.getConfig("tableNameTypeCommande"));
        }
        var store = db.createObjectStore(config.getConfig("tableNameTypeCommande"), {keyPath: "id", autoIncrement: true});
        myStorage.indexedDB.addFistTypesCommandes();

        if (db.objectStoreNames.contains(config.getConfig("tableNameParamApplication"))) {
            var storeReq = db.deleteObjectStore(config.getConfig("tableNameParamApplication"));
        }

        var store = db.createObjectStore(config.getConfig("tableNameParamApplication"), {keyPath: "id", autoIncrement: true});
        store.createIndex("nom_parametre", "nom_parametre", {unique: false});
        myStorage.indexedDB.addFirstParametreApplication();

        if (db.objectStoreNames.contains(config.getConfig("tableNameZoneTables"))) {
            var storeReq = db.deleteObjectStore(config.getConfig("tableNameZoneTables"));
        }
        var store = db.createObjectStore(config.getConfig("tableNameZoneTables"), {keyPath: "id", autoIncrement: true});
        myStorage.indexedDB.addFirstZoneTables();
        
        entitysFinsh[config.getConfig("tableNameOptions")] = true;
        if (db.objectStoreNames.contains(config.getConfig("tableNameOptions"))) {
            var storeReq = db.deleteObjectStore(config.getConfig("tableNameOptions"));
        }
        var store = db.createObjectStore(config.getConfig("tableNameOptions"), {keyPath: "id", autoIncrement: true});
        myStorage.indexedDB.addFirstOptions();

        processOnupgradeneeded = false;
        delay = 0;
    };
    request.onsuccess = function(e) {
        delay = 0;
        processOnupgradeneeded = false;
        e.target.result.close();
        setEntityFinishTo(false);
    };
    request.onerror = myStorage.indexedDB.onerror;
};
myStorage.indexedDB.addFistMenus = function() {
    $.ajax({
        url: getServicePath("serveur.clientaccess.serviceGetAllMenus"),
        type: 'GET',
        dataType: 'json',
        async: false,
        success: function(data, textStatus, xhr) {
            for (var i = 0; i < data.length; i++) {
                addMenu(data[i]);
            }
        },
        error: function(xhr, textStatus, errorThrown) {
            showErrorMessage(strings.getString("label.error.connexion.serveur"));
        }
    });
    function addMenu(menu) {
        myStorage.indexedDB.load();
        var request = indexedDB.open(config.getConfig("indexedDBDatabaseName"));
        request.onsuccess = function(e) {
            var db = e.target.result;
            var trans = db.transaction([config.getConfig("tableNameMenu")], myStorage.IDBTransactionModes.READ_WRITE);
            var store = trans.objectStore(config.getConfig("tableNameMenu"));
            var request;
            request = store.put({
                "id": menu.id,
                "nom": menu.nom,
                "prix": menu.prix,
                "produits": menu.produits,
                "tauxDeTva": menu.tauxDeTva
            });
            trans.oncomplete = function(e) {
                db.close();
                entitysFinsh[config.getConfig("tableNameMenu")] == false;
            };
            request.onerror = function(e) {
                showErrorMessage(strings.getString("label.error.indexedDB.acces.inpossible"));
            };
        };
        request.onerror = myStorage.indexedDB.onerror;
    }
};
myStorage.indexedDB.addFistEntreprise = function() {
    myStorage.indexedDB.load();
    var request = indexedDB.open(config.getConfig("indexedDBDatabaseName"));
    request.onsuccess = function(e) {
        var db = e.target.result;
        var trans = db.transaction([config.getConfig("tableNameEntreprise")], myStorage.IDBTransactionModes.READ_WRITE);
        var store = trans.objectStore(config.getConfig("tableNameEntreprise"));
        var request;
        $.ajax({
            url: getServicePath("serveur.clientaccess.serviceGetEntreprise"),
            type: 'GET',
            dataType: 'json',
            async: false,
            success: function(data, textStatus, xhr) {
                //console.log("data:",data);
                request = store.put({
                    "id": parseInt(data.id),
                    "nom": data.nom,
                    "adresse": data.adresse,
                    "logo": data.logo,
                    "message": data.message,
                    "slogan": data.slogan,
                    "theme": data.theme,
                    "telephone": data.telephone,
                    "langue": data.langue,
                    "menus": data.menus
                });
            },
            error: function(xhr, textStatus, errorThrown) {
                showErrorMessage(strings.getString("label.error.connexion.serveur"));
            }
        });
        trans.oncomplete = function(e) {
            lockedEntreprise = false;
            entitysFinsh[config.getConfig("tableNameEntreprise")] = false;
            db.close();
        };

        request.onerror = function(e) {
            showErrorMessage(strings.getString("label.error.indexedDB.acces.inpossible"));
        };
    };
    request.onerror = myStorage.indexedDB.onerror;
};

myStorage.indexedDB.addFistIngredients = function() {
    $.ajax({
        url: getServicePath("serveur.clientaccess.serviceGetAllIngredients"),
        type: 'GET',
        dataType: 'json',
        async: false,
        success: function(data, textStatus, xhr) {
            for (var i = 0; i < data.length; i++) {
                //console.log(data);
                addIng(data[i]);
            }
        },
        error: function(xhr, textStatus, errorThrown) {

            showErrorMessage(strings.getString("label.error.connexion.serveur"));
        }
    });
    function addIng(ingredient) {
        myStorage.indexedDB.load();
        var request = indexedDB.open(config.getConfig("indexedDBDatabaseName"));
        request.onsuccess = function(e) {
            var db = e.target.result;
            var trans = db.transaction([config.getConfig("tableNameIngredient")], myStorage.IDBTransactionModes.READ_WRITE);
            var store = trans.objectStore(config.getConfig("tableNameIngredient"));
            var request;
            request = store.put({"id": parseInt(ingredient.id), "nom": ingredient.nom});
            trans.oncomplete = function(e) {
                entitysFinsh[config.getConfig("tableNameIngredient")] = false;
                db.close();
            };
            request.onerror = function(e) {
                showErrorMessage(strings.getString("label.error.indexedDB.acces.inpossible"));
            };
        };
        request.onerror = myStorage.indexedDB.onerror;
    }
};
myStorage.indexedDB.addFistSousCategories = function() {
    $.ajax({
        url: getServicePath("serveur.clientaccess.serviceGetAllSousCategories"),
        type: 'GET',
        dataType: 'json',
        async: false,
        success: function(data, textStatus, xhr) {
            for (var i = 0; i < data.length; i++) {
                addCat(data[i]);
            }
        },
        error: function(xhr, textStatus, errorThrown) {
            showErrorMessage(strings.getString("label.error.connexion.serveur"));
        }
    });
    function addCat(souscategorie) {
        myStorage.indexedDB.load();
        var request = indexedDB.open(config.getConfig("indexedDBDatabaseName"));
        request.onsuccess = function(e) {
            var db = e.target.result;
            var trans = db.transaction([config.getConfig("tableNameSousCategorie")], myStorage.IDBTransactionModes.READ_WRITE);
            var store = trans.objectStore(config.getConfig("tableNameSousCategorie"));
            var request;
            request = store.put({"id": parseInt(souscategorie.ID), "tauxTva": parseFloat(souscategorie.taux_tva), "nom": souscategorie.NOM, "categorie": souscategorie.categorie_id, "priorite": souscategorie.priorite});
            trans.oncomplete = function(e) {
                entitysFinsh[config.getConfig("tableNameSousCategorie")] = false;
                db.close();
            };
            request.onerror = function(e) {
                showErrorMessage(strings.getString("label.error.indexedDB.acces.inpossible"));
            };
        };
        request.onerror = myStorage.indexedDB.onerror;
    }
};
var nbtotal = 0;
myStorage.indexedDB.addFistProduits = function() {
    getConnexionServeur().getMajTable(config.getConfig("tableNameProduit"));
    $.ajax({
        url: getServicePath("serveur.clientaccess.serviceGetAllProduits"),
        type: 'GET',
        dataType: 'json',
        async: false,
        success: function(data, textStatus, xhr) {
            for (var i = 0; i < data.length; i++) {
                addProduit(data[i]);
            }
        },
        error: function(xhr, textStatus, errorThrown) {
            console.log(errorThrown);
            showErrorMessage(strings.getString("label.error.connexion.serveur"));
        }
    });
    function addProduit(produit) {
        myStorage.indexedDB.load();
        var request = indexedDB.open(config.getConfig("indexedDBDatabaseName"));
        request.onsuccess = function(e) {
            var db = e.target.result;
            var trans = db.transaction([config.getConfig("tableNameProduit")], myStorage.IDBTransactionModes.READ_WRITE);
            var store = trans.objectStore(config.getConfig("tableNameProduit"));
            var request;
            request = store.put({
                "id": parseInt(produit.id),
                "nom": produit.nom,
                "categorie": (produit.categorie),
                "souscategorie": (produit.souscategorie),
                "options": produit.options,
                "ingredients": produit.ingredients,
                "associationPrixProduit": produit.associationPrixProduit,
                "tauxTva": produit.tauxTva,
                "level": produit.level
            });
            trans.oncomplete = function(e) {
//                console.log("nbtotal="+nbtotal+" ",e);
//                nbtotal++;
                db.close();
                entitysFinsh[config.getConfig("tableNameProduit")] = false;
            };
            request.onerror = function(e) {
                showErrorMessage(strings.getString("label.error.indexedDB.acces.inpossible"));
            };
        };
        request.onerror = myStorage.indexedDB.onerror;
    }
};
myStorage.indexedDB.addFirstOptions = function() {
    $.ajax({
        url: getServicePath("serveur.clientaccess.serviceGetAllOptions"),
        type: 'GET',
        dataType: 'json',
        async: false,
        success: function(data, textStatus, xhr) {
            for (var i = 0; i < data.length; i++) {
                //console.log(data);
                addOption(data[i]);
            }
        },
        error: function(xhr, textStatus, errorThrown) {
            showErrorMessage(strings.getString("label.error.connexion.serveur"));
        }
    });
    function addOption(option) {
        myStorage.indexedDB.load();
        var request = indexedDB.open(config.getConfig("indexedDBDatabaseName"));
        request.onsuccess = function(e) {
            var db = e.target.result;
            var trans = db.transaction([config.getConfig("tableNameOptions")], myStorage.IDBTransactionModes.READ_WRITE);
            var store = trans.objectStore(config.getConfig("tableNameOptions"));
            var request;
            request = store.put({"id": parseInt(option.id), "nom": option.nom, "label": option.label, "possibilite": option.possibilites});
            trans.oncomplete = function(e) {
                entitysFinsh[config.getConfig("tableNameOptions")] = false;
                db.close();
            };
            request.onerror = function(e) {
                showErrorMessage(strings.getString("label.error.indexedDB.acces.inpossible"));
            };
        };
        request.onerror = myStorage.indexedDB.onerror;
    }
};
myStorage.indexedDB.addTodo = function(todoText) {
    myStorage.indexedDB.load();
    var request = indexedDB.open(config.getConfig("indexedDBDatabaseName"));
    request.onsuccess = function(e) {
        var db = e.target.result;
        var trans = db.transaction([tableNameEntreprise], myStorage.IDBTransactionModes.READ_WRITE);
        var store = trans.objectStore(tableNameEntreprise);
        var currentDateTime = new Date();

        var data = {
            "adresse": "150 boulevard massèna, 75013 Paris",
            "theme": currentDateTime.getTime(),
            "dateCreated": currentDateTime.toUTCString(currentDateTime.getTime()),
            "id": 5
        };
        var request = store.put(data);
        trans.oncomplete = function(e) {
            db.close();
        };

        request.onerror = function(e) {
            showErrorMessage(strings.getString("label.error.indexedDB.acces.inpossible"));
        };
    };
    request.onerror = myStorage.indexedDB.onerror;
};

myStorage.indexedDB.deleteTodo = function(id) {
    myStorage.indexedDB.load();
    var request = indexedDB.open(config.getConfig("indexedDBDatabaseName"));
    request.onsuccess = function(e) {
        var db = e.target.result;
        var trans = db.transaction([tableNameEntreprise], myStorage.IDBTransactionModes.READ_WRITE);
        var store = trans.objectStore(tableNameEntreprise);
        var request = store.delete(id);

        trans.oncomplete = function(e) {
            db.close();
            myStorage.indexedDB.getAllTodoItems();
        };

        request.onerror = function(e) {
            showErrorMessage(strings.getString("label.error.indexedDB.acces.inpossible"));
        };
    };
    request.onerror = myStorage.indexedDB.onerror;
};
// METHODS !





myStorage.indexedDB.updateTodo = function(id, newText) {
    myStorage.indexedDB.load();
    var request = indexedDB.open(config.getConfig("indexedDBDatabaseName"));
    request.onsuccess = function(e) {
        var db = e.target.result;
        var trans = db.transaction([tableNameEntreprise], myStorage.IDBTransactionModes.READ_WRITE);
        var store = trans.objectStore(tableNameEntreprise);

        var openCursorReq = store.openCursor(IDBKeyRange.only(id));
        openCursorReq.onsuccess = function(event) {
            var cursor = event.target.result;
            var _object = cursor.value;
            var currentDateTime = new Date();
            _object.dateCreated = currentDateTime.toUTCString(currentDateTime.getTime());
            _object.text = newText;
            var updateRequest = cursor.update(_object);
            updateRequest.onerror = updateRequest.onblocked = function() {
                showErrorMessage(strings.getString("label.error.indexedDB.acces.inpossible"));
            };

            updateRequest.onsuccess = function(event) {
                clearInput();
            };

            trans.oncomplete = function(e) {
                db.close();
                myStorage.indexedDB.getAllTodoItems();
            };
        }
    };
    request.onerror = myStorage.indexedDB.onerror;
};

myStorage.indexedDB.getAllTodoItems = function() {
    myStorage.indexedDB.load();
    var request = indexedDB.open(config.getConfig("indexedDBDatabaseName"));
    request.onsuccess = function(e) {
        var db = e.target.result;
        var trans = db.transaction([tableNameEntreprise], myStorage.IDBTransactionModes.READ_WRITE);
        var store = trans.objectStore(tableNameEntreprise);
        // Get everything in the store;
        var keyRange = IDBKeyRange.lowerBound(0);
        var cursorRequest = store.openCursor(keyRange);

        cursorRequest.onsuccess = function(e) {
            var result = e.target.result;
            if (!!result == false) {
                return;
            }
            result.continue();
        };

        trans.oncomplete = function(e) {
            db.close();
        };

        showDetails("");
        cursorRequest.onerror = myStorage.indexedDB.onerror;
    };
    request.onerror = myStorage.indexedDB.onerror;
};

myStorage.indexedDB.deleteDB = function() {
    myStorage.indexedDB.load();
    var deleteRequest = indexedDB.deleteDatabase(config.getConfig("indexedDBDatabaseName"));
    deleteRequest.onsuccess = function(e)
    {
        alert("deleted");
        myStorage.indexedDB.create();
    }
    deleteRequest.onblocked = function(e)
    {
        alert("blocked");
    }
    deleteRequest.onerror = myStorage.indexedDB.onerror;
};



myStorage.IDBTransactionModes = {"READ_ONLY": "readonly", "READ_WRITE": "readwrite", "VERSION_CHANGE": "versionchange"};

