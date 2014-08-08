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
    printTableau();//getGererLesTablesModalBodyUpdateZone
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
            var etab = data[i].etablissement_id.nom;
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
    getConnexion().removeZoneTable(function(data, param) {
        if (data == null) {
            $("tr[idzonetable='" + id + "']").remove();
        }
    }, id, null);
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
function updateZoneTable(id) {
    if ($("#myModal")) {
        $("#myModal").remove();
    }
    getConnexion().getZoneTableById(function(data, param) {
        var htmlModel = getBootstrapModal();
        htmlModel = paramValue(htmlModel, "titre", strings.getString("title.modal.add.zone.tables"));
        htmlModel = paramValue(htmlModel, "closeLabel", strings.getString("label.fermer"));
        htmlModel = paramValue(htmlModel, "primaryLabel", strings.getString("label.valider"));
        htmlModel = paramValue(htmlModel, "onclick", "validerAddZoneTable();");
        $("body").append(htmlModel);
        var modalBody = getGererLesTablesModalBodyUpdateZone();
        modalBody = paramValue(modalBody, "nbZone", 1);
        modalBody = paramValue(modalBody, "placeholder", strings.getString("label.add.etablissement.zone.addzone.input.placeholder"));
        $("#bootstrap_modal_body").html(modalBody);
        $('#myModal').modal('show');
        console.log(data);
        $("input[nbzone='1'][method='updateZone']").val(data.nom);
        for (var i = 0; i < data.tables.length; i++) {
            var htmlTabAlreadyExsist = getGererLesTablesShowTablesAlreadyInZoneTable();
            htmlTabAlreadyExsist = paramValue(htmlTabAlreadyExsist, "idzonetable", data.id);
            htmlTabAlreadyExsist = paramValue(htmlTabAlreadyExsist, "idtable", data.table[i].id);
            
        }

    }, id, null);

}