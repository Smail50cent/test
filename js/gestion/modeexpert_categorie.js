
function LoadGestionCategories() {
    scripts.loadScripts("lib.dialog", function() {
        updateActivedLi(2);
        var htmlGererLesCategories = getGererLesCategorie();
        htmlGererLesCategories = paramValue(htmlGererLesCategories, "title", strings.getString("mode.expert.label.gerer.categories"));
        var htmlGererLesCategoriesbutton = paramValue(htmlGererLesCategories, "labelButtonAdd", strings.getString("mode.expert.label.ajouter.categorie"));
        $("#new_container").html(htmlGererLesCategoriesbutton);
        var htmlTbody = getGererlesCategoriesTableTbodyTr();
        $("#tr_actions_tablecategories").text(strings.getString("label.gererlessites.table.head.action.tr"));

        getConnexion().getAllCategories(allCat);
        function allCat(categorie) {
            console.log(categorie);
            var idetab = null;
            for (var i = 0; i < categorie.length; i++) {
                if (categorie[i].etablissement[0].id != idetab) {
                    var table = getGererlesCategoriesTableTbody();
                    var etablissementID = categorie[i].etablissement[0].id;
                    table = paramValue(table, "id_etab", etablissementID);
                    $(".table-responsive").append(table);
                    $("#table_gererlescategories_all_" + etablissementID).append(getGererlesCategoriesTableThead(etablissementID));
                }
                var litbody = htmlTbody;
                litbody = paramValue(litbody, "idcat", categorie[i].id);
                litbody = paramValue(litbody, "nom", categorie[i].nom);
                litbody = paramValue(litbody, "order", categorie[i].priorite);
                litbody = paramValue(litbody, "etablissement_id", etablissementID);
                litbody = paramValue(litbody, "priorite", categorie[i].priorite);
                if (categorie[i].etablissement.length == 0) {
                    litbody = paramValue(litbody, "etablissement", strings.getString("modeexpert.label.value.nonaffected"));
                } else {
                    var etab = categorie[i].etablissement[0].nom;
                    idetab = categorie[i].etablissement[0].id;
                    litbody = paramValue(litbody, "etablissement", etab);
                }
                if (categorie[i].zone.length == 0) {
                    litbody = paramValue(litbody, "zone", strings.getString("modeexpert.label.value.nonaffected"));
                } else {
                    var zone = "";
                    for (var j = 0; j < categorie[i].zone.length; j++) {
                        zone += categorie[i].zone[j];
                        if ((j + 1) < categorie[i].zone.length) {
                            zone += ", ";
                        }
                    }
                    litbody = paramValue(litbody, "zone", zone);
                }
                $("#table_gererlescategories_all_" + etablissementID).append(litbody);
            }
            $(".categorie_help_span").popover({trigger: "hover"});
            $(".section_save_button_structure").popover({trigger: "hover"});
            $(".table tbody").sortable({stop: function(evt, ui) {
                    reOrderRows();
                }
            }).disableSelection();
        }
    });
}

function addCategorie() {
    if ($("#myModal")) {
        $("#myModal").remove();
    }
    var htmlModel = getBootstrapModal();
    htmlModel = paramValue(htmlModel, "titre", strings.getString("mode.expert.label.gerer.categories"));
    htmlModel = paramValue(htmlModel, "closeLabel", strings.getString("label.fermer"));
    htmlModel = paramValue(htmlModel, "closeLabel", strings.getString("label.fermer"));
    htmlModel = paramValue(htmlModel, "primaryLabel", strings.getString("label.valider"));
    htmlModel = paramValue(htmlModel, "onclick", "validerAjoutCategorie();");
    $("body").append(htmlModel);

    var htmlBodyModal = getAddCategorieModalBody();
    $("#bootstrap_modal_body").html('');
    $("#bootstrap_modal_body").append(htmlBodyModal);
    $("#add_categorie_nom_id").text(strings.getString("modeexpert.label.value.nom"));
    $("#add_categorie_priorite_id").text(strings.getString("modeexpert.label.value.priorite"));
    $("#add_categorie_souscategorie_id").text(strings.getString("modeexpert.label.value.souscategorie"));

    $("#add_categorie_nom_value").attr("placeholder", strings.getString("modeexpert.placeholder.value.nom"));
    $("#add_categorie_priorite_value").attr("placeholder", strings.getString("modeexpert.placeholder.value.priorite"));
    $("#add_categorie_souscategorie_value").attr("placeholder", strings.getString("modeexpert.placeholder.value.souscategorie"));

    loadEtablissmentInModal();
    $('#myModal').modal('show');
}

