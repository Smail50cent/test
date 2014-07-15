/**
 *
 * @author Damien Chesneau <contact@damienchesneau.fr>
 */

function gestionAffichageTVA(total) {
    $('#footer_tarif_total_label_id').html(strings.getString("carte.ticket.total.labeltotal"));
    $('#footer_tarif_total_value_id').html(fntp(total));
    var nbpersonne = JSON.parse(getLocalStorageValue("personnes.couverts"));
    nbpersonne = parseInt(nbpersonne.length);
    if (nbpersonne != null) {
        if (nbpersonne > 1) {
            $('#footer_tarif_nbCouvert_label_id').html(strings.getString("carte.ticket.total.labelcouvertPlur"));
        } else {
            $('#footer_tarif_nbCouvert_label_id').html(strings.getString("carte.ticket.total.labelcouvertSing"));
        }
        $('#footer_tarif_nbCouvert_value_id').html(nbpersonne);

        $('#footer_tarif_totalparPersonne_label_id').html(strings.getString("carte.ticket.total.labelpersonne"));
        $('#footer_tarif_totalparPersonne_value_id').html(fntp(total / nbpersonne));
    }
    var numTable = JSON.parse(getLocalStorageValue("paramCommande.numTable"));
    if (numTable != null) {
        $('#footer_tarif_votreTable_label_id').html(strings.getString("carte.ticket.total.labeltable"));
        $('#footer_tarif_votreTable_value_id').html(numTable.numero);
    }
}
function calcHeight(nbItem) {
    return nbItem * 50;
}

function onCarteLoadFinish(categories) {
    $("#content_titre_id").text(strings.getString("label.titre.carte"));
    var html = getHeaderCategorieItem();
    var htmlSousCategorie = getHeaderCategorieSousCategorieListe();
    if (testIfIsServeurConnected()) {
        var menuItem2 = (html);
        menuItem2 = paramValue(menuItem2, "onclick", "onClickCategorie('favori');");
        menuItem2 = paramValue(menuItem2, "href", "#categorieFavori");
        menuItem2 = paramValue(menuItem2, "avalue", strings.getString("label.menu.favori"));
        menuItem2 = paramValue(menuItem2, "sscat", "");
        $('#content_list_categorie_id').append(menuItem2);
    }
    if (useMenus) {
        var menuItem = (html);
        menuItem = paramValue(menuItem, "onclick", "onClickCategorie(1555555555555555555);");
        menuItem = paramValue(menuItem, "href", "#categorieMenu");
        menuItem = paramValue(menuItem, "avalue", strings.getString("carte.categories.label.menus"));
        menuItem = paramValue(menuItem, "sscat", "");
        $('#content_list_categorie_id').append(menuItem);
    }
    for (var i = 0; i < categories.length; i++) {// Load categories bar
        var item = (html);
        var sscat = (htmlSousCategorie);
        item = paramValue(item, "onclick", "onClickCategorie(" + categories[i].getId() + ");");
        item = paramValue(item, "href", "#categorie" + categories[i].getId());
        item = paramValue(item, "avalue", categories[i].getNom());
        sscat = paramValue(sscat, "id", categories[i].getId());
        item = paramValue(item, "sscat", sscat);
        $('#content_list_categorie_id').append(item);
    }
    var connexion = getConnexion();
    var i = 0;
    var htmlSSCat = getHeaderCategorieSousCategorieItem();
    for (var i = 0; i < categories.length; i++) {
        var categorie = categories[i];
        var souscategories = categorie.souscategorie;
        categorieLoaded.push(categorie);
        if (souscategories.length != 0) {
            var voirtoutItem = htmlSSCat;
            voirtoutItem = paramValue(voirtoutItem, "idcat", categorie.getId());
            voirtoutItem = paramValue(voirtoutItem, "idSousCat", -2);
            voirtoutItem = paramValue(voirtoutItem, "text", strings.getString("label.categorie.souscategorie.voirtout"));
            $("#categorie_sous_cat_" + categorie.getId()).append(voirtoutItem);
            var height = (categorie.souscategorie.length + 1 * 25);
            document.getElementById("categorie_sous_cat_" + categorie.getId()).style += "height " + height + "px;";
            for (var j = 0; j < souscategories.length; j++) {
                var sousCategorieid = souscategories[j];
                connexion.getSousCategoriesByIdCategorieForContentSousCategorie(printSousCategorie, sousCategorieid, categorie.getId());
            }
        }
    }
    function printSousCategorie(sousCategorie, id) {
        sousCategorieLoaded.push(sousCategorie);
        var item = htmlSSCat;
        item = paramValue(item, "idcat", id);
        item = paramValue(item, "idSousCat", sousCategorie.getId());
        item = paramValue(item, "text", sousCategorie.getNom());
        $("#categorie_sous_cat_" + id).append(item);
    }
}
var idSousCat="";
function sousCategorieClicked(idCat, idSousCat) {
    onClickCategorie(idCat);
    if (idSousCat == -2) {
        var sousCategorie = getSousCategoriesByIdCategorieInListe(idCat);
        for (i = 0; i < sousCategorie.length; i++) {
            $('.produitcat' + idCat + '_sscat' + sousCategorie[i].getId()).show();
        }
        $('.produitcat' + idCat + '_sscatundefined').show();
    } else {
        var sousCategorie = getSousCategoriesByIdCategorieInListe(idCat);
        for (i = 0; i < sousCategorie.length; i++) {
            if (sousCategorie[i].getId() == idSousCat) {
                $('.produitcat' + idCat + '_sscat' + sousCategorie[i].getId()).show();
            } else {
                $('.produitcat' + idCat + '_sscat' + sousCategorie[i].getId()).hide();
                $('.produitcat' + idCat + '_sscatundefined').hide();
            }
        }
    }
}
var catAreShow = "";
function onClickCategorie(idCategorie) {
    if (inRecapitulatif) {
        if (catAreShow != "") {
            $("#categorie_sous_cat_" + catAreShow).hide();
        }
        if (idCategorie != 1555555555555555555) {
            if (catAreShow == idCategorie) {
                catAreShow = "hideSameCat";
                $("#categorie_sous_cat_" + idCategorie).hide();
            } else {
                catAreShow = idCategorie;
                $("#categorie_sous_cat_" + idCategorie).show();
            }
        }
    } else {
        recapitulatifClick();
        onClickCategorie(idCategorie);
    }
}

