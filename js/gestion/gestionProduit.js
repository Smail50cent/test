var loadCategorieForGestion = false;
var loadIngredientForGestion = false;
var loadOptionsForGestion = false;
var loadPrixForGestion = false;
var loadEtablissementForGestion = false;


function onLoadGP() {
    scripts.loadScripts("lib.dialog", function() {
        loadOtherParameterForEmployee();
        loadViewsForAddProduit();
    });
}

function loadViewsForAddProduit() {
    $('#content_titre_id').html(strings.getString("add.produit.main.title"));
    $('.content_produit_zone_right_structure').empty();
    $('.content_produit_zone_left_structure').empty();
    var modifdiv = getDivModifProduit();
    $('.content_produit_zone_right_structure').append(modifdiv);
    var suppdiv = getDivSuppProduit();
    $('.content_produit_zone_left_structure').append(suppdiv);
    var adddiv = getDivAddProduitBtn();
    $('.content_globlal_zone').prepend(adddiv);
    $('#liste_souscategorie_id').hide();
}

function loadModifiedProduct(produit) {
    if (produit != "undefined") {
        $("#content_produit_titre_id_" + produit.getId()).html(produit.getNom());
        var prix = produit.getAssociationPrixProduit()[0].getPrixHt().prix;
        $("#content_produit_zone_right_prix_id_" + produit.getId()).html(fntp(calculPrixWithTVA(prix, produit.getTauxTva())));
        var categorie = produit.getCategorie().id;
        var idsousCat = produit.getSousCategorie().id;
        var idCat = "categorie" + categorie;

        $("li[produitid=" + produit.getId() + "]").removeClass();
        $("li[produitid=" + produit.getId() + "]").addClass("produitcat" + categorie + "_sscat" + idsousCat + " produit" + produit.getId() + " produit_cat_structure produit_cat_personalize ");
        var divmod = $(".produit" + produit.getId());
//        console.log(divmod);
        $(".produit" + produit.getId()).remove();
        $("ul[categorieid=" + categorie + "]").append(divmod);

        $(".genreicClassSlide").each(function() {
            if ($(this).attr('id') == idCat) {
                $(this).addClass("active");
                $(".produit_cat_structure").each(function() {
                    if ($(this).hasClass("produitcat" + categorie + "_sscat" + idsousCat)) {
                        $(this).css("display", "inline-table");
                    } else
                    if (!$(this).hasClass("produit_info")) {
                        $(this).css("display", "none");
                    }
                });
            } else {
                $(this).removeClass("active");
            }
        });

        $("#alert_error_id").freeow("Produit", strings.getString("add.produit.alert.modifier.produit"), {
            classes: ["smokey", "pushpin"],
            hideStyle: {opacity: 0, left: "400px"},
            showStyle: {opacity: 1, left: 0},
            hideDuration: 8000
        });
    }
}

