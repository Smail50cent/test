
scripts.loadScripts("gestionProduit", function() {
    $(function() {
        onLoadGP();
    });
    function onLoadGP() {
        $('#content_produit_zone_id').hide();
        $('#content_produit_zone_right_id').hide();
        alert("Load");
    }
});

