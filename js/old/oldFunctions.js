function printByCategorie(id) {
    /*$("#menu_or_card").html('\n\<ul id="content_global_zone_id" class="content_globlal_zone" class="slide active">     </ul>');
     var connexion = new ConnexionLocal();
     var produits = connexion.getProduitByCategorie(id);
     var categorie = connexion.getCategorieById(id);
     var i = 0;
     for (i = 0; i < produits.length; i++) {
     var produit = produits[i];
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
     console.log("pas de ticket");
     }
     var idsIngredients = produit.getIdsIngredients();
     $('#content_global_zone_id').append('<li>      \n\
     <div id="content_produit_zone_id" class="content_produit_zone">      \n\
     <div id="content_produit_zone_left_id" class="content_produit_zone_left">\n\
     <input onclick="lessProduit(' + produit.getId() + ');" value="-" type="button" id="content_produit_btn_left_id_' + produit.getId() + '" class="content_produit_btn_left"/></div>   \n\
     <div id="content_produit_zone_right_id" class="content_produit_zone_right">\n\
     <div class="btn_more__left"> <input onclick="addProduit(' + produit.getId() + ');" type="button" id="content_produit_btn_right_id_' + produit.getId() + '" value="' + quantity + '" class="content_produit_btn_right"/></div></div>   \n\
     <div id="content_produit_id" class="content_produit">                \n\
     <p id="content_produit_zone_right_prix_id" class="content_produit_zone_right_prix">' + produit.getPrix() + '</p>   \n\
     <p id="content_produit_titre_id_' + produit.getId() + '" class="content_produit_titre">' + produit.getNom() + '</p>        \n\
     <ul id="content_produit_description_id_' + produit.getId() + '" class="content_produit_description">       \n\
     </ul>                </div>        </li>');
     try {
     for (j = 0; j < idsIngredients.length; j++) {
     var ingredient = connexion.getIngredientById(idsIngredients[j]);
     var nom = ingredient.getNom();
     if (j == idsIngredients.length - 1) {
     $("#content_produit_description_id_" + produit.getId()).append("<li><p>" + nom + "</p></li>  ");
     } else {
     $("#content_produit_description_id_" + produit.getId()).append("<li><p>" + nom + ",</p></li>  ");
     }
     }
     } catch (e) {
     console.log("Pas d'ingrédients");
     }
     }*/

}
function onLoadMenus() {
    var connexion = new ConnexionLocal();
    var menus = connexion.getMenus();
    for (i = 0; i < menus.length; i++) {
        $('#menus_id').append(' <li id="menu_item_id" class="menu_item">     \n\
   <div id="menu_content_id" class="menu_content"> \n\
<button id="menu_content_add_' + menus[i].getId() + '" onclick="detailMenu(' + menus[i].getId() + ')">+</button> \n\
 \n\<button  onclick="lessMenu(' + menus[i].getId() + ')">-</button>  \n\
<ul id="choose_menu_item_produits" class="choose_menu_item_produits"></ul>          \n\
 <img id="menu_content_photo_id" class="menu_content_photo"/>     \n\
       <p id="menu_content_titre_id" class="menu_content_titre">' + menus[i].getNom() + '</p>     \n\
       <p id="menu_content_prix_id" class="menu_content_prix">' + menus[i].getPrix() + '</p>     \n\
   </div>    </li>');
    }
}
/**
 * 
 * @param {type} qop
 * @returns {undefined}
 */
