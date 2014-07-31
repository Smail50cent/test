var language;
var strings = {};
if (navigator.browserLanguage) {
    language = navigator.browserLanguage;
} else {
    language = navigator.language;
}
var cookieLangName = "language";
if (getLocalStorageValue(cookieLangName) == null) {
    setLocalStorageValue(cookieLangName, getLangagesSupported()[0][0]);
}
function setLanguage(lang) {
    setLocalStorageValue(cookieLangName, lang);
}
function getLanguage() {
    return getLocalStorageValue(cookieLangName);
}
function getLangagesSupported() {
    var ret = new Array();
    ret.push(new Array("fr_FR", "Français", "./config/string_fr_FR.xml"));
    ret.push(new Array("en-US", "English", "./config/string_en_US.xml"));
    return ret;
}
strings.getString = function(key) {
    var ret = "no result";
    var url = "";
    $.ajaxSetup({async: true, cache: true});
    switch (getLanguage()) {
        case "fr_FR":
            url = "./config/strings/string_fr_FR.xml";
            break;
        case "en-US":
            url = "./config/strings/string_en_US.xml";
            break;
        default:
            url = "./config/strings/string_fr_FR.xml";
            break;
    }
    $.ajax({
        type: "GET",
        url: url,
        dataType: "xml",
        async: false,
        success: function(xml) {
            var unit = $(xml).find('strings').find("string[key='" + key + "']");
            ret = unit.text();
        }
    });
    return ret;
};

