$(function () {
    var appkey = Global.appKey;
    var userid = _userinfo.userid;
    var loginid = $("#userId").val();
    var password = $("#password").val();
    $("#submitBtn").on("click",function () {
        $.ajax({
            url:Global.baseUrl + '/bpm/user/bind',
            type:'post',
            data:{
                appKey:appkey,
                userId:userid,
                loginId:loginid,
                password:password
            },
            success:function (res) {

            }
        })
    })

})