function ModifyProduct(id) {
    loadCategorieForGestion = false;
    loadIngredientForGestion = false;
    loadOptionsForGestion = false;
    loadPrixForGestion = false;
    loadEtablissementForGestion = false;
    var idprod = id.parent().parent().parent().attr('produitid');
    var dialogTitle = strings.getString("add.produit.dialog.title.modifier.produit");
    $("#dialog_add_produit_id").dialog({
        modal: true,
        title: dialogTitle,
        autoOpen: true,
        position: 'top',
        dialogClass: 'dialog-modif-produit',
        buttons: {
            valider: function() {
                if (updateProduct()) {
                    $(this).dialog("destroy");
                    $('#dialog_add_produit_id').empty();
                }
            },
            annuler: function() {
                $(this).dialog("destroy");
                $('#dialog_add_produit_id').empty();
            }
        },
        close: function(event, ui) {
            $(this).dialog("destroy");
            $('#dialog_add_produit_id').empty();
        }
    });
    $('.ui-button-text:contains(valider)').text(strings.getString("add.produit.button.dialog.add.ingredient.submit"));
    $('.ui-button-text:contains(annuler)').text(strings.getString("add.produit.button.dialog.add.ingredient.cancel"));
    var divadd = getDivAddProduit();
    $("#dialog_add_produit_id").html(divadd);
    // Name, Categorie, SousCategorie
    var page1Div = getPage1AddProduit();
    $('#content_add_produit_zone_input_id').html(page1Div);
    loadCatSousCat();
    // Ingredients
    var ingredDiv = getPageIngredAddProduit();
    $('#content_add_produit_zone_input_id').append(ingredDiv);
    loadIngredient();
    // Options
    var optDiv = getOptionAddProduit();
    $('#content_add_produit_zone_input_id').append(optDiv);
    loadOptions();
    // Prix
    var prixDiv = getPrixAddProduit();
    var prixDivinputId = paramValue(prixDiv, "Id_inputPrix", 0);
    var prixDivtvaId = paramValue(prixDivinputId, "tvaid", 0);
    $('#content_add_produit_zone_input_id').append(prixDivtvaId);
    loadPrix();
    // Etablissements
    var htmlAll = getAjouterProduitSelectEtablissements();
    htmlAll = paramValue(htmlAll, "titreSelect", strings.getString("gestion.produit.ajout.etablissement.labelselectall"));
    htmlAll = paramValue(htmlAll, "inputVal", strings.getString("gestion.produit.ajout.etablissement.labelvaliderproduit"));
    $("#content_add_produit_zone_input_id").append(htmlAll);
    loadEtablissement();

    $('.prev_page_structure, .next_page_structure, .btn_validation_ajout_produit_structure').each(function() {
        $(this).remove();
    });
    function mafunct() {
        getConnexion().getProduitByIdGeneric(produitById, idprod);
        function produitById(data) {
            //console.log(data);
            $("#tva_0 option[value=\"" + parseFloat(data.tauxTva) + "\"]").prop("selected", true);
            $('#name_prod_Id').val(data.nom);
            $('#name_prod_Id').attr("idproduit", data.id);
            $("#liste_categorie_id option[value=" + data.id_categorie.id + "]").prop("selected", true);
            $('#liste_souscategorie_id').append($('<option>', {
                value: data.id_sousCategorie.id,
                text: data.id_sousCategorie.nom
            }));
            $("#liste_souscategorie_id option[value=" + data.id_sousCategorie.id + "]").prop("selected", true);
            if (data.ids_ingredients != null) {
                for (var i = 0; i < data.ids_ingredients.length; i++) {
                    $(".ingredient_checkbox[id=" + data.ids_ingredients[i].ingredient + "]").prop("checked", true);
                }
            }
            if (data.options != null) {
                for (var i = 0; i < data.options.length; i++) {
                    $(".option_checkbox[id=" + data.options[i].id + "]").prop("checked", true);
                }
            }
            var prixHt, TVA;
            for (var i = 0; i < data.associationPrixProduit.length; i++) {
                if (data.associationPrixProduit[i].heureDebut == null && data.associationPrixProduit[i].heureFin == null && data.associationPrixProduit[i].zoneTable.id == null) {
                    prixHt = data.associationPrixProduit[i].prixHt.prix;
                    TVA = data.tauxTva;
                    break;
                }
            }
            var prixTTC = calculPrixWithTVA(prixHt, TVA);
            $("#input_defaut_prix_id").val(parseFloat(prixTTC.toFixed(2)));
            $("#label_val_prixttc_id").text(prixHt);

            if (data.zones != null) {
                for (var i = 0; i < data.zones.length; i++) {
                    $(".li_zones_etablissement_checkbox_structure[idzone=" + data.zones[i] + "]").prop("checked", true);
                }
            }

            for (var i = 0; i < data.etablissements.length; i++) {
                var zoneChecked = false;
                $(".li_zones_etablissement_checkbox_structure[idetablissement=" + data.etablissements[i] + "]").each(function() {
                    if (this.checked) {
                        zoneChecked = true;
                    }
                });
                if (!zoneChecked) {
                    $(".etablissement_div_header_select_structure[selectallzoneinetablissement=" + data.etablissements[i] + "]").prop("checked", true);
                    $(".li_zones_etablissement_checkbox_structure[idetablissement=" + data.etablissements[i] + "]").each(function() {
                        this.disabled = true;
                        this.checked = true;
                    });
                }
            }
        }
    }
    threadd();
    function threadd() {
        window.setTimeout(function() {
            if (loadCategorieForGestion && loadIngredientForGestion && loadOptionsForGestion && loadPrixForGestion && loadEtablissementForGestion) {
                console.log("Finished Loading");
                mafunct();
            } else {
                threadd();
            }
        }, 10);
    }

}

function updateProduct() {
    var produit = new Produit();
    var categorie = new Categorie();
    var souscategorie = new SousCategorie();

    var idCat = $("#liste_categorie_id :selected").val();
    var idSousCat = $("#liste_souscategorie_id :selected").val();
    var nomProduit = $("#name_prod_Id").val();
    var idproduit = $("#name_prod_Id").attr("idproduit");
    if (idCat != 0 && idSousCat != 0 && nomProduit != "") {
        produit.setId(idproduit);
        produit.setNom(nomProduit);
        categorie.setId(idCat);
        souscategorie.setId(idSousCat);
        produit.setCategorie(categorie);
        produit.setSousCategorie(souscategorie);
    } else {
        $("#alert_error_id").freeow(strings.getString("add.produit.alert.produit"), strings.getString("add.produit.alert.verify.produit.name"), {
            classes: ["smokey", "notice"],
            hideStyle: {opacity: 0, left: "400px"},
            showStyle: {opacity: 1, left: 0},
            hideDuration: 8000
        });
        $("#alert_error_id").freeow(strings.getString("add.produit.alert.produit"), strings.getString("add.produit.alert.verify.categorie"), {
            classes: ["smokey", "notice"],
            hideStyle: {opacity: 0, left: "400px"},
            showStyle: {opacity: 1, left: 0},
            hideDuration: 8000
        });
        return false;
    }
    var list = new Array();
    $(".ingredient_checkbox:checked").each(function() {
        var ingredient = new Ingredient();
        ingredient.setId($(this).attr('id'));
        list.push(ingredient);
    });
    if (list.length == 0) {
        $("#alert_error_id").freeow(strings.getString("add.produit.alert.ingredient"), strings.getString("add.produit.alert.verify.ingredient"), {
            classes: ["smokey", "notice"],
            hideStyle: {opacity: 0, left: "400px"},
            showStyle: {opacity: 1, left: 0},
            hideDuration: 8000
        });
        produit.setIdsIngredients(list);
    } else {
        produit.setIdsIngredients(list);
    }

    var list2 = new Array();
    $(".option_checkbox:checked").each(function() {
        var option = new Option();
        option.setId($(this).attr('id'));
        list2.push(option);
    });
    if (list2.length == 0) {
        $("#alert_error_id").freeow(strings.getString("add.produit.alert.options"), strings.getString("add.produit.alert.verify.options"), {
            classes: ["smokey", "notice"],
            hideStyle: {opacity: 0, left: "400px"},
            showStyle: {opacity: 1, left: 0},
            hideDuration: 8000
        });
        produit.setOptions(list2);
    } else {
        produit.setOptions(list2);
    }

    var list3 = new Array();
    var prix = $("#label_val_prixttc_id").text();
    var objprix = {prix: prix};
    var Tva = $("#tva_0").val();
    var associationPrixProduit = new AssociationProduitPrix();
    associationPrixProduit.setDatedebut(null);
    associationPrixProduit.setDatefin(null);
    associationPrixProduit.setPrixHt(objprix);
    associationPrixProduit.setZonetable(null);
    list3.push(associationPrixProduit);
    produit.setAssociationPrixProduit(list3);
    produit.setTauxTva(Tva);
    if (!$("#label_val_prixttc_id").text().trim() || parseFloat(prix) < 0) {
        $("#alert_error_id").freeow(strings.getString("add.produit.alert.prix"), strings.getString("add.produit.alert.verify.prix"), {
            classes: ["smokey", "error"],
            hideStyle: {opacity: 0, left: "400px"},
            showStyle: {opacity: 1, left: 0},
            hideDuration: 8000
        });
        return false;
    }

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
    produit.setEtablissements(listeEtabZone);
    getConnexion().updateProduit(updateProd, produit, produit);
    function updateProd(data, param) {
//        if (data) {
        loadModifiedProduct(param);
        console.log(param);
//            (param);
//        }
    }

    return true;
}

