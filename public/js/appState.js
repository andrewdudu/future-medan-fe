let accessToken;

const api = axios.create({
    baseURL: 'http://127.0.0.1:8080/future-medan/api',
    timeout: 5000
})

const APP_URL = 'http://localhost:8080/future-medan'

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

async function validateUserToken(token) {
    if (getCookie() !== null) {
        try {
            let response = await api.post('/validate-user-token', token);
    
        } catch (err) {
            window.location.href = '/login'
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
