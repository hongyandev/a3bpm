$(function () {
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
       DanWeiBH:"GLZZ201905240001",
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
});