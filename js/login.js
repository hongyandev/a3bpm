$(function () {
    $("#submitBtn").on("click", function () {
        $.ajax({
            url: Global.baseUrl + '/bpm/user/bind',
            type: 'post',
            contentType: 'application/json',
            data: JSON.stringify({
                appKey: Global.appKey,
                userId: _request.userid,
                loginId: $("#userId").val(),
                password: $("#password").val()
            }),
            success: function (res) {
                if(res.code == '200'){
                    window.location.href = "index.html";
                }else{
                    weui.topTips(res.msg);
                }

            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {

            }
        })
    })
})