function DeleteProduct(id) {
    var idprod = id.parent().parent().parent().attr('produitid');
    var dialogTitle = strings.getString("add.produit.dialog.title.produit.delete");
    $('#confirm_dialog_produit_id').dialog({
        modal: true,
        title: dialogTitle,
        autoOpen: true,
        position: 'center',
        buttons: {
            Yes: function() {
                var connexion = getConnexionServeur();
                connexion.deleteProduit(idprod);
                getImplOfConnexionLocal().deleteProduit(idprod);
                id.parent().parent().parent().remove();
                $(this).dialog("destroy");
                $('#confirm_dialog_produit_id').empty();
            },
            No: function() {
                $(this).dialog("destroy");
                $('#confirm_dialog_produit_id').empty();
            }
        },
        close: function(event, ui) {
            $(this).dialog("destroy");
            $('#confirm_dialog_produit_id').empty();
        }
    });
    $('.ui-button-text:contains(Yes)').text(strings.getString("add.produit.button.dialog.delete.yes"));
    $('.ui-button-text:contains(No)').text(strings.getString("add.produit.button.dialog.delete.no"));
}

function productPage() {
    var dialogTitle = strings.getString("add.produit.dialog.title");
    $('#dialog_add_produit_id').dialog({modal: false, title: dialogTitle, autoOpen: true, dialogClass: "dialog-ajout-produit",
        close: function(event, ui) {
            $(this).dialog("destroy");
            $(".produit_info").remove();
            $("#dialog_add_produit_id").empty();
            $("#dialog_add_opt_ingred_id").empty();
            loadViewsForAddProduit();
        }
    });
    // Instantiate Produit Object
    produit = new Produit();
    var divadd = getDivAddProduit();
    $('#dialog_add_produit_id').html(divadd);
    var page1input = getPage1AddProduit();
    var page1show = getPage1ShowAddProduit();
    $('#content_add_produit_zone_input_id').html(page1input);
    $('.content_produit_zone_show').html(page1show);
    var position = {my: 'left center', at: 'right+10 center'};
    $(".tooltip").tooltip();
    $(".tooltip").tooltip("option", "position", position);
    loadCatSousCat();
}

function submit_productPage() {
    var categorie = new Categorie();
    var souscategorie = new SousCategorie();

    var idCat = $("#liste_categorie_id :selected").val();
    var idSousCat = $("#liste_souscategorie_id :selected").val();
    var nomProduit = $("#name_prod_Id").val();
    if (idCat != 0 && idSousCat != 0 && nomProduit != "") {
        produit.setNom(nomProduit);
        categorie.setId(idCat);
        souscategorie.setId(idSousCat);
        produit.setCategorie(categorie);
        produit.setSousCategorie(souscategorie);
        ingredientPage();
    } else {
        $("#alert_error_id").freeow(strings.getString("add.produit.alert.produit"), strings.getString("add.produit.alert.verify.produit.name"), {
            classes: ["smokey", "notice"],
            hideStyle: {opacity: 0, left: "400px"},
            showStyle: {opacity: 1, left: 0},
            hideDuration: 8000
        });
        $("#alert_error_id").freeow(strings.getString("add.produit.alert.produit"), strings.getString("add.produit.alert.verify.categorie"), {
            classes: ["smokey", "notice"],
            hideStyle: {opacity: 0, left: "400px"},
            showStyle: {opacity: 1, left: 0},
            hideDuration: 8000
        });
    }

}
function loadCatSousCat(method) {
    $("input#name_prod_Id").on("keyup", function() {
        $('#content_produit_titre_id').text($(this).val());
    });
    getConnexion().getCategoriesForContentCategorie(allCat);
    function allCat(categorie) {
        for (var i = 0; i < categorie.length; i++) {
            $('#liste_categorie_id').append($('<option>', {
                value: categorie[i].id,
                text: categorie[i].nom
            }));
        }
        loadCategorieForGestion = true;
    }
    $('#liste_categorie_id').change(function() {
        $('#liste_souscategorie_id').empty();
        getConnexion().getAllSousCategories(souCats);
        var idcat = $(this).val();
        $('#label_categorie_prod_id').text($(this).find(":selected").text());
        function souCats(souscat) {
            $('.souscat_p').show();
            var findSoucat = false;
            for (var i = 0; i < souscat.length; i++) {
                if (souscat[i].categorie == idcat) {
                    findSoucat = true;
                    $('#liste_souscategorie_id').append($('<option>', {
                        value: souscat[i].id,
                        text: souscat[i].nom
                    }));
                }
            }
            if (!findSoucat) {
                $('#liste_souscategorie_id').remove();
            }
            $('#label_souscat_prod_id').text($("#liste_souscategorie_id").find(":selected").text());
            if ($('#label_souscat_prod_id').text() === "") {
                $('.souscat_p').hide();
            }
        }
    });
    $('#liste_souscategorie_id').change(function() {
        $('#label_souscat_prod_id').text($(this).find(":selected").text());
    });
}

