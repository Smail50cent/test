
function LoadGestionCategories() {
    updateActivedLi(2);
    var htmlGererLesCategories = getGererLesCategorie();
    htmlGererLesCategories = paramValue(htmlGererLesCategories, "title", strings.getString("mode.expert.label.gerer.categories"));
    var htmlGererLesCategoriesbutton = paramValue(htmlGererLesCategories, "labelButtonAdd", strings.getString("mode.expert.label.ajouter.categorie"));
    $("#new_container").html(htmlGererLesCategoriesbutton);
    $("#table_gererlescategories_all").append(getGererlesCategoriesTableThead());
    var htmlTbody = getGererlesCategoriesTableTbodyTr();
    $("#tr_actions_tablecategories").text(strings.getString("label.gererlessites.table.head.action.tr"));

    getConnexion().getAllCategories(allCat);
    function allCat(categorie) {
        //console.log(categorie);
        for (var i = 0; i < categorie.length; i++) {
            var litbody = htmlTbody;
            litbody = paramValue(litbody, "idcat", categorie[i].id);
            litbody = paramValue(litbody, "nom", categorie[i].nom);
            litbody = paramValue(litbody, "priorite", categorie[i].priorite);
            if (categorie[i].etablissement.length == 0) {
                litbody = paramValue(litbody, "etablissement", strings.getString("modeexpert.label.value.nonaffected"));
            } else {
                var etab = "";
                for (var j = 0; j < categorie[i].etablissement.length; j++) {
                    etab += categorie[i].etablissement[j].nom + " ";
                }
                litbody = paramValue(litbody, "etablissement", etab);
            }
            if (categorie[i].zone.length == 0) {
                litbody = paramValue(litbody, "zone", strings.getString("modeexpert.label.value.nonaffected"));
            } else {
                var zone = "";
                for (var j = 0; j < categorie[i].zone.length; j++) {
                    zone += categorie[i].zone[j] + " ";
                }
                litbody = paramValue(litbody, "zone", zone);
            }
            $("#table_gererlescategories_all").append(litbody);
        }
    }
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
    getConnexion().getAllTauxTva(getTva);
    function getTva(tva) {
        for (var i = 0; i < tva.length; i++) {
            $("#taux_tva_id").append($('<option>', {
                value: tva[i].taux + " " + tva[i].id,
                text: tva[i].taux
            }));
        }
    }
    loadEtablissmentInModal();
    $('#myModal').modal('show');
}

function validerAjoutCategorie() {

    var nom = $("#add_categorie_nom_value").val();
    var souscategories = new Array();
    var i = 1;
    $("#list_SousCat_id option").each(function() {
        var valsouCat = $(this).val();
        var Nomtaux = valsouCat.split(" ");
        var sousCat = new SousCategorie();
        sousCat.setNom(Nomtaux[0]);
        sousCat.setTauxTva(Nomtaux[1]);
        sousCat.setPriorite(i);
        souscategories.push(sousCat);
        i++;
    });
    var listeEtabZone = new Array();
    $('input[type=checkbox]').each(function() {
        if ($(this).attr("selectallzoneInEtablissement")) {
            var isChecked = $(this).is(":checked");
            var id = parseInt($(this).attr("selectallzoneInEtablissement"));
            if (isChecked == true) {
                var etabZone = new Etablissement();
                etabZone.setId(id);
                etabZone.setZones(null);
                listeEtabZone.push(etabZone);
            }
            //console.log($(this).attr("id"), isChecked);
        } else if ($(this).attr("idetablissement")) {
            var idEtablissement = parseInt($(this).attr("idetablissement"));
            var idZone = parseInt($(this).attr("idzone"));
            var isChecked = $(this).is(":checked");
            var isEnabled = $(this).is(":enabled");
            if (isChecked == true && isEnabled) {
                var etabZone = new Etablissement();
                etabZone.setId(idEtablissement);
                etabZone.setZones(idZone);
                listeEtabZone.push(etabZone);
            }
        }
    });
    var categorie = new Categorie();
    categorie.setNom(nom);
    categorie.setSousCategorie(souscategories);
    categorie.setEtablissement(listeEtabZone);
    console.log(categorie);
    getConnexion().addCategorie(addcat, categorie);
    function addcat(data) {
        console.log(data);
        $('#myModal').modal('hide');
        LoadGestionCategories();
    }
}

function insertSousCat() {
    var txtsousCat = $("#add_categorie_souscategorie_value").val();
    var taux_tva = $("#taux_tva_id").val();
    var idTva = taux_tva.split(" ");
    $("#list_SousCat_id").append($('<option>', {
        value: txtsousCat + " " + idTva[1],
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
    modalConfirm = paramValue(modalConfirm, "methodConf", "confirmDeleteCategorie("+id+")");
    modalConfirm = paramValue(modalConfirm, "methodCanc", "cancelDeleteCategorie()");


    $("body").append(modalConfirm);
    $("#modalConf").show();

}

function confirmDeleteCategorie(id) {
    getConnexion().DeleteCategorie(del, id);
    function del(data) {
        console.log(data);
        LoadGestionCategories();
        $("#modalConf").remove();
        $(".modal-backdrop").remove();
    }
}

function cancelDeleteCategorie() {
    $("#modalConf").remove();
    $(".modal-backdrop").remove();
}