function showFooter() {
    $("#footer_id").show();
    if (inRecapitulatif) {
        $("#btn_recapitulatif_commande_id").val(strings.getString("footer.buttonswitch.recapitulatif"));
    } else {
        $("#btn_recapitulatif_commande_id").val(strings.getString("footer.buttonswitch.lacarte"));
    }
    $("#btn_recapitulatif_commande_id").show();
}
function hideFooter() {
    $("#footer_id").hide();
    $("#btn_recapitulatif_commande_id").hide();
}

/**
 * Add a product in the ticket 
 * @param {int} id
 * @param {bool} isTicket
 * @returns {no return}
 */
function addProduit(id, isTicket) {
    if (currentTicket == null) {
        currentTicket = new Ticket();
        currentTicket.setId(1);
        first = true;
        window.onbeforeunload = function() {
            return strings.getString("label.error.message.returnevt");
        };
    }
    var connexion = getConnexion();
    var produit;
    var qops = currentTicket.getQuantityOfProduct();
    var param = new addProduitParam(id, isTicket);
    if (!isTicket) {
        connexion.getProduitByIdGeneric(addProduitWithBDDProduct, id, param);
    } else {
        for (var i = 0; i < qops.length; i++) {
            if (qops[i].id == id) {
                if (qops[i].product instanceof Produit) {
                    connexion.getProduitByIdGeneric(addProduitWithBDDProduct, qops[i].getProduit().getId(), param);
                }
                break;
            }
        }
    }
    function addProduitParam(id, isTicket) {
        this.id = id;
        this.isTicket = isTicket;
    }

    function addProduitWithBDDProduct(produit, param) {
        if (qops == null) {
            var qopToShow = new QuantityOfProduct(1, produit, 1);
            qops = new Array(qopToShow);
            currentTicket.setQuantityOfProduct(qops);
            first = true;
        } else {
            first = false;
            addTicketItem(ajouterQuantityOfProduct(produit));
        }
        updateValueInButtonMore(param.id, param.isTicket, produit);
        var total = currentTicket.calculerTotal();
        showDialogInfoPrix(total);
        gestionAffichageTVA(total);
        choosePrintFooter();
    }
}
function updateValueInButtonMore(id, isATicketId, produit) {//int bool
    var qops = currentTicket.getQuantityOfProduct();
    if (isATicketId) {
        $('#content_produit_btn_right_id_recap_' + id).html(1);
        var nb = 0;
        for (var i = 0; i < qops.length; i++) {
            if (qops[i].product.id == produit.id) {
                nb += 1;
            }
        }
        for (var i = 0; i < qops.length; i++) {
            if (id == qops[i].id) {
                if (nb == 0) {
                    $("#content_produit_btn_right_id_" + qops[i].getProduit().getId()).html('+');
                } else {
                    $("#content_produit_btn_right_id_" + qops[i].getProduit().getId()).html(nb);
                }

            }
        }
    } else {
        var nb = 0;
        for (var i = 0; i < qops.length; i++) {
            if (qops[i].product.id == produit.id) {
                nb += 1;
            }
        }
        if (nb == 0) {
            $("#content_produit_btn_right_id_" + id).html('+');
        } else {
            $("#content_produit_btn_right_id_" + id).html(nb);
        }
    }
}
/**
 * remove a product in the ticket 
 * @param {int} id
 * @returns {no return}
 */
function lessProduit(id, isTicket) {//qopid or Produitid
    if (currentTicket != null) {
        var connexion = getConnexion();
        var produit;
        var qops = currentTicket.getQuantityOfProduct();
        if (qops.length == 0) {
            showInfoMessage(strings.getString("info.interdiction.suppression.produit"));
        }
        function lessProduitParam(id, isTicket) {
            this.id = id;
            this.isTicket = isTicket;
        }
        function lessProduitWithBdd(produit, param) {
            var qopToShow;
            if (qops == null) {
                showInfoMessage(strings.getString("info.interdiction.suppression.produit"));
            } else {
                if (param.isTicket) {
                    for (var i = 0; i < qops.length; i++) {
                        if (qops[i].getId() == param.id) {
                            qops.splice(i, 1);
                            removeTicketItemById(param.id);
                            var total = currentTicket.calculerTotal();
                            showDialogInfoPrix(total);
                            break;
                        }
                    }
                } else {
                    for (var i = 0; i < qops.length; i++) {
                        if (qops[i].getProduit().getId() == param.id) {
                            qops.splice(i, 1);
                            var total = currentTicket.calculerTotal();
                            showDialogInfoPrix(total);
                            break;
                        }
                    }
                }
            }
            updateValueInButtonMore(param.id, param.isTicket, produit);
            gestionAffichageTVA(currentTicket.calculerTotal());

        }
        var param = new lessProduitParam(id, isTicket);
        if (!isTicket) {
            connexion.getProduitByIdGeneric(lessProduitWithBdd, id, param);
        } else {
            for (var i = 0; i < qops.length; i++) {
                if (qops[i].id == id) {
                    produit = qops[i].getProduit();
                    lessProduitWithBdd(produit, param);
                    break;
                }
            }
        }

        if (qops.length == 0 && inRecapitulatif == false) {
            recapitulatifClick();
        }
    } else {
        showInfoMessage(strings.getString("info.interdiction.suppression.produit"));
    }

    choosePrintFooter();
}
/**
 * Use this function to standarise the method to show an error
 * @param {String} message
 * 
 */



/**
 * This function is to show all products in a menu
 * @param {type} id
 * @returns {undefined}
 */
