/**
 *
 * @author Damien Chesneau <contact@damienchesneau.fr>
 */
function onLoadPageConnexionServeur() {
    if (getSessionStorageValue("personnes.serveur") == null) {
        onLoadCompte(false, strings.getString("label.connexion.serveur.titre"), "0", function() {
            redirictWhereServeurConnected();
        }, true);
    } else {
        redirictWhereServeurConnected();
    }
}
