'use strict';

const script_domain = 'https://core-staging.jzjiv.com';
const client_id = '388279569961971';
const client_key = 'xQEgKLkGLqxqnPBj6QUFawplWA18nu';

const event_data_endpoint = script_domain + '/api/behavior/event/data';
const page_data_endpoint = script_domain + '/api/behavior/page/data';
const config_data_endpoint = script_domain + '/api/behavior/config/data';

//Setting the cookie with value
function setCookie(cname, cvalue, exdays) {
  // alert(1)
	var d = new Date();
	d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
	var expires = "expires=" + d.toUTCString();
	document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}
// 客户端信息存入Cookie, 请求接口调用时再取出并放到header
setCookie('clientId', client_id, 1);
setCookie('clientKey', client_key, 1);
//Get Cookie value
function getCookie(cname) {
	var name = cname + "=";
	var ca = document.cookie.split(';');
	for (var i = 0; i < ca.length; i++) {
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
//Checking if the Cookie exsit, generate one if none
function checkCookie() {
	var visitor = getCookie("ub_tracking");
	if (visitor != "") {
		return visitor;
	} else {
		var visitor_id = make_tracking_id();
		if (visitor_id != "" && visitor_id != null) {
			setCookie("ub_tracking", visitor_id, 365);
			return visitor_id;
		}
	}
}
//Get the currect server time
function currect_date_time() {
	var today = new Date();
	var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate() + ' ' + today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();	return date;
}

//Generating the tracking ID for cookie
function make_tracking_id(length = 10) {
	var result = '';
	var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
	var charactersLength = characters.length;
	for (var i = 0; i < length; i++) {
		result += characters.charAt(Math.floor(Math.random() * charactersLength));
	}
	return result;
}

//Sending data to api endpoint
function post_tracking_data(data_endpoint, json_data, clientId, clientKey) {
	// $.ajax({
	// 	url:data_endpoint,
	// 	data:JSON.stringify(json_data),
	// 	type:'POST',
	// 	headers:{
	// 		'Content-Type': 'application/json;charset=UTF-8',
	// 		'clientId': getCookie('clientId'),
	// 		'clientKey': getCookie('clientKey'),
	// 		'sourceUserId': getCookie('_source_user_id'),
	// 		'pageType':'0',
	// 		'clientBrowser': navigator.userAgent,
	// 		'clientBrowserLanguage':  navigator.language,
	// 		'clientOsPlatform':  navigator.platform,
	// 		'resolution':  screen.width + '*' + screen.height,
	// 	},
	// 	dataType:'json'
	// })
	var xhr = new XMLHttpRequest();
	xhr.open("POST", data_endpoint);
	xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
	xhr.setRequestHeader('clientId', getCookie('clientId'));
	xhr.setRequestHeader('clientKey', getCookie('clientKey'));
	xhr.setRequestHeader('sourceUserId', getCookie('_source_user_id'));
	xhr.setRequestHeader('pageType', '0');
	
	xhr.setRequestHeader('clientBrowser', navigator.userAgent);
	xhr.setRequestHeader('clientBrowserLanguage', navigator.language);
	xhr.setRequestHeader('clientOsPlatform', navigator.platform);
	xhr.setRequestHeader('resolution', screen.width + '*' + screen.height);
	
	xhr.send(JSON.stringify(json_data));
}

//访问信息
function visitor_information() {
	var current_visiting_url = window.location.href,
		visitor_from = document.referrer,
		visitor_browser = navigator.userAgent,
		visitor_browser_language = navigator.language,
		visitor_os_platform = navigator.platform;
		currect_date_time();
		var client_cookie_id = checkCookie(),
		
		//currect_domain = window.location.hostname,

		visitor_data = {
			pageType: 0, //页面类型：0-web，1-微信小程序
			pageUrl: current_visiting_url,
			cookie: client_cookie_id,
			pageFrom: visitor_from,
			clientBrowser: visitor_browser,
			clientBrowserLanguage: visitor_browser_language,
			clientOsPlatform: visitor_os_platform
		};

	console.log(visitor_data);
	
	post_tracking_data(page_data_endpoint, visitor_data);
	console.log('Data has been successfully logged');
	
	return visitor_data;
}

// 用户信息
async function user_tracking(sourceUserId, userName, userMobile, sex, region) {
	if(null == sourceUserId || '' == sourceUserId) {
		console.log('sourceUserId is null');
		return;
	}
	var user_data = {
		sourceUserId: sourceUserId,
		userName: userName,
		userMobile: userMobile,
		sex: sex,
		region: region,
		cookie: checkCookie()
	};
	
	setCookie('_source_user_id', sourceUserId, 1);
	
	console.log('Data has been successfully logged');
	post_tracking_data(config_data_endpoint, user_data);
}

// 事件
function event_tracking(eventCode, json_data) {
	if(undefined == json_data || '' == json_data) {
		console.log('json_data is null');
		return;
	}
	
	var client_cookie_id = checkCookie(),
		current_visiting_url = window.location.href,

		input_data = {
			pageType: 0, //页面类型：0-web，1-微信小程序
			pageUrl: current_visiting_url,
			cookie: client_cookie_id,
			eventCode: eventCode,
			jsonStr: JSON.stringify(json_data)
		};
	
	console.log(input_data);
	console.log('Data has been successfully logged');
	post_tracking_data(event_data_endpoint, input_data);
}


var oldHref = '';
setInterval(function() {
	if(oldHref == '' || oldHref != window.location.href) {
		oldHref = window.location.href;
		visitor_information();
	}
}, 150);
// 设置用户信息
function buryingUserSetting(data) {
	console.info('buryingUserSetting..........');
	console.info(data);

	if (undefined != data.sex) {
		data.sex = (1 == data.sex ? '男' : (2 == data.sex ? '女' : '未知'));
	}

	user_tracking(data.sourceUserId, data.userName, data.userMobile, data.sex, data
	.region); //sourceUserId, userName, userMobile, sex, region
}

// 埋点事件上报
function buryingEvent(eventCode, eventData) {
	console.info('buryingEvent..........');
	console.info("eventCode：" + eventCode);
	console.info(eventData);
	event_tracking(eventCode, eventData);
}

// 主动上报 pv 事件
function buryingPredefinePageView(current_visiting_url, visitor_from) {
	console.info('buryingPredefinePageView..........');
	visitor_information();
}