var totalReq=0;
var curentReq = 0;
var idmenuCur = "";
function detailMenu(id) {
    if (idmenuCur == "") {
        load(id);
    } else if (id == idmenuCur) {
        $("#choose_menu_item_produits_" + idmenuCur).html("");
        $("#choose_menu_valider_menu_" + idmenuCur).remove();
        $("#menu_content_add_" + idmenuCur).attr("class", "menu_content_add_button menu_content_add_button_structure menu_content_add_button_personalize");
        idmenuCur = "";
    } else if (id != idmenuCur) {
        $("#choose_menu_item_produits_" + idmenuCur).html("");
        $("#choose_menu_valider_menu_" + idmenuCur).remove();
        $("#menu_content_add_" + idmenuCur).attr("class", "menu_content_add_button menu_content_add_button_structure menu_content_add_button_personalize");
        load(id);
    }
    function load(id) {
        idmenuCur = id;
        $("#menu_content_add_" + id).attr("class", ($("#menu_content_add_" + id).attr("class")) + " menu_content_add_button_close menu_content_add_button_structure menu_content_add_button_personalize");
        var connexion = getConnexion();
        connexion.getMenuByIdForDetailMenu(showWithMenuDataById, id);//BDD
        
        function showWithMenuDataById(menu) {
            $("#choose_menu_items_id").html("");
            var produits = menu.getProduits();
            totalReq = produits.length;
            curentReq=0;
            for (var i = 0; i < produits.length; i++) {
                var connexion = getConnexion();
                var isexecute = false;
                connexion.getProduitByIdForDetailMenu(showWithProduitDataGetById, isexecute, produits[i], i, produits);
            }

            function showWithProduitDataGetById(produits) {
                function compare(a, b) {
                    if (a.id_categorie.priorite < b.id_categorie.priorite)
                        return -1;
                    if (a.id_categorie.priorite > b.id_categorie.priorite)
                        return 1;
                    return 0;
                }
                
                produits.sort(compare);
                productsInMenu = produits;
                productsChoosecInMenu = clone(produits); //Clone var
                var htmlButtonValider = getButtonValiderInMenu();
                $("#choose_menu_item_produits_" + id).html("");
                if (!$("#choose_menu_valider_menu").length) {
                    var buttonValider = htmlButtonValider;
                    buttonValider = paramValue(buttonValider, "idparam", id);
                    buttonValider = paramValue(buttonValider, "id", "choose_menu_valider_menu_" + id);
                    buttonValider = paramValue(buttonValider, "buttonValue", strings.getString("label.menu.validmenu"));
                    $("#menu_content_id_" + id).append(buttonValider);
                }
                var title = produits[0].getCategorie().getNom();
                printCategortieTitle(produits[0].getCategorie(), id);
                var htmlProduitDetail = getMenuDetailProduitItem();
                for (var i = 0; i < produits.length; i++) {
                    var itemProduitDetail = htmlProduitDetail;
                    if (title != produits[i].getCategorie().getNom()) {
                        title = produits[i].getCategorie().getNom();
                        printCategortieTitle(produits[i].getCategorie(), id);
                    }
                    itemProduitDetail = paramValue(itemProduitDetail, "produitID", produits[i].getId());
                    itemProduitDetail = paramValue(itemProduitDetail, "produitNom", produits[i].getNom());
                    $("#choose_menu_item_produits_" + id).append(itemProduitDetail);
                }
            }
        }
        choosePrintFooter();
    }
}
function printCategortieTitle(categorie, id) {
    var html = getMenuDetailProduitItemTitle();
    html = paramValue(html, "categorieID", categorie.getId());
    html = paramValue(html, "categorieNom", categorie.getNom());
    var menuItems = $("#choose_menu_item_produits_" + id);
    menuItems.append(html);
}
/**
 * This function is for choose a product of an menu
 * @param {type} id
 * @returns {undefined}
 */
function chooseProductInThisMenu(id) {
    var test = ($('#choose_menu_item_button_' + id).val());
    if (test == "+") {
        var idCategorie = getProduitInMenuLoadedById(id).getCategorie().getId();
        for (i = 0; i < productsInMenu.length; i++) {
            if ((idCategorie == productsInMenu[i].getCategorie().getId()) && (productsInMenu[i].getId() != id)) {
                $("#choose_menu_item_" + productsInMenu[i].getId()).hide();
                var index = productsChoosecInMenu.indexOf(productsInMenu[i]);
                productsChoosecInMenu.splice(index, 1);
            }
        }
        $('#choose_menu_item_button_' + id).attr("class", "choose_menu_item_close");
        var test = ($('#choose_menu_item_button_' + id).val("-"));
    } else {
        var idCategorie = getProduitInMenuLoadedById(id).getCategorie().getId();
        for (i = 0; i < productsInMenu.length; i++) {
            if ((idCategorie == productsInMenu[i].getCategorie().getId()) && (productsInMenu[i].getId() != id)) {
                $("#choose_menu_item_" + productsInMenu[i].getId()).show();

                productsChoosecInMenu.splice(i, 0, productsInMenu[i]);
            }
        }
        $('#choose_menu_item_button_' + id).attr("class", "");
        var test = ($('#choose_menu_item_button_' + id).val("+"));
    }
}
/**
 * When all products are choosed we can add the menu to the current ticket
 * @param {type} id
 * @returns {undefined}
 */
function addMenuToTicket(id) {
    if (currentTicket == null) {
        currentTicket = new Ticket();
        currentTicket.setId(1);
        first = true;
        window.onbeforeunload = function() {
            return strings.getString("label.error.message.returnevt");
        };
    }
    var connexion = getConnexion();
    connexion.getMenuById(addMenuToTicketWithBdd, id, null);
    function addMenuToTicketWithBdd(menu, param) {
        var qop = currentTicket.getQuantityOfProduct();
        var qopToShow;
        menu.produits = productsChoosecInMenu;
        if (qop == null) {
            qopToShow = new QuantityOfProduct(1, menu, 1);
            qop = new Array(qopToShow);
            currentTicket.setQuantityOfProduct(qop);
            first = true;
        } else {
            first = false;
            qopToShow = ajouterQuantityOfProduct(menu);
        }
        choosePrintFooter();
        gestionAffichageTVA(currentTicket.calculerTotal());
        detailMenu(id);
        var total = currentTicket.calculerTotal();
        showDialogInfoPrix(total);
    }

}
/**
 * Delete a choosed menu
 * @param {type} id
 * @returns {undefined}
 */
