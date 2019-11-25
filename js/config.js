var getUser = function (userid, onSuccess) {
    $.ajax({
        type: 'post',
        url: Global.baseUrl + '/bpm/user/bind',
        contentType: 'application/json',
        async: false,
        data: JSON.stringify({userId: userid, appKey: Global.appKey}),
        success: function (res) {
            if (res.code === 200) {
                _userinfo = res.data;
                $.fn.cookie('userinfo',JSON.stringify(_userinfo));
                console.info(JSON.stringify(_userinfo));
                if (onSuccess){
                    onSuccess(res.data);
                }
            } else {
                document.location.href = Global.h5Url + "/bpmh5/userBind.html?userid=" + userid + "&url=" + document.location.href;
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
        }
    });
}
var config = function (options) {
    var auth = !(options.jsApiList === null || options.jsApiList === undefined || options.jsApiList.length === 0);
    $.get(Global.baseUrl + "/bpm/dingtalk/jsapi/config?appkey=" + Global.appKey + "&auth=" + auth, function (res) {
        if (res.code === 200) {
            _config = res.data;
            if (auth) {
                dd.config({
                    agentId: _config.agentId,
                    corpId: _config.corpId,
                    timeStamp: _config.timeStamp,
                    nonceStr: _config.nonceStr,
                    signature: _config.signature,
                    jsApiList: options.jsApiList || []
                });
            }
            dd.error(function (err) {
                alert('dd error: ' + JSON.stringify(err));
            });
            if (_userinfo && _userinfo.userid) {
                getUser(_userinfo.userid, options.onSuccess);
            } else {
                dd.ready(function () {
                    dd.runtime.permission.requestAuthCode({
                        corpId: _config.corpId,
                        onSuccess: function (info) {
                            $.ajax({
                                url: Global.baseUrl + '/bpm/dingtalk/jsapi/userinfo?code=' + info.code + '&appkey=' + Global.appKey,
                                type: 'GET',
                                async: false,
                                success: function (res) {
                                    if (res.code === 200) { // 成功获取userid
                                        getUser(res.data.userid, options.onSuccess);
                                    }
                                },
                                error: function (request, error) {
                                    alert(JSON.stringify(error));
                                }
                            });
                        },
                        onFail: function (err) {
                            alert('requestAuthCodeOnFail: ' + JSON.stringify(err));
                        }
                    });
                });
            }
        }
    })
};
var GetRequest = function () {
    var url = location.search; //获取url中"?"符后的字串
    var theRequest = new Object();
    if (url.indexOf("?") != -1) {
        var str = url.substr(1);
        var strs = str.split("&");
        for (var i = 0; i < strs.length; i++) {
            theRequest[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);
        }
    }
    return theRequest;
}
//根据参数部分和参数名来获取参数值
var getParamString = function (paraPart,name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = paraPart.substr(1).match(reg);
    if (r != null) return unescape(r[2]); return null;
}
var getParamFromUrl = function (name){
    var r = getParamString(window.location.search,name)
    return r
}
var Global = {
    baseUrl: "http://wxdev.hongyancloud.com:8082",
    h5Url: "http://wxdev.hongyancloud.com:9998",
    appKey: "ding8ywkbdogt114zxlc"
}
var _config, _userinfo, _request;
$(function () {
    _request = GetRequest();
    var cookie = $.fn.cookie('userinfo');
    // console.info(JSON.stringify(cookie));
    if (cookie) {
        _userinfo = JSON.parse(cookie);
    }
});