var pageNum = 1;
var yhbh;
var flag = false;
function getData(yhbh,pageNum) {
    $.ajax({
        type:'post',
        url: Global.baseUrl + '/bpm/dbsp/dblist',
        contentType:'application/json',
        data:JSON.stringify({"YongHuBH":yhbh,"PageNum":pageNum,"LeiXing": "2","RowNum": 10/*Number.MAX_VALUE*/,}),
        success:function (res) {
            if(res.msgCode=='1'){
                var str="";
                $.each(res.list,function (index,val){
                    str+="<li>\n";
                    if(val.DanJuLeiXing=='1'){
                        str+="<a class='listItem' rwid='"+val.RenWuID+"' jd='"+val.DangQianJD+"' href='applyInformation.html?LiuChengId="+val.LiuChengId+"&BianHao="+val.DanJuBH+"&LeiXing="+val.LeiXing+"&RenWuID="+val.RenWuID+"&DangQianJD="+encodeURI(encodeURI(val.DangQianJD))+"&yb="+1+"'>"+
                            "<i><span style='color:#1e90ff' class=\"iconfont\">&#xe721;</span></i>\n";
                    }else if(val.DanJuLeiXing=='2'){
                        str+="<a class='zxApply' rwid='"+val.RenWuID+"' jd='"+val.DangQianJD+"' href='zxApplyInformation.html?LiuChengId="+val.LiuChengId+"&BianHao="+val.DanJuBH+"&LeiXing="+val.LeiXing+"&RenWuID="+val.RenWuID+"&DangQianJD="+encodeURI(encodeURI(val.DangQianJD))+"&yb="+1+"'>"+
                            "<i><span style='color:#34dbe4' class=\"iconfont\">&#xe637;</span></i>\n";
                    }else if(val.DanJuLeiXing=='3'){
                        str+="<a class='listItem' rwid='"+val.RenWuID+"' jd='"+val.DangQianJD+"' href='zjApplyInformation.html?LiuChengId="+val.LiuChengId+"&BianHao="+val.DanJuBH+"&LeiXing="+val.LeiXing+"&RenWuID="+val.RenWuID+"&DangQianJD="+encodeURI(encodeURI(val.DangQianJD))+"&yb="+1+"'>"+
                            "<i><span style='color:#fe75ff' class=\"iconfont\">&#xe653;</span></i>\n";
                    }/*else{
                            str+="<a href='javascript:void(0)'>"+
                                "<i><span style='color:#fa656b' class=\"iconfont\">&#xe6ce;</span></i>\n";
                        };*/
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
                $("#lists").append(str);
                if(res.list.length == 0){
                    flag = true
                }
                $(".messages").on("click",function () {
                    var time = $(this).children("input").attr("time");
                    var title = $(this).children("input").val();
                    var data ={
                        time:time,
                        title:title
                    };
                    $.fn.cookie('message',JSON.stringify(data));
                })
                $(".listItem").on("click",function () {
                    var jd = $(this).attr("jd");
                    var rwid = $(this).attr("rwid");
                    var dataStr ={
                        jd:jd,
                        rwid:rwid
                    };
                    $.fn.cookie('messStr',JSON.stringify(dataStr));
                })
                $(".zxApply").on("click",function () {
                    var jd = $(this).attr("jd");
                    var rwid = $(this).attr("rwid");
                    var dataStr ={
                        jd:jd,
                        rwid:rwid
                    };
                    $.fn.cookie('zxmessStr',JSON.stringify(dataStr));
                })
            }
        },
        error:function (XMLHttpRequest, textStatus, errorThrown) {

        }
    })
}
$(function(){
    (function () {
        var mybody = document.getElementsByTagName('body')[0];
        //滑动处理
        var startX, startY, moveEndX, moveEndY, X, Y;
        mybody.addEventListener('touchstart', function(e) {
            e.preventDefault();
            startX = e.touches[0].pageX;
            startY = e.touches[0].pageY;
        }, false);
        mybody.addEventListener('touchmove', function(e) {
            e.preventDefault();
            moveEndX = e.changedTouches[0].pageX;
            moveEndY = e.changedTouches[0].pageY;
            X = moveEndX - startX;
            Y = moveEndY - startY;

            if ( Math.abs(Y) > Math.abs(X) && Y < 0 ) {
                // 获取页面的可视高度
                var clientHeight = document.documentElement.clientHeight || document.body.clientHeight;
                //mybody.style.height = h + 'px';
                // 获取页面页面的滚动高度
                var scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight;
                // 获取页面滚动距离顶部的高度,  window.pageYOffse 兼容苹果
                var scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
                //alert("向上");
                console.info(scrollTop);
                if (scrollTop + clientHeight >= scrollHeight - 40) {
                    // 距离底部还有40的时候执行数据加载
                    if(flag){
                        weui.toast('已经到底了', {
                            duration: 3000,
                            className: '',
                            // callback: function(){ console.log('close') }
                        });

                        return;
                    }
                    getData(yhbh,pageNum++);
                }
            }

        });
    })();
    config({
        // jsApiList: ['biz.util.open','device.geolocation.get'], // 需要鉴权使用的jsapi
        onSuccess: function (userinfo) {
            //alert("just du it!");
            yhbh = userinfo.YongHuBH;
            getData(userinfo.YongHuBH, pageNum);
        }
    });
    //getData('BXBH201906130002','XTYH201905300002');
});

/*dd.ready(function() {
    var arr = [];
    console.info(JSON.stringify(_userinfo.YongHuDW));
    $.each(_userinfo.YongHuDW,function (i,o) {
       var json = {"id":o.BianHao,"text":o.MingCheng};
       arr.push(json);
    });
   console.info(JSON.stringify(arr));
    var str="";
    console.info(_userinfo.DanWeiBH);
    for(var i = 0;i<arr.length;i++){
        if(_userinfo.DanWeiBH == arr[i].id){
            str+="<li dwid='"+arr[i].id+"' class='active'><a href='javascript:void(0)'>"+arr[i].text+"</a></li>";
        }else{
            str+="<li dwid='"+arr[i].id+"'><a href='javascript:void(0)'>"+arr[i].text+"</a></li>";
        }
    }
    $(".dw").html(str);
    dd.biz.navigation.setTitle({
        title : $(".dw li.active").children().html(),//控制标题文本，空字符串表示显示默认文本
        onSuccess : function(result) {},
        onFail : function(err) {}
    });
    $(".dw li").on("click",function () {
        $(this).addClass('active').siblings().removeClass('active');
        getData($(this).attr('dwid'),_userinfo.YongHuBH);
        $.fn.cookie('ShenQingDW',$(this).attr('dwid'));

        $("#dialogDefined").hide();
        dd.biz.navigation.setTitle({
            title : $(".dw li.active").children().html(),//控制标题文本，空字符串表示显示默认文本
            onSuccess : function(result) {
            },
            onFail : function(err) {}
        });
    });

    console.info($(".dw li.active").children().html());

    dd.biz.navigation.setRight({
        show: true,//控制按钮显示， true 显示， false 隐藏， 默认true
        control: true,//是否控制点击事件，true 控制，false 不控制， 默认false
        text: '切换单位',//控制显示文本，空字符串表示显示默认文本
        onSuccess : function(result) {
            //如果control为true，则onSuccess将在发生按钮点击事件被回调
            if($('#dialogDefined').css("display") == "none"){
                $("#dialogDefined").show();
                var dialogH = $(".dialogInfo").height();
                $(".dialogInfo").css("margin-top",-dialogH/2);

            }else{
                $("#dialogDefined").hide();
            }

        },
        onFail : function(err) {}
    });
})*/

