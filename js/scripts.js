/**
 *
 * @author Damien Chesneau <contact@damienchesneau.fr>
 */

var scripts = {};
function Script(url, priority, fors) {
    this.url = url;
    this.priority = priority;
    this.for = fors;
}
scripts.loadScripts = function(forpage, method) {
    load(getScripts(forpage), method);
    function getScripts(forpage) {
        var abonements = new Array();
        var url = "./config/scriptsToLoad.xml";
        $.ajax({
            type: "GET",
            url: url,
            dataType: "xml",
            async: false,
            success: function(xml) {
                var unit = $(xml).find("script[for='" + forpage + "']");
                unit.each(function() {
                    var priorite = parseInt($(this).attr('priority'));
                    var fors = $(this).attr('for');
                    abonements.push(new Script($(this).text(), priorite, fors));
                });
                function compare(a, b) {
                    if (a.priority < b.priority)
                        return -1;
                    if (a.priority > b.priority)
                        return 1;
                    return 0;
                }
                abonements = abonements.sort(compare);
            }
        });

        return abonements;
    }
    function load(abonements, method) {
        var scriptsLoaded = new Array();
        for (var i = 0; i < abonements.length; i++) {
            scriptsLoaded[i] = abonements[i].url;
            $.getScript("./js/" + abonements[i].url, function(data, textStatus, jqxhr) {

                if (jqxhr.status != 200) {
                    console.log("Error load script =" + $(this).attr('url'));
                } else {
                    console.log("Valid load script =" + $(this).attr('url'));
                    for (var j = 0; j < scriptsLoaded.length; j++) {
                        if (($(this).attr('url').indexOf(scriptsLoaded[j]) != -1)) {
                            scriptsLoaded [j] = "ok";
                            break;
                        }
                    }
//                    if (method != null) {
//                        method();
//                    } else {
////                        console.log('method == null');
//                    }
                    var finish = true;
                    for (var j = 0; j < scriptsLoaded.length; j++) {
                        if (scriptsLoaded[j] != "ok") {
                            finish = false;
                        }
                    }
                    if (finish) {
                        if (method != null) {
                            method();
                        } else {
                            console.log('method == null');
                        }
                    }

                }
            });
        }
    }
};
