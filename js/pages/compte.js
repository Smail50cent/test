/*
 * 
 */

function onLoadCompte() {

    $('#auth_popup_id').dialog({autoOpen: true, modal: true});
    var html = getAuthCompte();
    $('#auth_compte_id').html(html);
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
        $('#auth_compte_id').html(data);
        var buttonValider = getButtonInscriFormUser();
        $('#auth_compte_id').append(buttonValider);
    }, "text");
}

function facebookAuth() {
    scripts.loadScripts("lib.social", function() {
       window.setTimeout(function (){
           FacebookLogin();
       },500);       
    });
}
function twitterAuth() {


}
function googleAuth() {


}
