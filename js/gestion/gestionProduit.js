

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
            , top: "-4634px", left: "240px"});
    });
    var divadd = getDivAddProduit();
    $('#dialog_add_produit_id').html(divadd);
    var page1input = getPage1AddProduit();
    var page1show = getPage1ShowAddProduit();
    $('#content_add_produit_zone_input_id').html(page1input);
    $('#content_produit_zone_id').html(page1show);
    addPage1();

}

function addPage1() {

    $("input#name_prod_Id").on("keyup", function() {
        $('#label_name_prod_id').text($(this).val());
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

    getImplOfConnexionLocal().getAllIngredients(allIngredients);
    function allIngredients(Ingredients) {
        for (var i = 0; i < Ingredients.length; i++) {
            console.log(Ingredients.nom);
        }
    }




    var ingredDiv = getPageIngredAddProduit();
    $('#dialog_add_produit_id').html(ingredDiv);
    $("#select_ingredient_id").each(function() {
        var checkboxes = $(this).find("input:checkbox");
        checkboxes.each(function() {
            var checkbox = $(this);
            // Highlight pre-selected checkboxes
            if (checkbox.prop("checked"))
                checkbox.parent().addClass("select_ingredient-on");

            // Highlight checkboxes that the user selects
            checkbox.click(function() {
                if (checkbox.prop("checked"))
                    checkbox.parent().addClass("select_ingredient-on");
                else
                    checkbox.parent().removeClass("select_ingredient-on");
            });
        });
    });

    $('#check_all_id').click(function() {
        if (this.checked) {
            $('.ingred_checkbox').each(function() {
                this.checked = true;
            });
        } else {
            $('.ingred_checkbox').each(function() {
                this.checked = false;
            });
        }
    });
}