function ingredientPage() {
    $('.ui-dialog-title').html(strings.getString("add.produit.dialog.title.ingredient"));
    $('#content_produit_description_id').empty();
    var ingredDiv = getPageIngredAddProduit();
    $('#dialog_add_produit_id').html(ingredDiv);
    loadIngredient();
}

function loadIngredient() {
    var position = {my: 'left center', at: 'right+10 center'};
    $(".tooltip").tooltip();
    $(".tooltip").tooltip("option", "position", position);

    var cbox = getIngredCheckBoxAddProduit();
    var ingredCB;
    var listIngredient = new Array();
    getConnexion().getAllIngredients(allIngredients);
    function allIngredients(Ingredients) {
        for (var i = 0; i < Ingredients.length; i++) {
            ingredCB = paramValue(cbox, "ingredient_nom", Ingredients[i].nom);
            var ingredId = paramValue(ingredCB, "id_obj", Ingredients[i].id);
            $('#select_ingredient_id').append(ingredId);
            listIngredient.push(Ingredients[i].nom);
        }

        $('#autocomplete_ingredient_id').autocomplete({
            source: listIngredient,
            select: function(event, ui) {
                if (!$("input:checkbox[value=\"" + ui.item.value + "\"]").is("checked")) {
                    $("input:checkbox[value=\"" + ui.item.value + "\"]").prop("checked", true);
                    var scrollto = $("input:checkbox[value=\"" + ui.item.value + "\"]");
                    var container = $("#select_ingredient_id");
                    container.animate({
                        scrollTop: scrollto.offset().top - container.offset().top + container.scrollTop()
                    });
                    var listIngred = getIngredLiAddProduit();
                    var valLi = paramValue(listIngred, "ingred_val", ui.item.value);
                    var hashLi = paramValue(valLi, "hash_ingred", ui.item.value.hashCode());
                    $('#content_produit_description_id').append(hashLi);
                } else {
                    $("#" + ui.item.value.hashCode()).parent().remove();
                }
                ui.item.value = "";
            }
        });
        $('#autocomplete_ingredient_id').keyup(function() {
            if ($.inArray(this.value, listIngredient) == -1 && this.value.length > 0) {
                $(".tooltip").tooltip("open");
                $(".tooltip").tooltip("option", "content", strings.getString("add.produit.input.ingredient.title.notfound"));

                $('#autocomplete_ingredient_id').keypress(function() {
                    var keycode = (event.keyCode ? event.keyCode : event.which);
                    if (keycode == '13' && this.value.length > 0) {
                        var newIngred = this.value;
                        $('#confirm_dialog_produit_id').dialog({
                            modal: true,
                            title: 'Voulez vous l\'ajouter ?',
                            autoOpen: true,
                            position: 'center',
                            buttons: {
                                Yes: function() {
                                    $(this).dialog("destroy");
                                    $('#confirm_dialog_produit_id').empty();
                                    var list = new Array();
                                    var ingredient = new Ingredient();
                                    ingredient.setNom(newIngred);
                                    list.push(ingredient);
                                    getConnexion().addIngredient(result, list);
                                    function result(Id) {
                                        console.log(Id);
                                        var checkNew = getIngredCheckBoxAddProduit();
                                        var checkId = paramValue(checkNew, "id_obj", Id);
                                        var checkVal = paramValue(checkId, "ingredient_nom", newIngred);
                                        var checkClass = paramValue(checkVal, "addclass", "new_Ingred");
                                        $("#select_ingredient_id").prepend(checkClass);

                                        $("input:checkbox[value=\"" + newIngred + "\"]").prop("checked", true);
                                        var scrollto = $("input:checkbox[value=\"" + newIngred + "\"]");
                                        var container = $("#select_ingredient_id");
                                        container.animate({
                                            scrollTop: scrollto.offset().top - container.offset().top + container.scrollTop()
                                        });
                                        var listIngred = getIngredLiAddProduit();
                                        var valLi = paramValue(listIngred, "ingred_val", newIngred);
                                        var hashLi = paramValue(valLi, "hash_ingred", newIngred.hashCode());
                                        $('#content_produit_description_id').append(hashLi);

                                        $('.new_Ingred').change(function() {
                                            if (this.checked) {
                                                var listIngred = getIngredLiAddProduit();
                                                var valLi = paramValue(listIngred, "ingred_val", this.value);
                                                var hashLi = paramValue(valLi, "hash_ingred", this.value.hashCode());
                                                $('#content_produit_description_id').append(hashLi);
                                            } else {
                                                $("#" + this.value.hashCode()).parent().remove();
                                            }
                                        });
                                    }


                                },
                                No: function() {
                                    $(this).dialog("destroy");
                                    $('#confirm_dialog_produit_id').empty();
                                }
                            },
                            close: function(event, ui) {
                                $(this).dialog("destroy");
                                $('#confirm_dialog_produit_id').empty();
                            }
                        });
                    }
                });

            } else {
                $(".tooltip").tooltip("option", "content", strings.getString("add.produit.input.ingredient.title"));
            }
        });
        $('.ingredient_checkbox').change(function() {
            if (this.checked) {
                var listIngred = getIngredLiAddProduit();
                var valLi = paramValue(listIngred, "ingred_val", this.value);
                var hashLi = paramValue(valLi, "hash_ingred", this.value.hashCode());
                $('#content_produit_description_id').append(hashLi);
            } else {
                $("#" + this.value.hashCode()).parent().remove();
            }
        });
        loadIngredientForGestion = true;
    }
}

