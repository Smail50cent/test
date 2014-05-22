/*
 * 
 */

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
            FacebookLogin();
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
            if (paramapps[i].valeur_parametre == true) {
                alert(paramapps[i].nom_parametre);
                var html = (paramapps[i].nom_parametre)();
                $('auth_form_id').append(html);
            }
        }
    }
}