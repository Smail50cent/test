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

    $.get('./service/generatedForm/InscriptionForm.php', function(data) {
        $('#auth_form_id').html(data);
        var buttonValider = getButtonInscriFormUser();
        $('#auth_form_id').append(buttonValider);
    }, "text");
}

function facebookAuth() {
    scripts.loadScripts("lib.social", function() {
        window.setTimeout(function() {
            SNLogin("AVFB");
        }, 500);
    });
}
function twitterAuth() {


}
function googleAuth() {


}

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