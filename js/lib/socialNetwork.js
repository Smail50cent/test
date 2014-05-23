
function addPersonne(personne, dicriminent) {
    var connexion = getConnexion();
    if (!verifyEmail(personne.email)) {
        connexion.addCompte(InsertFromLastId, dicriminent);
        function InsertFromLastId(LastId) {
            connexion.addAttributCompte(1, personne.gender, 1, LastId);
            connexion.addAttributCompte(2, personne.nom, 1, LastId);
            connexion.addAttributCompte(3, personne.prenom, 1, LastId);
            connexion.addAttributCompte(7, personne.email, 1, LastId);
            getFacebookPhoto(connexion, LastId);
        }
    }
}

function SNLogin(typeRs) {
    switch (typeRs) {
        case ("AVFB") :
            {
                FB.login(function(response) {
                    if (response.authResponse)
                    {
                        getFacebookUserInfo(Infopersonne);
                        $('#auth_popup_id').dialog("close");
                        function Infopersonne(personne) {
                            listePersonnes.push(personne);
                            console.log(listePersonnes.length);
                            if (listePersonnes.length == $("#nbPersonnes").val()) {
                                startCommande($("#numTable").val(), $("#nbPersonnes").val());
                            } else {
                                window.setTimeout(function (){
                                    $('#auth_popup_id').dialog("open");
                                },500);
                                
                            }
                        }
                    } else
                    {
                        console.log('User cancelled login or did not fully authorize.');
                    }
                }, {scope: 'email,user_photos,user_videos'});
            }
    }
}

function getFacebookUserInfo(infopersonne) {

    FB.api('/me', function(response) {
        var fullname = response.name;
        var name = fullname.split(' '); // get Last and First Name
        var personne = new Personne();
        personne.setId(response.id);
        personne.setNom(name[0]);
        personne.setPrenom(name[1]);
        personne.setEmail(response.email);
        personne.setGender(response.gender);
        addPersonne(personne, "AVFB");

        infopersonne(personne);
    });
}

function getFacebookPhoto(connexion, lastId) {

    FB.api('/me/picture?type=normal', function(response) {
        connexion.addAttributCompte(8, response.data.url, 1, lastId);
    });
}

window.fbAsyncInit = function() {

    var appId = parseInt(config.getConfig("connexion.rs.facebook.appId"));
    FB.init({
        appId: appId, // App ID
        //channelUrl : 'channel.html', // Channel File
        status: true, // check login status
        cookie: true, // enable cookies to allow the server to access the session
        xfbml: true  // parse XFBML
    });

    FB.Event.subscribe('auth.authResponseChange', function(response)
    {
        if (response.status === 'connected')
        {
            $('#socialNetwork_message_id').html("Connected to Facebook");
            // CONNECTED
        }
        else if (response.status === 'not_authorized')
        {
            $('#socialNetwork_message_id').html("Failed to Connect");
            //FAILED
        } else
        {
            $('#socialNetwork_message_id').html("Logged Out");
            //UNKNOWN ERROR
        }
    });
};

function FacebookLogout()
{
    FB.logout(function() {
        document.location.reload();
    });
}

function verifyEmail(email) {

    var connexion = getConnexion();
    connexion.getAllAttributsComptes(verfEmail);

    function verfEmail(attcomptes) {
        found = false;
        for (var i = 0; i < attcomptes.length; i++) {
            if (attcomptes[i].valeur_champ === email) {
                found = true;
                break;
            }
        }
    }
    return found;
}