var Global = {
    baseUrl : "http://wxdev.hongyancloud.com:8082/a3bpm",
    appKey : "dingoe9bkbhog7ygthvb"
}
var _config = {};
var _userinfo = $.cookie('userinfo');
var config = function (options) {
    var auth = options.auth || false;
    $.getScript(Global.baseUrl + "/dingtalk/jsapi/config?appkey="+Global.appKey+"&auth="+auth, function () {
        if(auth){
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
        if(_userinfo && _userinfo.extattr && _userinfo.extattr.YongHuBH) {
            if(options.onSuccess){
                options.onSuccess(_userinfo);
            }
        } else {
            dd.ready(function () {
                dd.runtime.permission.requestAuthCode({
                    corpId: _config.corpId,
                    onSuccess: function (info) {
                        $.ajax({
                            url: Global.baseUrl + '/dingtalk/jsapi/userinfo?code=' + info.code + '&appkey=' + Global.appKey,
                            type: 'GET',
                            async: false,
                            success: function (res) {
                                alert(JSON.stringify(res.data));
                                $.cookie('userinfo', res.data);
                                if(res.data.extattr.YongHuBH){
                                    _userinfo = res.data;
                                    if(options.onSuccess){
                                        options.onSuccess(res.data);
                                    }
                                } else {
                                    // document.location.href = Global.baseUrl + "h5/userBind.html?url=" + document.location.href

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
    })
};
function GetRequest() {
    var url = location.search; //获取url中"?"符后的字串
    var theRequest = new Object();
    if(url.indexOf("?") != -1) {
        var str = url.substr(1);
        strs = str.split("&");
        for(var i = 0; i < strs.length; i++) {
            theRequest[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);
        }
    }
    return theRequest;
}