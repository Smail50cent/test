/**
 *
 * @author Damien Chesneau <contact@damienchesneau.fr>
 */
var addedTablesAndZones = new Array();
function loadGestionSites() {
    updateActivedLi(1);
    var htmlGererLesSites = getGererlesSites();
    htmlGererLesSites = paramValue(htmlGererLesSites, "title", "Gérer les sites");
    $("#new_container").html(htmlGererLesSites);
    $("#table_gererlessites_all").append(getGererlesSitesTableThead());
    var htmlTbody = getGererlesSitesTableTbodyTr();
    $("#tr_actions_tablesites").text(strings.getString("label.gererlessites.table.head.action.tr"));
    getConnexion().getAllEtablissementsWithZones(addItems, null);
    function addItems(etablissements, param) {
        for (var i = 0; i < etablissements.length; i++) {
            ;
            if (etablissements[i].nom != null) {
            } else {
                etablissements[i].nom = etablissements[i].groupe.nom;
            }
            if (etablissements[i].logo != null) {
            } else {
                etablissements[i].logo = etablissements[i].groupe.logo;
            }
            if (etablissements[i].adresseEtab != null) {
            } else {
                etablissements[i].adresseEtab = etablissements[i].groupe.adresseSiege;
            }
            if (etablissements[i].style != null) {
            } else {
                etablissements[i].style = etablissements[i].groupe.style;
            }
            if (etablissements[i].slogan != null) {
            } else {
                etablissements[i].slogan = etablissements[i].groupe.slogan;
            }
            if (etablissements[i].telephone != null) {
            } else {
                etablissements[i].telephone = etablissements[i].groupe.telephone;
            }
            if (etablissements[i].message != null) {
            } else {
                etablissements[i].message = etablissements[i].groupe.message;
            }
            var litbody = htmlTbody;
            litbody = paramValue(litbody, "nom", etablissements[i].nom);
            litbody = paramValue(litbody, "logo", etablissements[i].logo);
            litbody = paramValue(litbody, "style", etablissements[i].style);
            litbody = paramValue(litbody, "adresseEtab", etablissements[i].adresseEtab);
            litbody = paramValue(litbody, "telephone", etablissements[i].telephone);
            litbody = paramValue(litbody, "message", etablissements[i].message);
            litbody = paramValue(litbody, "slogan", etablissements[i].slogan);
            litbody = paramValue(litbody, "idetab", etablissements[i].id);
            litbody = paramValue(litbody, "groupe", etablissements[i].groupe.nom);
            var htmlZone = "";
            for (var j = 0; j < etablissements[i].zones.length; j++) {
                if (etablissements[i].zones.length - 1 == j) {
                    htmlZone += "<p class=\"a_zone_structure a_zone_personalize\">" + etablissements[i].zones[j].nom + "</p>";
                } else {
                    htmlZone += "<p class=\"a_zone_structure a_zone_personalize\">" + etablissements[i].zones[j].nom + ",</p>";
                }
            }
            litbody = paramValue(litbody, "zones", htmlZone);
            $("#table_gererlessites_all").append(litbody);
        }
    }
}
var groupex = null;
var stylesIn = null;
function addEtablissement() {
    if ($("#myModal")) {
        $("#myModal").remove();
    }
    var htmlModel = getBootstrapModal();
    htmlModel = paramValue(htmlModel, "titre", strings.getString("label.gererlessites.table.modal.title"));
    htmlModel = paramValue(htmlModel, "closeLabel", strings.getString("label.fermer"));
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
    var htmlBodyModal = getAddSiteModalBody();
    $("#bootstrap_modal_body").html('');
    $("#bootstrap_modal_body").append(htmlBodyModal);
    $("#a_help_add_new_zone").text(strings.getString("label.addsite.addzoneinsite.pas.presente"));
    $("#add_site_nom_id").text(strings.getString("label.gererlessites.table.modal.label.nom"));
    $("#add_site_style_id").text(strings.getString("label.gererlessites.table.modal.label.style"));
    $("#add_site_logo_id").text(strings.getString("label.gererlessites.table.modal.label.logo"));
    $("#add_site_adresse_id").text(strings.getString("label.gererlessites.table.modal.label.adresse"));
    $("#add_site_telephone_id").text(strings.getString("label.gererlessites.table.modal.label.telephone"));
    $("#add_site_message_id").text(strings.getString("label.gererlessites.table.modal.label.message"));
    $("#add_site_slogan_id").text(strings.getString("label.gererlessites.table.modal.label.slogan"));
    $("#add_td_tabzone").remove();
    getConnexion().getAllStyles(function(styles, param) {
        stylesIn = styles;
        $("#add_site_style_value").html("");
        for (var i = 0; i < styles.length; i++) {
            $("#add_site_style_value").append("<option value=" + styles[i].url + ">" + styles[i].nom + "</option>");
        }
    }, null);
    var htmlLiZone = getGererSitesLiSelectZone();
    getConnexion().getZoneTablesWhereEtablissementNull(function(zones, param) {
        for (var i = 0; i < zones.length; i++) {
            var myLi = htmlLiZone;
            myLi = paramValue(myLi, "zoneName", zones[i].nom);
            myLi = paramValue(myLi, "idZone", zones[i].id);
            $("#add_site_zone_value").append(myLi);
        }
        var htmlGerer = getGererSitesLiAddZone();
        var myGererSiteLiZone = htmlGerer;
        myGererSiteLiZone = paramValue(myGererSiteLiZone, "nbZone", nbzone);
        myGererSiteLiZone = paramValue(myGererSiteLiZone, "placeholder", strings.getString("label.add.etablissement.zone.addzone.input.placeholder"));
        $("#add_site_zone_value").append(myGererSiteLiZone);
    }, null);
    $('#myModal').modal('show');
}
var nbzone = 0;
function appendNewZone() {
    var htmlGerer = getGererSitesLiAddZone();
    var myGererSiteLiZone = htmlGerer;
    nbzone++;
    myGererSiteLiZone = paramValue(myGererSiteLiZone, "nbZone", nbzone);
    myGererSiteLiZone = paramValue(myGererSiteLiZone, "placeholder", strings.getString("label.add.etablissement.zone.addzone.input.placeholder"));
    $("#add_site_zone_value").append(myGererSiteLiZone);
}
var idEtabToUpdate = "";
function updateEtablissement(id) {
    if ($("#myModal")) {
        $("#myModal").remove();
    }
    idEtabToUpdate = id;
    getConnexion().getEtablissementById(showEtbById, id, null);
    function showEtbById(etablissement, param) {
        var htmlModel = getBootstrapModal();
        htmlModel = paramValue(htmlModel, "titre", strings.getString("label.gererlessites.table.modal.title"));
        htmlModel = paramValue(htmlModel, "closeLabel", strings.getString("label.fermer"));
        htmlModel = paramValue(htmlModel, "primaryLabel", strings.getString("label.valider"));
        htmlModel = paramValue(htmlModel, "onclick", "validerUpdateEtablissement();");
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
        var htmlBodyModal = getAddSiteModalBody();
        $("#bootstrap_modal_body").html("");
        $("#bootstrap_modal_body").append(htmlBodyModal);
        $("#add_site_nom_id").text(strings.getString("label.gererlessites.table.modal.label.nom"));
        $("#add_site_style_id").text(strings.getString("label.gererlessites.table.modal.label.style"));
        $("#add_site_logo_id").text(strings.getString("label.gererlessites.table.modal.label.logo"));
        $("#add_site_adresse_id").text(strings.getString("label.gererlessites.table.modal.label.adresse"));
        $("#add_site_telephone_id").text(strings.getString("label.gererlessites.table.modal.label.telephone"));
        $("#add_site_message_id").text(strings.getString("label.gererlessites.table.modal.label.message"));
        $("#add_site_slogan_id").text(strings.getString("label.gererlessites.table.modal.label.slogan"));
        $("#add_site_nom_value").val(etablissement.nom);
        $("#add_site_style_value").val(etablissement.style);
        $("#add_site_logo_value").val(etablissement.logo);
        $("#add_site_adresse_value").val(etablissement.adresseEtab);
        $("#add_site_telephone_value").val(etablissement.telephone);
        $("#add_site_message_value").val(etablissement.message);
        $("#add_site_slogan_value").val(etablissement.slogan);
        getConnexion().getAllStyles(function(styles, param) {
            stylesIn = styles;
            $("#add_site_style_value").html("");
            for (var i = 0; i < styles.length; i++) {
                console.log(styles[i]);
                $("#add_site_style_value").append("<option value=" + styles[i].url + ">" + styles[i].nom + "</option>");
            }
            var text1 = etablissement.style;
            $("select option").filter(function() {
                return $(this).val() == text1;
            }).prop('selected', true);
        }, null);
        $('#myModal').modal('show');
    }
}

