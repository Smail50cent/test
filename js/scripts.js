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
        $.ajaxSetup({cache: true});
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
        var finish = true;
        
        var scriptsLoaded = new Array();
        var lenEnd = 0;
        for (var i = 0; i < abonements.length; i++) {
            scriptsLoaded[i] = abonements[i].url;$.ajaxSetup({async: false, cache: true});
            $.getScript("./js/" + abonements[i].url, function(data, textStatus, jqxhr) {
                lenEnd++;
                if (jqxhr.status != 200) {
//                    console.log("Error load script =" + $(this).attr('url'));
                } else {
//                    console.log("Valid load script =" + $(this).attr('url'));
                }
            });  
        }
        testIfWeCanExec();
        function testIfWeCanExec() {
            window.setTimeout(function() {
                if (lenEnd == abonements.length) {
                    if (method != null) {
                        method();
                    } else {
//                            console.log('method == null');
                    }
                } else {
                    testIfWeCanExec();
                }
            }, 0);
        }
      
    }
    function errorManagement(scriptToLoad) {
        for (var i = 0; i < scriptToLoad.length; i++) {
            if (scriptToLoad[i] != "ok") {
                $.getScript("./js/" + scriptToLoad[i], function(data, textStatus, jqxhr) {
                    console.log("rechargé");
                });
            }

        }

    }
};
function init() {
    if (isIndexedDBSupported()) {
        myStorage.indexedDB.create(); // open displays the data previously saved
    }
    $.ajaxSetup({async: true,cache:true});
    $.getScript("./js/control.js");
}
scripts.loadScripts("all", function() {
    showLoading();
    if (isLocalBddSuppored()) {
        if (isIndexedDBSupported()) {
            scripts.loadScripts("data.indexeddb", init);
        } else if (isWebSQLSupported()) {
            scripts.loadScripts("data.websql", init);
        } else {
            init();
        }
    } else {
        init();
    }
});