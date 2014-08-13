
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
        console.log(categorie);
//        for (var i = 0; i < categorie.length; i++) {
//            var litbody = htmlTbody;
//            litbody = paramValue(litbody, "nom", categorie[i].nom);
//            litbody = paramValue(litbody, "priorite", categorie[i].priorite);
//            litbody = paramValue(litbody, "etablissement", categorie[i].etablissement);
//            litbody = paramValue(litbody, "zone", categorie[i].zone);
//            litbody = paramValue(litbody, "idcat", categorie[i].id);
//            $("#table_gererlescategories_all").append(litbody);
//        }
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
    
    $("#add_categorie_nom_value").attr("placeholder", strings.getString("modeexpert.placeholder.value.nom"));
    $("#add_categorie_priorite_value").attr("placeholder", strings.getString("modeexpert.placeholder.value.priorite"));

    $('#myModal').modal('show');
}

function validerAjoutCategorie() {
    
    var nom = $("#add_categorie_nom_value").val();
    var priorite = $("#add_categorie_priorite_value").val();
    var categorie = new Categorie();
    categorie.setNom(nom);
    categorie.setPriorite(priorite);
    
    getConnexion().addCategorie(addcat,categorie);
    function addcat(data) {
        console.log(data);
        $('#myModal').modal('hide');
        LoadGestionCategories();
    }
}