function lessMenu(id) {
    if (currentTicket != null) {
        var connexion = getConnexion();
        var qop = currentTicket.getQuantityOfProduct();
        var qopToShow;
        if (qop == null) {
            showInfoMessage(strings.getString("info.interdiction.suppression.produit"));
        } else {
            first = false;
            for (i = 0; i < qop.length; i++) {
                if (qop[i].getProduit().getId() == id) {
//on ajoute dedans
                    var startQuantity = qop[i].getQuantity();
                    if (startQuantity != 0) {
                        qop[i].setQuantity(startQuantity - 1);
                        currentTicket.setQuantityOfProduct(qop);
                        qopToShow = qop[i];
                        if (startQuantity == 1) {
                            $("#menu_content_add" + id).val("+");
                        } else {
                            $("#menu_content_add" + id).val($("#menu_content_add" + id).val() - 1);
                        }
                    }
                    break;
                }
            }
        }
        gestionAffichageTVA(currentTicket.calculerTotal());
        var total = currentTicket.calculerTotal();
        showDialogInfoPrix(total);
    } else {
        showInfoMessage(strings.getString("info.interdiction.suppression.produit"));
    }
    choosePrintFooter();

}
function printFavorite() {
    if (testIfIsServeurConnected()) {
        var htmlDivSlide = getDivSlide();
        var favoriDivSlide = htmlDivSlide;
        favoriDivSlide = paramValue(favoriDivSlide, "style", "width: 100%;");
        favoriDivSlide = paramValue(favoriDivSlide, "classToAdd", "");
        favoriDivSlide = paramValue(favoriDivSlide, "id", "categorieFavori");
        $("#slides_wrap_id").append(favoriDivSlide);
        var htmlContentSlideFavorite = getContentSlideFavorite();
        $("#categorieFavori").append(htmlContentSlideFavorite);
        var htmlItem = getItemSelectFavorite();
        var m1HtmlItem = htmlItem;
        m1HtmlItem = paramValue(m1HtmlItem, "name", strings.getString("label.menu.favori.select.itemfacorite"));
        m1HtmlItem = paramValue(m1HtmlItem, "value", 1);
        $("#select_favori_id").append(m1HtmlItem);
        var m2HtmlItem = htmlItem;
        m2HtmlItem = paramValue(m2HtmlItem, "name", strings.getString("label.menu.favori.select.itemsuggestion"));
        m2HtmlItem = paramValue(m2HtmlItem, "value", 2);
        $("#select_favori_id").append(m2HtmlItem);
        loadDataWithSelectValue(1);
        $("#select_favori_id").change(function() {
            var value = $(this).val();
            loadDataWithSelectValue(parseInt(value));
        });
    }
}
function loadDataWithSelectValue(valueSelect) {
    switch (valueSelect) {
        case 1:
            getProduitsFavorite();
            break;
        case 2:
            getProduitsSuggerer();
            break;
    }
}
function getProduitsFavorite() {
    var connexion = getConnexion();
    var serveur = JSON.parse(getLocalStorageValue("personnes.serveur"));
    connexion.getAllProduitFavoriteByIdServeur(printProduitFavorite, serveur.id, null);
}
function getProduitsSuggerer() {
    var connexion = getConnexion();
    connexion.getAllProduitSuggerer(printProduitFavorite, null);
}

function printProduitFavorite(cpfs, param) {
    $('#favorite_id').html("");
    var htmlProduitItem = getContentProduitItem();
    for (var x = 0; x < cpfs.length; x++) {
        var produit = cpfs[x].produit;
        var itemProduit = htmlProduitItem;
        itemProduit = paramValue(itemProduit, "produitId", produit.getId());
        var prixTTC = getPrixHtInAssociation(produit.associationPrixProduit, produit.tauxTva);
        itemProduit = paramValue(itemProduit, "quantity", "");
        itemProduit = paramValue(itemProduit, "produitPrix", fntp(prixTTC));
        itemProduit = paramValue(itemProduit, "produitNom", produit.getNom());
        $('#favorite_id').append(itemProduit);
    }
}
/**
 * this function allows to print products for slide animation
 * @param {int} index of first categorie to show
 * @returns {undefined}
 */
var t = false;
function printProduits(index) {
    var isActive = "";
    inRecapitulatif = true;
    var htmlDivSlides = getDivSlides();
    $("#menu_or_card").html(htmlDivSlides);
    var htmlDivSlide = getDivSlide();
    var connexion = getConnexion();
    printFavorite();
    if (useMenus) {
        var menuDivSlide = htmlDivSlide;
        menuDivSlide = paramValue(menuDivSlide, "style", "width: 100%;");
        menuDivSlide = paramValue(menuDivSlide, "classToAdd", isActive);
        menuDivSlide = paramValue(menuDivSlide, "id", "categorieMenu");
        $("#slides_wrap_id").append(menuDivSlide);
        var htmlContentSlideMenu = getContentSlideMenu();
        $("#categorieMenu").append(htmlContentSlideMenu);
        function printMenus(menus) {
            var htmlMenu = getItemListeMenu();
            for (var i = 0; i < menus.length; i++) {
                var itemMenu = htmlMenu;
                itemMenu = paramValue(itemMenu, "menuId", menus[i].getId());                
                var prixTTC = getPrixHtInAssociation(menus[i].getPrix(), menus[i].getTauxDeTva());
                itemMenu = paramValue(itemMenu, "prixMenu", fntp(prixTTC));
                itemMenu = paramValue(itemMenu, "menuNom", menus[i].getNom());
                $('#menus_id').append(itemMenu);
            }
        }
        connexion.getAllMenuForDetailMenu(printMenus); //BDDDDDDDDDDDD
    }
    connexion.getCategoriesForContentCategorie(printSlides);
    var derniere = "";
    function printSlides(categories) { 
        for (var i = 0; i < categories.length; i++) {
            var categorie = categories[i];
            if (i + 1 == categories.length) {
                derniere = categorie.getId();
            }
            if (categorie.getId() - 1 == index) {
                isActive = "active";
            } else {
                isActive = "";
            }
            var myDivSlide = htmlDivSlide;
            myDivSlide = paramValue(myDivSlide, "style", "width: 100%;");
            myDivSlide = paramValue(myDivSlide, "classToAdd", isActive);
            myDivSlide = paramValue(myDivSlide, "id", "categorie" + categorie.getId());

            $("#slides_wrap_id").append(myDivSlide);
            var htmlContentProduit = getContentProduit();
            htmlContentProduit = paramValue(htmlContentProduit, "idCategorie", categorie.getId());
            $("#categorie" + categorie.getId()).html(htmlContentProduit);
            function printProduitByCategorie(produits) {                
                var quantity = "+";
                //console.log(produits[0]);
                var categorie = produits[0].id_categorie;
                try {
                    var qops = currentTicket.getQuantityOfProduct();
                    for (j = 0; j < qops.length; j++) {
                        var qop = currentTicket.getQuantityOfProduct()[j];
                        if (qop.getProduit().getId() == produit.getId()) {
                            quantity = qop.getQuantity();
                        }
                    }
                } catch (e) {
                    //console.log("pas de ticket");
                }
                var htmlProduitItem = getContentProduitItem();
                for (var x = 0; x < produits.length; x++) {
                    var produit = produits[x];
                    var itemProduit = htmlProduitItem;
                    itemProduit = paramValue(itemProduit, "produitId", produit.getId());
                    itemProduit = paramValue(itemProduit, "categorieId", categorie.getId());
                    if (produit.id_sousCategorie instanceof  Object) {
                        itemProduit = paramValue(itemProduit, "sousCategorieId", produit.getSousCategorie().id);
                    } else {
                        itemProduit = paramValue(itemProduit, "sousCategorieId", produit.getSousCategorie());
                    }
                    var prixTTC = getPrixHtInAssociation(produit.associationPrixProduit, produit.tauxTva);
                    itemProduit = paramValue(itemProduit, "quantity", quantity);
                    itemProduit = paramValue(itemProduit, "produitPrix", fntp(prixTTC));
                    itemProduit = paramValue(itemProduit, "produitNom", produit.getNom());
                    $('#content_global_zone__idcat_' + categorie.getId()).append(itemProduit);
                }
                if (derniere != "" && categorie.getId() == derniere) {
                    //si on a fini de charger les produits on charge les scripts de swipe
                    scripts.loadScripts("swipe");
                    hideLoading();
                }
            }
            connexion.getProduitByIdCategorieForPrintProduits(printProduitByCategorie, categorie.getId());
        }
    }
}

