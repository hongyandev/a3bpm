$(function () {
    $("#submitBtn").on("click", function () {
        $.ajax({
            url: Global.baseUrl + '/bpm/user/bind',
            type: 'post',
            data: JSON.stringify({
                appKey: Global.appKey,
                userId: _request.userid,
                loginId: $("#userId").val(),
                password: $("#password").val()
            }),
            success: function (res) {
                window.location.href = "applyLists.html";
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                window.location.href = "applyLists.html";
            }
        })
    })
})