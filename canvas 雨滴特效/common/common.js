'usr strict';

/**接口url*/
var URL = {
	http:'http://192.168.50.158:8080'
}
/**接口url*/


//var id_brand = getCookie("brandId");
//checkLogin(id_brand);

/**检查登录状态*/
function checkLogin(param){
	if(!param){
		window.location.href = 'login.html';
	}
}
/**检查登录状态*/

/**设置cookie*/
function setCookie(key,value,day){	//key value  为cookie键值 ，day为cookie存储时间 （天）
	var expiresdate = new Date();
	day==undefined? day=30:day=day
	expiresdate.setTime(expiresdate.getTime()+24*3600*1000*day)
	document.cookie = key + "=" + escape(value) + ";expires=" + expiresdate.toUTCString()
}
/**设置cookie*/

/**获取cookie*/
function getCookie(cname){		//参数为cookie键名
	var cookie = document.cookie.split(";")
	if(cookie.length>0){
		for(i=0;i<cookie.length;i++){
			ind_star = cookie[i].indexOf(cname+"=")
			if(ind_star!=-1){
				ind_star = ind_star+cname.length+1
				return cookie[i].substring(ind_star)
			}
		}
	}else{
		return ""
	}
}
/**获取cookie*/

/**删除cookie*/
function delCookie(cname){			//参数为cookie键名
	var cookie = document.cookie.split(";")
	for(i=0;i<cookie.length;i++){
		var endindex = cookie[i].indexOf("=")
		var cookname = cookie[i].substring(0,endindex)
		var cookkey = cookname.replace(/\s/g,"")		//去除字符串中空白
		if(cookkey == cname){
			var dat = new Date()
			dat.setTime(dat.getTime()-3600*24*1000)
			document.cookie = cookie[i]+";expires="+dat.toUTCString();
		}else{}
	}
}
/**删除cookie*/


// 时间戳转化
function formatNumber(n) {
    n = n.toString();
    return n[1] ? n : '0' + n;
}
function formatTime(number, format) {

    var formateArr = ['Y', 'M', 'D', 'h', 'm', 's'];
    var returnArr = [];

    //var date = new Date(number * 1000);	//	时间戳为秒
    var date = new Date(number);// 时间戳为毫秒
    returnArr.push(date.getFullYear());
    returnArr.push(formatNumber(date.getMonth() + 1));
    returnArr.push(formatNumber(date.getDate()));

    returnArr.push(formatNumber(date.getHours()));
    returnArr.push(formatNumber(date.getMinutes()));
    returnArr.push(formatNumber(date.getSeconds()));

    for (var i in returnArr) {
        format = format.replace(formateArr[i], returnArr[i]);
    }
    return format;
}
// 时间戳转化




var myapp = {
	
} 