/**
 * Allows to show the "recapitulatif" or hide 
 * @returns {undefined}
 */
function recapitulatifClick() {
    if (currentTicket != null) {
        if (inRecapitulatif) {
            var html = getFooterWhereRecapitulatif();
            html = paramValue(html, "valueValider", strings.getString("label.info.etape.suivante"));
            html = paramValue(html, "onclick", "etapeSuivante();");
            $("#footer_id").html(html);
            showTicket(0);
            inRecapitulatif = false;
            $("#menu_or_card").hide();
            $("#recapitulatif_commande_id").show();
            $("#titre_categorie_id").val(strings.getString("footer.buttonswitch.recapitulatif"));
            $("#btn_recapitulatif_commande_id").val(strings.getString("footer.buttonswitch.lacarte"));

        } else {
            var html = getFooterWhereCarte();
            $("#footer_id").html(html);
            $("#menu_or_card").show();
            inRecapitulatif = true;
            $("#recapitulatif_commande_id").hide();
            $("#btn_recapitulatif_commande_id").val(strings.getString("footer.buttonswitch.recapitulatif"));
        }
    } else {
        showInfoMessage(strings.getString("info.interdiction.choose.min.one.produit"));
    }
}
function etapeSuivante() {
    var qop = currentTicket.getQuantityOfProduct();
    var ask = confirm(strings.getString("label.info.confirm.etape.suivante"));
    if (ask) {
        var optionSelectItem = getOptionInSelectItem();
        var selectInItemHtml = getSelectInItem();
        var personnes = JSON.parse(getLocalStorageValue("personnes.couverts"));
        console.log(personnes);
        for (var i = 0; i < qop.length; i++) {
            $("#content_produit_zone_left_id_" + qop[i].getId()).remove();
            $("#content_produit_zone_right_qop_" + qop[i].getId()).remove();
            var select = selectInItemHtml;
            select = paramValue(select, "id", qop[i].getId());
            $("#content_produit_zone_recap_id_" + qop[i].getId()).append(select);
            $("#select_item_etape_" + qop[i].getId()).change(function() {
                var qopId = ($(this).attr("qopId"));
                var choosedVal = ($(this).val());
                console.log(choosedVal);
                currentTicket.getQuantityOfProduct()[currentTicket.getIndexOfQuantityOfProductById(qopId)].personne = choosedVal;
            });
            function addItemToSelect(html, value, label) {
                var optionStart = html;
                optionStart = paramValue(optionStart, "optionLabel", label);
                optionStart = paramValue(optionStart, "value", value);
                $("#select_item_etape_" + qop[i].getId()).append(optionStart);
            }
            addItemToSelect(optionSelectItem, "no", strings.getString("label.choose.table.option"));
            for (var j = 0; j < personnes.length; j++) {
                addItemToSelect(optionSelectItem, personnes[j].id, personnes[j].prenom + " " + personnes[j].nom);
            }
        }
        var html = getFooterWhereAffecterProduit();
        html = paramValue(html, "value", strings.getString("label.footer.recap.valider"));
        html = paramValue(html, "onclick", "validerCommande();");
        $("#footer_id").html(html);
    }
}
/**
 * Print the "racapitulatif"
 * @param {type} qop
 * @returns {undefined}
 */
function showTicket(qop) {
    onClickCategorie(catAreShow);
    var htmlListeRecap = getListeRecapitulatif();
    $('#recapitulatif_commande_id').html(htmlListeRecap);
    if (currentTicket != null) {
        var quantityOfProducts = currentTicket.getQuantityOfProduct();
        for (i = 0; i < quantityOfProducts.length; i++) {
            var quantityOfProduct = quantityOfProducts[i];
            if (quantityOfProduct.product instanceof Menu) {
                addMenuItem(quantityOfProducts[i]);
            } else {
                addTicketItem(quantityOfProducts[i]);
            }
        }
    }
    gestionAffichageTVA(currentTicket.calculerTotal());
}
function addTicketItem(qop) {
    var item = getRecapitulatifProduitItem();
    item = paramValue(item, "qopID", qop.getId());
    item = paramValue(item, "qopProduiID", qop.getProduit().getId());
    item = paramValue(item, "prix", fntp(getPrixHtInAssociation(qop.getProduit().associationPrixProduit, qop.getProduit().id_sousCategorie.tauxTva)));
    item = paramValue(item, "quantity", qop.getQuantity());
    item = paramValue(item, "qopProduitNom", qop.getProduit().getNom());
    $('#recapitulatif_liste_id').append(item);
}
function addMenuItem(qop) {
    var item = getRecapitulatifProduitItem();
    item = paramValue(item, "qopID", qop.getId());
//    item = paramValue(item, "qopProduiID", qop.getProduit().getId());
    item = paramValue(item, "prix", fntp(getPrixHtInAssociation(qop.getProduit().getPrix(), qop.getProduit().tauxDeTva)));
    item = paramValue(item, "quantity", qop.getQuantity());
    item = paramValue(item, "qopProduitNom", qop.getProduit().getNom());
    $('#recapitulatif_liste_id').append(item);
}
function removeTicketItemById(id) {
    $("#ticket_item_" + id).remove();
}

