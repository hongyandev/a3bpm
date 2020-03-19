$(function () {
    config({
        // jsApiList: ['biz.util.open','device.geolocation.get'], // 需要鉴权使用的jsapi
        onSuccess: function (userinfo) {
            //alert("just du it!");
            var DanWeiBH = JSON.parse($.fn.cookie('DanWei')).DanWeiBH || userinfo.DanWeiBH;

            let quest = GetRequest();
            let BianHao = quest.bh;

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
            let data={
                DanWeiBH: DanWeiBH,//"GLZZ201905240001",
                BianHao:BianHao
            };
            fetch(Global.baseUrl + '/bpm/zczn/detail', {
                method: 'post',
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(res => res.json())
                .then(json => {
                    console.info(json);
                    if(json.msgCode=='1'){
                        if(json.ZhiChuZN){
                            $("#content").html(json.ZhiChuZN)
                        }else{
                            $("#content").parents().removeClass('card');
                            $("#content").removeClass('card-content-inner').addClass('empty').html('此内容为空')
                        }

                    }
                });
        }
    });

});