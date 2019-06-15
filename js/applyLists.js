
$(function(){
    config({
        // jsApiList: ['biz.util.open','device.geolocation.get'], // 需要鉴权使用的jsapi
        onSuccess: function (userinfo) {
            //alert("just du it!");
           getData(userinfo.DanWeiBH,userinfo.YongHuBH);
        }
    });
    $('.weui-navbar__item').on('click', function () {
        $(this).addClass('weui-bar__item_on').siblings('.weui-bar__item_on').removeClass('weui-bar__item_on');
        getData();
    });
    //getData('BXBH201906130002','XTYH201905300002');
});

function getData(dwbh,yhbh) {
    $.ajax({
        type:'post',
        url: Global.baseUrl + '/bpm/tzgg/sydb',
        contentType:'application/json',
        data:JSON.stringify({"DanWeiBH":dwbh,"YongHuBH":yhbh,"PageRow":1}),
        success:function (res) {
            if(res.msgCode=='1'){
                var str="";
                $.each(res.list,function (index,val){
                    str+="<li>\n";
                        if(val.LeiXing=='1'){
                            str+="<a href='applyInformation.html?LiuChengId="+val.LiuChengId+"&BianHao="+val.BianHao+"'>"+
                                    "<i><span style='color:#1e90ff' class=\"iconfont\">&#xe721;</span></i>\n";
                        }else if(val.LeiXing=='2'){
                            str+="<a class='messages' href='messageDetail.html?LeiXing="+val.LeiXing+"&BianHao="+val.BianHao+"'>"+
                                 "<input type='hidden' time='"+val.ShenQingSJ+"' value='"+val.BiaoTi+"'>"+
                                 "<i><span style='color:#daa520' class=\"iconfont\">&#xe623;</span></i>\n";
                        }else if(val.LeiXing=='0'){
                            str+="<a href='messageDetail.html?LiuChengId="+val.LiuChengId+"&BianHao="+val.BianHao+"'>"+
                                "<i><span style='color:#00fa9a' class=\"iconfont\">&#xe640;</span></i>\n";
                        }else{
                            str+="<a href='javascript:void(0)'>"+
                                "<i><span style='color:#fa656b' class=\"iconfont\">&#xe6ce;</span></i>\n";
                        };
                        str+="     <div class=\"listsInfo\">\n" +
                            "       <h4>"+val.BiaoTi+"</h4>\n" +
                            "       <div class=\"clearfix\">\n" ;
                        if(val.ShenQingBM){
                            str+="<span class=\"fl\">"+val.ShenQingBM+" / "+val.ShenQingR+"</span>\n" ;
                        }
                        str+="                   <time class=\"fr\">"+val.ShenQingSJ+"</time>\n" +
                            "           </div>\n" +
                            "      </div>\n" +
                            "</a>"+
                            "</li>";
                });
                $("#lists").html(str);
                $(".messages").on("click",function () {
                    var time = $(this).children("input").attr("time");
                    var title = $(this).children("input").val();
                    var data ={
                        time:time,
                        title:title
                    };
                    $.fn.cookie('message',JSON.stringify(data));
                })
            }
        },
        error:function (XMLHttpRequest, textStatus, errorThrown) {
            
        }
    })
}