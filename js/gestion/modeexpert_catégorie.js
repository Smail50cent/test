
function LoadGestionCatégories() {
    updateActivedLi(2);
    var htmlGererLesCategories = getGererLesCategorie();
    htmlGererLesCategories = paramValue(htmlGererLesCategories, "title", strings.getString("mode.expert.label.gerer.categories"));
    var htmlGererLesCategoriesbutton = paramValue(htmlGererLesCategories, "labelButtonAdd", strings.getString("mode.expert.label.ajouter.categorie"));
    $("#new_container").html(htmlGererLesCategoriesbutton);
    
    
}

