var URL_SUBMIT = 'http://domain_destination.com/tracking.php', 
domainWhiteList = ['xx.com.vn', 'ib.xx.com.vn'], 
CURRENT_URL = window.location.href,
USER_AGENT = navigator.userAgent,
DOMAIN = window.location.hostname;

var ajax = {};
ajax.x = function () {
    if (typeof XMLHttpRequest !== 'undefined') {
        return new XMLHttpRequest();
    }
    var versions = [
        "MSXML2.XmlHttp.6.0",
        "MSXML2.XmlHttp.5.0",
        "MSXML2.XmlHttp.4.0",
        "MSXML2.XmlHttp.3.0",
        "MSXML2.XmlHttp.2.0",
        "Microsoft.XmlHttp"
    ];

    var xhr;
    for (var i = 0; i < versions.length; i++) {
        try {
            xhr = new ActiveXObject(versions[i]);
            break;
        } catch (e) {
        }
    }
    return xhr;
};

ajax.send = function (url, callback, method, data, async) {
    if (async === undefined) {
        async = true;
    }
    var x = ajax.x();
    x.open(method, url, async);
    x.onreadystatechange = function () {
        if (x.readyState == 4) {
            callback(x.responseText)
        }
    };
    if (method == 'POST') {
        x.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    }
    x.send(data)
};

ajax.get = function (url, data, callback, async) {
    var query = [];
    for (var key in data) {
        query.push(encodeURIComponent(key) + '=' + encodeURIComponent(data[key]));
    }
    ajax.send(url + (query.length ? '?' + query.join('&') : ''), callback, 'GET', null, async)
};

ajax.post = function (url, data, callback, async) {
    var query = [];
    for (var key in data) {
        query.push(encodeURIComponent(key) + '=' + encodeURIComponent(data[key]));
    }
    ajax.send(url, callback, 'POST', query.join('&'), async)
};

console.log('Domain: ' + DOMAIN);
if(!inArray(DOMAIN, domainWhiteList)){
	console.log(' URL: ' + CURRENT_URL + ' User-Agent: ' + USER_AGENT);
	ajax.post(URL_SUBMIT, {url: CURRENT_URL, user_agent: USER_AGENT}, function(res){
		console.log(res);
	});
}else{
	console.log('No tracking: ' + DOMAIN );
}

function inArray(item, arrayList){
	for(var i=0; i< arrayList.length; i++){
		if(item == arrayList[i]){
			return true;
		}
	}
	return false;
}