function submit_ingredientPage() {
    var list = new Array();
    $(".ingredient_checkbox:checked").each(function() {
        var ingredient = new Ingredient();
        ingredient.setId($(this).attr('id'));
        list.push(ingredient);
    });
    if (list.length == 0) {
        $("#alert_error_id").freeow(strings.getString("add.produit.alert.ingredient"), strings.getString("add.produit.alert.verify.ingredient"), {
            classes: ["smokey", "notice"],
            hideStyle: {opacity: 0, left: "400px"},
            showStyle: {opacity: 1, left: 0},
            hideDuration: 8000
        });
        produit.setIdsIngredients(list);
        optionPage();
    } else {
        produit.setIdsIngredients(list);
        optionPage();
    }
}
function formInsertIngredient() {
    var dialogTitle = strings.getString("add.produit.dialog.title.ingredient");
    $("#dialog_add_opt_ingred_id").dialog(
            {modal: true, title: dialogTitle, autoOpen: true, position: 'right', dialogClass: "second_dialog",
                buttons: {
                    Cancel: function() {
                        $(this).dialog("destroy");
                        $("#dialog_add_opt_ingred_id").empty();
                    },
                    Submit: function() {
                        if ($("#list_ingred_id").length > 0) {
                            insertIngredDB();
                            $(this).dialog("destroy");
                            $("#dialog_add_opt_ingred_id").empty();
                            ingredientPage();
                        }
                    }
                },
                close: function() {
                    $(this).dialog("destroy");
                    $("#dialog_add_opt_ingred_id").empty();
                }
            });
    $('.ui-button-text:contains(valider)').text(strings.getString("add.produit.button.dialog.add.ingredient.submit"));
    $('.ui-button-text:contains(annuler)').text(strings.getString("add.produit.button.dialog.add.ingredient.cancel"));
    var ingredDiv = getDivAddIngredient();
    $("#dialog_add_opt_ingred_id").html(ingredDiv);
}

function insertIngred() {
    var txtIngred = $("#insert_ingredient_id").val();
    $("#list_ingred_id").append($('<option>', {
        value: txtIngred,
        text: txtIngred
    }));
    $("#insert_ingredient_id").val("");
}

function removeIngred() {
    $("#list_ingred_id :selected").each(function() {
        $(this).remove();
    });
}

function insertIngredDB() {
    if ($("select").has('option').length > 0) {
        var list = new Array();
        $("#list_ingred_id option").each(function() {
            var ingredient = new Ingredient();
            ingredient.setNom($(this).val());
            list.push(ingredient);
        });
        getConnexion().addIngredient(result, list);
        function result(data) {
            console.log(data);
        }
    }

}
function UncheckAllBoxIngredOpt(id) {
    $(id).change(function() {
        if (!this.checked) {
            $(".ingredient_checkbox, .option_checkbox").each(function() {
                this.checked = false;
                $('#content_produit_description_id').empty();
            });
        } else {
            $(".ingredient_checkbox, .option_checkbox").each(function() {
                this.checked = true;
            });
        }
    });
}

function optionPage() {
    var dialogTitle = strings.getString("add.produit.dialog.title.options");
    $('.ui-dialog-title').html(dialogTitle);
    $("li[optionid]").remove();
    var optProd = getOptionAddProduit();
    $('#dialog_add_produit_id').html(optProd);
    loadOptions();
}
function loadOptions() {
    getConnexion().getAllOptions(getOpts);
    function getOpts(options) {
        var possibilite = new Array();
        for (var i = 0; i < options.length; i++) {
            var checkbox = getOptionCheckBoxAddProduit();
            var optCB = paramValue(checkbox, "option_nom", options[i].nom);
            var optLabel = paramValue(optCB, "option_label", options[i].label);
            var optId = paramValue(optLabel, "id_obj", options[i].id);
            $('#select_option_id').append(optId);
            possibilite[options[i].id] = options[i].possibilites;
        }
        $(".option_checkbox").change(function() {
            var idOpt = $(this).attr('id');
            var possLabel = getPossibiliteLabelAddProduit();
            if (this.checked) {
                var gpOption = paramValue(possLabel, "possib_val", $(this).attr("label_opt"));
                var gpclass = paramValue(gpOption, "gp_class", "gp_class");
                var gpId = paramValue(gpclass, "id_opt", idOpt);

                var optSelect = getOptionPossibSelectAddProduit();
                var optPoss = paramValue(optSelect, "option_id", idOpt);
                var optlab = paramValue(optPoss, "opt_label_val", $(this).attr("label_opt"));
                $('#content_produit_description_id').append(optlab);
                for (var j = 0; j < possibilite[idOpt].length; j++) {
                    $(".liste_option_possib[optionid=" + idOpt + "]").append($('<option>', {
                        value: possibilite[idOpt][j].nom,
                        text: possibilite[idOpt][j].nom
                    }));
                }
            } else {
                $("li[optionid=" + $(this).attr('id') + "], label[optionid=" + $(this).attr('id') + "]").each(function() {
                    $(this).remove();

                });
            }
        });
        UncheckAllBoxIngredOpt("#uncheck_all_option_id");
        loadOptionsForGestion = true;
    }
}

