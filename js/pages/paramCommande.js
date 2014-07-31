/**
 *
 * @author Damien Chesneau <contact@damienchesneau.fr>
 */

$("#nbpersonnes_label").text(strings.getString("label.paramcommande.question.nbcouvers"));
$("#numerotable_label").text(strings.getString("label.paramcommande.question.choosetable"));
$('#all_snbutton_id').hide();
function onLoadParamCommande(nbMaxPersonnes, tables, chooseLang) {
//    if (zoneTable) {
    var typeCommande = parseInt(getLocalStorageValue("type.commande"));
    if (typeCommande == 5) {

    }
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
            var connexion = getConnexion();
            connexion.getParametreApplicationByNom(chooseIfOpCompte, config.getConfig("parametre.app.gestion.utilisateurs"), null);
        });
    } else {
        loadDataPersonnes(nbMaxPersonnes);
        $("#numeroTable_item").hide();
        $("#numTable").val(tables);
        $("#nbPersonnes").change(function() {
            startCommande(tables, $("#nbPersonnes").val());
        });
    }
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
var zoneTables;
function loadDataTables(tables) {
    setLocalStorageValue("tables", JSON.stringify(tables));
    $("#zoneTable").change(function() {
        printTableByIdZone($(this).val(), zoneTables);
    });
    var htmlOptionTable = getOptionInChooseTable();
    var connexion = getConnexion();
    var idet = parseInt(getLocalStorageValue("client.application.etablissement.id"));
    connexion.getZonesTablesByEtablissement(printTables, idet, null);
    function printTables(zoneTable, param) {
        zoneTables = zoneTable;
        for (var i = 0; i < zoneTable.length; i++) {
            var itemOptionTable = htmlOptionTable;
            itemOptionTable = paramValue(itemOptionTable, "OptionName", strings.getString("label.choix.table.choix.zone.label.option") + zoneTable[i].nom);
            itemOptionTable = paramValue(itemOptionTable, "OptionValue", i);
            $("#zoneTable").append(itemOptionTable);
        }
        printTableByIdZone(0, zoneTable);
        if (getTypeSequence() == 5) {
            var serveur = JSON.parse(getLocalStorageValue("personnes.serveur"));
            var zoneServeur = serveur.serveurProperty.zoneTableDefaut;
            for (var i = 0; i < zoneTable.length; i++) {
                if (zoneTable[i].id == zoneServeur) {
                    $('#zoneTable option[value="' + i + '"]').prop('selected', true);
                    printTableByIdZone(i, zoneTable);
                    break;
                }
            }
        }
    }
}
function printTableByIdZone(index, zonetables) {
    $("#numTable").html("");
    var htmlOptionTable = getOptionInChooseTable();
    var itemOptionTable = htmlOptionTable;
    itemOptionTable = paramValue(itemOptionTable, "OptionName", strings.getString("label.choose.table.option"));
    itemOptionTable = paramValue(itemOptionTable, "OptionValue", "no");
    $("#numTable").append(itemOptionTable);
    for (var i = 0; i < zonetables[index].tables.length; i++) {
        var itemOptionTable = htmlOptionTable;
        itemOptionTable = paramValue(itemOptionTable, "OptionName", strings.getString("label.choose.table.option.genreic") + " " + zonetables[index].tables[i].numero);
        itemOptionTable = paramValue(itemOptionTable, "OptionValue", zonetables[0].tables[i].id);
        $("#numTable").append(itemOptionTable);
    }
    setLocalStorageValue("tables", JSON.stringify(zonetables[index].tables));
}

function startCommande(numTable, nbPersonne) {
    setLocalStorageValue("paramCommande.nbPersonne", nbPersonne);
    var tables = (JSON.parse(getLocalStorageValue("tables")));
    for (var i = 0; i < tables.length; i++) {
        if (tables[i].id == numTable) {
            setLocalStorageValue("paramCommande.numTable", JSON.stringify(tables[i]));
        }
    }
    redirictWhereFinishParamCommande();
}
function chooseIfOpCompte(paramApp, param) {
    console.log(paramApp);


    var test = JSON.parse(paramApp.getValeur_parametre());
    console.log(test);
    if (test == true) {
        console.log("load compte");
        onLoadCompte(true, null, "-17", null);
    } else {
        var personnes = new Array();
        for (var i = 0; i < parseInt($("#nbPersonnes").val()); i++) {
            var connexion = getConnexion();
            connexion.addCompte(insertFromLastId, "Visiteur", 3, {"i": i});
            function insertFromLastId(LastId, param) {
                var prenom = strings.getString("label.where.gestion.user.disable");
                var nom = (i + 1);
                connexion.addAttributCompte(2, nom, 1, LastId);
                connexion.addAttributCompte(3, prenom, 1, LastId);
                var personne = new Personne();
                personne.setId(LastId);
                personne.setNom(nom);
                personne.setPrenom(prenom);
                listePersonnes.push(personne);
                setLocalStorageValue("personnes.couverts", JSON.stringify(listePersonnes));
                if ((param.i + 1) == parseInt($("#nbPersonnes").val())) {
                    startCommande($("#numTable").val(), $("#nbPersonnes").val());
                }
            }
        }
//        redirictWhereFinishParamCommande();
    }
}