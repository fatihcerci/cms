var token = sessionStorage.getItem("token");
if (token) window.location.href = "/peditorweb/main.html";
var environment = window.location.hostname === 'localhost' ? 'localhost' : "10.81.98.52";
var editorURL = "http://" + environment + ":8083";
$(function () {
    $('#btnLogin').click(function (e) {
        e.preventDefault();
        var browserCheck = isChrome();
        if (!browserCheck) {
            $('#loginMessage').text("Lütfen Google Chrome © son sürüm tarayıcı ile giriş yapınız!");
        } else {
            var username = $('#txtUsername').val();
            var password = $('#txtPassword').val();
            var data = {
                "username": username,
                "password": password
            };

            fetch(editorURL + '/api/v1/login', {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
                .then(function (response) {
                    return response.json()
                })
                .then(function (response) {
                    if (response && response.error === 0) {
                        sessionStorage.setItem("token", response.data.token);
                        sessionStorage.setItem("role", response.data.role);
                        sessionStorage.setItem("ip", response.data.ip);
						sessionStorage.setItem("dutyId", response.data.DUTYID);
                        sessionStorage.setItem("userName", response.data.userName);
                        window.location.href = "/peditorweb/main.html";
                    } else {
                        //console.log(response);
                        $('#loginMessage').text("Lütfen kullanıcı bilgilerinizi kontrol ediniz!");

                    }
                })
                .catch(function (error) {
                    $('#loginMessage').text("Bağlantı hatası oluştu. Lütfen yetkili kişiye bilgi veriniz!");
                    console.log(error);
                });
        }
    });

});


function isChrome() {
    var isChromium = window.chrome,
        winNav = window.navigator,
        vendorName = winNav.vendor,
        isOpera = winNav.userAgent.indexOf("OPR") > -1,
        isIEedge = winNav.userAgent.indexOf("Edge") > -1,
        isIOSChrome = winNav.userAgent.match("CriOS");

    if (isIOSChrome) {
        return true;
    } else if (
        isChromium !== null &&
        typeof isChromium !== "undefined" &&
        vendorName === "Google Inc." &&
        isOpera === false &&
        isIEedge === false
    ) {
        return true;
    } else {
        return false;
    }
}