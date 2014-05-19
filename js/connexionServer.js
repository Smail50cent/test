function ConnexionServer() {

    this.getEntreprise = function(methodToExecuteAfter) {
        var ret = null;
        var updated = false;
        var clientLevel = getUpdateLevelOfTable(config.getConfig("tableNameEntreprise"));
        if (isLocalBddSuppored() == false || isMozilla() ) {
            pullNewData(methodToExecuteAfter);console.log("SERVEUR");
        } else {
            $.ajax({
                url: getServicePath("serveur.clientaccess.serviceGetEntrepriseMaj"),
                type: 'GET',
                dataType: 'json',
                async: true,
                success: function(data, textStatus, xhr) {
                    console.log("data.level=" + data.level + " clientLevel=" + clientLevel);
                    if (parseInt(data.level) > parseInt(clientLevel)) {
                        updated = true;
                        pullNewData(methodToExecuteAfter);
                        incrementeLevelOfTable(config.getConfig("tableNameEntreprise"));
                        
                    } else {
                        getImplOfConnexionLocal().getEntreprise(methodToExecuteAfter);
                    }
                },
                error: function(xhr, textStatus, errorThrown) {
                    showErrorMessage(strings.getString("label.error.connexion.serveur"));
                }
            });
        }
        function pullNewData(methodToExecuteAfter) {
            $.ajax({
                url: getServicePath("serveur.clientaccess.serviceGetEntreprise"),
                type: 'GET',
                dataType: 'json',
                async: true,
                success: function(data, textStatus, xhr) {
                    ret = new Entreprise();
                    ret.setNom(data.nom);
                    ret.setTelephone(data.telephone);
                    ret.setTheme(data.theme);
                    ret.setAdresse(data.adresse);
                    ret.setSlogan(data.slogan);
                    ret.setMessage(data.message);
                    ret.setUseComptes(data.use_comptes);
                    ret.langue = data.langue;
                    ret.menus = data.menus;
                    if (isLocalBddSuppored() == true && updated == true) {
                        getImplOfConnexionLocal().updateEntreprise(null, ret);
                    }
                    methodToExecuteAfter(ret);
                },
                error: function(xhr, textStatus, errorThrown) {
                    showErrorMessage(strings.getString("label.error.connexion.serveur"));
                }
            });
        }
    };
    this.getCategoriesForContentCategorie = function(onCarteLoadFinish) {
        $.ajax({
            url: getServicePath("serveur.clientaccess.serviceGetAllCategories"),
            type: 'GET',
            dataType: 'json',
            async: true,
            success: function(data, textStatus, xhr) {
                var categories = new Array();
                for (var i = 0; i < data.length; i++) {
                    var categorie = new Categorie();
                    categorie.setId(parseInt(data[i].id));
                    categorie.setNom(data[i].nom);
                    categorie.setPriorite(data[i].priorite);
                    categorie.setSousCategorie(data[i].souscategorie);
                    categories.push(categorie);
                }
                if (onCarteLoadFinish != null) {
                    onCarteLoadFinish(categories);
                }
            },
            error: function(xhr, textStatus, errorThrown) {
                showErrorMessage(strings.getString("label.error.connexion.serveur"));
            }
        });
    };
    this.getSousCategoriesByIdCategorieForContentSousCategorie = function(functionToLoad, idsousCat, idCat) {
        $.ajax({
            url: getServicePath("serveur.clientaccess.serviceGetSousCategoriesById") + "?id=" + idsousCat,
            type: 'GET',
            dataType: 'json',
            async: true,
            success: function(data, textStatus, xhr) {
                var souscategorie = new SousCategorie();
                souscategorie.setId(parseInt(data.ID));
                souscategorie.setNom(data.NOM);
                souscategorie.setPriorite(parseInt(data.priorite));
                souscategorie.setCategorie(data.categorie_id);
                if (functionToLoad != null) {
                    functionToLoad(souscategorie, idCat);
                }
            },
            error: function(xhr, textStatus, errorThrown) {
                showErrorMessage(strings.getString("label.error.connexion.serveur"));
            }
        });
    };
    this.getMenuByIdForDetailMenu = function(method, idmenu) {
        $.ajax({
            url: getServicePath("serveur.clientaccess.serviceGetMenuById") + "?id=" + idmenu,
            type: 'GET',
            dataType: 'json',
            async: true,
            success: function(data, textStatus, xhr) {
                var menu = new Menu();
                menu.setId(parseInt(data.id));
                menu.setNom(data.nom);
                menu.setProduits(data.produits);
                menu.setPrix(parseFloat(data.prix));
                if (method != null) {
                    method(menu);
                }
            },
            error: function(xhr, textStatus, errorThrown) {
                showErrorMessage(strings.getString("label.error.connexion.serveur"));
            }
        });
    };
    this.getProduitByIdForDetailMenu = function(method, isexecute, produitid, i, produits) {
        $.ajax({
            url: getServicePath("serveur.clientaccess.serviceGetProduitById") + "?id=" + produitid,
            type: 'GET',
            dataType: 'json',
            async: true,
            success: function(data, textStatus, xhr) {
                var produit = new Produit();
                produit.setNom(data.nom);
                produit.setId(data.id);
                produit.setPrix(parseFloat(data.prix));
                var categorie = new Categorie();
                categorie.setNom(data.categorie.nom);
                categorie.setId(data.categorie.id);
                categorie.setPriorite(data.categorie.priorite);
                categorie.setSousCategorie(data.categorie.souscategorie);
                produit.setCategorie(categorie);
                produit.setSousCategorie(data.categorie);
                produit.setIdsIngredients(data.ingredients);
                produit.setOptions(data.options);
                produits[i] = produit;
                produitsInMenuLoaded.push(produit);
                if (method != null && isexecute == true) {//Nous avons besoin de l'executer.
                    method(produits);
                }
            },
            error: function(xhr, textStatus, errorThrown) {
                showErrorMessage(strings.getString("label.error.connexion.serveur"));
            }
        });
    };
    this.getAllMenuForDetailMenu = function(method) {
        $.ajax({
            url: getServicePath("serveur.clientaccess.serviceGetAllMenus"),
            type: 'GET',
            dataType: 'json',
            async: true,
            success: function(data, textStatus, xhr) {
                var menus = new Array();
                for (var i = 0; i < data.length; i++) {
                    var menu = new Menu();
                    menu.setNom(data[i].nom);
                    menu.setId(data[i].id);
                    menu.setPrix(parseInt(data[i].prix));
                    menu.setProduits(data[i].produits);
                    menus.push(menu);
                }
                if (method != null) {
                    method(menus);
                }
            },
            error: function(xhr, textStatus, errorThrown) {
                showErrorMessage(strings.getString("label.error.connexion.serveur"));
            }
        });
    };
    this.getProduitByIdCategorieForPrintProduits = function(method, idcat) {
        $.ajax({
            url: getServicePath("serveur.clientaccess.serviceGetProduitByCategorieId") + "?id=" + idcat,
            type: 'GET',
            dataType: 'json',
            async: false,
            success: function(data, textStatus, xhr) {
                var produits = new Array();
                for (var i = 0; i < data.length; i++) {
                    var produit = new Produit();
                    produit.setNom(data[i].nom);
                    produit.setId(data[i].id);
                    produit.setPrix(parseFloat(data[i].prix));
                    var categorie = new Categorie();
                    categorie.setNom(data[i].categorie.nom);
                    categorie.setId(data[i].categorie.id);
                    categorie.setPriorite(data[i].categorie.priorite);
                    categorie.setSousCategorie(data[i].categorie.souscategorie);
                    produit.setCategorie(categorie);
                    produit.setSousCategorie(parseInt(data[i].souscategorie));
                    produit.setIdsIngredients(data[i].ingredients);
                    produit.setOptions(data[i].options);
                    produits.push(produit);
                }
                if (method != null) {//Nous avons besoin de l'executer.
                    method(produits);
                }
            },
            error: function(xhr, textStatus, errorThrown) {
                showErrorMessage(strings.getString("label.error.connexion.serveur"));
            }
        });
    };
    this.getIngredientById = function(method, id, param) {
        $.ajax({
            url: getServicePath("serveur.clientaccess.serviceGetIngredientById") + "?id=" + id,
            type: 'GET',
            dataType: 'json',
            async: false,
            success: function(data, textStatus, xhr) {
                var ingredient = new Ingredient();
                ingredient.setNom(data.nom);
                ingredient.setId(data.id);
                if (method != null) { //Nous avons besoin de l'executer.
                    method(ingredient, param);
                }
            },
            error: function(xhr, textStatus, errorThrown) {
                showErrorMessage("Impossible d'accèder au serveur.");
            }
        });
    };
    this.getProduitByIdGeneric = function(method, id, param) {
        $.ajax({
            url: getServicePath("serveur.clientaccess.serviceGetProduitById") + "?id=" + id,
            type: 'GET',
            dataType: 'json',
            async: true,
            success: function(data, textStatus, xhr) {
                var produit = new Produit();
                produit.setNom(data.nom);
                produit.setId(data.id);
                produit.setPrix(parseFloat(data.prix));
                var categorie = new Categorie();
                categorie.setNom(data.categorie.nom);
                categorie.setId(data.categorie.id);
                categorie.setPriorite(data.categorie.priorite);
                categorie.setSousCategorie(data.categorie.souscategorie);
                produit.setCategorie(categorie);
                produit.setSousCategorie(data.categorie);
                produit.setIdsIngredients(data.ingredients);
                produit.setOptions(data.options);
                if (method != null) {//Nous avons besoin de l'executer.
                    method(produit, param);
                }
            },
            error: function(xhr, textStatus, errorThrown) {
                showErrorMessage(strings.getString("label.error.connexion.serveur"));
            }
        });
    };
    this.getMenuById = function(method, id, param) {
        $.ajax({
            url: getServicePath("serveur.clientaccess.serviceGetMenuById") + "?id=" + id,
            type: 'GET',
            dataType: 'json',
            async: true,
            success: function(data, textStatus, xhr) {
                var menu = new Menu();
                menu.setNom(data.nom);
                menu.setId(data.id);
                menu.setPrix(parseFloat(data.prix));
                menu.setProduits(data.produits);
                if (method != null) {//Nous avons besoin de l'executer.
                    method(menu, param);
                }
            },
            error: function(xhr, textStatus, errorThrown) {
                showErrorMessage(strings.getString("label.error.connexion.serveur"));
            }
        });
    };
    this.getAllTables = function(method) {
        $.ajax({
            url: getServicePath("serveur.clientaccess.serviceGetAllTables"),
            type: 'GET',
            dataType: 'json',
            async: true,
            success: function(data, textStatus, xhr) {
                var tables = new Array();
                for (var i = 0; i < data.length; i++) {
                    tables.push(new Table(data[i].id, data[i].numero));
                }
                method(tables);
            },
            error: function(xhr, textStatus, errorThrown) {
                showErrorMessage(strings.getString("label.error.connexion.serveur"));
            }
        });
    };
    this.getAllModesDeReglement = function(method, param) {
        $.ajax({
            url: getServicePath("serveur.clientaccess.serviceGetAllModesDeReglement"),
            type: 'GET',
            dataType: 'json',
            async: true,
            success: function(data, textStatus, xhr) {
                var modesDeReglements = new Array();
                for (var i = 0; i < data.length; i++) {
                    modesDeReglements.push(new ModeDeReglements(data[i].id, data[i].nom, data[i].url, data[i].redirictUrl));
                }
                if (method != null) {
                    method(modesDeReglements, param);
                }
            },
            error: function(xhr, textStatus, errorThrown) {
                showErrorMessage(strings.getString("label.error.connexion.serveur"));
            }
        });
    };
    this.getModeDeReglementById = function(method, id, param) {
        $.ajax({
            url: getServicePath("serveur.clientaccess.serviceGetModesDeReglementById")+"?id="+id,
            type: 'GET',
            dataType: 'json',
            async: true,
            success: function(data, textStatus, xhr) {
                var mdr = new ModeDeReglements(data.id, data.nom, data.url, data.redirictUrl);
                if (method != null) {
                    method(mdr, param);
                }
            },
            error: function(xhr, textStatus, errorThrown) {
                console.log(errorThrown);
                showErrorMessage(strings.getString("label.error.connexion.serveur"));
            }
        });
    };
}