function putDataOnObj() {
    var nom = $("#add_categorie_nom_value").val();
    var souscategories = new Array();
    var i = 1;
    $("#list_SousCat_id option").each(function() {
        var valsouCat = $(this).val();
        //var Nomtaux = valsouCat.split(" ");
        var sousCat = new SousCategorie();
        sousCat.setNom(valsouCat);
        //sousCat.setTauxTva(Nomtaux[1]);
        sousCat.setPriorite(i);
        souscategories.push(sousCat);
        i++;
    });
    var listeEtabZone = new Array();
    $('input[type=checkbox]').each(function() {
        if ($(this).attr("selectallzoneInEtablissement")) {
            var isChecked = $(this).is(":checked");
            var id = parseInt($(this).attr("selectallzoneInEtablissement"));
            var nom = $("p[id=etablissement_div_" + id + "]").text();
            if (isChecked == true) {
                var etabZone = new Etablissement();
                etabZone.setId(id);
                etabZone.setNom(nom);
                etabZone.setZones(null);
                listeEtabZone.push(etabZone);
            }
        } else if ($(this).attr("idetablissement")) {
            var idEtablissement = parseInt($(this).attr("idetablissement"));
            var nomEtablissement = $("p[id=etablissement_div_" + idEtablissement + "]").text();
            var idZone = parseInt($(this).attr("idzone"));
            var isChecked = $(this).is(":checked");
            var isEnabled = $(this).is(":enabled");
            if (isChecked == true && isEnabled) {
                var etabZone = new Etablissement();
                etabZone.setId(idEtablissement);
                etabZone.setNom(nomEtablissement);
                etabZone.setZones(idZone);
                listeEtabZone.push(etabZone);
            }
        }
    });
    var categorie = new Categorie();
    categorie.setNom(nom);
    categorie.setSousCategorie(souscategories);
    categorie.setEtablissement(listeEtabZone);
    return categorie;
}
function validerAjoutCategorie() {

    var categorie = putDataOnObj();
    console.log(categorie);
    getConnexion().addCategorie(addcat, categorie);
    function addcat(data) {
        if (data != null) {
            if (data.hasOwnProperty("error")) {
                console.log("error");
            } else {
//                getConnexion().getPrioriteByEtablissment(association, data);
//                function association(priorite) {
//                    console.log(data);
//                    if (categorie.getEtablissement() != null) {
//                        for (var j = 0; j < categorie.etablissement.length; j++) {
//                            var litbody = getGererlesCategoriesTableTbodyTr();
//                            litbody = paramValue(litbody, "idcat", data);
//                            litbody = paramValue(litbody, "nom", categorie.getNom());
//                            for (var i = 0; i < priorite.length; i++) {
//                                if (priorite[i].etablissement_id == categorie.etablissement[j].id) {
//                                    litbody = paramValue(litbody, "priorite", priorite[i].priorite);
//                                    break;
//                                }
//                            }
//                            litbody = paramValue(litbody, "etablissement", categorie.etablissement[j].nom);
//                            if (categorie.getEtablissement()[j].getZones() != null) {
//                                litbody = paramValue(litbody, "zone", categorie.etablissement[j].zones);
//                            } else {
//                                litbody = paramValue(litbody, "zone", strings.getString("modeexpert.label.value.nonaffected"));
//                            }
//                            $("#table_gererlescategories_all_" + categorie.etablissement[j].id).append(litbody);
//                        }
//                    }
//                }
                LoadGestionCategories();
            }
            $('#myModal').modal('hide');
            
        }
    }
}

