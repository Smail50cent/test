var key = "SXGWLZPDOKFIVUHJYTQBNMACERxswgzldpkoifuvjhtybqmncare";
function decodeString(coded) {
    coded = decodeURIComponent(coded);
    var uncoded = "";
    var chr;
    for (var i = coded.length - 1; i >= 0; i--) {
        chr = coded.charAt(i);
        uncoded += (chr >= "a" && chr <= "z" || chr >= "A" && chr <= "Z") ?
                String.fromCharCode(65 + key.indexOf(chr) % 26) :
                chr;
    }
    return uncoded;
    0
}
function encodeString(uncoded) {
    uncoded = uncoded.toUpperCase().replace(/^\s+|\s+$/g, "");
    var coded = "";
    var chr;
    for (var i = uncoded.length - 1; i >= 0; i--) {
        chr = uncoded.charCodeAt(i);
        coded += (chr >= 65 && chr <= 90) ?
                key.charAt(chr - 65 + 26 * Math.floor(Math.random() * 2)) :
                String.fromCharCode(chr);
    }
    return encodeURIComponent(coded);
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