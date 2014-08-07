var language;
var strings = {};
if (navigator.browserLanguage) {
    language = navigator.browserLanguage;
} else {
    language = navigator.language;
}
var cookieLangName = "language";
//console.log(getLocalStorageValue(cookieLangName));
if (getLocalStorageValue(cookieLangName) == null) {
    var langues = (getLangagesSupported());
    for (var y = 0; y < langues.length; y++) {
        console.log(langues[y]);
        if (langues[y].navigatorVar == language) {
            setLocalStorageValue(cookieLangName, langues[y].id);
            break;
        }
    }
}
function setLanguage(lang) {
    setLocalStorageValue(cookieLangName, lang);
}
function getLanguage() {
    return getLocalStorageValue(cookieLangName);
}
var fileLangSupported = null;
function getLangagesSupported() {
    var ret = new Array();
    var url = "config/strings/languages_actifs.xml";
    if (fileLangSupported == null) {
        $.ajaxSetup({cache: true});
        $.ajax({
            type: "GET",
            url: url,
            dataType: "xml",
            async: false,
            success: function(xml) {
                fileLangSupported = xml;
            }
        });
        $.ajaxSetup({cache: false});
    }
    var unit = $(fileLangSupported).find("language");
    unit.each(function() {
        var id = ($(this).children("id").text());
        var isActif = ($(this).children("actif").text());
        var navigatorVar = ($(this).children("navigatorVar").text());
        var type = ($(this).children("type").text());
        var gmtLevel = ($(this).children("gmtLevel").text());
        var label = ($(this).children("label").text());
        var langue = {"id": id, "label": label, "gmt_level": gmtLevel, "actif": isActif, "type": type, "navigatorVar": navigatorVar};
        ret.push(langue);
    });
    return ret;
}

var oldUrl = null;
var fileStrings = null;
strings.getString = function(key) {
    var ret = "no result";
    var url = "";
    $.ajaxSetup({async: true, cache: true});
    var alllangs = getLangagesSupported();
    for (var i = 0; i < alllangs.length; i++) {
        if (parseInt(alllangs[i].id) == parseInt(getLanguage())) {
            url = "./config/strings/string_" + alllangs[i].type + ".xml";
            if (oldUrl == null || oldUrl != url) {
                oldUrl = url;
            }
            break;
        }
    }
    if (url == "") {
        url = "./config/strings/string_" + alllangs[0].type + ".xml";
        if (oldUrl == null) {
            oldUrl = url;
        }
    }
    var xmlTo;
    if (fileStrings == null || oldUrl != url) {
        $.ajax({
            type: "GET",
            url: url,
            dataType: "xml",
            async: false,
            success: function(xml) {
                fileStrings = xml;
            }
        });
    }
    var unit = $(fileStrings).find('strings').find("string[key='" + key + "']");
    ret = unit.text();
    return ret;
}
;

