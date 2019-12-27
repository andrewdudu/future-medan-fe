let accessToken;

const APP_URL = 'http://127.0.0.1:8080/future-medan'

const api = axios.create({
    baseURL: `${APP_URL}/api`,
    timeout: 5000
})

// GO BACK PAGE
function goBack() {
    window.history.back();
}

// GET REQUEST PARAMETER
function get(name){
    if(name=(new RegExp('[?&]'+encodeURIComponent(name)+'=([^&]*)')).exec(location.search))
       return decodeURIComponent(name[1]);
}

Number.prototype.format = function(n, x, s, c) {
    var re = '\\d(?=(\\d{' + (x || 3) + '})+' + (n > 0 ? '\\D' : '$') + ')',
        num = this.toFixed(Math.max(0, ~~n));
    
    return (c ? num.replace('.', c) : num).replace(new RegExp(re, 'g'), '$&' + (s || ','));
};

// CHECK ADMIN
async function validateAdminToken(token, callback) {
    if (getCookie() !== null) {
        try {
            let response = await api.post('/validate-admin-token', {}, {
                headers: {
                    "Authorization": "Bearer " + token
                }
            });
            return true;
        }
        catch (err) {
            callback(err)
            return false;
        }
    }
    return false;
}

// CHECK MERCHANT
async function validateMerchantToken(token, callback) {
    if (getCookie() !== null) {
        try {
            let response = await api.post('/validate-merchant-token', {}, {
                headers: {
                    "Authorization": "Bearer " + token
                }
            });

            return true;
        }
        catch (err) {
            callback(err)
            return false;
        }
    }
    return false;
}

// CHECK USER
async function validateUserToken(token, callback) {
    if (getCookie() !== null) {
        try {
            let response = await api.post('/validate-user-token', {}, {
                headers: {
                    "Authorization": "Bearer " + token
                }
            });
    
            return false;
        }
        catch (err) {
            callback(err)
            return false;
        }
    }
    return false;
}

// ADD COOKIE
function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires="+d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

// GET COOKIE
function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
        c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
        }
    }
    return "";
}

// CHECK COOKIE
function checkCookie() {
    var user = getCookie("username");
    if (user != "") {
        alert("Welcome again " + user);
    } else {
        user = prompt("Please enter your name:", "");
        if (user != "" && user != null) {
        setCookie("username", user, 365);
        }
    }
}
