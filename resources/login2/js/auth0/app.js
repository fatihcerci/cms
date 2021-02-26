var options = {
    theme: {
        logo: 'css/images/logo.png',
        primaryColor: '#1f2641'
    },
    languageDictionary: {
        title: "IMPERA PE"
    },
    auth: {
        params: { scope: 'openid email' } //Details: https://auth0.com/docs/scopes
    },
    language: 'tr',
    socialButtonStyle: 'small'
}

$(document).ready(function() {

    var lock = new Auth0Lock(AUTH0_CLIENT_ID, AUTH0_DOMAIN, options);

    $('.btn-login').click(function(e) {
        e.preventDefault();
        lock.show();
    });


    lock.on("authenticated", function(authResult) {
        lock.getProfile(authResult.idToken, function(error, profile) {
            if (error) {
                // Handle error
                return;
            }
            localStorage.setItem('id_token', authResult.idToken);
            // Display user information
            show_profile_info(profile);
        });
    });

    //retrieve the profile:
    var retrieve_profile = function() {
        var id_token = localStorage.getItem('id_token');
        if (id_token) {
            lock.getProfile(id_token, function(err, profile) {
                if (err) {
                    return alert('There was an error getting the profile: ' + err.message);
                }
                // Display user information
                show_profile_info(profile);
            });
        }
    };

    var show_profile_info = function(profile) {
        localStorage.setItem('profile_name', profile.name);
        localStorage.setItem('profile_email', profile.email);
        window.location.href = "/main.html";
    };



    retrieve_profile();
});