function validerUpdateEtablissement() {
    var etablissement = new Etablissement();
    etablissement.id = idEtabToUpdate;
    etablissement.nom = $("#add_site_nom_value").val();
    if ($("#add_site_logo_value").val() != "") {
        etablissement.logo = $("#add_site_logo_value").val();
    } else {
        etablissement.logo = null;
    }
    if ($("#add_site_style_value").val() != "") {
        etablissement.style = $("#add_site_style_value").val();
    } else {
        etablissement.style = null;
    }
    if ($("#add_site_adresse_value").val() != "") {
        etablissement.adresseEtab = $("#add_site_adresse_value").val();
    } else {
        etablissement.adresseEtab = null;
    }
    if ($("#add_site_telephone_value").val() != "") {
        etablissement.telephone = $("#add_site_telephone_value").val();
    } else {
        etablissement.telephone = null;
    }
    if ($("#add_site_message_value").val() != "") {
        etablissement.message = $("#add_site_message_value").val();
    } else {
        etablissement.message = null;
    }
    if ($("#add_site_slogan_value").val() != "") {
        etablissement.slogan = $("#add_site_slogan_value").val();
    } else {
        etablissement.slogan = null;
    }
    etablissement.groupe = parseInt(config.getConfig("client.application.groupe.id"));
    getConnexion().updateEtablissement(function(data, param) {
        $('#myModal').modal('hide');
        var etablissement = param;
        var htmlTbody = getGererlesSitesTableTbodyTr();
        if (etablissement.id != 0) {
            if (etablissement.nom != null) {
            } else {
                etablissement.nom = groupex.nom;
            }
            if (etablissement.logo != null) {
            } else {
                etablissement.logo = groupex.logo;
            }
            if (etablissement.adresseEtab != null) {
            } else {
                etablissement.adresseEtab = groupex.adresseSiege;
            }
            if (etablissement.style != null) {
            } else {
                etablissement.style = groupex.style;
            }
            if (etablissement.slogan != null) {
            } else {
                etablissement.slogan = groupex.slogan;
            }
            if (etablissement.telephone != null) {
            } else {
                etablissement.telephone = groupex.telephone;
            }
            if (etablissement.message != null) {
            } else {
                etablissement.message = groupex.message;
            }
            $("p[idetablissement='" + etablissement.id + "'][typelabel='nom']").text(etablissement.nom);
            $("p[idetablissement='" + etablissement.id + "'][typelabel='logo']").text(etablissement.logo);
            $("p[idetablissement='" + etablissement.id + "'][typelabel='adresseEtab']").text(etablissement.adresseEtab);
            $("p[idetablissement='" + etablissement.id + "'][typelabel='style']").text(etablissement.style);
            $("p[idetablissement='" + etablissement.id + "'][typelabel='slogan']").text(etablissement.slogan);
            $("p[idetablissement='" + etablissement.id + "'][typelabel='telephone']").text(etablissement.telephone);
            $("p[idetablissement='" + etablissement.id + "'][typelabel='message']").text(etablissement.message);
        }
    }, etablissement, etablissement);

}
function removeEtablissement(id) {
    if (confirm(strings.getString("label.confirm.remove.etablissement"))) {
        getConnexion().removeEtablissement(function(data, param) {
            if (data == null) {
                $("tr[idetablissement='" + id + "']").remove();
            } else {
                if (!data.hasOwnProperty("error")) {
                    $("tr[idetablissement='" + id + "']").remove();
                }
            }
        }, id, null);
    }
}
function valderAjoutEtablissement() {
    if ($("#add_site_nom_value").val() == "") {
        var html = htmlInfoBootsrapMessage;
        html = paramValue(html, "strongText", "Attention !");
        html = paramValue(html, "littleText", strings.getString("label.error.nom.required"));
        $("#error_liste_modal").append(html);
    } else {
        var etablissement = new Etablissement();
        etablissement.nom = $("#add_site_nom_value").val();
        if ($("#add_site_logo_value").val() != "") {
            etablissement.logo = $("#add_site_logo_value").val();
        } else {
            etablissement.logo = null;
        }
        if ($("#add_site_style_value").val() != "") {
            etablissement.style = $("#add_site_style_value").val();
        } else {
            etablissement.style = null;
        }
        if ($("#add_site_adresse_value").val() != "") {
            etablissement.adresseEtab = $("#add_site_adresse_value").val();
        } else {
            etablissement.adresseEtab = null;
        }
        if ($("#add_site_telephone_value").val() != "") {
            etablissement.telephone = $("#add_site_telephone_value").val();
        } else {
            etablissement.telephone = null;
        }
        if ($("#add_site_message_value").val() != "") {
            etablissement.message = $("#add_site_message_value").val();
        } else {
            etablissement.message = null;
        }
        if ($("#add_site_slogan_value").val() != "") {
            etablissement.slogan = $("#add_site_slogan_value").val();
        } else {
            etablissement.slogan = null;
        }
        etablissement.groupe = parseInt(config.getConfig("client.application.groupe.id"));
        etablissement.zones = new Array();
        $("input[method='addEtabl']").each(function() {
            var idZone = $(this).attr("idzone");
            var checked = $(this).is(":checked");
            if (checked) {
                var zone = new ZoneTable();
                zone.id = parseInt(idZone);
                console.log($("p[idzone='" + idZone.trim() + "'][method='addEtabl']"));
                etablissement.zones.push(zone);
            }
        });
        $("input[method='addEtablZone']").each(function() {
            var nbzone = $(this).attr("nbzone");
            var zone = new ZoneTable();
            zone.id = parseInt(nbzone);
            zone.nom = $(this).val();
            var tables2 = new Array();
            for (var j = 1; j < $("ul[nbzone='" + nbzone + "'] li").length + 1; j++) {
                var nom = $("input[nbzone='" + nbzone + "'][nbtable='" + j + "']").val();
                tables2.push(nom);
            }
            zone.tables = tables2;
            if (zone.nom != "") {
                etablissement.zones.push(zone);
            }
        });
        if (etablissement.zones.length == 0) {
            etablissement.zones = null;
        }
        getConnexion().sendNewEtablissement(function(data, param) {
            $('#myModal').modal('hide');
            var htmlTbody = getGererlesSitesTableTbodyTr();
            if (data != 0) {
                if (etablissement.nom != null) {
                } else {
                    etablissement.nom = groupex.nom;
                }
                if (etablissement.logo != null) {
                } else {
                    etablissement.logo = groupex.logo;
                }
                if (etablissement.adresseEtab != null) {
                } else {
                    etablissement.adresseEtab = groupex.adresseSiege;
                }
                if (etablissement.style != null) {
                } else {
                    etablissement.style = groupex.style;
                }
                if (etablissement.slogan != null) {
                } else {
                    etablissement.slogan = groupex.slogan;
                }
                if (etablissement.telephone != null) {
                } else {
                    etablissement.telephone = groupex.telephone;
                }
                if (etablissement.message != null) {
                } else {
                    etablissement.message = groupex.message;
                }
                var litbody = htmlTbody;
                litbody = paramValue(litbody, "nom", etablissement.nom);
                litbody = paramValue(litbody, "logo", etablissement.logo);
                litbody = paramValue(litbody, "style", etablissement.style);
                litbody = paramValue(litbody, "adresseEtab", etablissement.adresseEtab);
                litbody = paramValue(litbody, "telephone", etablissement.telephone);
                litbody = paramValue(litbody, "message", etablissement.message);
                litbody = paramValue(litbody, "slogan", etablissement.slogan);
                litbody = paramValue(litbody, "idetab", data.id);
                litbody = paramValue(litbody, "groupe", groupex.nom);
                var htmlZone = "";
                if (etablissement.zones != null) {
                    for (var j = 0; j < etablissement.zones.length; j++) {
                        if (etablissement.zones.length - 1 == j) {
                            htmlZone += "<p class=\"a_zone_structure a_zone_personalize\">" + etablissement.zones[j].nom + "</p>";
                        } else {
                            htmlZone += "<p class=\"a_zone_structure a_zone_personalize\">" + etablissement.zones[j].nom + ",</p>";
                        }
                    }
                    litbody = paramValue(litbody, "zones", htmlZone);
                }
                $("#table_gererlessites_all").append(litbody);
                $("tr[idetablissement='" + data.id + "']").addClass("etablissemend_added");
                window.setTimeout(function() {
                    $("tr[idetablissement='" + data.id + "']").css("background-color", "transparent");
                }, 3000);
            }
        }, etablissement, null);
    }
}
var htmlLi = getGererTablesLiAddTableInDiv();
var idtableGlob = 1;//  
function showDialogAddTable(nbzone) {
    var htmlLiAddTable = getGererTablesLiAddTableInDiv();
    htmlLiAddTable = paramValue(htmlLiAddTable, "nbzone", nbzone);
    htmlLiAddTable = paramValue(htmlLiAddTable, "nbtable", idtableGlob);
    htmlLiAddTable = paramValue(htmlLiAddTable, "placeholder", strings.getString("label.add.etablissement.zone.addtable.input.placeholde"));
    idtableGlob++;
    $("ul[nbzone='" + nbzone + "'").append(htmlLiAddTable);
}
function addLiTable(append, idzone, idtable) {
    var newLii = htmlLi;
    newLii = paramValue(newLii, "idzone", idzone);
    newLii = paramValue(newLii, "placeholder", strings.getString("label.add.etablissement.zone.addtable.input.placeholde"));
    newLii = paramValue(newLii, "idtable", idtableGlob);
    idtableGlob++;
    if (append) {
        $("#ajout_a_table").append(newLii);
    } else {
        $("#ajout_a_table").html(newLii);
    }
}
function addTableInArray() {
//    addLiTable(true, 1, 1);
}