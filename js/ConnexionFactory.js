function getConnexion() {
    if (isConnected) {
    //if (false) {
        return getConnexionServeur();
    } else {
        if (isLocalBddSuppored()) {
            return getImplOfConnexionLocal();
        } else {
            if (isMozilla()) {
                return getConnexionServeur();
            } else {
                return getImplOfConnexionLocal();
            }
        }
    }
}

function getImplOfConnexionLocal() {
    var ret;
    if (isIndexedDBSupported()) {
        ret = new ConnexionLocalIndexedDB();
    } else if (isWebSQLSupported()) {
        if (isWebSQLImlemented()) {
            ret = new ConnexionLocalWebSQL();
        } else {
            ret = getConnexionServeur();
        }
    } else {
        ret = getConnexionServeur();
    }
    return ret;
}
function isLocalBddSuppored() {
    var ret = false;
    if (isIndexedDBSupported()) {
        ret = true
    } else if (isWebSQLSupported()) {
        ret = true;
    }
    return ret;
}

function isMozilla() {
    var ret = false;
    if (testNavigator("Mozilla")) {
        ret = true;
    }
    if (testNavigator("Chrome")) {
        ret = false;
    }
    return ret;
}
function testNavigator(naviator) {
    var ret = false;
    var ua = navigator.userAgent;
    if (ua.indexOf(naviator) != -1) {
        ret = true;
    }
    return ret;
}
function getConnexionServeur() {
    return new ConnexionServer();
}
function isIndexedDBSupported() {
    var isSupported = false;
    indexedDB = window.indexedDB || window.webkitIndexedDB || window.mozIndexedDB || window.OIndexedDB || window.msIndexedDB
    if (indexedDB) {
        isSupported = true;
    }
    return isSupported;
}
function isWebSQLSupported() {
    var isSupported = false;
    if (window.openDatabase) {
        isSupported = true;
    }
    return isSupported;
}
function isWebSQLImlemented() {
    return false;
}
function setUpdateLevelOfTable(table, level) {
    setLocalStorageValue(table, level);
}
function getUpdateLevelOfTable(table) {
    return parseInt(getLocalStorageValue(table));
}
function incrementeLevelOfTable(table) {
    var level = getUpdateLevelOfTable(table);
    if (level == null) {
        level = 1;
    } else {
        level = parseInt(level);
    }
    level += (1);
    setLocalStorageValue(table, level);
}
