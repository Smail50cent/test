var config = {};
config.getConfig = function(varName) {
    var ret = null;
    var url = "./config/config.xml";
    $.ajax({
        type: "GET",
        url: url,
        dataType: "xml",
        async: false,
        success: function(xml){
            var unit = $(xml).find('variables').find("variable[name='" + varName + "']");
            ret = unit.text();
        }
    });
    return ret;
};
