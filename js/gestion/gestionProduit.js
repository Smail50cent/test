
function onLoadGP() {
    if (!testIfAdminConnected()) {
        $("body").html("");
        showErrorMessage(strings.getString("connexion.users.acces.interdit"));
    }
    var htmlDivdrop = getDivGestionDropdown();
    $("#header_id").append(htmlDivdrop);
    loadViewsForAddProduit();
}
function testIfAdminConnected() {
    var ret = false;
    var personne = getLocalStorageValue("personnes.serveur");
    if (personne != null) {
        personne = JSON.parse(personne);
        var level = parseInt(personne.role.level);
        if (level == 1) {
            ret = true;
        }
    }
    return ret;
}
function loadViewsForAddProduit() {
    $('#content_titre_id').html("Gestion des Produits");
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

function ModifyProduct(id) {
    var idprod = id.parent().parent().parent().attr('produitid');
    alert(idprod);
}

function DeleteProduct(id) {
    var idprod = id.parent().parent().parent().attr('produitid');
    scripts.loadScripts("lib.dialog", function() {
        $('#confirm_dialog_produit_id').dialog({
            modal: true, title: 'Voulez vous supprimer ce produit ?', autoOpen: true, position: 'center',
            buttons: {
                Yes: function() {
                    var connexion = getConnexion();
                    connexion.deleteProduit(idprod);
                    getImplOfConnexionLocal().deleteProduit(idprod);
                    id.parent().parent().parent().remove();
                    $(this).dialog("close");
                },
                No: function() {
                    $(this).dialog("close");
                }
            },
            close: function(event, ui) {
                $(this).remove();
            }
        });
    });
}

function productPage() {
    scripts.loadScripts("lib.dialog", function() {
        $('#dialog_add_produit_id').dialog({modal: false, title: 'Ajouter un Produit', autoOpen: true, dialogClass: "dialog-ajout-produit",
            close: function(event, ui) {
                $(this).dialog("destroy");
                $(".produit_info").remove();
                $("#dialog_add_produit_id").empty();
                $("#dialog_add_opt_ingred_id").empty();
                loadViewsForAddProduit();
            }});
        var divadd = getDivAddProduit();
        $('#dialog_add_produit_id').html(divadd);
        var page1input = getPage1AddProduit();
        var page1show = getPage1ShowAddProduit();
        $('#content_add_produit_zone_input_id').html(page1input);
        $('#content_produit_zone_id').html(page1show);
        LoadCatSousCat();
    });


}
var produit = new Produit();

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
        alert('Avant de valider :\n - ajouter un nom à votre produit \n - choisissez une Catégorie et une Sous Catégorie');
    }

}
function LoadCatSousCat() {
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
    $('.ui-dialog-title').html("Ajouter les Ingrédients");
    $('#content_produit_description_id').empty();
    var cbox = getIngredCheckBoxAddProduit();
    var ingredCB;
    getConnexion().getAllIngredients(allIngredients);
    function allIngredients(Ingredients) {
        for (var i = 0; i < Ingredients.length; i++) {
            ingredCB = paramValue(cbox, "ingredient_nom", Ingredients[i].nom);
            var ingredId = paramValue(ingredCB, "id_obj", Ingredients[i].id);
            $('#select_ingredient_id').append(ingredId);
        }
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
        UncheckAllBoxIngredOpt("#uncheck_all_ingredient_id");
    }
    var ingredDiv = getPageIngredAddProduit();
    $('#dialog_add_produit_id').html(ingredDiv);
}

function submit_ingredientPage() {
    var list = new Array();
    $(".ingredient_checkbox:checked").each(function() {
        var ingredient = new Ingredient();
        ingredient.setId($(this).attr('id'));
        list.push(ingredient);
        produit.setIdsIngredients(list);
    });
    optionPage();
}
function formInsertIngredient() {

    $("#dialog_add_opt_ingred_id").dialog(
            {modal: true, title: 'Ajouter un Ingrédient', autoOpen: true, position: 'right',
                buttons: {
                    annuler: function() {
                        $(this).dialog("destroy");
                        $("#dialog_add_opt_ingred_id").empty();
                    },
                    valider: function() {
                        insertIngredDB();
                        $(this).dialog("destroy");
                        $("#dialog_add_opt_ingred_id").empty();
                        ingredientPage();
                    }
                },
                close: function() {
                    $(this).dialog("destroy");
                    $("#dialog_add_opt_ingred_id").empty();
                }
            });
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
        var ingredient = new Ingredient();
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
    $('.ui-dialog-title').html("Ajouter les Options");
    var optProd = getOptionAddProduit();
    $('#dialog_add_produit_id').html(optProd);
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
    }
}

function submit_optionPage() {
    var list = new Array();
    $(".option_checkbox:checked").each(function() {
        var option = new Option();
        option.setId($(this).attr('id'));
        list.push(option);
        produit.setOptions(list);
    });
    prixPage();

}