var idQop = "";
function onRecapitulatifProduitClicked(produitID, qopid) {
    var htmlItem = getItemRecapDescriptionItem();
    if (idQop == "") {
        load(produitID, qopid);
    } else if (qopid == idQop) {
        $("#content_produit_description_recap_id_" + qopid).html("");
        $("#button_ajouter_ingredient_id").remove();
        idQop = "";
    } else if (qopid != idQop) {
        $("#content_produit_description_recap_id_" + idQop).html("");
        $("#button_ajouter_ingredient_id").remove();
        load(produitID, qopid);
    }
    function load(produitID, qopid) {
        var qops = currentTicket.getQuantityOfProduct();
        var connexion = getConnexion();
        for (var i = 0; i < qops.length; i++) {
            if (qops[i].getId() == qopid) {
                if (qops[i].product instanceof Produit) {
                    var produit = qops[i].getProduit();
                    printIngredients(produit);
                } else if (qops[i].product instanceof Menu) {
                    var menu = qops[i].getProduit();
                    printProduits(menu);
                }
                break;
            }
        }
        function printIngredients(produit) {
            var ingredients = new Array();
            var inngredientArray = produit.getIdsIngredients();
            $("#content_produit_description_recap_id_" + qopid).html("");
            var description = $("#content_produit_description_recap_id_" + qopid);

            var optionHtml = getItemOption();
            for (var i = 0; i < produit.options.length; i++) {
                var optionItem = optionHtml;
                optionItem = paramValue(optionItem, "label", produit.options[i].label);
                optionItem = paramValue(optionItem, "optionId", produit.options[i].id);
                optionItem = paramValue(optionItem, "qopId", qopid);
                optionItem = paramValue(optionItem, "idselect", "option_id_" + produit.options[i].id + "_produit_" + produit.id);
                description.append(optionItem);
                var id = "option_id_" + produit.options[i].id + "_produit_" + produit.id;
                for (var j = 0; j < produit.options[i].possibilites.length; j++) {
                    $("#" + id).append("<option value=\"" + produit.options[i].possibilites[j].id + "\">" + produit.options[i].possibilites[j].nom + "</option>");
                }
                $("#" + id).change(function() {
                    var idItemSelected = $(this).val();
                    var optionId = $(this).attr("optionId");
                    var qopId = $(this).attr("qopId");
                    for (var x = 0; x < currentTicket.getQuantityOfProduct().length; x++) {
                        for (var y = 0; y < currentTicket.getQuantityOfProduct()[x].product.options.length; y++) {
                            if (parseInt(currentTicket.getQuantityOfProduct()[x].product.options[y].id) == parseInt(optionId)) {
                                currentTicket.getQuantityOfProduct()[x].product.options[y].possibilites = idItemSelected;
                            }
                        }
                    }
                });
            }
            function MyParam(i, len) {
                this.i = i;
                this.len = len;
            }
            var haveIngSup = false;
            for (var i = 0; i < inngredientArray.length; i++) {
                if (inngredientArray[i].isIngredientSup == true) {
                    haveIngSup = true;
                }
                if (inngredientArray[i].isAdded == true) {
                    var connexion = getConnexion();
                    connexion.getIngredientById(appendItem, inngredientArray[i].ingredient, 0);
                }
                if ((i + 1) == inngredientArray.length && haveIngSup == true) {
                    var htmlButtonAjouter = getButtonAjouterIngInProduitRecap();
                    htmlButtonAjouter = paramValue(htmlButtonAjouter, "onclick", "ajouterIngredient(" + produitID + "," + qopid + ");");
                    htmlButtonAjouter = paramValue(htmlButtonAjouter, "value", strings.getString("label.recapitulatif.button.ajouter.ingredient"));
                    $("#content_produit_description_recap_id_" + qopid).append(htmlButtonAjouter);
                }
            }
            function appendItem(ingredient, param) {
                var itemIngredient = htmlItem;
                itemIngredient = paramValue(itemIngredient, "aName", ingredient.getNom());
                itemIngredient = paramValue(itemIngredient, "onclick", "blockIngredient(" + produitID + "," + ingredient.getId() + "," + qopid + ");");
                itemIngredient = paramValue(itemIngredient, "id", "ing_" + ingredient.getId() + "_prod_" + produitID);
                $("#content_produit_description_recap_id_" + qopid).append(itemIngredient);

            }
        }
        function printProduits(menu) {
            var produits = menu.getProduits();
            for (var i = 0; i < produits.length; i++) {
                appendItem(produits[i]);
            }
            function appendItem(produit, param) {
                var itemProduit = htmlItem;
                itemProduit = paramValue(itemProduit, "aName", produit.getNom());
                itemProduit = paramValue(itemProduit, "onclick", "");
                itemProduit = paramValue(itemProduit, "id", "ing_" + produit.getId() + "_prod_" + produitID);
                $("#content_produit_description_recap_id_" + qopid).append(itemProduit);
            }
        }
        idQop = qopid;
    }
}

var memoryIngBlok = new Array();

function memoryIng(prod, ing) {
    this.prod = prod;
    this.ing = ing;
}
/*
 * A REFAIRE
 */
