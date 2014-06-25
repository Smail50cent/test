/**
 *
 * @author Hamza Legdani <hamza.legdani@gmail.com>
 */
var listePersonnes = new Array();
var methodToLoadAfter;
function onLoadCompte(showVisiteurs, titre, topvalue, method) {//To DO an object
    methodToLoadAfter = method;
    var htmlDialog = getDialogAccesCompte();
    $("body").append(htmlDialog);
    $("head").append("<style>.ui-dialog{        top: " + topvalue + "em !important;  }</style>");
    scripts.loadScripts("lib.dialog", function() {
        $('#auth_popup_id').dialog({autoOpen: true, modal: true});
        var html = getAuthCompte();
        if (titre != null) {
            $('#nbr_personne_id').html(titre);
        }
        var htmllang = paramValue(html, "pseudo", strings.getString("label.auth.pseudo"));
        htmllang = paramValue(htmllang, "mdp", strings.getString("label.password"));
        htmllang = paramValue(htmllang, "connect", strings.getString("label.auth.login"));
        htmllang = paramValue(htmllang, "subscribe", strings.getString("label.auth.inscription"));
        htmllang = paramValue(htmllang, "visitor", strings.getString("label.auth.visitor"));
        htmllang = paramValue(htmllang, "prenomv", strings.getString("label.prenom"));
        htmllang = paramValue(htmllang, "nomv", strings.getString("label.nom"));
        htmllang = paramValue(htmllang, "valider", strings.getString("label.valider"));
        $('#auth_form_id').html(htmllang);
        if (showVisiteurs == false) {
            $("#vclient_form_id").remove();
        }
        socialNetworkButtonAuth();
    });
}
function authenCompte() {
    if (!TestEmptyFields("#client_form_id")) {
        scripts.loadScripts("lib.crypt", function() {
            var logval = $('input[id^="compte_login_id"]').val();
            var passval = $('input[id^="compte_pass_id"]').val();
            var cryptedpass = SHA512(passval);
            var connexion = getConnexion();
            connexion.getAttributsComptesByEmail(fromEmail, logval);
            var personne = new Personne();
            function fromEmail(data) {
                if (data != null) {
                    var idcompte = data.id_compte;
                    connexion.getCompteById(verifpass, data.id_compte);
                    function verifpass(compte) {
                        if (compte.password === cryptedpass) {
                            connexion.getAttributCompteByIdCompte(allinfos, idcompte);
                            function allinfos(infos) {
                                for (var j = 0; j < infos.length; j++) {
                                    if (infos[j].id_form == 1) {
                                        personne.setGender(infos[j].valeur_champ);
                                    } else if (infos[j].id_form == 2) {
                                        personne.setPrenom(infos[j].valeur_champ);
                                    } else if (infos[j].id_form == 3) {
                                        personne.setNom(infos[j].valeur_champ);
                                    } else if (infos[j].id_form == 7) {
                                        personne.setEmail(infos[j].valeur_champ);
                                    }
                                }
                                personne.setId(idcompte);
                                listePersonnes.push(personne);
                                setLocalStorageValue("personnes.couverts", JSON.stringify(listePersonnes));
                                if(methodToLoadAfter !=null){
                                    methodToLoadAfter();
                                }
                                $('#auth_popup_id').dialog("close");
                                $("#auth_popup_id").remove();

                            }
                        } else {
                            showErrorMessage(strings.getString("label.connexion.error.mdp"));
                        }
                    }
                } else {
                    showErrorMessage(strings.getString("label.connexion.error.login"));
                }

            }
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
        var generform = getGeneratedInscriForm();
        var generformhtml = paramValue(generform, "label.password", strings.getString("label.password"));
        generformhtml = paramValue(generformhtml, "label.sexe", strings.getString("label.sexe"));
        generformhtml = paramValue(generformhtml, "label.nom", strings.getString("label.nom"));
        generformhtml = paramValue(generformhtml, "label.prenom", strings.getString("label.prenom"));
        generformhtml = paramValue(generformhtml, "label.adresse", strings.getString("label.adresse"));
        generformhtml = paramValue(generformhtml, "label.email", strings.getString("label.email"));
        generformhtml = paramValue(generformhtml, "label.tel", strings.getString("label.tel"));
        var inscriform = getInscriFormUser();
        $('#auth_form_id').html(inscriform);
        $('#inscription_form_id').html(generformhtml);
        var buttonValider = getButtonInscriFormUser();
        $('#auth_form_id').append(buttonValider);
        var buttonretour = getButtonBackToAuth();
        $('#auth_form_id').append(buttonretour);
        // Event for input File
        scripts.loadScripts("upload", function() {
            $('#photo_user_id').change(function() {
                onChooseImage();
            });
        });
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
                    connexion.addCompte(InsertFromLastId, cryptedpass, 4);
                    function InsertFromLastId(LastId) {
                        connexion.addAttributCompte(1, $('#sexe_user_id').val(), 1, LastId);
                        connexion.addAttributCompte(2, $('#nom_user_id').val(), 1, LastId);
                        connexion.addAttributCompte(3, $('#prenom_user_id').val(), 1, LastId);
                        connexion.addAttributCompte(4, $('#datenaissance_user_id').val(), 1, LastId);
                        connexion.addAttributCompte(5, $('#adresse_user_id').val(), 1, LastId);
                        connexion.addAttributCompte(6, $('#tel_user_id').val(), 1, LastId);
                        connexion.addAttributCompte(7, $('#email_user_id').val(), 1, LastId);
                        connexion.addAttributCompte(8, $('#photo_user_id')[0].files[0].name, 1, LastId);
                        uploadImage();
                        var personne = new Personne();
                        personne.setId(LastId);
                        personne.setGender($('#sexe_user_id').val());
                        personne.setNom($('#nom_user_id').val());
                        personne.setPrenom($('#prenom_user_id').val());
                        personne.setUrlProfileImg($('#photo_user_id')[0].files[0].name);
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
function uploadImage() {
    var fd = new FormData(document.getElementById("inscription_form_id"));
    fd.append("label", "WEBUPLOAD");
    $.ajax({
        url: "./service/generatedForm/uploadimg/processupload.php",
        type: "POST",
        data: fd,
        enctype: 'multipart/form-data',
        processData: false, // tell jQuery not to process the data
        contentType: false   // tell jQuery not to set contentType
    });
}
function AjoutVisiteur() {
    if (!TestEmptyFields("#vclient_form_id")) {
        scripts.loadScripts("lib.social", function() {
            var nom = $('input[id^="vclient_nom_id"]').val();
            var prenom = $('input[id^="vclient_prenom_id"]').val();
            var personne = new Personne();
            var connexion = getConnexion();
            connexion.addCompte(InsertFromLastId, "Visiteur", 3);
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
        $('#auth_compte_id input[type="text"] , #auth_compte_id input[type="password"], #auth_form_id input[type="text"], #auth_form_id input[type="date"], #auth_form_id input[type="file"], #auth_form_id input[type="email"], #auth_form_id input[type="tel"], #auth_form_id textarea, #auth_form_id input[type="password"]').val('');
        window.setTimeout(function() {
            var person = strings.getString("label.personne.auth");
            $('#nbr_personne_id').html(person + " n° " + (listePersonnes.length + 1));
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
/**
 *  personne.setId(personne.id);
    personne.setGender(personne.sexe);
    personne.setNom(personne.nom);
    personne.setPrenom(personne.prenom);
    personne.setUrlProfileImg(personne.imgprof);
    personne.setAdresse(personne.adresse);
    personne.setAdresse(personne.tel);
    personne.setEmail(personne.email);
 * @param {type} personne
 * @returns {undefined}
 */
function genericParse(personne) {
    personne.setId(personne.id);
    personne.setGender(personne.sexe);
    personne.setNom(personne.nom);
    personne.setPrenom(personne.prenom);
    personne.setUrlProfileImg(personne.imgprof);
    personne.setAdresse(personne.adresse);
    personne.setAdresse(personne.tel);
    personne.setEmail(personne.email);
}