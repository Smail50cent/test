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
}
  