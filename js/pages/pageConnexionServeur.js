/**
 *
 * @author Damien Chesneau <contact@damienchesneau.fr>
 */
function onLoadPageConnexionServeur() {
    onLoadCompte(false, strings.getString("label.connexion.serveur.titre"), "0", function() {
        redirictWhereServeurConnected();
    });
}
