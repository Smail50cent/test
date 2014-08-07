var config = {};
var fileConfig = null;
config.getConfig = function(varName) {
    var ret = null;
    var url = "./config/config.xml";
    if (fileConfig == null) {
        $.ajaxSetup({cache: true});
        $.ajax({
            type: "GET",
            url: url,
            dataType: "xml",
            async: false,
            success: function(xml) {
                fileConfig = xml;
            }
        });
        $.ajaxSetup({cache: false});
    }
    var unit = $(fileConfig).find('variables').find("variable[name='" + varName + "']");
    ret = unit.text();
    return ret;
};
