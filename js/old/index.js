/**
 * 
 * @author Damien Chesneau <contact@damienchesneau.fr>
 */
// START GLOBAL VARS
var isConnected = window.navigator.onLine; // Use that if your want say if the device are online or offline
var currentTicket; // List of quantityOfProduct
var first = false;
var globalProducts = new Array(); //List of products used for the menu choose process 
var inRecapitulatif = false; // Use that to say if the recapitulatif is open or closed
var productsInMenu; // all products in a menu
var nom = window.location.pathname;
var productsChoosecInMenu; // products are choosed in a menu not validate
// DATA already charged
// END GLOBAL VARS
var useMenus = true;// si on affiche la slide des menus ou pas.
var htmlTestConnexion = getTestConnexionIconImg();
$(document).ready(function() {// thread connexion
    thread();
    testConnexion();
    function testConnexion() {
        if (window.navigator.onLine) {
            isConnected = true;
            var html = htmlTestConnexion;
            html = paramValue(html, "class", "greenIcon");
            $("#header_right_isconnced_id").html(html);
        } else {
            isConnected = false;
            var html = htmlTestConnexion;
            html = paramValue(html, "class", "redIcon");
            $("#header_right_isconnced_id").html(html);
        }
    }
    function thread() {
        window.setTimeout(function() {
            testConnexion();
            thread();
        }, 1000);
    }
});
function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
    var regexS = "[\\?&]" + name + "=([^&#]*)";
    var regex = new RegExp(regexS);
    var results = regex.exec(window.location.href);
    if (results == null) {
        return "";
    } else {
        return results[1];
    }
}
nom = nom.split("/");
nom = nom[nom.length - 1];
nom = nom.substr(0, nom.lastIndexOf("."));
nom = nom.replace(new RegExp("(%20|_|-)", "g"), "");
onTemplateLoadStart();
function controller(entreprise) {
    switch (nom) {
        case "carte":
            onCarteLoadStart();
            break;
        case "paramCommande":
            var tables;
            if (getParameterByName("table") == "") {
                tables = new Array();
                for (var x = 0; x < 5; x++) {
                    tables.push((x + 1));
                }
            } else {
                tables = getParameterByName("table");
            }
            console.log(entreprise.langue);
            onLoadParamCommande(15, tables, entreprise.langue);
            break;
    }
}
// TEST IF THE CACHE ARE UP TO DATE
if (window.applicationCache.status == window.applicationCache.UPDATEREADY) {
    window.location.reload();
} else {
// Manifest identique.
}
function onTemplateLoadStart() {
    var connexion = getConnexion();
    connexion.getEntreprise(onTemplateLoadFinish);
}
function onTemplateLoadFinish(entreprise) {
    $("#title_app_id").text(entreprise.getNom()); //Name of companie in the title 
    $("#cssToApply").attr('href', './css/' + entreprise.getTheme()); //Show css are choosed 
    $("#header_right_logo_slogan").text(entreprise.getSlogan());
    $("#header_left_logo_message_id").text(entreprise.getMessage());
    controller(entreprise);
    choosePrintFooter();
}

