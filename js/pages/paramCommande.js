/**
 *
 * @author Damien Chesneau <contact@damienchesneau.fr>
 */

$("#nbpersonnes_label").text(strings.getString("label.paramcommande.question.nbcouvers"));
$("#numerotable_label").text(strings.getString("label.paramcommande.question.choosetable"));
$('#all_snbutton_id').hide();
function onLoadParamCommande(nbMaxPersonnes, tables, chooseLang) {
    
    if (!chooseLang) {
        $("#choose_lang_id").hide();
    } else {
        var htmlOp = getOptionInChooseTable();
        var langs = getLangagesSupported();
        var itemFirst = htmlOp;
        itemFirst = paramValue(itemFirst, "OptionName", strings.getString("label.select.one.lang"));
        itemFirst = paramValue(itemFirst, "OptionValue", "no");
        $("#select_lang").append(itemFirst);
        for (var i = 0; i < langs.length; i++) {
            var itemOther = htmlOp;
            itemOther = paramValue(itemOther, "OptionName", langs[i][1]);
            itemOther = paramValue(itemOther, "OptionValue", langs[i][0]);
            $("#select_lang").append(itemOther);
        }
        $("#select_lang").change(function() {
            setLanguage($("#select_lang").val());
            document.location.href = "paramCommande.php";
        });
    }
    if (tables == null) {
        loadDataTables(tables);
        loadDataPersonnes(nbMaxPersonnes);
        $("#nbpersonnes_item").hide();
        $("#numTable").change(function() {
            $("#nbpersonnes_item").show();
            $("#numeroTable_item").hide();
        });
        $("#nbPersonnes").change(function() {
            scripts.loadScripts("compte", function() {
                onLoadCompte();
                var person = strings.getString("label.personne.auth");
                $('#nbr_personne_id').html(person + " n° " + (listePersonnes.length + 1));
                $('div#auth_popup_id').bind('dialogclose', function(event) {
                    AuthToCommande();
                });
            });

        });
    } else {
        loadDataPersonnes(nbMaxPersonnes);
        $("#numeroTable_item").hide();
        $("#numTable").val(tables);
        $("#nbPersonnes").change(function() {
            // TO DO *

            console.log("passage");
            startCommande(tables, $("#nbPersonnes").val());
        });
    }
    setLocalStorageValue("type.commande", 1);
    hideLoading();
}
function loadDataPersonnes(nbMaxPersonnes) {
    var htmlOptionTable = getOptionInChooseTable();
    var itemOptionPersonne = htmlOptionTable;
    itemOptionPersonne = paramValue(itemOptionPersonne, "OptionName", strings.getString("label.choose.table.option"));
    itemOptionPersonne = paramValue(itemOptionPersonne, "OptionValue", "no");
    $("#nbPersonnes").append(itemOptionPersonne);
    for (var i = 0; i < nbMaxPersonnes; i++) {
        var itemOptionPersonnes = htmlOptionTable;
        if ((i + 1) > 1) {
            itemOptionPersonnes = paramValue(itemOptionPersonnes, "OptionName", (i + 1) + " " + strings.getString("label.choose.table.option.personnePlur"));
        } else {
            itemOptionPersonnes = paramValue(itemOptionPersonnes, "OptionName", (i + 1) + " " + strings.getString("label.choose.table.option.personneSing"));
        }
        itemOptionPersonnes = paramValue(itemOptionPersonnes, "OptionValue", (i + 1));
        $("#nbPersonnes").append(itemOptionPersonnes);
    }
}
function loadDataTables(tables) {
    var htmlOptionTable = getOptionInChooseTable();
    var itemOptionTable = htmlOptionTable;
    itemOptionTable = paramValue(itemOptionTable, "OptionName", strings.getString("label.choose.table.option"));
    itemOptionTable = paramValue(itemOptionTable, "OptionValue", "no");
    $("#numTable").append(itemOptionTable);
    var connexion = getConnexion();
    connexion.getAllTables(printTables);
    function printTables(tables) {
    setLocalStorageValue("tables", JSON.stringify(tables));
        for (var i = 0; i < tables.length; i++) {
            var itemOptionTable = htmlOptionTable;
            itemOptionTable = paramValue(itemOptionTable, "OptionName", strings.getString("label.choose.table.option.genreic") + " " + tables[i].numero);
            itemOptionTable = paramValue(itemOptionTable, "OptionValue", tables[i].id);
            $("#numTable").append(itemOptionTable);
        }
    }
}
function startCommande(numTable, nbPersonne) {
    setLocalStorageValue("paramCommande.nbPersonne", nbPersonne);
    var tables = (JSON.parse(getLocalStorageValue("tables")));
    for(var i = 0 ; i < tables.length ; i++){
        if(tables[i].id == numTable){
            setLocalStorageValue("paramCommande.numTable", JSON.stringify(tables[i]));
        }
    }
//    document.location.href = "carte.php";
    redirictWhereFinishParamCommande();
}