function blockIngredient(produitID, ingID, qopId) {
    var find = false;
    for (var i = 0; i < memoryIngBlok.length; i++) {
        if (memoryIngBlok[i].prod == produitID && memoryIngBlok[i].ing == ingID) {
            find = true;
            memoryIngBlok.splice(i, 1);
        }
    }
    if (!find) {
        var connexion = getConnexion();
        var produit = connexion.getProduitByIdGeneric(blockWithProduct, produitID, null);
        function blockWithProduct(produit, param) {
            var inngredientArray = produit.getIdsIngredients();
            var ing;
            for (var i = 0; i < inngredientArray.length; i++) {
                if (inngredientArray[i].ingredient == ingID) {
                    ing = inngredientArray[i];
                }
            }
            if (ing.supprimable) {
                $("#ing_" + ingID + "_prod_" + produitID).css("text-decoration", "line-through");
                memoryIngBlok.push(new memoryIng(produitID, ingID));
                for (var i = 0; i < currentTicket.getQuantityOfProduct().length; i++) {
                    if (parseInt(currentTicket.getQuantityOfProduct()[i].id) == parseInt(qopId)) {
                        for (var j = 0; j < currentTicket.getQuantityOfProduct()[i].product.ids_ingredients.length; j++) {
                            if (currentTicket.getQuantityOfProduct()[i].product.ids_ingredients[j].ingredient == ingID) {
                                currentTicket.getQuantityOfProduct()[i].product.ids_ingredients[j].isAdded = false;
                                break;
                            }
                        }

                    }
                }
            } else {
                showInfoMessage(strings.getString("error.suppression.interdite.ingredient"));
            }
        }
    } else {
        for (var i = 0; i < currentTicket.getQuantityOfProduct().length; i++) {
            if (parseInt(currentTicket.getQuantityOfProduct()[i].id) == parseInt(qopId)) {
                for (var j = 0; j < currentTicket.getQuantityOfProduct()[i].product.ids_ingredients.length; j++) {
                    if (currentTicket.getQuantityOfProduct()[i].product.ids_ingredients[j].ingredient == ingID) {
                        currentTicket.getQuantityOfProduct()[i].product.ids_ingredients[j].isAdded = true;
                        break;
                    }
                }
            }
        }
        $("#ing_" + ingID + "_prod_" + produitID).css("text-decoration", "none");
    }

}
var idProduitTITRE = "";

function ajouterIngredient(produitID, qopid) {
    startDialogForAjouterIngredient(produitID, qopid);
}
function startDialogForAjouterIngredient(produitID, qopid) {
    var modal = $("#modal_add_ingredient");
    if (modal.length) {
        modal.show();
        var connexion = getConnexion();
        connexion.getProduitByIdGeneric(startDialogForAjouterIngredientWithProduit, produitID, null);
        function startDialogForAjouterIngredientWithProduit(produit, param) {
            var ingredients = produit.getIdsIngredients();

            for (var i = 0; i < ingredients.length; i++) {
                if (ingredients[i].isAdded == false) {
                    connexion.getIngredientById(printIng, ingredients[i].ingredient, new Param(ingredients[i].surcout));
                }
            }
            function Param(surcout) {
                this.surcout = surcout;
            }
            function printIng(ingredient, param) {
                var ul = $("#modal_add_liste");
                var htmlItem = getModalAjouterIngredientItem();
                htmlItem = paramValue(htmlItem, "produitID", produitID);
                htmlItem = paramValue(htmlItem, "ingredientId", ingredient.getId());
                htmlItem = paramValue(htmlItem, "qopId", qopid);
                htmlItem = paramValue(htmlItem, "nomIngredient", ingredient.getNom());
                htmlItem = paramValue(htmlItem, "prixProduit", fntp(parseFloat(param.surcout)));
                ul.append(htmlItem);
            }
        }
    } else {
        var htmlModal = getModalAjouterIngredient();
        $("body").append(htmlModal);
        startDialogForAjouterIngredient(produitID, qopid);
    }
}
function onclickItemAjouterIngredient(produitID, ingredientid, qopid) {
    var qops = currentTicket.getQuantityOfProduct();
    var myqop;
    for (var i = 0; i < qops.length; i++) {
        if (qops[i].getId() == qopid) {
            for (var j = 0; j < qops[i].product.ids_ingredients.length; j++) {
                if (qops[i].product.ids_ingredients[j].ingredient == ingredientid) {

                    var prod = qops[i].product;
                    if (qops[i].getQuantity() > 1) {
                        var clondedProduct = new Produit();
                        clondedProduct.id = clone(prod.id);
                        clondedProduct.id_categorie = clone(prod.id_categorie);
                        clondedProduct.id_sousCategorie = clone(prod.id_sousCategorie);
                        clondedProduct.nom = clone(prod.nom);
                        clondedProduct.prix = clone(prod.prix);
                        clondedProduct.demanderCuisson = clone(prod.demanderCuisson);
                        clondedProduct.ids_ingredients = new Array();
                        for (var x = 0; x < prod.ids_ingredients.length; x++) {
                            var api = new AssociationProduitIngredients(produitID, clone(prod.ids_ingredients[x].ingredient), clone(prod.ids_ingredients[x].inStart), clone(prod.ids_ingredients[x].surcout), clone(prod.ids_ingredients[x].supprimable));
                            if (prod.ids_ingredients[x].ingredient == ingredientid) {
                                api.isAdded = true;
                            }
                            clondedProduct.ids_ingredients.push(api);
                        }
                        var newQop = ajouterQuantityOfProduct(clondedProduct);
                        qopid = newQop.getId();
                        whereIngredientAddedAddOfpItem(qopid, newQop);
                    } else {
                        var surcout = parseFloat(qops[i].product.ids_ingredients[j].surcout);
                        qops[i].product.ids_ingredients[j].isAdded = true;
                        for (var x = 0; x < currentTicket.getQuantityOfProduct().length; x++) {
                            if (parseInt(currentTicket.quantityOfProducts[x].id) == parseInt(qops[i].id)) {
                                currentTicket.quantityOfProducts[x].product.prix += surcout;
                                $("#content_produit_zone_right_prix_id_" + qops[i].id).text(fntp(currentTicket.quantityOfProducts[x].product.prix));
                                break;
                            }
                        }
                        var connexion = getConnexion();
                        var ing = connexion.getIngredientById(addIng, qops[i].product.ids_ingredients[j].ingredient, new Param(produitID, ingredientid));
                        function Param(produitID, ingredientid) {
                            this.produitID = produitID;
                            this.ingredientid = ingredientid;
                        }
                        function addIng(ing, param) {
                            var htmlDescriptionItem = getItemRecapDescriptionItem();
                            htmlDescriptionItem = paramValue(htmlDescriptionItem, "aName", ing.getNom());
                            htmlDescriptionItem = paramValue(htmlDescriptionItem, "onclick", "blockIngredient(" + param.produitID + "," + param.ingredientid + ");");
                            htmlDescriptionItem = paramValue(htmlDescriptionItem, "id", "ing_" + param.ingredientid + "_prod_" + param.produitID);
                            $("#content_produit_description_recap_id_" + qops[i].getId()).append(htmlDescriptionItem);
                        }
                    }
                    fermerAjouterIngredients();
                    break;
                }
            }
            break;
        }
    }
}
function fermerAjouterIngredients() {
    var modal = $("#modal_add_ingredient");
    modal.remove();
}
function ajouterQuantityOfProduct(produit) {
    var generatedId = currentTicket.getQuantityOfProduct().length + 1;
    qopToShow = new QuantityOfProduct(generatedId, produit, 1);
    currentTicket.setNewQuantityOfProduct(qopToShow);
    return qopToShow;
}
function lessQuantityById(id) {
    for (var i = 0; i < currentTicket.getQuantityOfProduct().length; i++) {
        if (currentTicket.getQuantityOfProduct()[i].id == id) {
            currentTicket.getQuantityOfProduct()[i].quantity -= 1;
            break;
        }
    }
}
var idProduit = "";
function onTitreProduitClicked(produitID) {
    var htmlItem = getItemRecapDescriptionItem();
    if (idProduit == "") {
        load(produitID);
    } else if (produitID == idProduit) {
        idProduit = "";
        $("#content_produit_description_id_" + produitID).html("");
    } else if (produitID != idProduit) {
        $("#content_produit_description_id_" + idProduit).html("");
        load(produitID);
    }
    function load(produitID) {
        idProduit = produitID;
        var connexion = getConnexion();
        function Param(produitid) {
            this.produitId = produitid;
        }
        connexion.getProduitByIdGeneric(printIngredients, produitID, new Param(produitID));
        function printIngredients(produit, param) {
            var inngredientArray = produit.getIdsIngredients();
            $("#content_produit_description_id_" + param.produitId).html("");
            var description = $("#content_produit_description_id_" + param.produitId);
            for (var i = 0; i < inngredientArray.length; i++) {
                if (inngredientArray[i].isAdded == true) {
                    var connexion = getConnexion();
                    connexion.getIngredientById(appendItem, inngredientArray[i].ingredient, new Param(param.produitId));
                }
            }
            function appendItem(ingredient, param) {
                var itemIngredient = htmlItem;
                itemIngredient = paramValue(itemIngredient, "aName", ingredient.getNom());
                itemIngredient = paramValue(itemIngredient, "onclick", "");
                itemIngredient = paramValue(itemIngredient, "id", "");
                $("#content_produit_description_id_" + param.produitId).append(itemIngredient);
            }
        }
    }
}