var dates = new Array();
function prixPage() {
    scripts.loadScripts("lib.datetimepicker", function() {
        $('.ui-dialog-title').html("Ajouter les Prix");
        var pagePrix = getPrixAddProduit();
        $('#dialog_add_produit_id').html(pagePrix);
        var AllTva = new Array();
        getConnexion().getAllTauxTva(getTva);
        function getTva(TVA) {
            for (var i = 0; i < TVA.length; i++) {
                AllTva.push(TVA[i]);
            }
        }
        // A FAIRE / REMPLACER getAllZoneTables par getZoneTableByIdEtablissement
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
            $(".tva_produit").each(function() {
                for (var j = 0; j < AllTva.length; j++) {
                    $(this).append($('<option>', {
                        value: AllTva[j].taux,
                        text: parseFloat(AllTva[j].taux)
                    }));
                }
            });
            $("input#input_defaut_prix_id").on("keyup", function() {
                var valPrix = $(this).val();
                $('.input_zone_prix').each(function() {
                    var idzone = $(this).parent().attr('parentId');
                    var taux = $("#tva_" + idzone).val();
                    if (taux != 0) {
                        var prixTVA = parseFloat(valPrix) + parseFloat(valPrix) * parseFloat(taux) / 100;
                        $(this).val(parseFloat(prixTVA));
                    } else {
                        $(this).val(parseFloat(valPrix));
                    }
                });
            });
            $('.tva_produit ').change(function() {
                if ($(this).val() != 0) {
                    var selectId = $(this).attr("tvaid");
                    var selectVal = $(this).val();
                    $(".input_zone_prix").each(function() {
                        if ($(this).attr('id_inputprix') == selectId) {
                            if ($(this).val() != 0) {
                                var prixTVA = parseFloat($(this).val()) + parseFloat($(this).val()) * parseFloat(selectVal) / 100;
                                $(this).val(prixTVA.toFixed(2));
                            }
                        }
                    });
                }
            });
        }
    });
}

function submit_prixPage() {
    var list = new Array();
    var prix = $("#input_defaut_prix_id").val();
    var objprix = {prix: prix};
    var Tva = $("#tva_1").val();
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
//        var datedebut;
//        var datefin;
//        $(".datetimepicker[id_inputprix=" + idprix + "]").each(function() {
//            if ($(this).hasClass("date_debut")) {
//                var date = $(this).val();
//                datedebut = date.replace('T', ' ');
//            } else if ($(this).hasClass("date_fin")) {
//                var date = $(this).val();
//                datefin = date.replace('T', ' ');
//            }
//
//        });
//        associationPPZone.setDatedebut(datedebut);
//        associationPPZone.setDatefin(datefin);
//        associationPPZone.setPrixHt(objprix);
//        associationPPZone.setZonetable(idprix);
//        list.push(associationPPZone);
//    });
    produit.setAssociationPrixProduit(list);
    produit.setTauxTva(Tva);
    console.log(produit);
    var prixTTC = getPrixHtInAssociation(list, produit.getTauxTva());
    $("#produit_zone_right_prix_id").html(fntp(prixTTC));
    onLoadEtablissementPage();
}

function onLoadEtablissementPage() {
    $("#ui-id-1").text(strings.getString("gestion.produit.ajout.etablissement.dialog.titre"));
    $("#dialog_add_produit_id").html("");
    var htmlAll = getAjouterProduitSelectEtablissements();
    htmlAll = paramValue(htmlAll, "titreSelect", strings.getString("gestion.produit.ajout.etablissement.labelselectall"));
    htmlAll = paramValue(htmlAll, "inputVal", strings.getString("gestion.produit.ajout.etablissement.labelvaliderproduit"));
    $("#dialog_add_produit_id").html(htmlAll);
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
    }
    $("#checkbox_selectAllEta").change(function() {
        var isCheked = $(this).is(":checked");
        if (isCheked == true) {
            $('input[type=checkbox]').each(function() {
                $(this).attr("checked", true);
            });
        } else {
            $('input[type=checkbox]').each(function() {
                $(this).attr("checked", false);
            });
        }
    });
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
                listeEtabZone.push(new AssociationEtablissementZones(id, null));
            }
            console.log($(this).attr("id"), isChecked);
        } else if ($(this).attr("idetablissement")) {
            var idEtablissement = parseInt($(this).attr("idetablissement"));
            var idZone = parseInt($(this).attr("idzone"));
            var isChecked = $(this).is(":checked");
            if (isChecked == true) {
                listeEtabZone.push(new AssociationEtablissementZones(idEtablissement, idZone));
            }
        }
    });
    setLocalStorageValue("gestion.add.produit.etablissemnts", JSON.stringify(listeEtabZone));
}
function validerProduit() {
    submitEtablissements();
}

var tailleItem = new Array("small-item-structure small-item-personalize",
        "medium-item-structure medium-item-personalize", "large-item-structure large-item-personalize ");
function formInsertOption() {
    $("#dialog_add_opt_ingred_id").dialog(
            {modal: true, title: 'Ajouter une Option', autoOpen: true, position: 'right',
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
}

function insertPossib() {
    var txtPossib = $("#insert_possib_id").val();
    $("#list_possib_id").append($('<option>', {
        value: txtPossib,
        text: txtPossib
    }));
    $("#insert_possib_id").val("");
}

function removePossib() {
    $("#list_possib_id :selected").each(function() {
        $(this).remove();
    });
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