function submit_optionPage() {
    var list = new Array();
    $(".option_checkbox:checked").each(function() {
        var option = new Option();
        option.setId($(this).attr('id'));
        list.push(option);
    });
    if (list.length == 0) {
        $("#alert_error_id").freeow(strings.getString("add.produit.alert.options"), strings.getString("add.produit.alert.verify.options"), {
            classes: ["smokey", "notice"],
            hideStyle: {opacity: 0, left: "400px"},
            showStyle: {opacity: 1, left: 0},
            hideDuration: 8000
        });
        produit.setOptions(list);
        prixPage();
    } else {
        produit.setOptions(list);
        prixPage();
    }
}

var dates = new Array();
function prixPage() {
    $('.ui-dialog-title').html("Ajouter les Prix");
    var pagePrix = getPrixAddProduit();
    var inputId = paramValue(pagePrix, "Id_inputPrix", 0);
    var tvaId = paramValue(inputId, "tvaid", 0);
    $('#dialog_add_produit_id').html(tvaId);
    loadPrix();
}
function loadPrix() {
    scripts.loadScripts("lib.datetimepicker", function() {
        var AllTva = new Array();
        getConnexion().getAllTauxTva(getTva);
        function getTva(TVA) {
            for (var i = 0; i < TVA.length; i++) {
                AllTva.push(TVA[i]);
            }
            // A NOTER : REMPLACER getAllZoneTables par getZoneTableByIdEtablissement
            getConnexion().getAllZoneTables(getZones);
            function getZones(zones) {
                var id_etab = getLocalStorageValue("client.application.etablissement.id");
                for (var i = 0; i < zones.length; i++) {
                    if (zones[i].etablissement_id == id_etab) {
                        var zonePrix = getPrixZoneAddProduit();
                        var zoneName = paramValue(zonePrix, "zone_name", zones[i].nom);
                        var zoneId = paramValue(zoneName, "zone_prix_id", zones[i].id);
                        $('#div_zone_id').append(zoneId);
                    }
                }
                $("#div_zone_id").hide();
                $(".tva_produit").each(function() {
                    for (var j = 0; j < AllTva.length; j++) {
                        $(this).append($('<option>', {
                            value: AllTva[j].taux,
                            text: parseFloat(AllTva[j].taux)
                        }));
                    }
                });
                $("input#input_defaut_prix_id").on("keyup", function() {
                    $("#label_val_prixttc_id").text($(this).val());
                    var valPrix = $(this).val();
                    $('.input_zone_prix').each(function() {
                        var idzone = $(this).parent().attr('parentId');
                        var taux = $("#tva_" + idzone).val();
                        if (taux != 0) {
                            var prixHT = parseFloat(valPrix) - parseFloat(valPrix) * parseFloat(taux) / 100;
                            $(this).val(parseFloat(prixHT));
                        } else {
                            $(this).val(parseFloat(valPrix));
                        }
                    });
                });

                $('.tva_produit ').change(function() {
                    if ($(this).val() != 0) {
                        var selectId = $(this).attr("tvaid");
                        var selectTVA = $(this).val();
                        $(".input_zone_prix, .input_defaut_prix").each(function() {
                            var prix = $(this).val();
                            if ($(this).attr('id_inputprix') == selectId) {
                                if ($(this).val() != 0) {
                                    $("#label_val_prixttc_id").text(calculPrixWithoutTVA(prix, selectTVA));
                                }
                            }
                        });
                    } else {
                        $("#label_val_prixttc_id").text($("#input_defaut_prix_id").val());
                    }
                });
                loadPrixForGestion = true;
            }
        }
    });
}