function gestionAffichageTVA(total) {
    $('#footer_tarif_total_label_id').html(strings.getString("carte.ticket.total.labeltotal"));
    $('#footer_tarif_total_value_id').html(fntp(total));
    var nbpersonne = readCookie("paramCommande.nbPersonne");
    if (nbpersonne != null) {
        $('#footer_tarif_nbCouvert_label_id').html(strings.getString("carte.ticket.total.labelcouvert"));
        $('#footer_tarif_nbCouvert_value_id').html(nbpersonne);
        $('#footer_tarif_totalparPersonne_label_id').html(strings.getString("carte.ticket.total.labelpersonne"));
        $('#footer_tarif_totalparPersonne_value_id').html(fntp(total / nbpersonne));
    }
    var numTable = readCookie("paramCommande.numTable");
    if (numTable != null) {
        $('#footer_tarif_votreTable_label_id').html(strings.getString("carte.ticket.total.labeltable"));
        $('#footer_tarif_votreTable_value_id').html(numTable);
    }
}
function calcHeight(nbItem) {
    return nbItem * 50;
}
function onCarteLoadStart() {
    var nbpersonne = readCookie("paramCommande.nbPersonne");
    if (nbpersonne != null) {
        var html = getFooterWhereCarte();
        $("#footer_id").html(html);
        printProduits(0);
        var connexion = getConnexion();
        connexion.getCategoriesForContentCategorie(onCarteLoadFinish);
    } else {
        showInfoMessage(strings.getString("info.interdiction.commande.where.paramcommande"));

        window.setTimeout(function() {
            if (verifyFinish() == false) {
                document.location.href = "paramCommande.php";
            }
        }, 3000);
    }
}
function onCarteLoadFinish(categories) {
    var html = getHeaderCategorieItem();
    var htmlSousCategorie = getHeaderCategorieSousCategorieListe();
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
        categorieLoaded.push(categorie);
        var voirtoutItem = htmlSSCat;
        voirtoutItem = paramValue(voirtoutItem, "idcat", categorie.getId());
        voirtoutItem = paramValue(voirtoutItem, "idSousCat", -2);
        voirtoutItem = paramValue(voirtoutItem, "text", "Voir tout");
        $("#categorie_sous_cat_" + categorie.getId()).append(voirtoutItem);
        var height = (categorie.souscategorie.length + 1 * 25);
        var souscategories = categorie.souscategorie;
        document.getElementById("categorie_sous_cat_" + categorie.getId()).style += "height " + height + "px;";
        for (var j = 0; j < souscategories.length; j++) {
            var sousCategorieid = souscategories[j];
            connexion.getSousCategoriesByIdCategorieForContentSousCategorie(printSousCategorie, sousCategorieid, categorie.getId());
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
function showErrorMessage(message) {
    var element = $("#dialog_error_content_message_id");
    if (element.length) {
        $("#dialog_error_content_message_id").text(message);
    } else {
        var html = getDialogErrorMessage(message);
        html = paramValue(html, "message", message);
        $("body").append(html);
        $("#dialog_error_id").show();
    }
}
function closeErreurDialog(id) {
    $("#" + id).remove();
}
/**
 * Use this function to standarise the method to show an info
 * @param {String} message
 * 
 */
function showInfoMessage(message) {
    var element = $("#dialog_info_id");
    if (element.length) {
        $("#dialog_info_content_message_id").text(message);
    } else {
        var html = getDialogMessageInfo(message);
        html = paramValue(html, "message", message);
        $("body").append(html);
        $("#dialog_info_id").show();
    }
}

/**
 * formatNumberToPrint ==> fntp
 * formater le nombre afin qu'il soit affichable
 * @param {integer} nombre description
 */
function fntp(nombre) {
    return nombre.toFixed(2) + " €";
}
/**
 * This function is to show all products in a menu
 * @param {type} id
 * @returns {undefined}
 */
var idmenuCur = "";
function detailMenu(id) {
    if (idmenuCur == "") {
        load(id);
    } else if (id == idmenuCur) {
        $("#choose_menu_item_produits_" + idmenuCur).html("");
        $("#choose_menu_valider_menu_" + idmenuCur).remove();
        $("#menu_content_add_" + idmenuCur).attr("class", "menu_content_add_button");
        idmenuCur = "";
    } else if (id != idmenuCur) {
        $("#choose_menu_item_produits_" + idmenuCur).html("");
        $("#choose_menu_valider_menu_" + idmenuCur).remove();
        $("#menu_content_add_" + idmenuCur).attr("class", "menu_content_add_button");
        load(id);
    }
    function load(id) {
        idmenuCur = id;
        $("#menu_content_add_" + id).attr("class", ($("#menu_content_add_" + id).attr("class")) + " menu_content_add_button_close");
        var connexion = getConnexion();
        connexion.getMenuByIdForDetailMenu(showWithMenuDataById, id);//BDD
        function showWithMenuDataById(menu) {
            $("#choose_menu_items_id").html("");
            var produits = menu.getProduits();
            for (var i = 0; i < produits.length; i++) {
                var connexion = getConnexion();
                var isexecute = false;
                if (produits.length - 1 == i) {
                    isexecute = true;
                }
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
    if (useMenus) {
        var menuDivSlide = htmlDivSlide;
        menuDivSlide = paramValue(menuDivSlide, "style", "/*height: 100%;*/ width: 100%;");
        menuDivSlide = paramValue(menuDivSlide, "classToAdd", isActive);
        menuDivSlide = paramValue(menuDivSlide, "id", "categorieMenu");
        $("#slides_wrap_id").append(menuDivSlide);
        var htmlContentSlideMenu = getContentSlideMenu();
        $("#categorieMenu").append(htmlContentSlideMenu);
        connexion.getAllMenuForDetailMenu(printMenus); //BDDDDDDDDDDDD
        function printMenus(menus) {
            var htmlMenu = getItemListeMenu();
            for (var i = 0; i < menus.length; i++) {
                var itemMenu = htmlMenu;
                itemMenu = paramValue(itemMenu, "menuId", menus[i].getId());
                itemMenu = paramValue(itemMenu, "prixMenu", fntp(menus[i].getPrix()));
                itemMenu = paramValue(itemMenu, "menuNom", menus[i].getNom());
                $('#menus_id').append(itemMenu);
            }
        }
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
            myDivSlide = paramValue(myDivSlide, "style", "height: 100%; width: 100%;");
            myDivSlide = paramValue(myDivSlide, "classToAdd", isActive);
            myDivSlide = paramValue(myDivSlide, "id", "categorie" + categorie.getId());

            $("#slides_wrap_id").append(myDivSlide);
            var htmlContentProduit = getContentProduit();
            htmlContentProduit = paramValue(htmlContentProduit, "idCategorie", categorie.getId());
            $("#categorie" + categorie.getId()).html(htmlContentProduit);
            connexion.getProduitByIdCategorieForPrintProduits(printProduitByCategorie, categorie.getId());
            function printProduitByCategorie(produits) {
                var quantity = "+";
                var categorie = produits[0].getCategorie();
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
                    itemProduit = paramValue(itemProduit, "sousCategorieId", produit.getSousCategorie());
                    itemProduit = paramValue(itemProduit, "quantity", quantity);
                    itemProduit = paramValue(itemProduit, "produitPrix", fntp(produit.getPrix()));
                    itemProduit = paramValue(itemProduit, "produitNom", produit.getNom());
                    $('#content_global_zone__idcat_' + categorie.getId()).append(itemProduit);
                }
                if (derniere != "" && categorie.getId() == derniere) {
                    loadScriptsForSwipe();//si on a fini de charger les produits on charge les scripts de swipe
                }
            }
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
            html = paramValue(html, "valueValider", strings.getString("label.footer.recap.valider"));
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
            addTicketItem(quantityOfProducts[i]);
        }
    }
    gestionAffichageTVA(currentTicket.calculerTotal());
}
function addTicketItem(qop) {
    var item = getRecapitulatifProduitItem();
    item = paramValue(item, "qopID", qop.getId());
    item = paramValue(item, "qopProduiID", qop.getProduit().getId());
    item = paramValue(item, "prix", fntp(qop.getProduit().getPrix()));
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
        idQop = "";
    } else if (qopid != idQop) {
        $("#content_produit_description_recap_id_" + idQop).html("");
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
            var htmlButtonAjouter = getButtonAjouterIngInProduitRecap();
            $("#content_produit_zone_right_qop_" + qopid).append(htmlButtonAjouter);
            var ingredients = new Array();
            var inngredientArray = produit.getIdsIngredients();
            $("#content_produit_description_recap_id_" + qopid).html("");
            var description = $("#content_produit_description_recap_id_" + qopid);
            var buttonAdd = htmlItem;
            buttonAdd = paramValue(buttonAdd, "aName", "Ajouter");
            buttonAdd = paramValue(buttonAdd, "onclick", "ajouterIngredient(" + produitID + "," + qopid + ");");
            description.append(buttonAdd);
            var optionHtml = getItemOption();
            for (var i = 0; i < produit.options.length; i++) {
                var optionItem = optionHtml;
                optionItem = paramValue(optionItem, "label", produit.options[i].label);
                optionItem = paramValue(optionItem, "idselect", "option_id_" + produit.options[i].id + "_produit_" + produit.id);
                description.append(optionItem);
                for (var j = 0; j < produit.options[i].possibilites.length; j++) {
                    $("#option_id_" + produit.options[i].id + "_produit_" + produit.id).append("<option>" + produit.options[i].possibilites[j] + "</option>");
                }
            }
            for (var i = 0; i < inngredientArray.length; i++) {
                if (inngredientArray[i].isAdded == true) {
                    var connexion = getConnexion();
                    connexion.getIngredientById(appendItem, inngredientArray[i].ingredient, 0);
                }
            }
            function appendItem(ingredient, param) {
                var itemIngredient = htmlItem;
                itemIngredient = paramValue(itemIngredient, "aName", ingredient.getNom());
                itemIngredient = paramValue(itemIngredient, "onclick", "blockIngredient(" + produitID + "," + ingredient.getId() + ");");
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
function blockIngredient(produitID, ingID) {
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
            } else {
                showInfoMessage(strings.getString("error.suppression.interdite.ingredient"));
            }
        }
    } else {
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
                htmlItem = paramValue(htmlItem, "prixProduit", fntp(parseInt(param.surcout)));
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
//                    lessQuantityById(qopid);
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
                        qops[i].product.ids_ingredients[j].isAdded = true;
                        var connexion = new ConnexionLocal();
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

function clone(obj) {
    if (null == obj || "object" != typeof obj)
        return obj;
    var copy = obj.constructor();
    for (var attr in obj) {
        if (obj.hasOwnProperty(attr))
            copy[attr] = obj[attr];
    }
    return copy;
}


function showDialogInfoPrix(total) {
    var nbCouverts = readCookie("paramCommande.nbPersonne");
    var numTable = readCookie("paramCommande.numTable");
    var showTime = 2;// secondes
    if ($("#info_prix_id").length) {
        $("#info_prix_content_couverts_content_id").html(nbCouverts);
        $("#info_prix_content_table_content_id").html(fntp(total));
    } else {
        var html = getDialogInfoPrix();
        html = paramValue(html, "contentTable", fntp(total));
        html = paramValue(html, "labelTable", strings.getString("carte.ticket.total.labeltotal"));
        html = paramValue(html, "contentCouvert", nbCouverts);
        html = paramValue(html, "labelCouvert", strings.getString("carte.ticket.total.labelcouvert"));
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

function validerCommande() {
    var ask = confirm(strings.getString("label.info.confirm.valider.commande"));
    if (ask) {
        console.log("Faire traitement de la commande validé");
    }
}

function hideDialogInfo() {
    $("#dialog_info_id").remove();
}
