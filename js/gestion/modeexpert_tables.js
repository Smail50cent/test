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
        console.log(data);
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
                console.log(data[i]);
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
        if(data==null){
            $("tr [idzonetable='" + id + "']").remove();
        }
    }, id, null);
}
function addZoneTable (){
    if ($("#myModal")) {
        $("#myModal").remove();
    }
    var htmlModel = getBootstrapModal();
    htmlModel = paramValue(htmlModel, "titre", strings.getString("title.modal.add.zone.tables"));
    htmlModel = paramValue(htmlModel, "closeLabel", strings.getString("label.fermer"));
    htmlModel = paramValue(htmlModel, "primaryLabel", strings.getString("label.valider"));
    htmlModel = paramValue(htmlModel, "onclick", "valderAjoutEtablissement();");
    $("body").append(htmlModel);
    getConnexion().getGroupeById(updatePlaceHolder, config.getConfig("client.application.groupe.id"), null);
    function updatePlaceHolder(groupe, param) {
        groupex = groupe;
        $("#add_site_nom_value").attr("required", true);
        $("#add_site_style_value").attr("placeholder", groupe.style);
        $("#add_site_logo_value").attr("placeholder", groupe.logo);
        $("#add_site_adresse_value").attr("placeholder", groupe.adresseSiege);
        $("#add_site_telephone_value").attr("placeholder", groupe.telephone);
        $("#add_site_message_value").attr("placeholder", groupe.message);
        $("#add_site_slogan_value").attr("placeholder", groupe.slogan);
    }
    $("#bootstrap_modal_body").html('');
    $('#myModal').modal('show');
}