function insertSousCat() {
    var txtsousCat = $("#add_categorie_souscategorie_value").val();
//    var taux_tva = $("#taux_tva_id").val();
//    var idTva = taux_tva.split(" ");
    $("#list_SousCat_id").append($('<option>', {
        value: txtsousCat,
        text: txtsousCat
    }));
    $("#add_categorie_souscategorie_value").val("");
}
function removeSousCat() {
    $("#list_SousCat_id :selected").each(function() {
        $(this).remove();
    });
}

var tailleItem = new Array("small-item-structure small-item-personalize",
        "medium-item-structure medium-item-personalize", "large-item-structure large-item-personalize ");
function loadEtablissmentInModal() {

    scripts.loadScripts("modeexpertGP", function() {
        var htmlAll = getAjouterProduitSelectEtablissements();
        htmlAll = paramValue(htmlAll, "titreSelect", strings.getString("gestion.produit.ajout.etablissement.labelselectall"));
        htmlAll = paramValue(htmlAll, "inputVal", strings.getString("gestion.produit.ajout.etablissement.labelvaliderproduit"));
        $("#mycustom_div_id").prepend(htmlAll);
        loadEtablissement();
        $("#valider_produit_id, .next_prev_div_structure ").remove();
    });
}

function removeCategorie(id) {

    var modalConfirm = getBootstrapModalConfirm();

    modalConfirm = paramValue(modalConfirm, "title", strings.getString("modeexpert.modal.confirm.title.categorie.delete"));
    modalConfirm = paramValue(modalConfirm, "message", strings.getString("modeexpert.modal.confirm.message.categorie.delete"));
    modalConfirm = paramValue(modalConfirm, "confirm", strings.getString("modeexpert.modal.confirm.buttonConf.categorie.delete"));
    modalConfirm = paramValue(modalConfirm, "cancel", strings.getString("modeexpert.modal.confirm.buttonCanc.categorie.delete"));
    modalConfirm = paramValue(modalConfirm, "messageWarning", strings.getString("modeexpert.modal.confirm.warningMsg.categorie.delete"));
    modalConfirm = paramValue(modalConfirm, "methodConf", "confirmDeleteCategorie(" + id + ")");
    modalConfirm = paramValue(modalConfirm, "methodCanc", "cancelDeleteCategorie()");


    $("body").append(modalConfirm);
    $("#modalConf").show();

}

function confirmDeleteCategorie(id) {
    getConnexion().DeleteCategorie(del, id);
    function del(data) {
        if (data != null) {
            if (!data.hasOwnProperty("error")) {
                console.log("error");
            }
        } else {
            $("tr[idcategorie=" + id + "]").each(function() {
                $(this).remove();
            });
            $("#modalConf").remove();
            $(".modal-backdrop").remove();
        }
    }
}

function cancelDeleteCategorie() {
    $("#modalConf").remove();
    $(".modal-backdrop").remove();
}

function reOrderRows() {

    $(".table ").each(function() {
        var idetab = $(this).attr("idetablissement");
        var i = 1;
        $(this).find("tr[idetab=" + idetab + "]").each(function() {
            $(this).attr("order", i++);
        });
    });
}

function saveEtablissementCategorie(idEtab) {
    catPriorites = new Array();
    $(".table[idetablissement=" + idEtab + "]").each(function() {
        $(this).find("tr[idetab=" + idEtab + "]").each(function() {
            if ($(this).attr("order") != $(this).attr("priorite")) {
                var idcat = $(this).attr("idcategorie");
                var priorite = $(this).attr("order");
                var catPr = new Categorie();
                catPr.setId(idcat);
                catPr.setPriorite(priorite);
                catPr.setEtablissement(idEtab);
                catPriorites.push(catPr);
            }
        });
    });
    //console.log(catPriorites);
    if (catPriorites.length > 0) {
        updatePrioriteCategorie();
    } else {
        alert("nothing to update!");
    }
}

