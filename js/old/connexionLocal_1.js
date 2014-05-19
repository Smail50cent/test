function ConnexionLocal() {
    this.getEntreprise = function(methodToExecuteAfter) {
        myStorage.indexedDB.getEntreprise(methodToExecuteAfter);
    };

   /* this.getCategories = function() {
        var categories = new Array();
        var cat1 = new Categorie();
        cat1.setId(1);
        cat1.setPriorite(1);
        cat1.setNom("Entrées");
        categories.push(cat1);

        var cat2 = new Categorie();
        cat2.setId(2);
        cat2.setNom("Plats");
        cat2.setPriorite(2);
        categories.push(cat2);

        var cat3 = new Categorie();
        cat3.setId(3);
        cat3.setPriorite(3);
        cat3.setNom("Desserts");
        categories.push(cat3);

        var cat4 = new Categorie();
        cat4.setId(4);
        cat4.setPriorite(4);
        cat4.setNom("Boissons");
        categories.push(cat4);
        return categories;
    };*/
    this.getCategoriesForContentCategorie = function(onCarteLoadFinish) {
        myStorage.indexedDB.getAllCategories(onCarteLoadFinish);
    };

  /*  this.getProduits = function() {
        var produits = new Array();
        var produit40 = new Produit();
        produit40.setId(40);
        produit40.setPrix(3);
        produit40.setCategorie(2);
        var e = new Array();
        //produit,ingredient,inStart,surcout,supprimable
        e.push(new AssociationProduitIngredients(40, 80, true, 0, true));
        e.push(new AssociationProduitIngredients(40, 81, true, 0, false));
        e.push(new AssociationProduitIngredients(40, 82, false, 0.2, true));
        e.push(new AssociationProduitIngredients(40, 83, false, 0.2, true));
        produit40.setIdsIngredients(e);
        produit40.setSousCategorie(10);
        produit40.setDemanderCuisson(true);
        produit40.setNom("Steack");
        produits.push(produit40);
        //0 ID 1 NOM 2 CATEGORIE 3 SOUS CATEGORIE 4 PRIX 5 INGREDIENTS
        var produitArray = new Array(
                new Array(2, "Italia", 2, 4, 13.6, new Array(5, 2, 6, 7, 8, 9, 10, 11, 4)),
                new Array(3, "Carpaccio de boeuf all'italiana", 1, "undefined", 5.2, new Array(12, 13)),
                new Array(4, "Panna cotta", 3, "undefined", 4.9, new Array(14, 15)),
                new Array(5, "Ricard 2 cl", 4, "undefined", 4.1, new Array()),
                new Array(6, "Chèvre et miel", 2, 4, 13.9, new Array(2, 16, 17, 18, 9, 4)),
                new Array(7, "Regina", 2, 4, 16.5, new Array(19, 20, 2, 1, 8, 4)),
                new Array(8, "4 Formaggi", 2, 4, 15.6, new Array(21, 22, 2, 23, 1, 4, 7)),
                new Array(9, "Crème brûlée", 3, "undefined", 4.7, new Array()),
                new Array(10, "Baba au rhum", 3, "undefined", 4, new Array(24, 25)),
                new Array(11, "Heineken Pression", 4, 8, 3.2, new Array()),
                new Array(12, "Affligem", 4, 8, 3.2, new Array()),
                new Array(13, "Martini Prosecco", 4, 9, 3, new Array()),
                new Array(14, "Salade roquette et copeaux de fromage italien", 1, 1, 6.3, new Array(10, 9, 7)),
                new Array(1, "Margarita", 2, 4, 15.4, new Array(1, 2, 3, 4)),
                new Array(15, "Terra e Mare (NUOVO)", 2, 4, 15.2, new Array(26, 2, 27, 28, 29, 4)),
                new Array(16, "Prosciutto", 2, 4, 14.2, new Array(17, 30, 31, 2, 1, 9, 4)),
                new Array(17, "Frutti di Mare (NUOVO)", 2, 4, 12.2, new Array(32, 1, 2, 33, 34, 35, 4)),
                new Array(18, "Con Carne", 2, 4, 12.2, new Array(1, 2, 36, 37, 4)), //
                new Array(19, "Speciale Pizzaiolo", 2, 4, 13.4, new Array(19, 31, 38, 11, 2, 1, 4)),
                new Array(20, "Del Arte", 2, 4, 15.2, new Array(1, 2, 39, 9, 10, 4)),
                new Array(21, "Marocco", 2, 4, 15.82, new Array(40, 41, 42, 31, 2, 4)),
                new Array(22, "Salmone", 2, 4, 11.90, new Array(42, 43, 44, 2, 4)),
                new Array(23, "Carbonara", 2, 4, 9.8, new Array(45, 29, 2, 31, 10, 4)),
                new Array(23, "Catania", 2, 4, 9.8, new Array(46, 34, 2, 1, 37, 8, 4)),
                new Array(24, "Chèvre chaud à l’italienne", 1, 2, 6.4, new Array(47, 48, 49, 10)),
                new Array(25, "Tomates Mozzarella di Bufala", 1, 2, 6.8, new Array(50, 7, 9, 51)),
                new Array(26, "Piccolina Marina (NUOVO)", 1, 2, 5.8, new Array(49, 52, 53, 43, 35)),
                new Array(37, "Piccolina Caesar", 1, 2, 5.8, new Array(49, 29, 9, 54, 55, 56, 57, 10)),
                new Array(27, "Insalata Caesar", 2, 3, 15.9, new Array(49, 29, 9, 54, 56, 57, 10, 55)),
                new Array(28, "Grande assiette de cicchetti", 2, 3, 6, new Array(7, 59, 51, 49, 10, 61, 62, 63)),
                new Array(29, "Piadines Salmone", 2, 3, 6, new Array(58, 59, 60, 30, 7, 9)),
                new Array(41, "Insalata Generosa (NUOVO)", 2, 3, 8.5, new Array(49, 9, 29, 64)),
                new Array(42, "Insalata Vesuvio", 2, 3, 5.3, new Array(49, 52, 5, 46, 37, 51)),
                new Array(30, "Spaghetti alla bolognese", 2, 5, 5.3, new Array(65)),
                new Array(31, "Tagliatelle alla carbonara", 2, 5, 5.3, new Array(45, 29, 65)),
                new Array(32, "Pizza pommes all' Amaretto", 3, 7, 5.3, new Array(45, 29, 65)),
                new Array(33, "Pizza aux framboises", 3, 7, 8.7, new Array(45, 29, 65)),
                new Array(34, "Coupe glacée 2 ou 3 parfums", 3, 6, 5.9, new Array()),
                new Array(38, "Profiteroles italiennes", 3, 6, 4.2, new Array(69, 70, 71)),
                new Array(35, "Délice glacé aux fruits rouges", 3, 6, 4.2, new Array(72, 73, 74, 75, 76)),
                new Array(36, "fruits rouges glacé", 3, 6, 4.2, new Array(72, 73, 74, 75, 76))
                );
///ID 43
        for (i = 0; i < produitArray.length; i++) {
            var pro = new Produit();
            var associationsProduitIngredient = new Array();
            for (var j = 0; j < produitArray[i][5].length; j++) {
                associationsProduitIngredient.push(new AssociationProduitIngredients(produitArray[i][0], produitArray[i][5][j], true, 0, true));

            }
            pro.setIdsIngredients(associationsProduitIngredient);
//            pro.setIdsIngredients(produitArray[i][5]);
            pro.setId(produitArray[i][0]);
            pro.setCategorie(produitArray[i][2]);
            pro.setPrix(produitArray[i][4]);
            pro.setSousCategorie(produitArray[i][3]);
            pro.setNom(produitArray[i][1]);
            produits.push(pro);
        }
        return produits;
    };// ANTIPASTI 2 CAT 1 
   /* this.getIngredients = function() {
        var ingredients = new Array();
        var ingredient1 = new Ingredient();
        ingredient1.setId(1);
        ingredient1.setNom("Sauce tomate");
        ingredients.push(ingredient1);
        var ingredient2 = new Ingredient();
        ingredient2.setId(2);
        ingredient2.setNom("mozzarella");
        ingredients.push(ingredient2);
        var ingredient3 = new Ingredient();
        ingredient3.setId(3);
        ingredient3.setNom("feuilles de basilic frais");
        ingredients.push(ingredient3);
        var ingredient4 = new Ingredient();
        ingredient4.setId(4);
        ingredient4.setNom("épices Del Arte");
        ingredients.push(ingredient4);
        var ingredient5 = new Ingredient();
        ingredient5.setId(5);
        ingredient5.setNom("Crème ricotta aux herbes");
        ingredients.push(ingredient5);
        var ingredient6 = new Ingredient();
        ingredient6.setId(6);
        ingredient6.setNom("coppa");
        ingredients.push(ingredient6);
        var ingredient7 = new Ingredient();
        ingredient7.setId(7);
        ingredient7.setNom("tomates fraîches");
        ingredients.push(ingredient7);
        var ingredient8 = new Ingredient();
        ingredient8.setId(8);
        ingredient8.setNom("olives noires");
        ingredients.push(ingredient8);
        var ingredient9 = new Ingredient();
        ingredient9.setId(9);
        ingredient9.setNom("roquette");
        ingredients.push(ingredient9);
        var ingredient10 = new Ingredient();
        ingredient10.setId(10);
        ingredient10.setNom("copeaux de fromage italien");
        ingredients.push(ingredient10);
        var ingredient11 = new Ingredient();
        ingredient11.setId(11);
        ingredient11.setNom("ciboulette");
        ingredients.push(ingredient11);//
        var ingredient12 = new Ingredient();
        ingredient12.setId(12);
        ingredient12.setNom("Mariné à l’huile d’olive et basilic");
        ingredients.push(ingredient12);
        var ingredient13 = new Ingredient();
        ingredient13.setId(13);
        ingredient13.setNom("copeaux de fromage italien");
        ingredients.push(ingredient13);
        var ingredient14 = new Ingredient();
        ingredient14.setId(14);
        ingredient14.setNom("La vraie crème à l’italienne");
        ingredients.push(ingredient14);
        var ingredient15 = new Ingredient();
        ingredient15.setId(15);
        ingredient15.setNom("coulis de framboise");
        ingredients.push(ingredient15);
        var ingredient16 = new Ingredient();
        ingredient16.setId(16);
        ingredient16.setNom("Sauce crème et miel");
        ingredients.push(ingredient16);
        var ingredient17 = new Ingredient();
        ingredient17.setId(17);
        ingredient17.setNom("jambon cru");
        ingredients.push(ingredient17);
        var ingredient18 = new Ingredient();
        ingredient18.setId(18);
        ingredient18.setNom("fromage de chèvre");
        ingredients.push(ingredient18);
        var ingredient19 = new Ingredient();
        ingredient19.setId(19);
        ingredient19.setNom("Jambon");
        ingredients.push(ingredient19);
        var ingredient20 = new Ingredient();
        ingredient20.setId(20);
        ingredient20.setNom("champignons");
        ingredients.push(ingredient20);
        var ingredient20 = new Ingredient();
        ingredient20.setId(20);
        ingredient20.setNom("champignons");
        ingredients.push(ingredient20);
        var ingredient21 = new Ingredient();
        ingredient21.setId(21);
        ingredient21.setNom("Gorgonzola");
        ingredients.push(ingredient21);
        var ingredient22 = new Ingredient();
        ingredient22.setId(22);
        ingredient22.setNom("fromage « Caciotta » aux herbes");
        ingredients.push(ingredient22);
        var ingredient22 = new Ingredient();
        ingredient22.setId(22);
        ingredient22.setNom("fromage « Caciotta » aux herbes");
        ingredients.push(ingredient22);
        var ingredient23 = new Ingredient();
        ingredient23.setId(23);
        ingredient23.setNom("fromage italien rapé");
        ingredients.push(ingredient23);
        var ingredient23 = new Ingredient();
        ingredient23.setId(23);
        ingredient23.setNom("fromage italien rapé");
        ingredients.push(ingredient23);
        var ingredient24 = new Ingredient();
        ingredient24.setId(24);
        ingredient24.setNom("Baba au rhum");
        ingredients.push(ingredient24);

        var ingredient25 = new Ingredient();
        ingredient25.setId(25);
        ingredient25.setNom("Créme fouettée vanillée");
        ingredients.push(ingredient25);
        var ingredientarray = new Array(
                new Array(26, "Crème ricotta aux herbes"),
                new Array(27, "Petites noix de Saint-Jacques"),
                new Array(28, "Mélange d’épices citronné"),
                new Array(29, "Bacon"),
                new Array(29, "Asperges vertes"),
                new Array(31, "Oeuf"),
                new Array(30, "Artichauts"),
                new Array(33, "Petites noix de Saint-Jacques"),
                new Array(34, "Persillade"),
                new Array(35, "Citron"),
                new Array(36, "Viande de boeuf"),
                new Array(37, "Oignons rouges"),
                new Array(38, "Crème fraiche"),
                new Array(39, "minis involtini de speck à la ricotta"),
                new Array(32, "Cocktail de fruits de mer (queues de crevettes décortiquées, chair de moules, écrevisses rouges, tentacules et anneaux de calmar, anneaux d’encornet)"),
                new Array(40, "Merguez de boeuf et mouton"),
                new Array(41, "Chorizo de boeuf"),
                new Array(42, "Poivrons grillés"),
                new Array(42, "Tranches de saumon fondant et de saumon fumé"),
                new Array(43, "Mélange d’épices citronné"),
                new Array(44, "Crème ricotta aux herbes"),
                new Array(45, "Crème fraîche"),
                new Array(46, "Thon"),
                new Array(47, "Tartines de pain ciabatta aux olives agrémentées de crème ricotta aux herbes"),
                new Array(48, "Mozzarella et fromage de chèvre"),
                new Array(51, "huile d’olive et basilic"),
                new Array(50, "Mozzarella di Bufala campana au pur lait de bufflonne"),
                new Array(49, "Salade de saison"),
                new Array(52, "Mélange de légumes à l’italienne"),
                new Array(53, "Petites noix de Saint-Jacques et queues de crevettes poêlées"),
                new Array(54, "émincés de poulet"),
                new Array(55, "sauce caesars"),
                new Array(56, "mélange d’épices et d’aromates (poivre, ail, coriandre, baies roses, quatre épices, échalote, thym)"),
                new Array(57, "pains Del Arte"),
                new Array(58, "Piadines (rouleaux de fine pâte à pizza garnis de crème ricotta aux herbes, roquette, tomates confites et saumon fumé)"),
                new Array(59, "mozzarella di Bufala"),
                new Array(60, "saumon fumé"),
                new Array(61, "4 tartines de pain ciabatta aux olives accompagnées de roquette"),
                new Array(62, "d’une crème ricotta aux herbes et agrémentées de coppa"),
                new Array(63, "saumon fumé gorgonzola et émincé de poulet"),
                new Array(64, "tomates confites"),
                new Array(65, "viande pur boeuf"),
                new Array(65, "jaune d’oeuf"),
                new Array(66, "Pommes amaretto"),
                new Array(67, "Banane"),
                new Array(68, "crème fraîche et sauce au chocolat"),
                new Array(69, "Glaces stracciatella"),
                new Array(70, "Tartufo et sabayon dans 3 petits choux gourmands"),
                new Array(71, "sauce au chocolat et crème fouettée vanillée"),
                new Array(72, "Sorbet fraise"),
                new Array(73, "glaces spagnola et citron meringuée"),
                new Array(74, "fruits rouges"),
                new Array(75, "crème fouettée vanillée"),
                new Array(76, "coulis de framboise"),
                new Array(80, "frites"),
                new Array(82, "sauce roquefort"),
                new Array(83, "sauce au poivre"),
                new Array(81, "steak")
                );
        for (i = 0; i < ingredientarray.length; i++) {
            var ing = new Ingredient();
            ing.setId(ingredientarray[i][0]);
            ing.setNom(ingredientarray[i][1]);
            ingredients.push(ing);
        }
        return ingredients;
    };
   /* this.getSousCategorie = function() {
        var sousCateegories = new Array();// 0 ID 1 CATEGORIE 2 NOM 3 PRIORITE
        var cat = new Array(new Array(1, 1, "Salades", 1), new Array(2, 1, "Antipasti", 2)
                , new Array(3, 2, "Spécialités", 1), new Array(4, 2, "Pizzas", 2), new Array(10, 2, "Viandes", 4),
                new Array(5, 2, "Pâtes", 3), new Array(10, 2, "Rizzoto ", 5)
                , new Array(6, 3, "Glaces", 1), new Array(7, 3, "Pizzas sucrées", 2), new Array(8, 4, "Bières", 1)
                , new Array(11, 4, "Vins", 2), new Array(9, 4, "Sodas", 3));
        for (i = 0; i < cat.length; i++) {
            var souscategorie = new SousCategorie();
            souscategorie.setId(cat[i][0]);
            souscategorie.setCategorie(cat[i][1]);
            souscategorie.setNom(cat[i][2]);
            souscategorie.setPriorite(cat[i][3]);
            sousCateegories.push(souscategorie);
        }
        return sousCateegories;
    };
    this.getIngredientById = function(id) {
        var ingredients = this.getIngredients();
        for (i = 0; i < ingredients.length; i++) {
            if (ingredients[i].getId() == id) {
                return ingredients[i];
            }
        }
    };
    this.getProduitById = function(id) {
        var produits = this.getProduits();
        for (i = 0; i < produits.length; i++) {
            if (produits[i].getId() == id) {
                return produits[i];
            }
        }
    };
    this.getProduitByCategorie = function(id) {
        var produits = this.getProduits();
        var produitsByCat = new Array();
        for (i = 0; i < produits.length; i++) {
            if (produits[i].getCategorie() == id) {
                produitsByCat.push(produits[i]);
            }
        }
        return produitsByCat;
    };
   /* this.getMenus = function() {
        var menus = new Array();
        menus.push(new Menu(1, new Array(4, 3, 2, 1, 24, 25, 26, 30, 20, 21, 36, 35, 34, 38), 15.5, "Menu de la semaine"));
        menus.push(new Menu(2, new Array(4, 3, 2, 1, 24, 25, 26, 30, 20, 21, 36, 35, 34, 38), 22.9, "Presto"));
        menus.push(new Menu(3, new Array(4, 3, 2, 1, 24, 25, 26, 30, 20, 21, 36, 35, 34, 38), 10.7, "Angelo"));
        return menus;
    };*/
    /*this.getMenuById = function(id) {
        var menus = this.getMenus();
        for (i = 0; i < menus.length; i++) {
            if (menus[i].getId() == id) {
                return menus[i];
            }
        }
    };*/
    this.getCategorieById = function(id) {
        var categorie = this.getCategories();
        for (i = 0; i < categorie.length; i++) {
            if (categorie[i].getId() == id) {
                return categorie[i];
            }
        }
    };
    this.getSousCategoriesByIdCategorie = function(id) {
        var categorie = this.getSousCategorie();
        var souscategories = new Array();
        for (i = 0; i < categorie.length; i++) {
            if (categorie[i].getCategorie() == id) {
                souscategories.push(categorie[i]);
            }
        }
        return souscategories;
    };

    this.getSousCategoriesByIdCategorieForContentSousCategorie = function(functionToLoad, idsousCat, idCat) {
        myStorage.indexedDB.getSousCategorieByIdForContentSousCat(functionToLoad, idsousCat, idCat);
    };

    this.getMenuByIdForDetailMenu = function(method, idmenu) {
        myStorage.indexedDB.getMenuByIdForDetailMenu(method, idmenu);
    };
    this.getProduitByIdForDetailMenu = function(method, isexecute, produitid, i, produits) {
        myStorage.indexedDB.getProduitByIdForDetailMenu(method, isexecute, produitid, i, produits);
    };

    this.getAllMenuForDetailMenu = function(method) {
        myStorage.indexedDB.getAllMenuForDetailMenu(method);
    };

    this.getProduitByIdCategorieForPrintProduits = function(method, idcat) {
        myStorage.indexedDB.getProduitByIdCategorieForPrintProduits(method, idcat);
    };
    this.getAllCategoriesSync = function() {
        return myStorage.indexedDB.getAllCategoriesSync();
    };
    this.getIngredientById = function(method, id) {
        return myStorage.indexedDB.getIngredientById(method, id);
    };
    this.getProduitByIdGeneric = function(method, id, param) {
        myStorage.indexedDB.getProduitByIdGeneric(method, id, param);
    };
    this.getMenuById = function(method, id, param) {
        myStorage.indexedDB.getMenuById(method, id, param);
    };
    

}