function updateTicket(qop) {
    $('#test').html("");
    var quantityOfProducts = currentTicket.getQuantityOfProduct();
    for (i = 0; i < quantityOfProducts.length; i++) {
        var quantityOfProduct = quantityOfProducts[i];
        try {
            $('#test').append('<li>      \n\
           <div id="content_produit_zone_id" class="content_produit_zone">      \n\
          <div id="content_produit_zone_left_id" class="content_produit_zone_left">\n\
<input onclick="lessProduit(' + quantityOfProduct.getProduit().getId() + ');" value="-" type="button" id="content_produit_btn_left_id_' + quantityOfProduct.getProduit().getId() + '" class="content_produit_btn_left"/></div>   \n\
             <div id="content_produit_zone_right_id" class="content_produit_zone_right">\n\
              <p id="content_produit_zone_right_prix_id" class="content_produit_zone_right_prix">' + quantityOfProduct.getProduit().getPrix() + '</p><input onclick="addProduit(' + quantityOfProduct.getProduit().getId() + ');" type="button" id="content_produit_btn_right_id_' + quantityOfProduct.getProduit().getId() + '" value="' + quantityOfProduct.getQuantity() + '" class="content_produit_btn_right"/></div>   \n\
             <div id="content_produit_id" class="content_produit">                \n\
    <p id="content_produit_titre_id_' + quantityOfProduct.getProduit().getId() + '" class="content_produit_titre">' + quantityOfProduct.getProduit().getNom() + '</p>        \n\
            <ul id="content_produit_description_id_' + quantityOfProduct.getProduit().getId() + '" class="content_produit_description">       \n\
                                     </ul>                </div>        </li>');
        } catch (e) {
            /*$('#choose_menu_items_id').html("");
             $('#choose_menu_items_id').append('<li>      \n\
             <div id="content_produit_zone_id" class="content_produit_zone">      \n\
             <div id="content_produit_zone_left_id" class="content_produit_zone_left">\n\
             <input onclick="lessProduit(' + quantityOfProduct.getProduit().getId() + ');" value="-" type="button" id="content_produit_btn_left_id_' + quantityOfProduct.getProduit().getId() + '" class="content_produit_btn_left"/></div>   \n\
             <div id="content_produit_zone_right_id" class="content_produit_zone_right">\n\
             <p id="content_produit_zone_right_prix_id" class="content_produit_zone_right_prix">' + quantityOfProduct.getProduit().getPrix() + '</p><input onclick="addProduit(' + quantityOfProduct.getProduit().getId() + ');" type="button" id="content_produit_btn_right_id_' + quantityOfProduct.getProduit().getId() + '" value="' + quantityOfProduct.getQuantity() + '" class="content_produit_btn_right"/></div>   \n\
             <div id="content_produit_id" class="content_produit">                \n\
             <p id="content_produit_titre_id_' + quantityOfProduct.getProduit().getId() + '" class="content_produit_titre">' + quantityOfProduct.getProduit().getNom() + '</p>        \n\
             <ul id="content_produit_description_id_' + quantityOfProduct.getProduit().getId() + '" class="content_produit_description">       \n\
             </ul>                </div>        </li>');*/
        }
    }
}
function gestionAffichageTVA(total) {
    $('#ticket_table_tva_id').html('<tr><td>Total</td> <td>' + formatNumberToPrint(total) + ' €</td></tr>');
}
/***
 
 
 //    var categories = connexion.getCategories(); //BDDDDDDDDDDDD
 connexion.getCategoriesForContentCategorie(printSlides);
 //        var produits = connexion.getProduitByCategorie(categorie.getId());//BDDDDDDDDDDDD
 
 function printSlides(categories) {
 for (var i = 0; i < categories.length; i++) {
 var categorie = categories[i];
 //        console.log("cat=" + categorie.getId());
 if (categorie.getId() - 1 == index) {
 isActive = "active";
 } else {
 isActive = "";
 }
 //        console.log('catid=' + categorie.getId());
 $("#slides_wrap_id").append('\
 <div id="categorie' + categorie.getId() + '" style="height: 100%; width: 100%; " class="img_slide slide ' + isActive + '" ><ul id="content_global_zone__idcat_' + categorie.getId() + '" class="content_globlal_zone"></ul><div>');
 
 }
 for (var i = 0; i < categories.length; i++) {
 var categorie = categories[i];
 connexion.getProduitByIdCategorieForPrintProduits(printProduitByCategorie, categorie.getId());
 }
 
 }     */

var demanderCuissonSelectBox = "<select class=\"selectCuisson\"><option>Bleu</option><option>Saignant</option><option>A point</option><option>Bien cuit</option></select>";
if (qop.getProduit().getDemanderCuisson() != true) {
    demanderCuissonSelectBox = "";
}
$('#recapitulatif_liste_id').append('<li id="ticket_item_' + qop.getId() + '">      \n\
           <div id=content_produit_zone_recap_id_' + qop.getProduit().getId() + '" class="content_produit_zone"> \n\
 ' + demanderCuissonSelectBox + '    \n\
          <div id="content_produit_zone_left_id" class="content_produit_zone_left">\n\
<input onclick="lessProduit(' + qop.getId() + ',true);" value="-" type="button" id="content_produit_btn_left_id_recap_' + qop.getProduit().getId() + '" class="content_produit_btn_left"/></div>   \n\
             <div id="content_produit_zone_right_id" class="content_produit_zone_right">\n\
              <p id="content_produit_zone_right_prix_id" class="content_produit_zone_right_prix">' + fntp(qop.getProduit().getPrix()) + '</p><input onclick="addProduit(' + qop.getId() + ',true);" type="button" id="content_produit_btn_right_id_recap_' + qop.getId() + '" value="' + qop.getQuantity() + '" class="content_produit_btn_right"/></div>   \n\
             <div id="content_produit_id" class="content_produit">                \n\
    <p onclick="onRecapitulatifProduitClicked(' + qop.getProduit().getId() + ',' + qop.getId() + ');" id="content_produit_titre_id_' + qop.getProduit().getId() + '" class="content_produit_titre">' + qop.getProduit().getNom() + '</p>        \n\
            <ul id="content_produit_description_recap_id_' + qop.getId() + '" class="content_produit_description">       \n\
                                     </ul>                </div>        </li>');