function updatePrioriteCategorie() {

    var modalConfirm = getBootstrapModalConfirm();

    modalConfirm = paramValue(modalConfirm, "title", strings.getString("modeexpert.modal.confirm.title.categorie.update.priority"));
    modalConfirm = paramValue(modalConfirm, "message", strings.getString("modeexpert.modal.confirm.message.categorie.update.priority"));
    modalConfirm = paramValue(modalConfirm, "confirm", strings.getString("modeexpert.modal.confirm.buttonConf.categorie.delete"));
    modalConfirm = paramValue(modalConfirm, "cancel", strings.getString("modeexpert.modal.confirm.buttonCanc.categorie.delete"));
    modalConfirm = paramValue(modalConfirm, "messageWarning", strings.getString("modeexpert.modal.confirm.warningMsg.categorie.delete"));
    modalConfirm = paramValue(modalConfirm, "methodConf", "confirmUpdatePriorite()");
    modalConfirm = paramValue(modalConfirm, "methodCanc", "cancelUpdatePriorite()");

    $("body").append(modalConfirm);
    $("#modalConf").show();
}

function confirmUpdatePriorite() {
    getConnexion().updatePriorityCategorie(allUp, catPriorites);
    function allUp(data) {
        if (data != null) {
            if (data.hasOwnProperty("error")) {
                console.log("error");
                alert("error");
            } else {
                console.log(data);
                for (var i = 0; i < catPriorites.length; i++) {
                    var ordre = $("tr[idcategorie=" + catPriorites[i].getId() + "]").attr("order");
                    $("tr[idcategorie=" + catPriorites[i].getId() + "]").attr("priorite", ordre);
                    $("tr[idcategorie=" + catPriorites[i].getId() + "] td p[typelabel=priorite]").text(ordre);
                }
                $("#modalConf").remove();
                $(".modal-backdrop").remove();
            }
        }
    }
}

function cancelUpdatePriorite() {
    $("#modalConf").remove();
    $(".modal-backdrop").remove();
}

function updateCategorie(id) {
    addCategorie();
    getConnexion().getByIdForUpdateCategorie(getCategorie, id);
    function getCategorie(categorie) {
        //console.log(categorie);
        $("#add_categorie_nom_value").val(categorie.nom);
        for (var i = 0; i < categorie.souscategorie.length; i++) {
            $("#list_SousCat_id").append($('<option>', {
                value: categorie.souscategorie[i].nom,
                text: categorie.souscategorie[i].nom
            }));
        }
        for (var i = 0; i < categorie.zone.length; i++) {
            $(".li_zones_etablissement_checkbox_structure[idzone=" + categorie.zone[i] + "]").prop("checked", true);
        }
        for (var i = 0; i < categorie.etablissement.length; i++) {
            var zoneChecked = false;
            $(".li_zones_etablissement_checkbox_structure[idetablissement=" + categorie.etablissement[i] + "]").each(function() {
                if (this.checked) {
                    zoneChecked = true;
                    return false;
                }
            });
            if (!zoneChecked) {
                $("#slect_all_zones_" + categorie.etablissement[i]).prop("checked", true);
                $(".li_zones_etablissement_checkbox_structure[idetablissement=" + categorie.etablissement[i] + "]").each(function() {
                    this.disabled = true;
                    this.checked = true;
                });
            }

        }
        $(".btn-primary_modal_stucture").attr("onclick", "validerUpdateCategorie(" + id + ")");
    }
}

function validerUpdateCategorie(id) {
    var priorite = $("tr[idcategorie=" + id + "]").attr("priorite");
    var objCat = putDataOnObj();
    objCat.setId(id);
    objCat.setPriorite(priorite);
    console.log(objCat);
    getConnexion().updateCategorie(upCat, objCat);
    function upCat(data) {
        console.log(data);
        if (data != null) {
            if (data.hasOwnProperty("error")) {
                console.log("error");
            } else {
                LoadGestionCategories();
//                if (data > 0) {
//                    $(".main").empty();
//                    LoadGestionCategories();
//                }
            }
        }
        $('#myModal').modal('hide');
        $(".modal-backdrop").remove();
        
    }
}