define(['dingtalk'], function (dd) {
    return {
        baseUrl: "http://wxdev.hongyancloud.com:8082",
        h5Url: "http://wxdev.hongyancloud.com:8082",
        appKey: "ding8ywkbdogt114zxlc",
        gov: true,
        jsApi: function (options) {
            var auth = !(options.jsApiList == null || options.length === 0);
            var self = this;
            $.get(self.baseUrl + "/bpm/dingtalk/jsapi/config?appkey=" + self.appKey + "&auth=" + auth, function (res) {
                if (res.code === 200) {
                    _config = res.data;
                    if (auth) {
                        if (gov) {
                            dd.authConfig({
                                ticket: _config.ticket,
                                jsApiList: options.jsApiList || []
                            })
                        } else {
                            dd.config({
                                agentId: _config.agentId,
                                corpId: _config.corpId,
                                timeStamp: _config.timeStamp,
                                nonceStr: _config.nonceStr,
                                signature: _config.signature,
                                jsApiList: options.jsApiList || []
                            });
                        }
                    }
                    dd.error(function (err) {
                        alert('dd error:' + JSON.stringify(err));
                    })
                    if ($.fn.cookie('userinfo') && JSON.parse($.fn.cookie('userinfo')).userid) {
                        self.getUser(JSON.parse($.fn.cookie('userinfo')).userid, options.onSuccess)
                    } else {
                        dd.ready(function () {
                            dd.runtime.permission.requestAuthCode({
                                corpId: _config.corpId,
                                onSuccess: function (info) {
                                    $.ajax({
                                        url: self.baseUrl + '/bpm/dingtalk/jsapi/userinfo?code=' + info.code + '&appkey=' + self.appKey,
                                        type: 'GET',
                                        async: false,
                                        success: function (res) {
                                            if (res.code === 200) { // 成功获取userid
                                                self.getUser(res.data.userid, options.onSuccess);
                                            }
                                        },
                                        error: function (request, error) {
                                            alert(JSON.stringify(error))
                                        }
                                    })
                                },
                                onFail: function (err) {
                                    alert('requestAuthCodeOnFail: ' + JSON.stringify(err));
                                }
                            });
                        });
                    }
                }
            })
        },
        getUser: function (userid, onSuccess) {
            var self = this;
            $.ajax({
                type: 'post',
                url: self.baseUrl + '/bpm/user/bind',
                contentType: 'application/json',
                async: false,
                data: JSON.stringify({userId: userid, appKey: self.appKey}),
                success: function (res) {
                    if (res.code === 200) {
                        $.fn.cookie('userinfo',JSON.stringify(res.data));
                        if (onSuccess){
                            onSuccess(res.data);
                        }
                    } else {
                        document.location.href = self.h5Url + "/bpmh5/userBind.html?userid=" + userid + "&url=" + document.location.href;
                    }
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                }
            })
        }
    }
})