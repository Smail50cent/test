String.prototype.toEncodedString = function() {
    var ostr = this.toString().replace(/\s+/g, '');
    var x, nstr = '', len = ostr.length;
    for (x = 0; x < len; ++x) {
        nstr += (255 - ostr.charCodeAt(x)).toString(36).toUpperCase().toPaddedString(2, '0');
    }
    return nstr;
};
String.prototype.fromEncodedString = function() {
    var ostr = this.toString();
    var x, nstr = '', len = ostr.length;
    for (x = 0; x < len; x += 2) {
        nstr += String.fromCharCode(255 - parseInt(ostr.substr(x, 2), 36));
    }
    return nstr;
};
Number.prototype.toPaddedString = function(len, pad) {
    len = (len) ? Number(len) : 2;
    var dflt = (isNaN(this.toString())) ? " " : "0";
    pad = (pad) ? pad.toString().substr(0, 1) : dflt;
    var str = this.toString();
    if (dflt == "0") {
        while (str.length < len)
            str = pad + str;
    }
    else {
        while (str.length < len)
            str += pad;
    }
    return str;
};
String.prototype.toPaddedString = Number.prototype.toPaddedString;

function encodeString(toencode) {
    toencode = toencode.toString();
    return toencode.toEncodedString();
}
function decodeString(encoded) {
    return encoded.fromEncodedString();
}

function createCookie(name, value, days) {
//    value = encode(value);
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        var expires = "; expires=" + date.toGMTString();
    }
    else
        var expires = "";
    document.cookie = name + "=" + value + expires + "; path=/";
}

function readCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ')
            c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0) {
            var varT = true;
//            var string = decode(c.substring(nameEQ.length, c.length));
            return c.substring(nameEQ.length, c.length);
        }
    }
    return null;
}

function eraseCookie(name) {
    createCookie(name, "", -1);
}
function showLoading() {
    var html = getLoadingPict();
    if (!$("#loading_pict_id").length) {
        $("html").append(html);
    }
}
function hideLoading() {
    $("#loading_pict_id").remove();
}
function clone(obj) {
    if (null == obj || "object" != typeof obj)
        return obj;
    var copy = obj.constructor();
    for (var attr in obj) {
        if (obj.hasOwnProperty(attr))
            copy[attr] = obj[attr];
    }
    return copy;
}
function toEncoded() {
    return false;
}
function setLocalStorageValue(key, value) {
    if (toEncoded()) {
        key = encodeString(key);
//        value = encodeString(value);
    }
    localStorage.setItem(key, value);
}
function getLocalStorageValue(key) {
    if (toEncoded()) {
        key = encodeString(key);
    }
    if (key in localStorage) {
        return (localStorage.getItem(key));
    } else {
        return null;
    }
}
function removeLocalStorageItem(key) {
    localStorage.removeItem(key);
}
getServicePath = function(serviceKeyName) {
    var ret = "";
    ret += "./";
    ret += config.getConfig("serveur.clientaccess.servicesAccess") + "/";
    ret += config.getConfig(serviceKeyName);
    ret += config.getConfig("serveur.clientaccess.serviceSufixe");
    return ret;
};
this.getMethod = "GET";
this.postMethod = "POST";

this.typeReq = this.getMethod;

/**
 * Personalize Ajax
 * <code>
 if (methodParseData != null) {
 methodParseData(data, param, methodExecute);
 } else {
 methodExecute(data, param);
 }
 </code>                                                                   
 * @param Function methodParseData
 * @param Object config
 * @param Function methodExecute
 * @param Object param
 */
function pAjax(methodParseData, config, methodExecute, param) {
    var dataType = 'json';
    var async = true;
    var type = "GET";//POST
    var service = "";
    var mydata = null;
    var ifErrorSendAllDatas = false;
    if (config.hasOwnProperty("type")) {
        type = config.type;
    }
    if (config.hasOwnProperty("ifErrorSendAllDatas")) {
        ifErrorSendAllDatas = config.ifErrorSendAllDatas;
    }
    if (config.hasOwnProperty("data")) {
        mydata = config.data;
    }
    if (config.hasOwnProperty("async")) {
        async = config.async;
    }
    if (config.hasOwnProperty("dataType")) {
        dataType = config.dataType;
    }
    if (!config.hasOwnProperty("service")) {
        console.error("Erreur : entrez le chemin pour l'URL.");
    } else {
        service = config.service;
        $.ajax({
            url: getServicePath(service),
            type: type,
            dataType: dataType,
            async: async,
            data: mydata,
            success: function(data) {
                if (data.error == true) {
                    showErrorMessage(strings.getString("error.label.errror.action.serveur"));
                }
                if (methodExecute != null || methodParseData != null) {
                    if (ifErrorSendAllDatas) {
                        if (!data.error) {
                            data = data.data;
                        }
                    } else {
                        data = data.data;
                    }
                    if (methodParseData != null) {
                        methodParseData(data, param, methodExecute);
                    } else {
                        methodExecute(data, param);
                    }
                }
            },
            error: function(xhr, textStatus, errorThrown) {
                console.log(xhr, textStatus, errorThrown);
                showErrorMessage(strings.getString("label.error.connexion.serveur"));
            }
        });
    }
}
function isInt(n) {
   return n % 1 === 0;
}
