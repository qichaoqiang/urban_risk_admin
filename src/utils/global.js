export let getQueryString = function (name) {
  var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i')
  var r = window.location.search.substr(1).match(reg)
  if (r != null) {
    return unescape(r[2])
  }
  return null
}

export let Terminal = {
  // 辨别移动终端类型
  platform : function () {
    var u = navigator.userAgent, app = navigator.appVersion;
    return {
        // android终端或者uc浏览器
        android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1,
        // 是否为iPhone或者QQHD浏览器
        iPhone: u.indexOf('iPhone') > -1 ,
        // 是否iPad
        iPad: u.indexOf('iPad') > -1,
        weixin: u.indexOf('MicroMessenger') > -1
    };
  }(),
  // 辨别移动终端的语言：zh-cn、en-us、ko-kr、ja-jp...
  language : (navigator.browserLanguage || navigator.language).toLowerCase()
}

let ua = navigator.userAgent

export const isWechat = function () {
  return ua.indexOf("MicroMessenger") > -1
}

export const isIOS = function () {
  return !!ua.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)
}

export const isAndroid = function () {
  return ua.indexOf('Android') > -1 || ua.indexOf('Linux') > -1
}

export const test = {}

export let config = {
  // IM即时通信的 key
  IMAppKey: '7cb7efab05029f8c18576aa98a9cce96',
  // 高德地图的 key
  amapKey: '54f7b2ff0b18deaefc0fd1925e434ead',
  // 网易云盾的 key
  captchaId: '542ca0c104ea48ffb746c922d27cdc5c',
  // 神策正式地址
  SC_server_prod_url: 'https://sensors-api.caishuiyu.com/sa?project=tax',
  // 神策测试地址
  SC_server_sit_url: 'https://sensors-api.caishuiyu.com/sa?project=default',
}

// 自动生成script标签
export const getScript = (url, callback) => {
    let head = document.getElementsByTagName('head')[0],
        js = document.createElement('script');

    js.setAttribute('type', 'text/javascript');
    js.setAttribute('src', url);

    head.appendChild(js);

    let callbackFn = function(){
        if(typeof callback === 'function'){
            callback();
        }
    }
    js.onload = function() {
        callbackFn();
    }
}