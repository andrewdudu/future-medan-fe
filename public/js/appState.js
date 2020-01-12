let accessToken;

const APP_URL = 'http://127.0.0.1:8080/future-medan'

const api = axios.create({
    baseURL: `${APP_URL}/api`,
    timeout: 5000
})

function goBack() {
    window.history.back();
}

Number.prototype.format = function(n, x, s, c) {
    var re = '\\d(?=(\\d{' + (x || 3) + '})+' + (n > 0 ? '\\D' : '$') + ')',
        num = this.toFixed(Math.max(0, ~~n));
    
    return (c ? num.replace('.', c) : num).replace(new RegExp(re, 'g'), '$&' + (s || ','));
};

async function validateAdminToken(token, callback) {
    if (getCookie() !== null) {
        try {
            let response = await api.post('/validate-admin-token', {}, {
                headers: {
                    "Authorization": "Bearer " + token
                }
            });
    
        } catch (err) {
            callback(err)
        }
    }
}

async function validateMerchantToken(token, callback) {
    if (getCookie() !== null) {
        try {
            let response = await api.post('/validate-merchant-token', {}, {
                headers: {
                    "Authorization": "Bearer " + token
                }
            });
        } catch (err) {
            callback(err)
        }
    }
}

async function validateUserToken(token, callback) {
    if (getCookie() !== null) {
        try {
            let response = await api.post('/validate-user-token', {}, {
                headers: {
                    "Authorization": "Bearer " + token
                }
            });
    
        } catch (err) {
            callback(err)
        }
    }
}

function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires="+d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

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

// DECODE TOKEN
function decodeToken(cookie) {
    let b64DecodeUnicode = str =>
            decodeURIComponent(
                Array.prototype.map.call(atob(str), c =>
                '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
                ).join(''))

    let parseJwt = token =>
        JSON.parse(
            b64DecodeUnicode(
            token.split('.')[1].replace('-', '+').replace('_', '/')
            )
        )
    
    return JSON.parse(JSON.stringify(parseJwt(cookie)))
}

// ADD COOKIE USER
function addUserCookie(username, nickname, email) {
    setCookie("nickname", nickname, 1)
    setCookie("username", username, 1)
    setCookie("email", email, 1)
}

// REMOVE ALL COOKIE
function removeUserCookie() {
    setCookie("nickname", null, 1)
    setCookie("username", null, 1)
    setCookie("email", null, 1)
    setCookie("access-token", null, 0)
}

// CHECK COOKIE EXPIRES
function checkCookie(cname) {
    let cookie = getCookie(cname)
    
    if (cookie != '') {
        let value = decodeToken(cookie)
        console.log(value)

        logOut()
    }
}

// LOG OUT
function logOut() {
    removeUserCookie()
    window.location.href = '/'
}
