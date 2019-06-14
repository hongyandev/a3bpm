$(function () {
    config({
        // jsApiList: ['biz.util.open','device.geolocation.get'], // 需要鉴权使用的jsapi
        onSuccess: function (userinfo) {
            var appkey = Global.appKey;
            var userid = userinfo.userid;
            var loginid = $("#userId").val();
            var password = $("#password").val();
            $("#submitBtn").on("click",function () {
                $.ajax({
                    url:Global.baseUrl + '/bpm/user/bind',
                    type:'post',
                    data:{
                        appkey:appkey,
                        userid:userid,
                        loginId:loginid,
                        password:password
                    },
                    success:function (res) {

                    }
                })
            })
        }
    });

})