function submit_prixPage() {
    var list = new Array();
    var prix = $("#label_val_prixttc_id").text();
    var objprix = {prix: prix};
    var Tva = $("#tva_0").val();
    var associationPrixProduit = new AssociationProduitPrix();
    associationPrixProduit.setDatedebut(null);
    associationPrixProduit.setDatefin(null);
    associationPrixProduit.setPrixHt(objprix);
    associationPrixProduit.setZonetable(null);
    list.push(associationPrixProduit);
//    $(".input_zone_prix").each(function() {
//        var associationPPZone = new AssociationProduitPrix();
//        var prix = $(this).val();
//        var objprix = {prix : prix};
//        var idprix = $(this).attr("id_inputprix");
//        var datedebut,datefin,heuredebut,heurefin,minutedebut,minutefin;
//        $(".datetimepicker[id_inputprix=" + idprix + "]").each(function() {
//            if ($(this).hasClass("date_debut")) {
//                var date = $(this).val();
//                datedebut = date.replace('T', ' ');
//                var time = datedebut.split(" ");
//                time = time[1];
//                var timetab = time.split(":");
//                heuredebut = timetab[0];
//                minutedebut = timetab[1];
//                console.log(heuredebut+" "+minutedebut);
//                
//            } else if ($(this).hasClass("date_fin")) {
//                var date = $(this).val();
//                datefin = date.replace('T', ' ');
//                var time = datefin.split(" ");
//                time = time[1];
//                var timetab = time[1].split(":");
//                heurefin = timetab[0];
//                minutefin = timetab[1];
//                console.log(heurefin+" "+minutefin);
//                
//            }
//
//        });
//        associationPPZone.setHeuredebut(heuredebut);
//        associationPPZone.setHeurefin(heurefin);
//        associationPPZone.setMinutedebut(minutedebut);
//        associationPPZone.setMinutefin(minutefin);
//        associationPPZone.setDatedebut(datedebut);
//        associationPPZone.setDatefin(datefin);
//        associationPPZone.setPrixHt(objprix);
//        associationPPZone.setZonetable(idprix);
//        list.push(associationPPZone);
//    });
    produit.setAssociationPrixProduit(list);
    produit.setTauxTva(Tva);
    if (!$("#label_val_prixttc_id").text().trim() || parseFloat(prix) < 0) {
        $("#alert_error_id").freeow(strings.getString("add.produit.alert.prix"), strings.getString("add.produit.alert.verify.prix"), {
            classes: ["smokey", "error"],
            hideStyle: {opacity: 0, left: "400px"},
            showStyle: {opacity: 1, left: 0},
            hideDuration: 8000
        });
    } else {
        $("#produit_zone_right_prix_id").html(fntp(calculPrixWithTVA(prix, Tva)));
        etablissementPage();
    }
}

function etablissementPage() {
    clickValider = 0;
    $("#ui-id-1").text(strings.getString("gestion.produit.ajout.etablissement.dialog.titre"));
    $("#dialog_add_produit_id").html("");
    var htmlAll = getAjouterProduitSelectEtablissements();
    htmlAll = paramValue(htmlAll, "titreSelect", strings.getString("gestion.produit.ajout.etablissement.labelselectall"));
    htmlAll = paramValue(htmlAll, "inputVal", strings.getString("gestion.produit.ajout.etablissement.labelvaliderproduit"));
    $("#dialog_add_produit_id").html(htmlAll);
    loadEtablissement();
}
function loadEtablissement() {
    var htmlDiv = getDivShowEtblissementsAndZone();
    var htmlliZoneEtab = getLiZonesEtablissement();
    getConnexion().getAllEtablissementsWithZones(printEtablissement, null);
    function printEtablissement(etablissements, param) {
        $("#ajouter_produit_div_etablissement").html("");
        for (var i = 0; i < etablissements.length; i++) {
            var newEtab = htmlDiv;
            newEtab = paramValue(newEtab, "idetablissement", etablissements[i].id);
            newEtab = paramValue(newEtab, "nomEtablissement", etablissements[i].nom);
            $("#ajouter_produit_div_etablissement").append(newEtab);
            var cssClass = $("#etablissement_div_id" + etablissements[i].id).attr("class");
            if (etablissements[i].zones.length <= 3) {
                $("#etablissement_div_id" + etablissements[i].id).attr("class", cssClass + " " + tailleItem[0]);
            } else if (etablissements[i].zones.length > 3 && etablissements[i].zones.length <= 6) {
                $("#etablissement_div_id" + etablissements[i].id).attr("class", cssClass + " " + tailleItem[1]);
            } else {
                $("#etablissement_div_id" + etablissements[i].id).attr("class", cssClass + " " + tailleItem[2]);
            }
            for (var j = 0; j < etablissements[i].zones.length; j++) {
                var divLiZone = htmlliZoneEtab;
                divLiZone = paramValue(divLiZone, "idzone", etablissements[i].zones[j].id);
                divLiZone = paramValue(divLiZone, "idetablissement", etablissements[i].id);
                divLiZone = paramValue(divLiZone, "nomZone", etablissements[i].zones[j].nom);
                $("#etablissement_div_contentzoneliste_" + etablissements[i].id).append(divLiZone);
            }
        }

        $("#checkbox_selectAllEta").change(function() {
            var isCheked = $(this).is(":checked");
            if (isCheked == true) {
                $('input[type=checkbox]').each(function() {
                    this.checked = true;
                    $(".li_zones_etablissement_checkbox_structure").each(function() {
                        this.disabled = true;
                        this.checked = true;
                    });
                });
            } else {
                $('input[type=checkbox]').each(function() {
                    this.checked = false;
                    $(".li_zones_etablissement_checkbox_structure").each(function() {
                        this.disabled = false;
                        this.checked = false;
                    });
                });
            }
        });

        $(".etablissement_div_header_select_structure").change(function() {
            var id = $(this).attr("selectallzoneinetablissement");
            if (this.checked) {
                $(".li_zones_etablissement_checkbox_structure").each(function() {
                    if ($(this).attr("idetablissement") == id) {
                        this.disabled = true;
                        this.checked = true;
                    }
                });
            } else {
                $(".li_zones_etablissement_checkbox_structure").each(function() {
                    if ($(this).attr("idetablissement") == id) {
                        this.disabled = false;
                        this.checked = false;
                    }
                });
            }

        });
        loadEtablissementForGestion = true;
    }

}
function AssociationEtablissementZones(etablissement, zone) {
    this.etablissement = etablissement;
    this.zone = zone;
}
function submitEtablissements() {
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
    produit.setEtablissements(listeEtabZone);
    //setLocalStorageValue("gestion.add.produit.etablissemnts", JSON.stringify(listeEtabZone));
}

