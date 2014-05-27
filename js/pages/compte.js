/*
 * 
 */
var listePersonnes = new Array();
function onLoadCompte() {

    $('#auth_popup_id').dialog({autoOpen: true, modal: true});
    var html = getAuthCompte();
    $('#auth_form_id').html(html);
    socialNetworkButtonAuth();
}
function authenCompte() {

    $("input[type='text']").each(function() {
        var connexion = getConnexion();
        connexion.getAllComptes(verifCompte);

        var logval = $('input[id^="compte_login_id"]').val();
        var passval = $('input[id^="compte_pass_id"]').val();

        find = false;
        function verifCompte(comptes) {
            for (var i = 0; i < comptes.length; i++) {
                if (comptes[i].login === logval && comptes[i].password === passval) {
                    find = true;
                }
            }
            if (find) {
                alert("Bienvenue");
            } else {
                alert("Login ou Mot de passe erroné !!!")
            }
        }
    });

}

function InscriCompte() {

    getHtmlFormInscription();
}
function getHtmlFormInscription() {

    var insciform = getGeneratedInscriForm();
    $('#auth_form_id').html(insciform);
    var buttonValider = getButtonInscriFormUser();
    $('#auth_form_id').append(buttonValider);

}
function ValiderInscri() {
    scripts.loadScripts("lib.social", function() {
        var connexion = getConnexion();
        scripts.loadScripts("lib.crypt", function() {
            var cryptedpass = SHA512($('#password_user_id').val());
            if (!verifyEmail($('#email_user_id').val())) {
                connexion.addCompte(InsertFromLastId, cryptedpass);
                function InsertFromLastId(LastId) {
                    connexion.addAttributCompte(1, $('#sexe_user_id').val(), 1, LastId);
                    connexion.addAttributCompte(2, $('#nom_user_id').val(), 1, LastId);
                    connexion.addAttributCompte(3, $('#prenom_user_id').val(), 1, LastId);
                    connexion.addAttributCompte(4, $('#datenaissance_user_id').val(), 1, LastId);
                    connexion.addAttributCompte(5, $('#adresse_user_id').val(), 1, LastId);
                    connexion.addAttributCompte(6, $('#tel_user_id').val(), 1, LastId);
                    connexion.addAttributCompte(7, $('#email_user_id').val(), 1, LastId);
                    connexion.addAttributCompte(8, $('#photo_user_id').val(), 1, LastId);

                    var personne = new Personne();
                    personne.setGender($('#sexe_user_id').val());
                    personne.setNom($('#nom_user_id').val());
                    personne.setPrenom($('#prenom_user_id').val());
                    personne.getUrlProfileImg($('#photo_user_id').val());
                    personne.setEmail($('#email_user_id').val());
                    listePersonnes.push(personne);

                    setLocalStorageValue("personnes.couverts", JSON.stringify(listePersonnes));
                    $('#auth_popup_id').dialog("close");

                }
            }
        });
    });
}
function AjoutVisiteur() {

    var fullname = $('input[id^="client_name_id"]').val();
    var personne = new Personne();
    personne.setNom(fullname);
    personne.setPrenom(fullname);
    listePersonnes.push(personne);

    setLocalStorageValue("personnes.couverts", JSON.stringify(listePersonnes));
    $('#auth_popup_id').dialog("close");

}
function facebookAuth() {
    scripts.loadScripts("lib.social", function() {
        window.setTimeout(function() {
            SNLogin("AVFB");
        }, 500);
    });
}
//function twitterAuth() {
//
//
//}
//function googleAuth() {
//
//
//}

function socialNetworkButtonAuth() {

    var connexion = getConnexion();
    connexion.getAllParamApps(enableButton);

    function enableButton(paramapps) {
        for (var i = 0; i < paramapps.length; i++) {
            if (paramapps[i].valeur_parametre == 1) {
                if (paramapps[i].nom_parametre === "Facebook") {
                    var html = getButtonFacebookAuth();
                    $('#button_facebook_id').html(html);
                } else if (paramapps[i].nom_parametre === "Twitter") {
                    var html = getButtonTwitterAuth();
                    $('#button_twitter_id').html(html);
                } else if (paramapps[i].nom_parametre === "Google+") {
                    var html = getButtonGoogleAuth();
                    $('#button_googleplus_id').html(html);
                }

            }
        }
    }
}

function AuthToCommande() {

    if (listePersonnes.length == $("#nbPersonnes").val()) {
        startCommande($("#numTable").val(), $("#nbPersonnes").val());
    } else {
        window.setTimeout(function() {
            $('#auth_popup_id').dialog("open");
        }, 500);

    }
}