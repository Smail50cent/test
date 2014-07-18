/**
 *
 * @author Damien Chesneau <contact@damienchesneau.fr>
 */

function onIndexLoaded() {
    var connexion = getConnexion();

    connexion.getAllTypeCommandes(function(typesCommandes, param) {
        for (var i = 0; i < typesCommandes.length; i++) {
            if (typesCommandes[i].isActif) {
                $("#" + typesCommandes[i].idInPageHtml).text(strings.getString(typesCommandes[i].labelMenu));
            } else {
                $("#" + typesCommandes[i].idInPageHtml).parent().remove();
            }
        }
        $("#indexLiServeurConnexion").text(strings.getString("label.index.li.accesserveur"));
    }, null);
    $("#select_entablissement_id").append("<option value=\"no\">"+strings.getString("label.option.choose.etablissement")+"</option>");
    connexion.getAllEtablissements(function(etab, param) {
        for (var i = 0; i < etab.length; i++) {
            $("#select_entablissement_id").append("<option value=" + etab [i].id + ">" + etab [i].nom + "</option>");
        }
    }, null);
    $("#select_entablissement_id").change(function() {
        var id = $(this).val();
        setLocalStorageValue("client.application.etablissement.id", id);
        getRedirict("index.php", null);
    });
}
  