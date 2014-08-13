/**
 *
 * @author Damien Chesneau <contact@damienchesneau.fr>
 */

function onLoadGestionTables() {
    updateActivedLi(6);
    var html = getGererTablesPageGererTables();
    html = paramValue(html, "title", strings.getString("title.div.all.zonestables"));
    html = paramValue(html, "labelButtonAdd", strings.getString("label.addzonetable.button"));
    $("#new_container").html(html);
    printTableau();
}

function printTableau() {
    var htmlHead = getGererLesTablesTableAfficherAllZonesThead();
    htmlHead = paramValue(htmlHead, "nom", strings.getString("label.thead.zonestable.nom"));
    htmlHead = paramValue(htmlHead, "etablissement", strings.getString("label.thead.zonetable.etablissement"));
    htmlHead = paramValue(htmlHead, "tables", strings.getString("label.thead.zonetable.tables"));
    htmlHead = paramValue(htmlHead, "actions", strings.getString("label.thead.zonetable.actions"));
    $("#table_zonestables_all").html(htmlHead);
    getConnexion().getAllZoneTables(function(data, param) {
        for (var i = 0; i < data.length; i++) {
            var htmlBody = getGererLesTablesTableAfficherAllZonesTBody();
            htmlBody = paramValue(htmlBody, "idzoneTable", data[i].id);
            var etab = null;
            if (data[i].etablissement_id != null) {
                etab = data[i].etablissement_id.nom;
            }
            if (etab == null) {
                etab = strings.getString("label.etablissement.non.affecte.in.table");
            }
            htmlBody = paramValue(htmlBody, "etablissement", etab);
            htmlBody = paramValue(htmlBody, "nom", data[i].nom);
            var labelTab = "";
            var virgule = ",";
            if (data[i].tables != null) {
                for (var j = 0; j < data[i].tables.length; j++) {
                    if (j == data[i].tables.length - 1) {
                        virgule = "";
                    }
                    labelTab = labelTab + data[i].tables[j].numero + virgule;
                }
                htmlBody = paramValue(htmlBody, "tables", labelTab);
            }
            $("#table_zonestables_all").append(htmlBody);
        }
    }, null);
}
function removeZoneTable(id) {
    if (confirm(strings.getString("label.confirm.removing.zonetable"))) {
        getConnexion().removeZoneTable(function(data, param) {
            if (data == null) {
                $("tr[idzonetable='" + id + "']").remove();
            }
        }, id, null);
    }
}
function addZoneTable() {
    if ($("#myModal")) {
        $("#myModal").remove();
    }
    var htmlModel = getBootstrapModal();
    htmlModel = paramValue(htmlModel, "titre", strings.getString("title.modal.add.zone.tables"));
    htmlModel = paramValue(htmlModel, "closeLabel", strings.getString("label.fermer"));
    htmlModel = paramValue(htmlModel, "primaryLabel", strings.getString("label.valider"));
    htmlModel = paramValue(htmlModel, "onclick", "validerAddZoneTable();");
    $("body").append(htmlModel);
    var modalBody = getGererLesTablesDivAddZone();
    modalBody = paramValue(modalBody, "nbZone", 1);
    modalBody = paramValue(modalBody, "placeholder", strings.getString("label.add.etablissement.zone.addzone.input.placeholder"));
    $("#bootstrap_modal_body").html(modalBody);
    $('#myModal').modal('show');
}

