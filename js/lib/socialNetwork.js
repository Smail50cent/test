
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

function FacebookLogin()
{
    FB.login(function(response) {
        if (response.authResponse)
        {
            getFacebookUserInfo(info);
            function info(personne) {
                localStorage.setItem(personne.nom + " id", personne.id);
                localStorage.setItem(personne.nom + " nom", personne.nom);
                localStorage.setItem(personne.nom + " prenom", personne.prenom);
                localStorage.setItem(personne.nom + " email", personne.email);
                $('#auth_popup_id').dialog("close");
            }

        } else
        {
            console.log('User cancelled login or did not fully authorize.');
        }
    }, {scope: 'email,user_photos,user_videos'});


}

function getFacebookUserInfo(infopersonne) {


    FB.api('/me', function(response) {

        var fullname = response.name;
        var name = fullname.split(' '); // get Last and First Name

        var connexion = getConnexion();
        personne = new Personne();

        if (!verifyEmail(response.email)) {
            connexion.addCompte(InsertFromLastId, "AVFB");
            function InsertFromLastId(LastId) {
                connexion.addAttributCompte(1, response.gender, 1, LastId);
                connexion.addAttributCompte(2, name[1], 1, LastId);
                connexion.addAttributCompte(3, name[0], 1, LastId);
                connexion.addAttributCompte(7, response.email, 1, LastId);
                getFacebookPhoto(connexion, LastId);
            }
        }
        personne.setId(response.id);
        personne.setNom(name[0]);
        personne.setPrenom(name[1]);
        personne.setEmail(response.email);
        infopersonne(personne);
    });
}

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

function getFacebookPhoto(connexion, lastId) {

    FB.api('/me/picture?type=normal', function(response) {
        connexion.addAttributCompte(8, response.data.url, 1, lastId);
    });
}