function validerProduit() {
    submitEtablissements();
    if (clickValider == 0) {
        if (produit.etablissements.length == 0) {
            $("#alert_error_id").freeow(strings.getString("add.produit.alert.etablissement"), strings.getString("add.produit.alert.etablissement.click"), {
                classes: ["smokey", "notice"],
                hideStyle: {opacity: 0, left: "400px"},
                showStyle: {opacity: 1, left: 0},
                hideDuration: 8000
            });
            $("#alert_error_id").freeow(strings.getString("add.produit.alert.etablissement"), strings.getString("add.produit.alert.etablissement.verify"), {
                classes: ["smokey", "notice"],
                hideStyle: {opacity: 0, left: "400px"},
                showStyle: {opacity: 1, left: 0},
                hideDuration: 8000
            });
            clickValider++;
        } else {
            console.log(produit);
            getConnexion().addProduit(insertP, produit);
            function insertP(data) {
                produit.setId(data);
                $("#dialog_add_produit_id").dialog("destroy");
                $(".produit_info").remove();
                $("#dialog_add_produit_id").empty();
                loadNewProduit();
            }
        }
    } else {
        console.log(produit);
        getConnexion().addProduit(insertP, produit);
        function insertP(data) {
            produit.setId(data);
            $("#dialog_add_produit_id").dialog("destroy");
            $(".produit_info").remove();
            $("#dialog_add_produit_id").empty();
            loadNewProduit();
        }
    }
}

var tailleItem = new Array("small-item-structure small-item-personalize",
        "medium-item-structure medium-item-personalize", "large-item-structure large-item-personalize ");
function formInsertOption() {
    var dialogTitle = strings.getString("add.produit.dialog.title.options.add");
    $("#dialog_add_opt_ingred_id").dialog(
            {modal: true, title: dialogTitle, autoOpen: true, position: 'right', dialogClass: "second_dialog",
                buttons: {
                    annuler: function() {
                        $(this).dialog("destroy");
                        $("#dialog_add_opt_ingred_id").empty();
                    },
                    valider: function() {
                        insertOptionDB();
                        $(this).dialog("destroy");
                        $("#dialog_add_opt_ingred_id").empty();
                        optionPage();
                    }
                },
                close: function() {
                    $(this).dialog("destroy");
                    $("#dialog_add_opt_ingred_id").empty();
                }
            });
    $('.ui-button-text:contains(valider)').text(strings.getString("add.produit.button.dialog.add.ingredient.submit"));
    $('.ui-button-text:contains(annuler)').text(strings.getString("add.produit.button.dialog.add.ingredient.cancel"));
    var divOpt = getDivAddOption();
    $("#dialog_add_opt_ingred_id").html(divOpt);
    $('#insert_option_id').keyup(function() {
        if ($(this).val() != "") {
            $('#insert_possib_id').attr("disabled", false);
        } else {
            $("#insert_possib_id").val("");
            $('#insert_possib_id').attr("disabled", true);
            $("#list_possib_id").empty();
        }
    });
    nbrPossib = 1;
}

function insertPossib() {
    var txtPossib = $("#insert_possib_id").val();
    $("#list_possib_id").append($('<option>', {
        value: txtPossib,
        text: txtPossib
    }));
    $("#insert_possib_id").val("");
    nbrPossib++;
    $("#label_insert_possib_id").text("Possibilité N° " + nbrPossib);
}

function removePossib() {
    var nbrRmv = 0;
    $("#list_possib_id :selected").each(function() {
        $(this).remove();
        nbrRmv++;
    });
    nbrPossib -= nbrRmv;
    $("#label_insert_possib_id").text("Possibilité N° " + (nbrPossib));
}

function insertOptionDB() {
    if ($("select").has('option').length > 0) {
        var optionVal = $('#insert_option_id').val();
        var optionName = optionVal.charAt(0).toUpperCase() + optionVal.slice(1);
        var optionLabel = optionVal.toLowerCase() + " :";
        var possib = new Array();
        var optionObj = new Option();
        $("#list_possib_id option").each(function() {
            possib.push($(this).val());
        });
        optionObj.setLabel(optionLabel);
        optionObj.setNom(optionName);
        optionObj.setPossibilites(possib);
        getConnexion().addOption(result, optionObj);
        function result(data) {
            console.log("SUCCESS");
        }
        $('#list_possib_id').empty();
        $("#insert_option_id").empty();
        $("#insert_possib_id").val("");
    }
}

function ajoutPeriode() {
    $("#div_zone_id").toggle();
}

function loadNewProduit() {

    var liProd = getContentProduitItem();
    var prodId = paramValue(liProd, "produitId", produit.getId());
    var prodName = paramValue(prodId, "produitNom", produit.getNom());
    var prodPrix = paramValue(prodName, "produitPrix", fntp(getPrixHtInAssociation(produit.getAssociationPrixProduit(), produit.tauxTva)));
    $('.content_globlal_zone').append(prodPrix);
    loadViewsForAddProduit();
    //onLoadGP();
}
