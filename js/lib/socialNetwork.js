
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

        $('#socialNetwork_userName_id').html(response.name);
        $('#socialNetwork_userLink_id').html(response.link);
        $('#socialNetwork_userUserName_id').html(response.username);
        $('#socialNetwork_userId_id').html(response.id);
        $('#socialNetwork_userEmail_id').html(response.email);
        getFacebookPhoto();
        var connexion = getConnexion();
        connexion.addAttributCompte(7,response.email,1,1);
    });
}
function getFacebookPhoto()
{
    FB.api('/me/picture?type=normal', function(response) {

        var html = getImageSocialNetworkUser();
        var srcpic = paramValue(html, "pic_url", response.data.url);
        $('#socialNetwork_profilPicture_id').html(srcpic);

    });

}
function FacebookLogout()
{
    FB.logout(function() {
        document.location.reload();
    });
}

// Load the SDK asynchronously
(function(d) {
    var js, id = 'facebook-jssdk', ref = d.getElementsByTagName('script')[0];
    if (d.getElementById(id)) {
        return;
    }
    js = d.createElement('script');
    js.id = id;
    js.async = true;
    js.src = "//connect.facebook.net/en_US/all.js";
    ref.parentNode.insertBefore(js, ref);
}(document));

