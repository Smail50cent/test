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
// END GLOBAL VARS
$(document).ready(function() {
    thread();
    testConnexion();
    function testConnexion() {
        if (window.navigator.onLine) {
            isConnected = true;
            document.getElementById("header_right_isconnced_id").innerHTML = '<img style="with: 10px; height: 10px;" src="./img/button-green.png"></img>';
        } else {
            isConnected = false;
            document.getElementById("header_right_isconnced_id").innerHTML = '<img style="with: 10px; height: 10px;" src="./img/button-red.png"></img>';
        }
    }
    function thread() {
        window.setTimeout(function() {
            testConnexion();
            thread();
        }, 1000);
    }
});
nom = nom.split("/");
nom = nom[nom.length - 1];
nom = nom.substr(0, nom.lastIndexOf("."));
nom = nom.replace(new RegExp("(%20|_|-)", "g"), "");
onTemplateLoadStart();
switch (nom) {
    case "carte":
        onCarteLoadStart();
        break;
    case "menus":
        //onLoadMenus();
        break;
}// TEST IF THE CACHE ARE UP TO DATE
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
    $("#cssToApply").attr('href', 'css/' + entreprise.getTheme()); //Show css are choosed
}
function gestionAffichageTVA(total) {
    $("#test").append("<div id=\"ticket_table_tva_id\"></div>");
    $('#ticket_table_tva_id').html('<tr><td>Total</td> <td>' + fntp(total) + '</td></tr>');
    var nbpersonne = readCookie("paramCommande.nbPersonne");
    var numTable = readCookie("paramCommande.numTable");
    $('#ticket_table_tva_id').append('<tr><td>Couverts</td> <td>' + nbpersonne + '</td></tr>');
    $('#ticket_table_tva_id').append('<tr><td>Par personne</td> <td>' + fntp(total / nbpersonne) + '</td></tr>');
    $('#ticket_table_tva_id').append('<tr><td>Votre table</td> <td> Table ' + numTable + '</td></tr>');
}
function onCarteLoadStart() {
    printProduits(0);
    var connexion = getConnexion();
    onCarteLoadFinish(connexion.getCategories());
}
function onCarteLoadFinish(categories) {
    var connexion = new ConnexionLocal();
    var cat2 = connexion.getCategories();
    $('#content_list_categorie_id').append('<li><a class="slide_button button"  onclick="onClickCategorie(1555555555555555555);" href="#categorieMenu">Menus</a></li>');
    for (i = 0; i < cat2.length; i++) {// Load categories bar
        $('#content_list_categorie_id').append('<li><a  class="slide_button button" href="#categorie' + cat2[i].getId() + '" onclick="onClickCategorie(' + cat2[i].getId() + ');">' + cat2[i].getNom() + '</a><ul id="categorie_sous_cat_' + cat2[i].getId() + '" class="sous_categorie_cat" style="background-color: black; width; 150px; margin-top: 5px; display: none;"></ul></li>');
    }
    var e = connexion.getCategories();
    var i = 0;
    for (i = 0; i < e.length; i++) {
        var categorie = e[i];
        var sousCategorie = connexion.getSousCategoriesByIdCategorie(categorie.getId());
        var j = 0;
        var height = (sousCategorie.length + 1 * 25);
        document.getElementById("categorie_sous_cat_" + categorie.getId()).style += "height " + height + "px;";
        for (j = 0; j < sousCategorie.length; j++) {
            $("#categorie_sous_cat_" + categorie.getId()).append('<li><a onclick="sousCategorieClicked(' + categorie.getId() + ',' + sousCategorie[j].getId() + ');">' + sousCategorie[j].getNom() + '</a></li>');
        }
        $("#categorie_sous_cat_" + categorie.getId()).append('<li><a onclick="sousCategorieClicked(' + categorie.getId() + ',-2);">Voir tout</a></li>');
    }
}
function sousCategorieClicked(idCat, idSousCat) {
    onClickCategorie(idCat);
    if (idSousCat == -2) {
        var connexion = getConnexion();
        var sousCategorie = connexion.getSousCategoriesByIdCategorie(idCat);
        for (i = 0; i < sousCategorie.length; i++) {
            $('.produitcat' + idCat + '_sscat' + sousCategorie[i].getId()).show();
        }
        $('.produitcat' + idCat + '_sscatundefined').show();
    } else {
        var connexion = getConnexion();
        var sousCategorie = connexion.getSousCategoriesByIdCategorie(idCat);
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

/**
 * Add a product in the ticket 
 * @param {int} id
 * @param {bool} isTicket
 * @returns {no return}
 */
function addProduit(id, isTicket) {
    console.log("id=" + id);
    if (currentTicket == null) {
        currentTicket = new Ticket();
        currentTicket.setId(1);
        first = true;
    }
    var connexion = getConnexion();
    var produit = connexion.getProduitById(id);
    var qop = currentTicket.getQuantityOfProduct();
    var test = false;
    var qopToShow;
    if (qop == null) {
        qopToShow = new QuantityOfProduct(1, produit, 1);
        qop = new Array(qopToShow);
        currentTicket.setQuantityOfProduct(qop);
        first = true;
    } else {
        first = false;
//        for (i = 0; i < qop.length; i++) {
//            if (isTicket) {
//                if (qop[i].getId() == id) {
////on ajoute dedans
//                    var startQuantity = qop[i].getQuantity();
//                    qop[i].setQuantity(startQuantity + 1);
//                    currentTicket.setQuantityOfProduct(qop);
//                    qopToShow = qop[i];
//                    test = true;
//                    break;
//                }
//            } else {
//                if (qop[i].getProduit().getId() == id) {
////on ajoute dedans
//                    var startQuantity = qop[i].getQuantity();
//                    qop[i].setQuantity(startQuantity + 1);
//                    currentTicket.setQuantityOfProduct(qop);
//                    qopToShow = qop[i];
//                    test = true;
//                    break;
//                }
//            }
//
//        }
        ajouterQuantityOfProduct(produit);
    }
    if (isTicket) {
        $('#content_produit_btn_right_id_recap_' + id).val(qopToShow.getQuantity());
        $("#content_produit_btn_right_id_" + qopToShow.getProduit().getId()).val(qopToShow.getQuantity());
    } else {
        $("#content_produit_btn_right_id_" + id).val(qopToShow.getQuantity());
    }
    gestionAffichageTVA(currentTicket.calculerTotal());
}
/**
 * remove a product in the ticket 
 * @param {int} id
 * @returns {no return}
 */
function lessProduit(id) {
    if (currentTicket != null) {
        var connexion = getConnexion();
        var produit = connexion.getProduitById(id);
        var qop = currentTicket.getQuantityOfProduct();
        var qopToShow;
        if (qop == null) {
            showInfoMessage("Vous ne pouvez pas supprimer ce produit.");
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

                            try {
                                $("#content_produit_btn_right_id_recap_" + id).val("+");
                            } catch (e) {
                                console.log("ne devrait pas arrivé");
                            }
                            $("#content_produit_btn_right_id_" + id).val("+");
                        } else {
                            try {
                                $("#content_produit_btn_right_id_recap_" + id).val($("#content_produit_btn_right_id_" + id).val() - 1);
                            } catch (e) {
                                console.log("ne devrait pas arrivé");
                            }
                            $("#content_produit_btn_right_id_" + id).val($("#content_produit_btn_right_id_" + id).val() - 1);
                        }
                    }
                    break;
                }
            }
        }
        gestionAffichageTVA(currentTicket.calculerTotal());
    } else {
        showInfoMessage("Vous ne pouvez pas supprimer ce produit.");
    }
}
/**
 * Use this function to standarise the method to show an error
 * @param {String} message
 * 
 */
