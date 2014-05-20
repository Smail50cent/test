/**
 *
 * @author Damien Chesneau <contact@damienchesneau.fr>
 */

$("#nbpersonnes_label").text(strings.getString("label.paramcommande.question.nbcouvers"));
$("#numerotable_label").text(strings.getString("label.paramcommande.question.choosetable"));
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
            startCommande($("#numTable").val(), $("#nbPersonnes").val());
        });
    } else {
        loadDataPersonnes(nbMaxPersonnes);
        $("#numeroTable_item").hide();
        $("#numTable").val(tables);
        $("#nbPersonnes").change(function() {
            startCommande(tables, $("#nbPersonnes").val());
        });
    }

    var personnes = new Array();
    personnes.push(new Personne(1, "Hamza", "Legdani"));
    personnes.push(new Personne(2, "Nicolas", "Perru"));
    personnes.push(new Personne(3, "Damien", "Chesneau"));
    createCookie("personnes.couverts", JSON.stringify(personnes), 1);
    createCookie("type.commande", 1, 1);
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
        for (var i = 0; i < tables.length; i++) {
            var itemOptionTable = htmlOptionTable;
            itemOptionTable = paramValue(itemOptionTable, "OptionName", strings.getString("label.choose.table.option.genreic") + " " + tables[i].numero);
            itemOptionTable = paramValue(itemOptionTable, "OptionValue", tables[i].id);
            $("#numTable").append(itemOptionTable);
        }
    }
}
function startCommande(numTable, nbPersonne) {
    createCookie("paramCommande.nbPersonne", nbPersonne, 3);
    createCookie("paramCommande.numTable", numTable, 3);
    document.location.href = "carte.php";
}