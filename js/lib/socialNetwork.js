
window.fbAsyncInit = function() {
    FB.init({
        appId: '1496340477251539', // App ID
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
            getFacebookUserInfo();
        } else
        {
            console.log('User cancelled login or did not fully authorize.');
        }
    }, {scope: 'email,user_photos,user_videos'});


}

function getFacebookUserInfo() {
    FB.api('/me', function(response) {

        var fullname = response.name;
        var name = fullname.split(' '); // get Last and First Name

        var connexion = getConnexion();

        if (!verifyEmail(response.email)) {
            connexion.addCompte(InsertFromLastId, "AUFB");

            function InsertFromLastId(LastId) {

                connexion.addAttributCompte(1, response.gender, 1, LastId);
                connexion.addAttributCompte(2, name[1], 1, LastId);
                connexion.addAttributCompte(3, name[0], 1, LastId);
                connexion.addAttributCompte(7, response.email, 1, LastId);
                connexion.addAttributCompte(8, getFacebookPhoto(), 1, LastId);
            }
        }

    });
}
function getFacebookPhoto()
{

    FB.api('/me/picture?type=normal', function(response) {
        imgurl = response.data.url;
    });
    return imgurl;
}
function FacebookLogout()
{
    FB.logout(function() {
        document.location.reload();
    });
}

// Load the SDK asynchronously
(function(d) {
//    var js, id = 'facebook-jssdk', ref = d.getElementsByTagName('script')[0];
//    if (d.getElementById(id)) {
//        return;
//    }
//    js = d.createElement('script');
//    js.id = id;
//    js.async = true;
//    js.src = "//connect.facebook.net/en_US/all.js";
//    ref.parentNode.insertBefore(js, ref);
}(document));

function verifyEmail(email) {

    var connexion = getConnexion();
    connexion.getAllAttributsComptes(verfEmail);
    
    found = false;
    function verfEmail(attcomptes) {
        for (var i = 0; i < attcomptes.length; i++) {
            if (attcomptes[i].valeur_champ === email) {
                found = true;
                break;
            }
        }
    }
    alert(found);
    return found;
}