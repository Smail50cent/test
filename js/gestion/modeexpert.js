/**
 *
 * @author Damien Chesneau <contact@damienchesneau.fr>
 */
function onModeExpertLoaded() {
    scripts.loadScripts("bootstrapall", loadAll());
}
function loadAll() {
    loadMenus();
    loadGestionSites();
}
function loadMenus() {
    var htmlLi = getBootstrapNavPillLi();
    var li = htmlLi;
    li = paramValue(li, "nbNotification", "");
    li = paramValue(li, "onclick", "loadGestionSites();");
    li = paramValue(li, "class", "active");
    li = paramValue(li, "name", "Gérer les sites");
    $("#nav_menu_right_ul_detail_id").append(li);
    var li = htmlLi;
    li = paramValue(li, "nbNotification", "");
    li = paramValue(li, "onclick", "");
    li = paramValue(li, "class", "");
    li = paramValue(li, "name", "Gérer les catégories");
    $("#nav_menu_right_ul_detail_id").append(li);
    var li = htmlLi;
    li = paramValue(li, "nbNotification", "");
    li = paramValue(li, "onclick", "");
    li = paramValue(li, "class", "");
    li = paramValue(li, "name", "Gérer les comptes utilisateurs");
    $("#nav_menu_right_ul_detail_id").append(li);
    var li = htmlLi;
    li = paramValue(li, "nbNotification", "");
    li = paramValue(li, "onclick", "loadGestionLangues();");
    li = paramValue(li, "class", "");
    li = paramValue(li, "name", "Gérer les langues disponibles");
    $("#nav_menu_right_ul_detail_id").append(li);
    var li = htmlLi;
    li = paramValue(li, "nbNotification", "");
    li = paramValue(li, "onclick", "");
    li = paramValue(li, "class", "");
    li = paramValue(li, "name", "Gérer les conseils de produits");
    $("#nav_menu_right_ul_detail_id").append(li);
    var li = htmlLi;
    li = paramValue(li, "nbNotification", "");
    li = paramValue(li, "onclick", "");
    li = paramValue(li, "class", "");
    li = paramValue(li, "name", "Tables et zones de tables");
    $("#nav_menu_right_ul_detail_id").append(li);
    var li = htmlLi;
    li = paramValue(li, "nbNotification", "");
    li = paramValue(li, "onclick", "");
    li = paramValue(li, "class", "");
    li = paramValue(li, "name", "Paramètres de l'application");
    $("#nav_menu_right_ul_detail_id").append(li);
}
function loadGestionSites() {
    var htmlGererLesSites = getGererlesSites();
    htmlGererLesSites = paramValue(htmlGererLesSites, "title", "Gérer les sites");
    $("#new_container").html(htmlGererLesSites);
    $("#table_gererlessites_all").append(getGererlesSitesTableThead());
    var htmlTbody = getGererlesSitesTableTbodyTr();
    $("#tr_actions_tablesites").text(strings.getString("label.gererlessites.table.head.action.tr"));
    getConnexion().getAllEtablissements(addItems, null);
    function addItems(etablissements, param) {
        for (var i = 0; i < etablissements.length; i++) {
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
    $("#add_site_nom_id").text(strings.getString("label.gererlessites.table.modal.label.nom"));
    $("#add_site_style_id").text(strings.getString("label.gererlessites.table.modal.label.style"));
    $("#add_site_logo_id").text(strings.getString("label.gererlessites.table.modal.label.logo"));
    $("#add_site_adresse_id").text(strings.getString("label.gererlessites.table.modal.label.adresse"));
    $("#add_site_telephone_id").text(strings.getString("label.gererlessites.table.modal.label.telephone"));
    $("#add_site_message_id").text(strings.getString("label.gererlessites.table.modal.label.message"));
    $("#add_site_slogan_id").text(strings.getString("label.gererlessites.table.modal.label.slogan"));
    getConnexion().getAllStyles(function(styles, param) {
        stylesIn = styles;
        $("#add_site_style_value").html("");
        for (var i = 0; i < styles.length; i++) {
//            console.log(styles[i]);
            $("#add_site_style_value").append("<option value=" + styles[i].url + ">" + styles[i].nom + "</option>");
        }
    }, null);
    $('#myModal').modal('show');
}
var idEtabToUpdate = "";
function updateEtablissement(id) {
    if ($("#myModal")) {
        $("#myModal").remove();
    }
    idEtabToUpdate = id;
    getConnexion().getEtablissementById(showEtbById, id, null);
    function showEtbById(etablissement, param) {
        console.log("etablissement", etablissement);
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
        getConnexion().removeEtablissement(null, id, null);
        $("tr[idetablissement='" + id + "']").remove();
    }
}
function valderAjoutEtablissement() {
    if ($("#add_site_nom_value").val() == "") {
        showInfoMessage(strings.getString("label.error.nom.required"));
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
        getConnexion().sendNewEtablissement(function(data, param) {
            $('#myModal').modal('hide');
            data = JSON.parse(data);
            var htmlTbody = getGererlesSitesTableTbodyTr();
            if (data.id != 0) {
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
                $("#table_gererlessites_all").append(litbody);
                $("tr[idetablissement='" + data.id + "']").addClass("etablissemend_added");
//                $("tr[idetablissement='" + data.id + "']").css("background-color", "green");
//                console.log($("tr[idetablissement='" + data.id + "']"));
                window.setTimeout(function() {
                    $("tr[idetablissement='" + data.id + "']").css("background-color", "transparent");
                }, 3000);
            }
        }, etablissement, null);
    }
}


// GESTION LANGUES

function loadGestionLangues() {
    var htmlGererLesSites = getPageGererLangues();
    htmlGererLesSites = paramValue(htmlGererLesSites, "title", "Gérer les langues");
    $("#new_container").html(htmlGererLesSites);
    //table_gererleslangues_all
}
function addStr() {
    var valEn = $("#en_val").val();
    var valFr = $("#fr_val").val();
    var valKey = $("#key_val").val();
    getConnexionServeur().addNewString(null, valKey, valFr, valEn, null);
} 