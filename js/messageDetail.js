$(function () {
    var objStr = $.fn.cookie('message');
    console.info(objStr);
    var obj = JSON.parse(objStr);
    $(".titles").html(obj.title);
    $(".times").html(obj.time);
    var data = GetRequest();
    var LeiXing= data.LeiXing;
    var BianHao = data.BianHao;
    $.ajax({
        type:'post',
        //url: Global.baseUrl + 'bpm/common/sysMUpdateState',
        url:"http://172.30.8.95:8082/bpm/common/sysMUpdateState",
        contentType:'application/json',
        data:JSON.stringify({"LeiXing":LeiXing,"BianHao":BianHao}),
        success:function (res) {
            console.info(res.msgCode)
        }
    })
});