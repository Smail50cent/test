/*
 * 
 */
var listePersonnes = new Array();

function onLoadCompte() {
    $('#auth_popup_id').dialog({autoOpen: true, modal: true, position: 'top'});
    var html = getAuthCompte();
    $('#auth_form_id').html(html);
    socialNetworkButtonAuth();
}
function authenCompte() {
    if (!TestEmptyFields("#client_form_id")) {
        scripts.loadScripts("lib.crypt", function() {
            var logval = $('input[id^="compte_login_id"]').val();
            var passval = $('input[id^="compte_pass_id"]').val();
            //var cryptedpass = SHA512(passval);

            var connexion = getConnexion();
            connexion.getAllAttributsComptesByEmail(fromEmail,logval);
            //var personne = new Personne();
            function fromEmail(result){
                console.log("result : "+result);
            }
//            function fromEmail(attcompte) {
//                for (var i = 0; i < attcompte.length; i++) {
//                    if (attcompte[i].valeur_champ === logval) {
//                        var idcompte = attcompte[i].id_compte;
//                        connexion.getCompteById(verifpass, idcompte);
//                        function verifpass(comptes) {
//                            if (comptes.password === cryptedpass) {
//                                connexion.getAttributCompteByIdCompte(allinfos, idcompte);
//                                function allinfos(data) {
//                                    for (var j = 0; j < data.length; j++) {
//                                        if (data[j].id_form == 1) {
//                                            personne.setGender(data[j].valeur_champ);
//                                        } else if (data[j].id_form == 2) {
//                                            personne.setPrenom(data[j].valeur_champ);
//                                        } else if (data[j].id_form == 3) {
//                                            personne.setNom(data[j].valeur_champ);
//                                        } else if (data[j].id_form == 7) {
//                                            personne.setEmail(data[j].valeur_champ);
//                                        }
//                                    }
//                                    personne.setId(idcompte);
//                                    listePersonnes.push(personne);
//                                    setLocalStorageValue("personnes.couverts", JSON.stringify(listePersonnes));
//                                    $('#auth_popup_id').dialog("close");
//                                }
//                            } else {
//                                alert("Incorrect Login or Password");
//                            }
//                        }
//                    }
//                }
//            }
        });
    }

}

function InscriCompte() {
    $('#all_snbutton_id').hide();
    getHtmlFormInscription();
}
function getHtmlFormInscription() {
    var langselect = getLocalStorageValue("language");
    $.get("./service/generatedForm/InscriptionForm.php?lang=", {lang: langselect}, function() {
        var insciform = getGeneratedInscriForm();
        $('#auth_form_id').html(insciform);
        var buttonValider = getButtonInscriFormUser();
        $('#auth_form_id').append(buttonValider);
        var buttonretour = getButtonBackToAuth();
        $('#auth_form_id').append(buttonretour);
    });
}
function RetourAuth() {
    onLoadCompte();
}
function ValiderInscri() {
    if (!TestEmptyFields("#auth_form_id")) {
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
}
function AjoutVisiteur() {
    if (!TestEmptyFields("#vclient_form_id")) {
        var nom = $('input[id^="client_nom_id"]').val();
        var prenom = $('input[id^="client_prenom_id"]').val();
        var personne = new Personne();

        scripts.loadScripts("lib.social", function() {
            var connexion = getConnexion();
            connexion.addCompte(InsertFromLastId, "Visiteur");
            function InsertFromLastId(LastId) {
                connexion.addAttributCompte(2, nom, 1, LastId);
                connexion.addAttributCompte(3, prenom, 1, LastId);
                personne.setId(LastId);
                personne.setNom(nom);
                personne.setPrenom(prenom);
                listePersonnes.push(personne);
                setLocalStorageValue("personnes.couverts", JSON.stringify(listePersonnes));
                $('#auth_popup_id').dialog("close");
            }
        });
    }

}
function facebookAuth() {
    scripts.loadScripts("lib.social", function() {
        window.setTimeout(function() {
            SNLogin("AVFB");
        }, 500);
    });
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
        $('#all_snbutton_id').show();
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

function TestEmptyFields(field) {
    var empty = false;
    $(field + " input").each(function() {
        if ($(this).val() === "")
        {
            empty = true;
        }

    });
    if (empty) {
        alert("Remplissez tout les champs avant de valider !");
    }
    return empty;
}