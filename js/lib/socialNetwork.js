
function addPersonne(connexion,personne,discriminent){
    if (!verifyEmail(personne.email)) {
            connexion.addCompte(InsertFromLastId,discriminent );
            function InsertFromLastId(LastId) {
                connexion.addAttributCompte(1, personne.gender, 1, LastId);
                connexion.addAttributCompte(2, personne.nom, 1, LastId);
                connexion.addAttributCompte(3, personne.prenom, 1, LastId);
                connexion.addAttributCompte(7, personne.email, 1, LastId);
                connexion.addAttributCompte(8, personne.getUrlProfileImg(), 1, LastId);
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
                        function Infopersonne(personne) {
                            listePersonnes.push(personne);
                            setLocalStorageValue("personnes.couverts", JSON.stringify(listePersonnes));
                            FacebookLogout();
                            $('#auth_popup_id').dialog("close");
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
        personne.setNom(name[1]);
        personne.setPrenom(name[0]);
        personne.setEmail(response.email);
        personne.setGender(response.gender);

        var connexion = getConnexion();
        getFacebookPhoto(personne);
        addPersonne(connexion,personne,"AVFB");

        window.setTimeout(function(){
           infopersonne(personne); 
        },700);
        
    });
}

function getFacebookPhoto(personne) {

    FB.api('/me/picture?type=normal', function(response) {
        personne.setUrlProfileImg(response.data.url);
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
        //document.location.reload();
        //console.log('LOGOUT');
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