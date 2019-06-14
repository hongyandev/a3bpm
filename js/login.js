$(function () {
    $("#submitBtn").on("click", function () {
        $.ajax({
            url: Global.baseUrl + '/bpm/user/bind',
            type: 'post',
            data: {
                appKey: Global.appKey,
                userId: _request.userid,
                loginId: $("#userId").val(),
                password: $("#password").val()
            },
            success: function (res) {
                document.location.href = "applyLists.html";
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                document.location.href = "applyLists.html";
            }
        })
    })
})