function showErrorMessage(message) {
    alert(message);
}
/**
 * Use this function to standarise the method to show an info
 * @param {String} message
 * 
 */
function showInfoMessage(message) {
    alert(message);
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
function detailMenu(id) {
//    if (currentTicket == null) {
//        currentTicket = new Ticket();
//        currentTicket.setId(1);
//        first = true;
//    }
    var connexion = getConnexion();
    var menu = connexion.getMenuById(id);
    $("#choose_menu_items_id").html("");
    var produits = menu.getProduits();
    var sequence = new Array();
    for (var i = 0; i < produits.length; i++) {
        produits[i] = connexion.getProduitById(produits[i]);
        produits[i].setCategorie(connexion.getCategorieById(produits[i].getCategorie()));
    }
    function compare(a, b) {
        if (a.id_categorie.priorite < b.id_categorie.priorite)
            return -1;
        if (a.id_categorie.priorite > b.id_categorie.priorite)
            return 1;
        return 0;
    }
    produits.sort(compare);
    productsInMenu = produits;
    productsChoosecInMenu = produits.constructor(); //Clone var
    $("#choose_menu_item_produits").html("");
    $("#menu_content_id").append('<button id="choose_menu_valider_menu" onclick="addMenuToTicket(' + id + ');" class="choose_menu_valider_menu">Valider</button>');
    for (i = 0; i < produits.length; i++) {
        $("#choose_menu_item_produits").append('<li id="choose_menu_item_' + produits[i].getId() + '" class="choose_menu_item">          \n\
  <div id="choose_menu_item_' + produits[i].getId() + '" class="">              \n\
  <p class="choose_menu_item_titre">' + produits[i].getNom() + '</p>           \n\
    \n\       \n\
<input type="button" id="choose_menu_item_button_' + produits[i].getId() + '" onclick="chooseProductInThisMenu(' + produits[i].getId() + ');" value="+"></input>\n\
 </div>        </li>');
    }
}
/**
 * This function is for choose a product of an menu
 * @param {type} id
 * @returns {undefined}
 */
function chooseProductInThisMenu(id) {
    var test = ($('#choose_menu_item_button_' + id).val());
    if (test == "+") {
        var connexion = getConnexion();
        var idCategorie = connexion.getProduitById(id).getCategorie();
        for (i = 0; i < productsInMenu.length; i++) {
            if ((idCategorie == productsInMenu[i].getCategorie().getId()) && (productsInMenu[i].getId() != id)) {
                $("#choose_menu_item_" + productsInMenu[i].getId()).hide();
                productsChoosecInMenu.splice(i, 1);
            }
        }
        var test = ($('#choose_menu_item_button_' + id).val("-"));
    } else {
        var connexion = getConnexion();
        var idCategorie = connexion.getProduitById(id).getCategorie();
        for (i = 0; i < productsInMenu.length; i++) {
            if ((idCategorie == productsInMenu[i].getCategorie().getId()) && (productsInMenu[i].getId() != id)) {
                $("#choose_menu_item_" + productsInMenu[i].getId()).show();
                productsChoosecInMenu.splice(i, 0, productsInMenu[i]);
            }
        }
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
    }
    var connexion = getConnexion();
    var menu = connexion.getMenuById(id);
    var qop = currentTicket.getQuantityOfProduct();
    var qopToShow;
    if (qop == null) {
        qopToShow = new QuantityOfProduct(1, menu, 1);
        qop = new Array(qopToShow);
        currentTicket.setQuantityOfProduct(qop);
        first = true;
    } else {
        first = false;
        qopToShow = new QuantityOfProduct(qop.length, menu, 1);
        currentTicket.setNewQuantityOfProduct(qopToShow);
    }
    $("#content_produit_btn_right_id_" + id).val(qopToShow.getQuantity());
//    updateTicket(qopToShow);
    gestionAffichageTVA(currentTicket.calculerTotal());
}
/**
 * Delete a choosed menu
 * @param {type} id
 * @returns {undefined}
 */
function lessMenu(id) {
    if (currentTicket != null) {
        var connexion = getConnexion();
        var produit = connexion.getMenuById(id);
        var qop = currentTicket.getQuantityOfProduct();
        var qopToShow;
        if (qop == null) {
            showInfoMessage("Vous ne pouvez pas supprimer ce produit.");
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
    } else {
        showInfoMessage("Vous ne pouvez pas supprimer ce produit.");
    }
}
/**
 * this function allows to print products for slide animation
 * @param {int} index of first categorie to show
 * @returns {undefined}
 */
function printProduits(index) {
    var isActive = "";
    inRecapitulatif = true;
    $("#menu_or_card").html('<div id="slides_wrap_id" class="slides_wrap wrap"></div>');
    $("#slides_wrap_id").append('\
<div id="categorieMenu" style="height: 100%; width: 100%; " class="img_slide slide ' + isActive + '" ><div>');
    $("#categorieMenu").append('<ul id="menus_id" class="menus"></ul><div id="choose_menu_id" class="choose_menu"><ul id="choose_menu_items_id" class="choose_menu_items">    </ul>    <div class="choose_commandes">    </div></div>');
    var connexion = new ConnexionLocal();
    var menus = connexion.getMenus();
    for (i = 0; i < menus.length; i++) {
        $('#menus_id').append(' <li id="menu_item_id" class="menu_item">     \n\
   <div id="menu_content_id" class="menu_content"> \n\
<button id="menu_content_add_' + menus[i].getId() + '" onclick="detailMenu(' + menus[i].getId() + ')"></button> \n\
 \n\
<ul id="choose_menu_item_produits" class="choose_menu_item_produits"></ul>          \n\
 <img id="menu_content_photo_id" class="menu_content_photo"/>     \n\
       <p id="menu_content_titre_id" class="menu_content_titre">' + menus[i].getNom() + '</p>     \n\
       <p id="menu_content_prix_id" class="menu_content_prix">' + fntp(menus[i].getPrix()) + '</p>     \n\
   </div>    </li>');
    }
    var categories = connexion.getCategories();
    for (var i = 0; i < categories.length; i++) {
        var categorie = categories[i];
        var produits = connexion.getProduitByCategorie(categorie.getId());
        if (i == index) {
            isActive = "active";
        } else {
            isActive = "";
        }
        $("#slides_wrap_id").append('\
<div id="categorie' + categorie.getId() + '" style="height: 100%; width: 100%; " class="img_slide slide ' + isActive + '" ><ul id="content_global_zone__idcat_' + categorie.getId() + '" class="content_globlal_zone"></ul><div>');
        var quantity = "+";
        try {
            var qops = currentTicket.getQuantityOfProduct();
            for (j = 0; j < qops.length; j++) {
                var qop = currentTicket.getQuantityOfProduct()[j];
                if (qop.getProduit().getId() == produit.getId()) {
                    quantity = qop.getQuantity();
                }
            }
        } catch (e) {
//            console.log("pas de ticket");
        }
        for (x = 0; x < produits.length; x++) {
            var produit = produits[x];
            var idsIngredients = produit.getIdsIngredients();
            $('#content_global_zone__idcat_' + categorie.getId()).append('\
<li class="produitcat' + categorie.getId() + '_sscat' + produit.getSousCategorie() + '">      \n\
           <div id="content_produit_zone_id" class="content_produit_zone">     \n\ \n\
          <div id="content_produit_zone_left_id" class="content_produit_zone_left">\n\
<input onclick="lessProduit(' + produit.getId() + ');" value="-" type="button" id="content_produit_btn_left_id_' + produit.getId() + '" class="content_produit_btn_left"/></div>   \n\
             <div id="content_produit_zone_right_id" class="content_produit_zone_right">\n\
              <div class="btn_more__left"> \n\
<input onclick="addProduit(' + produit.getId() + ',false);" type="button" id="content_produit_btn_right_id_' + produit.getId() + '" value="' + quantity + '" class="content_produit_btn_right ' + produit.getId() + '"/></div></div>   \n\
<p id="content_produit_zone_right_prix_id" class="content_produit_zone_right_prix">' + fntp(produit.getPrix()) + '</p>   \n\
 <p onclick="onTitreProduitClicked(' + produit.getId() + ');" id="content_produit_titre_id_' + produit.getId() + '" class="content_produit_titre">' + produit.getNom() + '</p>        \n\
            <ul id="content_produit_description_id_' + produit.getId() + '" style="display: none;" class="content_produit_description">      \n\
</ul></div></li>');
            try {
                for (j = 0; j < idsIngredients.length; j++) {
                    var ingredient = connexion.getIngredientById(idsIngredients[j]);
                    var nom = ingredient.getNom();
//                    if (j == idsIngredients.length - 1) {
//                        $("#content_produit_description_id_" + produit.getId()).append("<span><p>" + nom + "</span></li>  ");
//                    } else {
//                        $("#content_produit_description_id_" + produit.getId()).append("<span><p>" + nom + ",</span></li>  ");
//                    }
                }
            } catch (e) {
//console.log("Pas d'ingrédients");
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
        if ($("#btn_recapitulatif_commande_id").val() == "Récapitulatif de votre commande") {
            showTicket(0);
            inRecapitulatif = false;
            $("#menu_or_card").hide();
            $("#test").show();
            $("#titre_categorie_id").val("Récapitulatif de votre commande");
            $("#btn_recapitulatif_commande_id").val("La carte");
        } else {
            $("#menu_or_card").show();
            inRecapitulatif = true;
            $("#test").hide();
            $("#btn_recapitulatif_commande_id").val("Récapitulatif de votre commande");
        }

    } else {
        alert("Vous devez choisir au moins un produit.")
    }
}
/**
 * Print the "racapitulatif"
 * @param {type} qop
 * @returns {undefined}
 */
function showTicket(qop) {
    onClickCategorie(catAreShow);
    $('#test').html("");
    if (currentTicket != null) {
        var quantityOfProducts = currentTicket.getQuantityOfProduct();
        for (i = 0; i < quantityOfProducts.length; i++) {
            var quantityOfProduct = quantityOfProducts[i];
            var demanderCuisson = "  <select class=\"selectCuisson\"><option>Bleu</option><option>Saignant</option><option>A point</option><option>Bien cuit</option></select>"
            if (quantityOfProduct.getProduit().getDemanderCuisson() != true) {
                demanderCuisson = "";
            }
            console.log("quantityOfProduct.getId()" + quantityOfProduct.getId());
            try {
                $('#test').append('<li>      \n\
           <div id=content_produit_zone_recap_id_' + quantityOfProduct.getProduit().getId() + '" class="content_produit_zone"> \n\
 ' + demanderCuisson + '    \n\
          <div id="content_produit_zone_left_id" class="content_produit_zone_left">\n\
<input onclick="lessProduit(' + quantityOfProduct.getProduit().getId() + ');" value="-" type="button" id="content_produit_btn_left_id_recap_' + quantityOfProduct.getProduit().getId() + '" class="content_produit_btn_left"/></div>   \n\
             <div id="content_produit_zone_right_id" class="content_produit_zone_right">\n\
              <p id="content_produit_zone_right_prix_id" class="content_produit_zone_right_prix">' + fntp(quantityOfProduct.getProduit().getPrix()) + '</p><input onclick="addProduit(' + quantityOfProduct.getId() + ',true);" type="button" id="content_produit_btn_right_id_recap_' + quantityOfProduct.getId() + '" value="' + quantityOfProduct.getQuantity() + '" class="content_produit_btn_right"/></div>   \n\
             <div id="content_produit_id" class="content_produit">                \n\
    <p onclick="onRecapitulatifProduitClicked(' + quantityOfProduct.getProduit().getId() + ',' + quantityOfProduct.getId() + ');" id="content_produit_titre_id_' + quantityOfProduct.getProduit().getId() + '" class="content_produit_titre">' + quantityOfProduct.getProduit().getNom() + '</p>        \n\
            <ul id="content_produit_description_recap_id_' + quantityOfProduct.getId() + '" class="content_produit_description">       \n\
                                     </ul>                </div>        </li>');
            } catch (e) {
                $('#choose_menu_items_id').html("");
                $('#choose_menu_items_id').append('<li>      \n\
                 <div id=content_produit_zone_recap_id_' + quantityOfProduct.getProduit().getId() + '" class="content_produit_zone"> \n\
' + demanderCuisson + ' \n\
                 <div id="content_produit_zone_left_id" class="content_produit_zone_left">\n\
                 <input onclick="lessProduit(' + quantityOfProduct.getProduit().getId() + ');" value="-" type="button" id="content_produit_btn_left_id_recap_' + quantityOfProduct.getProduit().getId() + '" class="content_produit_btn_left"/></div>   \n\
                 <div id="content_produit_zone_right_id" class="content_produit_zone_right">\n\
                 <p id="content_produit_zone_right_prix_id" class="content_produit_zone_right_prix">' + fntp(quantityOfProduct.getProduit().getPrix()) + '</p><input onclick="addProduit(' + quantityOfProduct.getId() + ',true);" type="button" id="content_produit_btn_right_id_recap_' + quantityOfProduct.getId() + '" value="' + quantityOfProduct.getQuantity() + '" class="content_produit_btn_right"/></div>   \n\
                 <div id="content_produit_id" class="content_produit">                \n\
                 <p onclick="onRecapitulatifProduitClicked(' + quantityOfProduct.getProduit().getId() + ');" id="content_produit_titre_id_' + quantityOfProduct.getProduit().getId() + '" class="content_produit_titre">' + quantityOfProduct.getProduit().getNom() + '</p>        \n\
                 <ul id="content_produit_description_recap_id_' + quantityOfProduct.getId() + '" class="content_produit_description">       \n\
                 </ul>                </div>        </li>');
            }
        }
    }

    gestionAffichageTVA(currentTicket.calculerTotal());
}
function createCookie(name, value, days) {
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        var expires = "; expires=" + date.toGMTString();
    }
    else
        var expires = "";
    document.cookie = name + "=" + value + expires + "; path=/";
}

function readCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ')
            c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0)
            return c.substring(nameEQ.length, c.length);
    }
    return null;
}

