

function onLoadGP() {
    printProduits(0);
    var connexion = getConnexion();
    connexion.getCategoriesForContentCategorie(onCarteLoadFinish);

    window.setTimeout(function() {
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
    }, 2500);

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

function addProduct() {

    scripts.loadScripts("lib.dialog", function() {
        $('#dialog_add_produit_id').dialog({modal: false, title: 'Ajouter un Produit', autoOpen: true, width: "30%"
            , top: "-8159px", left: "798px"});
    });
    var divadd = getDivAddProduit();
    $('#dialog_add_produit_id').html(divadd);
    var page1input = getPage1AddProduit();
    var page1show = getPage1ShowAddProduit();
    $('#content_add_produit_zone_input_id').html(page1input);
    $('#content_produit_zone_id').html(page1show);
    LoadCatSousCat();

}

function LoadCatSousCat() {

    $("input#name_prod_Id").on("keyup", function() {
        $('#content_produit_titre_id').text($(this).val());
    });

    getImplOfConnexionLocal().getCategoriesForContentCategorie(allCat);
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
        getImplOfConnexionLocal().getSousCategoriesForContentSousCategorie(souCats);
        var idcat = $(this).val();
        //$('#label_categorie_prod_id').text($(this).text());
        $('#label_categorie_prod_id').text($(this).find(":selected").text());
        function souCats(souscat) {
            for (var i = 0; i < souscat.length; i++) {
                if (souscat[i].categorie == idcat) {
                    $('#liste_souscategorie_id').append($('<option>', {
                        value: souscat[i].id,
                        text: souscat[i].nom
                    }));
                }
            }
            $('#label_souscat_prod_id').text($("#liste_souscategorie_id").find(":selected").text());
        }
    });

    $('#liste_souscategorie_id').change(function() {
        $('#label_souscat_prod_id').text($(this).find(":selected").text());
    });
}

function ingredientPage() {
    $('.ui-dialog-title').html("Ajouter les Ingrédients");
    var cbox = getIngredCheckBoxAddProduit();
    var ingredCB;
    getImplOfConnexionLocal().getAllIngredients(allIngredients);
    function allIngredients(Ingredients) {
        for (var i = 0; i < Ingredients.length; i++) {
            ingredCB = paramValue(cbox, "ingredOpt_nom", Ingredients[i].nom);
            $('#select_ingredient_id').append(ingredCB);
        }

        $('.ingredOpt_checkbox').change(function(){
            if(this.checked) {
                var listIngred = getIngredLiAddProduit();
                var valLi = paramValue(listIngred,"ingred_val",this.value);
                var hashLi = paramValue(valLi,"hash_ingred",this.value.hashCode());
                $('#content_produit_description_id').append(hashLi);
            }else {
                $("#"+this.value.hashCode()).remove();
            }
    });
    }

    var ingredDiv = getPageIngredAddProduit();
    $('#dialog_add_produit_id').html(ingredDiv);

    $('#check_all_id').click(function() {
        if (!this.checked) {
            $('.ingred_checkbox').each(function() {
                this.checked = false;
                $('#content_produit_description_id').empty();
            });
        }
    });
    
}

function addOption() {
    $('.ui-dialog-title').html("Ajouter les Options");
    var optProd = getOptionAddProduit();
    $('#dialog_add_produit_id').html(optProd);
    getImplOfConnexionLocal().getAllOptions(getOpts);
    function getOpts(options){
        console.log(options);
    }
}

