$(function () {
    var data = GetRequest();
    var BianHao = data.bh;
   /* $.ajax({
        type:'POST',
        url: Global.baseUrl + 'bpm/tzgg/detail',
        contentType:'application/json',
        dataType: 'json',
        data:JSON.stringify({"BianHao":BianHao}),
        success:function (res) {
            console.info(res.msgCode)
        }
    })*/
    fetch(Global.baseUrl + '/bpm/tzgg/detail', {
        method: 'post',
        body: JSON.stringify({"BianHao":BianHao}),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(res => res.json())
        .then(json => {
            console.info(json);
            if(json.msgCode=='1'){
                $(".acTitle").html(json.detail.BiaoTi);
                $("#content").html(json.detail.NeiRong)
            }
        });
});