function validerAddZoneTable() {
    var input = $("input[method='addEtablZone']");
    var nbzone = input.attr("nbzone");
    var zone = new ZoneTable();
    zone.id = parseInt(nbzone);
    zone.nom = input.val();
    var tables2 = new Array();
    for (var j = 1; j < $("ul[nbzone='" + nbzone + "'] li").length + 1; j++) {
        var nom = $("input[nbzone='" + nbzone + "'][nbtable='" + j + "']").val();
        var is = isInt(nom);
        if (is) {
            tables2.push(parseInt(nom));
        }
    }
    zone.tables = tables2;
    if (zone.nom != "") {
        getConnexion().addZoneTable(function(data, param) {
            $('#myModal').modal('hide');
            if (data != null) {
                if (data.hasOwnProperty("error")) {
                }
                if (data.hasOwnProperty("id")) {
                    var htmlBody = getGererLesTablesTableAfficherAllZonesTBody();
                    htmlBody = paramValue(htmlBody, "idzoneTable", data.id);
                    var etab = null;
                    if (etab == null) {
                        etab = strings.getString("label.etablissement.non.affecte.in.table");
                    }
                    htmlBody = paramValue(htmlBody, "etablissement", etab);
                    htmlBody = paramValue(htmlBody, "nom", param.nom);
                    var labelTab = "";
                    var virgule = ",";
                    if (param.tables != null) {
                        for (var j = 0; j < param.tables.length; j++) {
                            if (j == param.tables.length - 1) {
                                virgule = "";
                            }
                            labelTab = labelTab + param.tables[j] + virgule;

                        }
                        htmlBody = paramValue(htmlBody, "tables", labelTab);
                    }
                    $("#table_zonestables_all").append(htmlBody);
                }
            }
        }, zone, zone);
    }
}
var updateZone = null;
var nbTables = 1;
function updateZoneTable(id) {
    updateZone = id;
    if ($("#myModal")) {
        $("#myModal").remove();
    }
    getConnexion().getZoneTableById(function(data, param) {
        var htmlModel = getBootstrapModal();
        htmlModel = paramValue(htmlModel, "titre", strings.getString("label.zone.table.update.title"));
        htmlModel = paramValue(htmlModel, "closeLabel", strings.getString("label.fermer"));
        htmlModel = paramValue(htmlModel, "primaryLabel", strings.getString("label.valider"));
        htmlModel = paramValue(htmlModel, "onclick", "validerUpdateTable();");
        $("body").append(htmlModel);
        var modalBody = getGererLesTablesModalBodyUpdateZone();
        modalBody = paramValue(modalBody, "nbZone", id);
        modalBody = paramValue(modalBody, "placeholder", strings.getString("label.add.etablissement.zone.addzone.input.placeholder"));
        $("#bootstrap_modal_body").html(modalBody);
        $('#myModal').modal('show');
        $("input[nbzone='"+id+"'][method='updateZone']").val(data.nom);
        for (var i = 0; i < data.tables.length; i++) {
            var htmlTabAlreadyExsist = getGererLesTablesShowTablesAlreadyInZoneTable();
            htmlTabAlreadyExsist = paramValue(htmlTabAlreadyExsist, "idzonetable", data.id);
            htmlTabAlreadyExsist = paramValue(htmlTabAlreadyExsist, "idtable", data.tables[i].id);
            htmlTabAlreadyExsist = paramValue(htmlTabAlreadyExsist, "numero", data.tables[i].numero);
            $("ul[nbzone='1']").append(htmlTabAlreadyExsist);
        }
        nbTables++;
        var htmlNewTable = getGererLesTablesLiUpdateAddNewTable();
        htmlNewTable = paramValue(htmlNewTable, "idzonetable", data.id);
        htmlNewTable = paramValue(htmlNewTable, "placeholder", strings.getString("label.updatezonetable.addnewTable"));
        htmlNewTable = paramValue(htmlNewTable, "idtable", nbTables);
        $("#add_a_new_table").append(htmlNewTable);
    }, id, null);
}
function validerUpdateTable() {
    var nomZone = $("input[nbzone='" + updateZone + "'][method='updateZone']").val();
    console.log("nomZone = ",nomZone);
    getConnexion().updateZoneTable(function(data,param) {
        $("p[idzonetable='"+updateZone+"'][typelabel='nom'']").text(nomZone);
    }, nomZone, parseInt(updateZone), null);
}
function removeTable(id) {
    getConnexion().removeTable(function(data, param) {
        if (data != null) {
            if (!data.hasOwnProperty("error")) {
                console.log("Error");
            }
        } else {
            $("li[idzonetable='" + updateZone + "'][idtable='" + id + "']").remove();
        }
    }, id, null);
}

function addNewTable() {
    var numerotable = $("input[nbtable='" + nbTables + "'][idzonetable='" + updateZone + "']").val();
    console.log(numerotable);
    getConnexion().addNewTable(function(data, param) {
        if (data == null) {
            if (data.hasOwnProperty("error")) {
                console.log("Error");
            }
        } else {
            console.log(data);
            var htmlTabAlreadyExsist = getGererLesTablesShowTablesAlreadyInZoneTable();
            htmlTabAlreadyExsist = paramValue(htmlTabAlreadyExsist, "idzonetable", updateZone);
            htmlTabAlreadyExsist = paramValue(htmlTabAlreadyExsist, "idtable", data.id);
            htmlTabAlreadyExsist = paramValue(htmlTabAlreadyExsist, "numero", numerotable);
            $("ul[nbzone='" + updateZone + "']").append(htmlTabAlreadyExsist);
        }
    }, numerotable, updateZone, null);
}