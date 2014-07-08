

function onLoadGP() {

    $('.content_produit_zone_right_structure').empty();
    $('.content_produit_zone_left_structure').empty();

    var modifdiv = getDivModifProduit();
    $('.content_produit_zone_right_structure').append(modifdiv);
    var suppdiv = getDivSuppProduit();
    $('.content_produit_zone_left_structure').append(suppdiv);
}