function showDialogInfoPrix(total) {
    var nbCouverts = JSON.parse(getLocalStorageValue("personnes.couverts"));
    nbCouverts = parseInt(nbCouverts.length);
    var numTable = getLocalStorageValue("paramCommande.numTable");
    var showTime = 2;// secondes
    if ($("#info_prix_id").length) {
        $("#info_prix_content_couverts_content_id").html(nbCouverts);
        $("#info_prix_content_table_content_id").html(fntp(total));
    } else {
        var html = getDialogInfoPrix();
        html = paramValue(html, "contentTable", fntp(total));
        html = paramValue(html, "labelTable", strings.getString("carte.ticket.total.labeltotal"));
        html = paramValue(html, "contentCouvert", nbCouverts);
        var label = "";
        if (nbCouverts == 1) {
            label = strings.getString("carte.ticket.total.labelcouvertSing");
        } else {
            label = strings.getString("carte.ticket.total.labelcouvertPlur");
        }

        html = paramValue(html, "labelCouvert", label);
        $("body").append(html);
        $("#info_prix_id").show(1000, function() {
        });
        window.setTimeout(function() {
            $("#info_prix_id").hide(1000, function() {
                $("#info_prix_id").remove();
            });
        }, showTime * 1000);
    }
}
function PersonneProduits(personne, produitspriotite) {
    this.personne = personne;
    this.produitspriotite = produitspriotite;
}
function ProduitPriorite(produit, priorite) {
    this.produit = produit;
    this.priorite = priorite;
}
function validerCommande() {
    var ask = confirm(strings.getString("label.info.confirm.valider.commande"));
    if (ask) {
        window.onbeforeunload = null;
        var prixparPersonnes = new Array();
        var personnes = JSON.parse(getLocalStorageValue("personnes.couverts"));
        var testsQop = clone(currentTicket.getQuantityOfProduct());
        var personnesProduitsListe = new Array();
        for (var i = 0; i < personnes.length; i++) {
            var personne = null;
            var produits = new Array();
            var totalPersonne = 0;
            for (var j = 0; j < (currentTicket.getQuantityOfProduct().length); j++) {
                if (parseInt(currentTicket.getQuantityOfProduct()[j].personne) == personnes[i].id) {
                    personne = personnes[i];
                    produits.push(new ProduitPriorite(currentTicket.getQuantityOfProduct()[j].product, 0));
                    if (currentTicket.getQuantityOfProduct()[j].product instanceof Menu) {
                        totalPersonne += getPrixHtInAssociation(currentTicket.getQuantityOfProduct()[j].product.prix, currentTicket.getQuantityOfProduct()[j].product.tauxTva);
                    } else {
                        totalPersonne += getPrixHtInAssociation(currentTicket.getQuantityOfProduct()[j].product.associationPrixProduit, currentTicket.getQuantityOfProduct()[j].product.tauxTva);
                    }

                    var index = testsQop.indexOf(currentTicket.getQuantityOfProduct()[j]);
                    testsQop.splice(index, 1);
                }
            }
            if (personne != null) {
                var personneProduit = new PersonneProduits(personne, produits);
                personnesProduitsListe.push(personneProduit);
                prixparPersonnes.push(new PrixParPersonne(personnes[i], totalPersonne));
            }
        }
        for (var i = 0; i < testsQop.length; i++) {
            prixparPersonnes.push(new ProduitNonAttribue(testsQop[i].product, testsQop[i].id));
        } 
        var numTable = getLocalStorageValue("paramCommande.numTable");
        currentTicket.table = numTable;
        var typecommande = getLocalStorageValue("type.commande");
        currentTicket.type_commande = typecommande;
        envoyerTicketServeur(currentTicket);
        setLocalStorageValue("personnesProduitsListe", JSON.stringify(personnesProduitsListe));
        setLocalStorageValue("reste.personnes.paiment", JSON.stringify(prixparPersonnes));
        redirictWhereFinishCarte();
    }
}
function envoyerTicketServeur(ticket) {
    var connexion = getConnexion();
    connexion.sendTicketToServeur(null, (ticket), null);
}
function hideDialogInfo() {
    $("#dialog_info_id").remove();
}
