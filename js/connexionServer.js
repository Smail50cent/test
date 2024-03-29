function ConnexionServer() {
    this.getMajTable = function(conftableName) {
        $.ajax({
            url: getServicePath("serveur.clientaccess.serviceGetMajTablesByNom") + "?nomTable=" + conftableName,
            type: 'GET',
            dataType: 'json',
            async: true,
            success: function(data, textStatus, xhr) {
//                console.log("Table : ", conftableName, " level : ", data.level);
            },
            error: function(xhr, textStatus, errorThrown) {
                showErrorMessage(strings.getString("label.error.connexion.serveur"));
            }
        });
    };
    this.haveMAJ = function(method, nomTable, level) {
        method("NS");
//        if (isLocalBddSuppored() == false || isMozilla()) {
//            method("NS");
//        } else {
//            $.ajax({
//                url: getServicePath("serveur.clientaccess.serviceGethaveMAJ") + "?nomTable=" + nomTable + "&level=" + level,
//                type: 'GET',
//                dataType: 'json',
//                async: true,
//                success: function(data, textStatus, xhr) {
//                    if (method != null && data) {//Nous avons besoin de l'executer.
//                        if (data == false) {
//                            method(data, level);
//                        } else {
//                            if (data.data.length == 0) {
//                                data.data = "NU";
//                            }
//                            method(data.data, data.level);
//                        }
//                    } else {
//                        method(null);
//                    }
//                },
//                error: function(xhr, textStatus, errorThrown) {
//                    showErrorMessage(strings.getString("label.error.connexion.serveur"));
//                }
//            });
//        }
    };
    this.getEntreprise = function(methodToExecuteAfter) {
        var ret = null;
        var updated = false;
        var clientLevel = getUpdateLevelOfTable(config.getConfig("tableNameEntreprise"));
        if (isLocalBddSuppored() == false || isMozilla()) {
            pullNewData(methodToExecuteAfter);
        } else {
            $.ajaxSetup({cache: false});
            $.ajax({
                url: getServicePath("serveur.clientaccess.serviceGetEntrepriseMaj"),
                type: 'GET',
                dataType: 'json',
                async: true,
                success: function(data, textStatus, xhr) {
//                    console.log("data.level=" + data.level + " clientLevel=" + clientLevel);
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
        var idzone = null;
        var idetablissement = parseInt(getLocalStorageValue("client.application.etablissement.id"));
        if (getLocalStorageValue("paramCommande.numTable") != null) {
            idzone = JSON.parse(getLocalStorageValue("paramCommande.numTable")).zone;
        }
        $.ajax({
            url: getServicePath("serveur.clientaccess.serviceGetAllCategories") + "?idetablissement=" + idetablissement + "&idzone=" + idzone,
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
                menu.setTauxDeTva(parseFloat(data.tauxDeTva));
                menu.setPrix((data.prix));
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
                curentReq++;
                var produit = new Produit();
                produit.setNom(data.nom);
                produit.setId(data.id);
                var categorie = new Categorie();
                categorie.setNom(data.categorie.nom);
                categorie.setId(data.categorie.id);
                categorie.setPriorite(data.categorie.priorite);
                categorie.setSousCategorie(data.categorie.souscategorie);
                produit.setCategorie(categorie);
                produit.setSousCategorie(data.categorie);
                produit.setIdsIngredients(data.ingredients);
                produit.setOptions(data.options);
                produit.setAssociationPrixProduit(data.associationPrixProduit);
                produits[i] = produit;
                produitsInMenuLoaded.push(produit);
                if (method != null) {//Nous avons besoin de l'executer.
                    if (curentReq == produits.length) {
                        method(produits);
                    }
                }
            },
            error: function(xhr, textStatus, errorThrown) {
                showErrorMessage(strings.getString("label.error.connexion.serveur"));
            }
        });
    };
    this.getAllMenuForDetailMenu = function(method) {
        var idzone = null;
        var idetablissement = parseInt(getLocalStorageValue("client.application.etablissement.id"));
        if (getLocalStorageValue("paramCommande.numTable") != null) {
            idzone = JSON.parse(getLocalStorageValue("paramCommande.numTable")).zone;
        }
        $.ajax({
            url: getServicePath("serveur.clientaccess.serviceGetAllMenus") + "?idetablissement=" + idetablissement + "&idzone=" + idzone,
            type: 'GET',
            dataType: 'json',
            async: true,
            success: function(data, textStatus, xhr) {
                var menus = new Array();
                for (var i = 0; i < data.length; i++) {
                    var menu = new Menu();
                    menu.setNom(data[i].nom);
                    menu.setId(data[i].id);
                    menu.setTauxDeTva(parseFloat(data[i].tauxDeTva));
                    menu.setPrix(data[i].prix);
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
    this.getProduitByIdCategorieForPrintProduits = function(method, idcat, param) {
        var clientLevel = getUpdateLevelOfTable(config.getConfig("tableNameProduit"));
        this.haveMAJ(allprod, config.getConfig("tableNameProduit"), clientLevel);
        function allprod(products, level) {
            if (products instanceof Object || products instanceof Array) {
                var produits = new Array();
                for (var i = 0; i < products.length; i++) {
                    var produit = new Produit();
                    produit.setNom(products[i].nom);
                    produit.setId(products[i].id);
                    produit.setTauxTva(products[i].tauxTva);
                    var categorie = new Categorie();
                    categorie.setNom(products[i].categorie.nom);
                    categorie.setId(products[i].categorie.id);
                    categorie.setPriorite(products[i].categorie.priorite);
                    categorie.setSousCategorie(products[i].categorie.souscategorie);
                    produit.setCategorie(categorie);
                    produit.setSousCategorie(products[i].souscategorie);
                    produit.setAssociationPrixProduit(products[i].associationPrixProduit);
                    produit.setIdsIngredients(products[i].ingredients);
                    produit.setOptions(products[i].options);
                    produit.setLevel(products[i].level);
                    var level = products[i].level;
                    produits.push(produit);
                }
                var countProduitHaveUpdate = 0;
                for (var i = 0; i < products.length; i++) {
                    getImplOfConnexionLocal().updateProduit(produitup, products[i]);
                    function produitup(prods) {
                        countProduitHaveUpdate++;
                        if (countProduitHaveUpdate == products.length) {
                            if (method != null) {
                                method(getImplOfConnexionLocal().getProduitByIdCategorieForPrintProduits(method, idcat));
                            }
                        }
                    }
                }
                updateLevelOfTable(config.getConfig("tableNameProduit"), level);
            } else if (products == "NS") {
                var idzone = null;
                var idetablissement = parseInt(getLocalStorageValue("client.application.etablissement.id"));
                if (getLocalStorageValue("paramCommande.numTable") != null) {
                    idzone = JSON.parse(getLocalStorageValue("paramCommande.numTable")).zone;
                }
                $.ajax({
                    url: getServicePath("serveur.clientaccess.serviceGetProduitByCategorieId") + "?id=" +
                            idcat + "&idetablissement=" + idetablissement + "&idzone=" + idzone,
                    type: 'GET',
                    dataType: 'json',
                    async: true,
                    success: function(data, textStatus, xhr) {
                        var produits = new Array();
                        for (var i = 0; i < data.length; i++) {
                            var produit = new Produit();
                            produit.setNom(data[i].nom);
                            produit.setId(data[i].id);
                            produit.setTauxTva(data[i].tauxTva);
                            var categorie = new Categorie();
                            categorie.setNom(data[i].categorie.nom);
                            categorie.setId(data[i].categorie.id);
                            categorie.setPriorite(data[i].categorie.priorite);
                            categorie.setSousCategorie(data[i].categorie.souscategorie);
                            produit.setCategorie(categorie);
                            produit.setSousCategorie(data[i].souscategorie);
                            produit.setAssociationPrixProduit(data[i].associationPrixProduit);
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
            } else {
                getImplOfConnexionLocal().getProduitByIdCategorieForPrintProduits(method, idcat);
            }
        }
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
                //console.log(data);
                var produit = new Produit();
                produit.setNom(data.nom);
                produit.setId(data.id);
                produit.setTauxTva(data.tauxTva);
                var categorie = new Categorie();
                categorie.setNom(data.categorie.nom);
                categorie.setId(data.categorie.id);
                categorie.setPriorite(data.categorie.priorite);
                categorie.setSousCategorie(data.categorie.souscategorie);
                produit.setCategorie(categorie);
                produit.setSousCategorie(data.souscategorie);
                produit.setIdsIngredients(data.ingredients);
                produit.setAssociationPrixProduit(data.associationPrixProduit);
                produit.setOptions(data.options);
                produit.setEtablissements(data.etablissements);
                produit.setZones(data.zones);
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
                menu.setPrix((data.prix));
                menu.setTauxDeTva(parseFloat(data.tauxDeTva));
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
                    tables.push(new Table(data[i].id, data[i].numero, data[i].zone));
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
            url: getServicePath("serveur.clientaccess.serviceGetModesDeReglementById") + "?id=" + id,
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
                showErrorMessage(strings.getString("label.error.connexion.serveur"));
            }
        });
    };
    this.sendTicketToServeur = function(method, ticket, param) {
        var monTicket = JSON.stringify(ticket);
        $.ajax({
            url: getServicePath("serveur.clientaccess.serviceSetNewTicket"),
            type: 'POST',
            data: {ticket: monTicket},
            async: false,
            success: function(data, textStatus, xhr) {
                console.log(data);
                data = JSON.parse(data);
                setLocalStorageValue("id.last.created.ticket", data.id);
                if (method != null) {
                    method(param);
                }
            },
            error: function(xhr, textStatus, errorThrown) {
                showErrorMessage(strings.getString("label.error.connexion.serveur"));
            }
        });
    };
    this.getAllComptes = function(method, param) {
        $.ajax({
            url: getServicePath("serveur.clientaccess.serviceGetAllComptes"),
            type: 'GET',
            dataType: 'json',
            async: true,
            success: function(data, textStatus, xhr) {
                var comptes = new Array();
                for (var i = 0; i < data.length; i++) {
                    var compte = new Compte();
                    compte.setId(data[i].id);
                    compte.setPassword(data[i].password);
                    comptes.push(compte);
                }
                method(comptes, param);
            },
            error: function(xhr, textStatus, errorThrown) {
                showErrorMessage(strings.getString("label.error.connexion.serveur"));
            }
        });
    };
    this.getAllParamForms = function(method, param) {
        $.ajax({
            url: getServicePath("serveur.clientaccess.serviceGetAllParamForms"),
            type: 'GET',
            dataType: 'json',
            async: true,
            success: function(data, textStatus, xhr) {
                var paramforms = new Array();
                for (var i = 0; i < data.length; i++) {
                    var paramform = new ParamForm();
                    paramform.setId_form(data[i].id_form);
                    paramform.setActif(data[i].actif);
                    paramform.setDiscrim(data[i].discrim);
                    paramform.setFile_template_html(data[i].file_template_html);
                    paramform.setId_label_html(data[i].id_label_html);
                    paramform.setType_html(data[i].type_html);
                    paramform.setClass_html(data[i].class_html);
                    paramform.setStyle_html(data[i].style_html);
                    paramform.setOrdre(data[i].ordre);
                    paramform.setId_html(data[i].id_html);
                    paramform.setFile_template_html(data[i].file_template_html);
                    paramforms.push(paramform);
                }
                method(paramforms, param);
            },
            error: function(xhr, textStatus, errorThrown) {
                showErrorMessage(strings.getString("label.error.connexion.serveur"));
            }
        });
    };
    this.getAllAttributsComptes = function(method, param) {
        $.ajax({
            url: getServicePath("serveur.clientaccess.serviceGetAllAttributsComptes"),
            type: 'GET',
            dataType: 'json',
            async: false,
            success: function(data, textStatus, xhr) {
                var paramforms = new Array();
                for (var i = 0; i < data.length; i++) {
                    var paramform = new AttributCompte();
                    paramform.setId(data[i].id);
                    paramform.setId_form(data[i].id_form);
                    paramform.setValeur_champ(data[i].valeur_champ);
                    paramform.setDefaut(data[i].defaut);
                    paramform.setId_compte(data[i].id_compte);
                    paramforms.push(paramform);
                }
                method(paramforms, param);
            },
            error: function(xhr, textStatus, errorThrown) {
                showErrorMessage(strings.getString("label.error.connexion.serveur"));
            }
        });
    };
    this.addAttributCompte = function(id_form, valeur_champ, defaut, id_compte) {
        $.ajax({
            url: getServicePath("serveur.clientaccess.serviceAddAttributCompte") + "?id_form=" + id_form + "&valeur_champ=\"" + valeur_champ + "\"&defaut=" + defaut + "&id_compte=" + id_compte,
            type: 'GET',
            async: false,
            success: function(data) {

            },
            error: function(xhr, textStatus, errorThrown) {
                showErrorMessage(strings.getString("label.error.connexion.serveur"));
            }
        });
    };
    this.addCompte = function(method, password, id_role, param) {
        $.ajax({
            url: getServicePath("serveur.clientaccess.serviceAddCompte"),
            type: 'POST',
            data: {password: password, id_role: id_role},
            async: true,
            success: function(data) {
                method(data, param);
            },
            error: function(xhr, textStatus, errorThrown) {
                showErrorMessage(strings.getString("label.error.connexion.serveur"));
            }
        });
    };
    this.getAllParamApps = function(method, param) {
        var idetablissement = parseInt(getLocalStorageValue("client.application.etablissement.id"));
        if (param != null) {
            if (param.hasOwnProperty("impllocal")) {
                if (param.impllocal == false) {
                    $.ajax({
                        url: getServicePath("serveur.clientaccess.serviceGetAllParamApps"),
                        type: 'GET',
                        dataType: 'json',
                        async: true,
                        success: function(data, textStatus, xhr) {
                            var paramapps = new Array();
                            for (var i = 0; i < data.length; i++) {
                                var paramapp = new ParamApp();
                                paramapp.setId(data[i].id);
                                paramapp.setNom_parametre(data[i].nom_parametre);
                                paramapp.setValeur_parametre(data[i].valeur_parametre);
                                paramapp.setEtablissement(data[i].etablissement);
                                paramapps.push(paramapp);
                            }
                            if (method != null) {
                                method(paramapps, param);
                            }
                        },
                        error: function(xhr, textStatus, errorThrown) {
                            showErrorMessage(strings.getString("label.error.connexion.serveur"));
                        }
                    });
                } else {
                    withet();
                }
            } else {
                withet();
            }
        } else {
            withet();
        }
        function withet() {
            $.ajax({
                url: getServicePath("serveur.clientaccess.serviceGetAllParamApps") + "?idetablissement=" + idetablissement,
                type: 'GET',
                dataType: 'json',
                async: true,
                success: function(data, textStatus, xhr) {
                    var paramapps = new Array();
                    for (var i = 0; i < data.length; i++) {
                        var paramapp = new ParamApp();
                        paramapp.setId(data[i].id);
                        paramapp.setNom_parametre(data[i].nom_parametre);
                        paramapp.setValeur_parametre(data[i].valeur_parametre);
                        paramapp.setEtablissement(data[i].etablissement);
                        paramapps.push(paramapp);
                    }
                    if (method != null) {
                        method(paramapps, param);
                    }
                },
                error: function(xhr, textStatus, errorThrown) {
                    showErrorMessage(strings.getString("label.error.connexion.serveur"));
                }
            });
        }
    };
    this.getCompteById = function(method, id, param) {
        $.ajax({
            url: getServicePath("serveur.clientaccess.serviceGetCompteById") + "?id=" + id,
            type: 'GET',
            dataType: 'json',
            async: true,
            success: function(data, textStatus, xhr) {
                var compte = new Compte();
                compte.setId(data.id);
                compte.setRole(data.role);
                compte.setPassword(data.password);
                if (method != null) {//Nous avons besoin de l'executer.
                    method(compte, param);
                }
            },
            error: function(xhr, textStatus, errorThrown) {
                showErrorMessage(strings.getString("label.error.connexion.serveur"));
            }
        });
    };
    this.getAttributCompteByIdCompte = function(method, id, param) {
        $.ajax({
            url: getServicePath("serveur.clientaccess.serviceGetAttributCompteByIdCompte") + "?id_compte=" + id,
            type: 'GET',
            dataType: 'json',
            async: true,
            success: function(data, textStatus, xhr) {
                var attcomptes = new Array();
                for (var i = 0; i < data.length; i++) {
                    var attcompte = new AttributCompte();
                    attcompte.setId(data[i].id);
                    attcompte.setId_compte(data[i].id_compte);
                    attcompte.setId_form(data[i].id_form);
                    attcompte.setDefaut(data[i].defaut);
                    attcompte.setValeur_champ(data[i].valeur_champ);
                    attcomptes.push(attcompte);
                }
                if (method != null) {//Nous avons besoin de l'executer.
                    method(attcomptes, param);
                }
            },
            error: function(xhr, textStatus, errorThrown) {
                showErrorMessage(strings.getString("label.error.connexion.serveur"));
            }
        });
    };
    this.sendPersonnePriority = function(method, personnePriority, param) {
        var personnePriority2 = JSON.stringify(personnePriority);
        $.ajax({
            url: getServicePath("serveur.clientaccess.setPersonnePriority"),
            type: 'POST',
            data: {personnePriority: personnePriority2},
            async: false,
            success: function(data, textStatus, xhr) {
                if (method != null) {
                    method(param);
                }
            },
            error: function(xhr, textStatus, errorThrown) {
                showErrorMessage(strings.getString("label.error.connexion.serveur"));
            }
        });
    };
    this.getAttributsComptesByEmail = function(method, email, param) {
        $.ajax({
            url: getServicePath("serveur.clientaccess.serviceGetAttributsComptesByEmail") + "?email=" + email,
            type: 'GET',
            dataType: 'json',
            async: true,
            success: function(data, textStatus, xhr) {
                var attcompte = null;
                if (data != null) {
                    attcompte = new AttributCompte();
                    attcompte.setId(data.id);
                    attcompte.setId_compte(data.id_compte);
                    attcompte.setId_form(data.id_form);
                    attcompte.setDefaut(data.defaut);
                    attcompte.setValeur_champ(data.valeur_champ);
                }
                if (method != null) {//Nous avons besoin de l'executer.
                    method(attcompte, param);
                }
            },
            error: function(xhr, textStatus, errorThrown) {
                showErrorMessage(strings.getString("label.error.connexion.serveur"));
            }
        });
    };
    this.getAllProduitFavoriteByIdServeur = function(method, id, param) {
        $.ajax({
            url: getServicePath("serveur.clientaccess.serviceGetAllProduitFavoriteByIdServeur") + "?id=" + id,
            type: 'GET',
            dataType: 'json',
            async: true,
            success: function(data, textStatus, xhr) {
                var cpfs = new Array();
                if (data != null) {
                    for (var i = 0; i < data.length; i++) {
                        var cpf = new CompteProduitFavori();
                        cpf.setId(data[i].id);
                        var produit = new Produit();
                        produit.setNom(data[i].produit.nom);
                        produit.setId(data[i].produit.id);
                        produit.setTauxTva(data[i].produit.tauxTva);
                        produit.setAssociationPrixProduit(data[i].produit.associationPrixProduit);
                        var categorie = new Categorie();
                        categorie.setNom(data[i].produit.categorie.nom);
                        categorie.setId(data[i].produit.categorie.id);
                        categorie.setPriorite(data[i].produit.categorie.priorite);
                        categorie.setSousCategorie(data[i].produit.categorie.souscategorie);
                        produit.setCategorie(categorie);
                        produit.setSousCategorie(data[i].produit.souscategorie);
                        produit.setIdsIngredients(data[i].produit.ingredients);
                        produit.setAssociationPrixProduit(data[i].produit.associationPrixProduit);
                        produit.setOptions(data[i].produit.options);
                        cpf.setProduit(produit);
                        cpfs.push(cpf);
                    }
                }
                if (method != null) {
                    method(cpfs, param);
                }
            },
            error: function(xhr, textStatus, errorThrown) {
                showErrorMessage(strings.getString("label.error.connexion.serveur"));
            }
        });
    };
    this.getAllProduitSuggerer = function(method, param) {
        $.ajax({
            url: getServicePath("serveur.clientaccess.serviceGetAllProduitsSuggerer"),
            type: 'GET',
            dataType: 'json',
            async: true,
            success: function(data, textStatus, xhr) {
                var cpfs = new Array();
                if (data != null) {
                    for (var i = 0; i < data.length; i++) {
                        var cpf = new CompteProduitFavori();
                        cpf.setId(data[i].id);
                        var produit = new Produit();
                        produit.setNom(data[i].produit.nom);
                        produit.setId(data[i].produit.id);
                        produit.setTauxTva(data[i].produit.tauxTva);
                        produit.setAssociationPrixProduit(data[i].produit.associationPrixProduit);
                        var categorie = new Categorie();
                        categorie.setNom(data[i].produit.categorie.nom);
                        categorie.setId(data[i].produit.categorie.id);
                        categorie.setPriorite(data[i].produit.categorie.priorite);
                        categorie.setSousCategorie(data[i].produit.categorie.souscategorie);
                        produit.setCategorie(categorie);
                        produit.setSousCategorie(data[i].produit.souscategorie);
                        produit.setIdsIngredients(data[i].produit.ingredients);
                        produit.setAssociationPrixProduit(data[i].produit.associationPrixProduit);
                        produit.setOptions(data[i].produit.options);
                        cpf.setProduit(produit);
                        cpfs.push(cpf);
                    }
                }
                if (method != null) {
                    method(cpfs, param);
                }
            },
            error: function(xhr, textStatus, errorThrown) {
                showErrorMessage(strings.getString("label.error.connexion.serveur"));
            }
        });
    };
    this.getParametreApplicationByNom = function(method, nom, param) {
        var idetablissement = parseInt(getLocalStorageValue("client.application.etablissement.id"));
        $.ajax({
            url: getServicePath("serveur.clientaccess.serviceGetParamAppByNom") + "?nom=" + nom + "&idetablissement=" + idetablissement,
            type: 'GET',
            dataType: 'json',
            async: false,
            success: function(data, textStatus, xhr) {
                var parametreApplication = null;
                if (data != null) {
                    parametreApplication = new ParametreApplication();
                    parametreApplication.setId(data.id);
                    parametreApplication.setNomParametre(data.nom_parametre);
                    parametreApplication.setEtablissement(data.etablissement);
                    parametreApplication.setValeurParametre((data.valeur_parametre));
                }
                if (method != null) {
                    method(parametreApplication, param);
                }
            },
            error: function(xhr, textStatus, errorThrown) {
                showErrorMessage(strings.getString("label.error.connexion.serveur"));
            }
        });
    };
    this.getReservationDisponibleWhereDateNull = function(method, param) {
        $.ajax({
            url: getServicePath("serveur.clientaccess.serviceGetDateReservationWhereDateNull"),
            type: 'GET',
            dataType: 'json',
            async: true,
            success: function(data, textStatus, xhr) {
                var liste = new Array();
                var reservationDateDispo = null;
                if (data != null) {
                    if (data instanceof Array) {
                        for (var i = 0; i < data.length; i++) {
                            reservationDateDispo = new ReservationDateDisponible(data[i].id, data[i].date, data[i].heureDebut, data[i].heureFin, data[i].indisponible);
                            liste.push(reservationDateDispo);
                        }
                    } else {
                        reservationDateDispo = new ReservationDateDisponible(data.id, data.date, data.heureDebut, data.heureFin, data.indisponible);
                        liste.push(reservationDateDispo);
                    }
                }
                if (method != null) {
                    method(liste, param);
                }
            },
            error: function(xhr, textStatus, errorThrown) {
                showErrorMessage(strings.getString("label.error.connexion.serveur"));
            }
        });
    };
    this.getAllZoneTables = function(method, param) {
        pAjax(function(data, param, methodexecute) {
            var liste = new Array();
            if (data != null) {
                for (var i = 0; i < data.length; i++) {
                    var tables = new Array();
                    for (var j = 0; j < data [i].tables.length; j++) {
                        tables.push(new Table(data [i].tables[j].id, data [i].tables[j].numero, data [i].tables[j].zone));
                    }
                    liste.push(new ZoneTable(data [i].id, data[i].nom, tables, data [i].etablissement_id));
                }
            }
            if (methodexecute != null) {
                methodexecute(liste, param);
            }
        }, {
            service: "serveur.clientaccess.serviceGetAllZoneTables"
        }, method, param);
    };
    this.deleteProduit = function(id) {
        pAjax(function(data, param, methodExecute) {
            if (methodExecute != null) {
                methodExecute(data, param);
            }
        }, {service: "serveur.clientaccess.serviceDeleteProduitV2", data: {ID: id}}, null, null);
    };
    this.getAllTypeCommandes = function(method, param) {
        if (param != null) {
            if (param.impllocal == false) {
                pullWebServiceData(method, param);
            } else {
                majTest(method, param);
            }
        } else {
            majTest(method, param);
        }
        function majTest(method, param) {
            var clientLevel = getUpdateLevelOfTable(config.getConfig("tableNameTypeCommande"));
            getConnexionServeur().haveMAJ(allprod, config.getConfig("tableNameTypeCommande"), clientLevel);
            function allprod(typeCommande, level) {
                if (typeCommande instanceof Array || typeCommande instanceof Object) {
                    var typeCommandes = new Array();
                    if (typeCommande instanceof Array) {
                        for (var i = 0; i < typeCommande.length; i++) {
                            typeCommandes.push(new TypeCommande(typeCommande[i].id, typeCommande[i].label, typeCommande[i].labelMenu, typeCommande[i].isActif, typeCommande[i].idInPageHtml));
                        }
                    } else {
                        typeCommandes.push(new TypeCommande(typeCommande.id, typeCommande.label, typeCommande.labelMenu, typeCommande.isActif, typeCommande.idInPageHtml));
                    }

                    var countProduitHaveUpdate = 0;
                    for (var i = 0; i < typeCommandes.length; i++) {
                        getImplOfConnexionLocal().updateTypeCommande(produitup, typeCommandes[i]);
                        function produitup(prods) {
                            countProduitHaveUpdate++;
                            if (countProduitHaveUpdate == typeCommandes.length) {
                                if (method != null) {
                                    getImplOfConnexionLocal().getAllTypeCommandes(method, null);
                                }
                            }
                        }
                    }
                    updateLevelOfTable(config.getConfig("tableNameTypeCommande"), level);
                } else if (typeCommande == "NS") {
                    pullWebServiceData(method, param);
                } else if (typeCommande == "NU") {
                    getImplOfConnexionLocal().getAllTypeCommandes(method, null);
                } else {
                    getImplOfConnexionLocal().getAllTypeCommandes(method, null);
                }
            }
        }
        function pullWebServiceData(method, param) {
            pAjax(function(data, param, methodExecute) {
                var liste = new Array();
                if (data != null) {
                    for (var i = 0; i < data.length; i++) {
                        liste.push(new TypeCommande(data[i].id, data[i].label, data[i].labelMenu, data[i].isActif, data[i].idInPageHtml));
                    }
                }
                if (methodExecute != null) {
                    methodExecute(liste, param);
                }
            }, {service: "serveur.clientaccess.serviceGetAllTypeCommande"}, method, null);
        }
    };
    this.getEtablissementById = function(method, id, param) {
        pAjax(function(data, param, methodExecute) {
            var liste;
            if (data != null) {
                liste = new Etablissement(data[0].id, data[0].nom, data[0].logo, data[0].style, data[0].adresseEtab, data[0].telephone, data[0].message, data[0].slogan, data[0].groupe);
            }
            if (methodExecute != null) {
                methodExecute(liste, param);
            }
        }, {service: "serveur.clientaccess.serviceGetByIdEtablissements", data: {id: id}}, method, null);
    };
    this.getAllOptions = function(method) {
        pAjax(function(data, param, methodExecute) {
            var options = new Array();
            for (var i = 0; i < data.length; i++) {
                var option = new Option();
                option.setId(data[i].id);
                option.setNom(data[i].nom);
                option.setLabel(data[i].label);
                option.setPossibilites(data[i].possibilites);
                options.push(option);
            }
            if (methodExecute != null) {
                methodExecute(options, param);
            }
        }, {service: "serveur.clientaccess.serviceGetAllOptions"}, method, null);
    };
    this.getAllTauxTva = function(method, param) {
        pAjax(function(data, param, methodExecute) {
            var TVA = new Array();
            for (var i = 0; i < data.length; i++) {
                var tauxtva = new TauxTva();
                tauxtva.setId(data[i].id_tva);
                tauxtva.setTaux(data[i].taux_tva);
                TVA.push(tauxtva);
            }
            if (methodExecute != null) {
                methodExecute(TVA, param);
            }
        }, {service: "serveur.clientaccess.serviceGetAllTauxTva"}, method, param);
    };
    this.getAllEtablissements = function(method, param) {
        pAjax(function(data, param, methodExecute) {
            var etablissements = new Array();
            for (var i = 0; i < data.length; i++) {
                var e = new Etablissement();
                e.id = data[i].id;
                e.nom = data[i].nom;
                e.logo = data[i].logo;
                e.style = data[i].style;
                e.adresseEtab = data[i].adresseEtab;
                e.telephone = data[i].telephone;
                e.message = data[i].message;
                e.slogan = data[i].slogan;
                e.groupe = data[i].groupe;
                etablissements.push(e);
            }
            if (methodExecute != null) {
                methodExecute(etablissements, param);
            }
        }, {service: "serveur.clientaccess.serviceGetAllEtablissements"}, method, param);
    };
    this.addOption = function(method, option, param) {
        option = JSON.stringify(option);
        pAjax(null, {service: "serveur.clientaccess.serviceAddAllOptions", data: {option: option}, async: false}, method, param);
    };
    this.addIngredient = function(method, ingredient, param) {
        ingredient = JSON.stringify(ingredient);
        pAjax(null, {service: "serveur.clientaccess.serviceAddAllIngredient", data: {ingredient_nom: ingredient}}, method, param);
    };
    this.getAllIngredients = function(method, param) {
        pAjax(function(data, param, methodExecute) {
            var list = new Array();
            for (var i = 0; i < data.length; i++) {
                var ingredient = new Ingredient();
                ingredient.setId(data[i].id);
                ingredient.setNom(data[i].nom);
                list.push(ingredient);
            }
            if (methodExecute != null) {
                methodExecute(list, param);
            }
        }, {service: "serveur.clientaccess.serviceGetAllIngredientsV2"}, method, param);
    };
    this.getAllSousCategories = function(method, param) {
        pAjax(function(data, param, methodExecute) {
            var list = new Array();
            for (var i = 0; i < data.length; i++) {
                var souscategorie = new SousCategorie();
                souscategorie.setId(data[i].ID);
                souscategorie.setNom(data[i].NOM);
                souscategorie.setPriorite(data[i].priorite);
                souscategorie.setCategorie(data[i].categorie_id);
                souscategorie.setTauxTva(data[i].taux_tva);
                list.push(souscategorie);
            }
            if (methodExecute != null) {
                methodExecute(list, param);
            }
        }, {service: "serveur.clientaccess.serviceGetAllSousCategoriesV2"}, method, param);
    };
    this.getAllEtablissementsWithZones = function(method, param) {
        pAjax(function(data, param, methodExecute) {
            var etablissements = new Array();
            for (var i = 0; i < data.length; i++) {
                var e = new Etablissement();
                e.id = data[i].id;
                e.nom = data[i].nom;
                e.logo = data[i].logo;
                e.style = data[i].style;
                e.adresseEtab = data[i].adresseEtab;
                e.telephone = data[i].telephone;
                e.message = data[i].message;
                e.slogan = data[i].slogan;
                e.groupe = data[i].groupe;
                e.zones = new Array();
                for (var j = 0; j < data[i].zones.length; j++) {
                    e.zones.push(new ZoneTable(data [i].zones[j].id, data [i].zones[j].nom, data [i].zones[j].tables, data [i].zones[j].etablissement_id));
                }
                etablissements.push(e);
            }
            if (methodExecute != null) {
                methodExecute(etablissements, param);
            }
        }, {"service": "serveur.clientaccess.serviceGetAllEtablissementsWithZones", async: false}, method, param);
    };
    this.addProduit = function(method, produit, param) {
        produit = JSON.stringify(produit);
        pAjax(function(data, param, methodExecute) {
            var groupe = new Groupe(data.id, data.nom, data.style, data.adresseSiege, data.slogan, data.message,
                    data.telephone, data.logo);
            if (methodExecute != null) {
                methodExecute(groupe, param);
            }
        }, {"service": "serveur.clientaccess.serviceAddProduit", data: {produit: produit}}, method, param);
    };
    this.updateProduit = function(method, produit, param) {
        produit = JSON.stringify(produit);
        pAjax(function(data, param, methodExecute) {
            var groupe = new Groupe(data.id, data.nom, data.style, data.adresseSiege, data.slogan, data.message,
                    data.telephone, data.logo);
            if (methodExecute != null) {
                methodExecute(groupe, param);
            }
        }, {"service": "serveur.clientaccess.serviceUpdateProduit", data: {produit: produit}}, method, param);
    };
    this.getGroupeById = function(method, id, param) {
        pAjax(function(data, param, methodExecute) {
            var groupe = new Groupe(data.id, data.nom, data.style, data.adresseSiege, data.slogan, data.message,
                    data.telephone, data.logo);
            if (methodExecute != null) {
                methodExecute(groupe, param);
            }
        }, {"service": "serveur.clientaccess.serviceGetGroupeById", data: {id: id}}, method, param);
    };
    this.sendNewEtablissement = function(method, etablissement, param) {
        etablissement = JSON.stringify(etablissement);
        pAjax(null,
                {service: "serveur.clientaccess.serviceAddEtablissements",
                    data: {etablissement: etablissement}
                }, method, param);
    };
    this.removeEtablissement = function(method, id, param) {
        pAjax(null,
                {service: "serveur.clientaccess.serviceRemoveEtablissements",
                    data: {id: id}, ifErrorSendAllDatas: true
                }, method, param);
    };
    this.updateEtablissement = function(method, etablissement, param) {
        etablissement = JSON.stringify(etablissement);
        pAjax(null, {service: "serveur.clientaccess.serviceUpdateEtablissements",
            data: {etablissement: etablissement}
        }, method, param);
    };
    this.getAllStyles = function(method, param) {
        pAjax(function(data, param, methodExecute) {
            var liste = new Array();
            for (var i = 0; i < data.length; i++) {
                liste.push(new Styles(data[i].id, data[i].nom, data[i].url, data[i].actif));
            }
            if (methodExecute != null) {
                methodExecute(liste, param);
            }
        }, {"service": "serveur.clientaccess.serviceGetAllStyles"}, method, param);
    };
    this.getAllStyles = function(method, param) {
        pAjax(function(data, param, methodExecute) {
            var liste = new Array();
            for (var i = 0; i < data.length; i++) {
                liste.push(new Styles(data[i].id, data[i].nom, data[i].url, data[i].actif));
            }
            if (methodExecute != null) {
                methodExecute(liste, param);
            }
        }, {"service": "serveur.clientaccess.serviceGetAllStyles"}, method, param);
    };
    this.addNewString = function(method, key, fr, en, param) {//fonction dev
        pAjax(null, {"service": "serveur.clientaccess.serviceAddString", data: {key: key, en: en, fr: fr}}, method, param);
    };
    this.getZonesTablesByEtablissement = function(method, id, param) {
        pAjax(function(data, param, methodExecute) {
            var liste = new Array();
            for (var i = 0; i < data.length; i++) {
                var tables = new Array();
                for (var j = 0; j < data [i].tables.length; j++) {
                    tables.push(new Table(data [i].tables[j].id, data [i].tables[j].numero, data [i].tables[j].zone));
                }
                liste.push(new ZoneTable(data [i].id, data[i].nom, tables, data [i].etablissement_id));
            }
            if (methodExecute != null) {
                methodExecute(data, param);
            }
        }, {"service": "serveur.clientaccess.serviceZoneTablesGetByIdEtablissment", data: {idetablissement: id}}, method, param);
    };

    this.getAllLangues = function(method, param) {
        pAjax(function(data, param, methodExecute) {
            var liste = new Array();
            for (var i = 0; i < data.length; i++) {
                liste.push(new Langues(data[i].id, data[i].label, data[i].gmt_level, data[i].actif));
            }
            if (methodExecute != null) {
                methodExecute(liste, param);
            }
        }, {"service": "serveur.clientaccess.serviceGetAllLangues"}, method, param);
    };

    this.setLangEnable = function(method, id, param) {
        pAjax(null, {"service": "serveur.clientaccess.serviceSetLangEnable", data: {idlang: id}}, method, param);
    };
    this.setLangDiable = function(method, id, param) {
        pAjax(null, {"service": "serveur.clientaccess.servicesetLangDiable", data: {idlang: id}}, method, param);
    };
    this.getLangByActif = function(method, param) {
        pAjax(function(data, param, methodExecute) {
            var liste = new Array();
            for (var i = 0; i < data.length; i++) {
                liste.push(new Langues(data[i].id, data[i].label, data[i].gmt_level, data[i].actif));
            }
            if (methodExecute != null) {
                methodExecute(liste, param);
            }
        }, {"service": "serveur.clientaccess.serviceLangGetByActif"}, method, param);
    };
    this.getZoneTablesWhereEtablissementNull = function(method, param) {
        pAjax(function(data, param, methodExecute) {
            var liste = new Array();
            for (var i = 0; i < data.length; i++) {
                var tables = new Array();
                for (var j = 0; j < data [i].tables.length; j++) {
                    tables.push(new Table(data [i].tables[j].id, data [i].tables[j].numero, data [i].tables[j].zone));
                }
                liste.push(new ZoneTable(data [i].id, data[i].nom, tables, data [i].etablissement_id));
            }
            if (methodExecute != null) {
                methodExecute(liste, param);
            }
        }, {"service": "serveur.clientaccess.serviceZoneTablesGetByEtablissementNull"}, method, param);
    };
    this.removeZoneTable = function(method, id1, param) {
        pAjax(null, {service: "serveur.clientaccess.serviceremoveZoneTable", data: {id: id1}}, method, param);
    };
    this.addZoneTable = function(method, zone, param) {
        pAjax(null, {service: "serveur.clientaccess.serviceAddZoneTable", data: {zone: JSON.stringify(zone)}}, method, param);
    };
    this.getZoneTableById = function(method, id, param) {
        pAjax(function(data, param, methodExecute) {
            data = data[0];
            if (methodExecute != null) {
                methodExecute(data, param);
            }
        }, {service: "serveur.clientaccess.serviceGetZoneTableById", data: {id: id}}, method, param);
    };
    this.removeTable = function(method, id, param) {
        pAjax(null, {service: "serveur.clientaccess.serviceRemoveTable", data: {id: id}}, method, param);
    };
    this.addNewTable = function(method, numero, idzoneTable, param) {
        pAjax(null, {service: "serveur.clientaccess.serviceAddTable", data: {idzonetable: idzoneTable, numero: numero}}, method, param);
    };

    this.addCategorie = function(method, categorie, param) {
        categorie = JSON.stringify(categorie);
        pAjax(null, {service: "serveur.clientaccess.serviceAddCategorie", data: {categorie: categorie}}, method, param);
    };
    this.getAllCategories = function(method, param) {
        pAjax(function(data, param, methodExecute) {
            var categories = new Array();
            for (var i = 0; i < data.length; i++) {
                var etablissements = new Array();
                var categorie = new Categorie();
                categorie.setId(data[i].id);
                categorie.setNom(data[i].nom);
                categorie.setPriorite(data[i].priorite);
                for (var j = 0; j < data[i].assocEtabZone.length; j++) {
                    var etablissement = new Etablissement();
                    etablissement.setId(data[i].assocEtabZone[j].id);
                    etablissement.setNom(data[i].assocEtabZone[j].nom);
                    etablissement.setZones(data[i].assocEtabZone[j].zone);
                    etablissements.push(etablissement);
                }
                categorie.setEtablissement(etablissements);
                categorie.setZone(data[i].zones);
                categorie.setSousCategorie(data[i].souscategorie);
                categories.push(categorie);
            }
            if (methodExecute != null) {
                methodExecute(categories, param);
            }
        }, {service: "serveur.clientaccess.serviceGetAllCategoriesWF"}, method, param);
    };
    this.DeleteCategorie = function(method, id, param) {
        pAjax(null, {service: "serveur.clientaccess.serviceDeleteCategorie", data: {id: id}}, method, param);
    };
    this.updateZoneTable = function(method, nom, idzoneTable, param) {
        pAjax(null, {service: "serveur.clientaccess.serviceUpdateZone", data: {idzonetable: idzoneTable, nom: nom}}, method, param);
    };
    this.getPrioriteByEtablissment = function(method, id, param) {
        pAjax(null, {service: "serveur.clientaccess.serviceGetPrioriteCategorie", data: {idCat: id}}, method, param);
    };
    this.updatePriorityCategorie = function(method, categorie, param) {
        categorie = JSON.stringify(categorie);
        pAjax(null, {service: "serveur.clientaccess.serviceUpdatePrioriteCategorie", data: {categorie: categorie}}, method, param);
    };
    this.getByIdForUpdateCategorie = function(method, id, param) {
        pAjax(function(data, param, methodExecute) {
            console.log(data);
            var categorie = new Categorie();
            categorie.setId(data.id);
            categorie.setNom(data.nom);
            categorie.setPriorite(data.priorite);
            categorie.setEtablissement(data.etablissements);
            categorie.setZone(data.zones);
            categorie.setSousCategorie(data.souscategorie);
            if (methodExecute != null) {
                methodExecute(categorie, param);
            }
        }, {service: "serveur.clientaccess.serviceGetByIdForUpdateCategorie", data: {id: id}}, method, param);
    };
    this.updateCategorie = function(method, categorie, param) {
        categorie = JSON.stringify(categorie);
        pAjax(null, {service: "serveur.clientaccess.serviceUpdateCategorie", data: {categorie: categorie}}, method, param);
    };
}