function eraseCookie(name) {
    createCookie(name, "", -1);
}
var idQop = "";
function onRecapitulatifProduitClicked(produitID, qopid) {
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
        var connexion = new ConnexionLocal();
        var produit;
        for (var i = 0; i < qops.length; i++) {
            if (qops[i].getId() == qopid) {
                produit = qops[i].getProduit();
                break;
            }
        }
        var ingredients = new Array();
        var inngredientArray = produit.getIdsIngredients();
        $("#content_produit_description_recap_id_" + qopid).html("");
        var description = $("#content_produit_description_recap_id_" + qopid);
        description.append('<li><a id="ing_' + ingredient + '_prod_' + produitID + '" \n\
onclick="ajouterIngredient(' + produitID + ',' + qopid + ');">Ajouter</a></li>');
        for (var i = 0; i < inngredientArray.length; i++) {
            if (inngredientArray[i].inStart == true || inngredientArray[i].isAdded == true) {
                var ingredient = connexion.getIngredientById(inngredientArray[i].ingredient);
                ingredients.push(ingredient);
                $("#content_produit_description_recap_id_" + qopid).append("<li id=\"ing_" + ingredient.getId() + "_prod_" + produitID + "\" onclick=\"blockIngredient(" + produitID + "," + ingredient.getId() + ");\">" + ingredient.getNom() + "</li>");
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
        var produit = connexion.getProduitById(produitID);
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
            alert("Vous ne pouvez pas supprimer cet ingrédient.");
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
        modal.attr("class", "ajouter_ingredient_box");
        modal.show();
        modal.append("<a onclick='fermerAjouterIngredients();'>Fermer</a>");
        var connexion = new ConnexionLocal();
        var produit = connexion.getProduitById(produitID);
        var ingredients = produit.getIdsIngredients();
        var ul = $("#modal_add_liste");
        for (var i = 0; i < ingredients.length; i++) {
            if (ingredients[i].inStart == false) {
                var ingredient = connexion.getIngredientById(ingredients[i].ingredient);
                ul.append("<li>");
                ul.append(ingredient.getNom());
                ul.append(" " + fntp(ingredients[i].surcout) + " ");
                ul.append("<a onclick='onclickItemAjouterIngredient(" + produitID + "," + ingredient.getId() + "," + qopid + ");'> Ajouter</a>");
                ul.append("</li>");
            }
        }
    } else {
        $("body").append('<div id="modal_add_ingredient"><ul id="modal_add_liste"></ul></div>');
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
                    lessQuantityById(qopid);
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
                        var ing = connexion.getIngredientById(qops[i].product.ids_ingredients[j].ingredient);
                        $("#content_produit_description_recap_id_" + qops[i].getId()).append("<li id=\"ing_" + qops[i].product.ids_ingredients[j].ingredient + "_prod_" + qops[i].product.getId() + "\" onclick=\"blockIngredient(" + produitID + "," + ingredientid + ");\">" + ing.getNom() + "</li>");
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
function whereIngredientAddedAddOfpItem(oldId, newQop) {

    var quantityOfProduct = newQop;

    console.log(quantityOfProduct);
    var demanderCuisson = "  <select class=\"selectCuisson\"><option>Bleu</option><option>Saignant</option><option>A point</option><option>Bien cuit</option></select>"
    if (quantityOfProduct.getProduit().getDemanderCuisson() != true) {
        demanderCuisson = "";
    }
    console.log("quantityOfProduct.getId()" + quantityOfProduct.getId());
    try {
//        $('<li>      \n\
//           <div id=content_produit_zone_recap_id_' + quantityOfProduct.getProduit().getId() + '" class="content_produit_zone"> \n\
// ' + demanderCuisson + '    \n\
//          <div id="content_produit_zone_left_id" class="content_produit_zone_left">\n\
//<input onclick="lessProduit(' + quantityOfProduct.getProduit().getId() + ');" value="-" type="button" id="content_produit_btn_left_id_recap_' + quantityOfProduct.getProduit().getId() + '" class="content_produit_btn_left"/></div>   \n\
//             <div id="content_produit_zone_right_id" class="content_produit_zone_right">\n\
//              <p id="content_produit_zone_right_prix_id" class="content_produit_zone_right_prix">' + fntp(quantityOfProduct.getProduit().getPrix()) + '</p><input onclick="addProduit(' + quantityOfProduct.getId() + ',true);" type="button" id="content_produit_btn_right_id_recap_' + quantityOfProduct.getId() + '" value="' + quantityOfProduct.getQuantity() + '" class="content_produit_btn_right"/></div>   \n\
//             <div id="content_produit_id" class="content_produit">                \n\
//    <p onclick="onRecapitulatifProduitClicked(' + quantityOfProduct.getProduit().getId() + ',' + quantityOfProduct.getId() + ');" id="content_produit_titre_id_' + quantityOfProduct.getProduit().getId() + '" class="content_produit_titre">' + quantityOfProduct.getProduit().getNom() + '</p>        \n\
//            <ul id="content_produit_description_recap_id_' + quantityOfProduct.getId() + '" class="content_produit_description">       \n\
//                                     </ul>                </div>        </li>').insertAfter($('#test li:nth-child('+quantityOfProduct.length-1+')'));
        $('#test').append('<li>      \n\
           <div id=content_produit_zone_recap_id_' + quantityOfProduct.getProduit().getId() + '" class="content_produit_zone"> \n\
 ' + demanderCuisson + '    \n\
          <div id="content_produit_zone_left_id" class="content_produit_zone_left">\n\
<input onclick="lessProduit(' + quantityOfProduct.getProduit().getId() + ');" value="-" type="button" id="content_produit_btn_left_id_recap_' + quantityOfProduct.getProduit().getId() + '" class="content_produit_btn_left"/></div>   \n\
             <div id="content_produit_zone_right_id" class="content_produit_zone_right">\n\
              <p id="content_produit_zone_right_prix_id" class="content_produit_zone_right_prix">' + fntp(quantityOfProduct.getProduit().getPrix()) + '</p><input onclick="addProduit(' + quantityOfProduct.getId() + ',true);" type="button" id="content_produit_btn_right_id_recap_' + quantityOfProduct.getId() + '" value="' + quantityOfProduct.getQuantity() + '" class="content_produit_btn_right"/></div>   \n\
             <div id="content_produit_id" class="content_produit">                \n\
    <p onclick="onRecapitulatifProduitClicked(' + quantityOfProduct.getProduit().getId() + ',' + quantityOfProduct.getId() + ');" id="content_produit_titre_id_' + quantityOfProduct.getProduit().getId() + '" class="content_produit_titre">' + quantityOfProduct.getProduit().getNom() + '</p>        \n\
            <ul id="content_produit_description_recap_id_' + quantityOfProduct.getId() + '" class="content_produit_description">       \n\
                                     </ul>                </div>        </li>');
    } catch (e) {
        $('#choose_menu_items_id').html("");
        $('#choose_menu_items_id').append('<li>      \n\
                 <div id=content_produit_zone_recap_id_' + quantityOfProduct.getProduit().getId() + '" class="content_produit_zone"> \n\
' + demanderCuisson + ' \n\
                 <div id="content_produit_zone_left_id" class="content_produit_zone_left">\n\
                 <input onclick="lessProduit(' + quantityOfProduct.getProduit().getId() + ');" value="-" type="button" id="content_produit_btn_left_id_recap_' + quantityOfProduct.getProduit().getId() + '" class="content_produit_btn_left"/></div>   \n\
                 <div id="content_produit_zone_right_id" class="content_produit_zone_right">\n\
                 <p id="content_produit_zone_right_prix_id" class="content_produit_zone_right_prix">' + fntp(quantityOfProduct.getProduit().getPrix()) + '</p><input onclick="addProduit(' + quantityOfProduct.getId() + ',true);" type="button" id="content_produit_btn_right_id_recap_' + quantityOfProduct.getId() + '" value="' + quantityOfProduct.getQuantity() + '" class="content_produit_btn_right"/></div>   \n\
                 <div id="content_produit_id" class="content_produit">                \n\
                 <p onclick="onRecapitulatifProduitClicked(' + quantityOfProduct.getProduit().getId() + ');" id="content_produit_titre_id_' + quantityOfProduct.getProduit().getId() + '" class="content_produit_titre">' + quantityOfProduct.getProduit().getNom() + '</p>        \n\
                 <ul id="content_produit_description_recap_id_' + quantityOfProduct.getId() + '" class="content_produit_description">       \n\
                 </ul>                </div>        </li>');
//                $('<li>      \n\
//           <div id=content_produit_zone_recap_id_' + quantityOfProduct.getProduit().getId() + '" class="content_produit_zone"> \n\
// ' + demanderCuisson + '    \n\
//          <div id="content_produit_zone_left_id" class="content_produit_zone_left">\n\
//<input onclick="lessProduit(' + quantityOfProduct.getProduit().getId() + ');" value="-" type="button" id="content_produit_btn_left_id_recap_' + quantityOfProduct.getProduit().getId() + '" class="content_produit_btn_left"/></div>   \n\
//             <div id="content_produit_zone_right_id" class="content_produit_zone_right">\n\
//              <p id="content_produit_zone_right_prix_id" class="content_produit_zone_right_prix">' + fntp(quantityOfProduct.getProduit().getPrix()) + '</p><input onclick="addProduit(' + quantityOfProduct.getId() + ',true);" type="button" id="content_produit_btn_right_id_recap_' + quantityOfProduct.getId() + '" value="' + quantityOfProduct.getQuantity() + '" class="content_produit_btn_right"/></div>   \n\
//             <div id="content_produit_id" class="content_produit">                \n\
//    <p onclick="onRecapitulatifProduitClicked(' + quantityOfProduct.getProduit().getId() + ',' + quantityOfProduct.getId() + ');" id="content_produit_titre_id_' + quantityOfProduct.getProduit().getId() + '" class="content_produit_titre">' + quantityOfProduct.getProduit().getNom() + '</p>        \n\
//            <ul id="content_produit_description_recap_id_' + quantityOfProduct.getId() + '" class="content_produit_description">       \n\
//                                     </ul>                </div>        </li>').insertAfter($('#choose_menu_items_id li:nth-child('+quantityOfProduct.length-1+')'));

    }
    onRecapitulatifProduitClicked(newQop.getProduit().getId(), newQop.getId());
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
function onTitreProduitClicked(produitID) {
//    if (idProduitTITRE == "") {
//        $("#content_produit_description_id_" + produitID).css("display", "block");
//        var connexion = new ConnexionLocal();
//        var produit = connexion.getProduitById(produitID);
//        var ingredients = new Array();
//        var inngredientArray = produit.getIdsIngredients();
//        $("#content_produit_description_id_" + produitID).html("");
//        for (var i = 0; i < inngredientArray.length; i++) {
//            var ingredient = connexion.getIngredientById(inngredientArray[i]);
//            ingredients.push(ingredient);
//            $("#content_produit_description_id_" + idProduitTITRE).append("<li id=\"ing_" + ingredient.getId() + "_prod_" + produitID + "\" >" + ingredient.getNom() + "</li>");
//        }
//        idProduitTITRE = produitID;
//    } else if (produitID == idProduit) {
//        $("#content_produit_description_id_" + idProduitTITRE).html("");
//        $("#content_produit_description_id_" + idProduitTITRE).css("display", "none");
//        idProduitTITRE = "";
//    } else if (produitID != idProduit) {
//        $("#content_produit_description_id_" + idProduitTITRE).html("");
//        $("#content_produit_description_id_" + idProduitTITRE).css("display", "none");
//        $("#content_produit_description_id_" + produitID).css("display", "block");
//        var connexion = new ConnexionLocal();
//        var produit = connexion.getProduitById(produitID);
//        var ingredients = new Array();
//        var inngredientArray = produit.getIdsIngredients();
//        $("#content_produit_description_id_" + produitID).html("");
//        for (var i = 0; i < inngredientArray.length; i++) {
//            var ingredient = connexion.getIngredientById(inngredientArray[i]);
//            ingredients.push(ingredient);
//            $("#content_produit_description_id_" + produitID).append("<li id=\"ing_" + ingredient.getId() + "_prod_" + produitID + "\" >" + ingredient.getNom() + "</li>");
//        }
//        idProduitTITRE = produitID;
//    }
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
