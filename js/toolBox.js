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
var encode = false;
function setLocalStorageValue(key, value) {
    if (encode) {
        key = encodeString(key);
        value = encodeString(value);
    }
    localStorage.setItem(key, value);
}
function getLocalStorageValue(key) {
    if (encode) {
        key = encodeString(key);
    }
    if (key in localStorage) {
        return decodeString(localStorage.getItem(key));
    } else {
        return null;
    }
}
function removeLocalStorageItem(key) {
    localStorage.removeItem(key);
}
