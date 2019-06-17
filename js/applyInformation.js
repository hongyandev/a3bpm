function GetRequest() {
    var url = location.search; //获取url中"?"符后的字串
    var theRequest = new Object();
    if(url.indexOf("?") != -1) {
        var str = url.substr(1);
        strs = str.split("&");
        for(var i = 0; i < strs.length; i++) {
            theRequest[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);
        }
    }
    return theRequest;
}
var yhbh;
var fj;
var arr=[];
$(function () {
    config({
        // jsApiList: ['biz.util.open','device.geolocation.get'], // 需要鉴权使用的jsapi
        onSuccess: function (userinfo) {
            //alert("just du it!");
            yhbh = userinfo.YongHuBH
        }
    });
    var theRequest = GetRequest();
    var messObj = $.fn.cookie('messStr');
    var messStr = JSON.parse(messObj);
    $(".buttons-tab a").click(function(){
        $(this).addClass('active').siblings().removeClass('active');
        var idx=$(this).index();
        $(".tabs .tab").eq(idx).show().siblings().hide();
    });

    $.ajax({
        type:'post',
        url: Global.baseUrl + '/bpm/dbsp/detail',
        contentType:'application/json',
        data:JSON.stringify({"BianHao":theRequest.BianHao,"RenWuID":theRequest.RenWuID, "LiuChengId":theRequest.LiuChengId,"DangQianJD": theRequest.DangQianJD}),
        success:function (res) {
            //console.info(res);
            if(res.msgCode=='1'){
                $(".sqbt").html(res.DanJuXX.BaoXiaoSY);
                $(".sqje").html(res.DanJuXX.ShenQingJE.replace(/,/gi, ''));
                $(".DanWeiMC").html(res.DanJuXX.DanWeiMC);
                $(".BuMenMC").html(res.DanJuXX.BuMenMC);
                $(".bxr").html(res.DanJuXX.BaoXiaoBM);
                $(".zbmc").html(res.DanJuXX.ZhiBiaoMC);
                $(".kyye").html(res.DanJuXX.KeYongYE);
                $(".bxbm").html(res.DanJuXX.BaoXiaoBM);
                $(".bxr").html(res.DanJuXX.BaoXiaoR);
                $(".zcsx").html(res.DanJuXX.ZhiChuSX);
                $(".bxsy").html(res.DanJuXX.BaoXiaoSY);
                $("#sqbmbh").val(res.DanJuXX.ShenQingBMBH);
                $("#bxlx").val(res.DanJuXX.BaoXiaoDLX);
                var fjList='';
                if(res.DanJuXX.DanJuFJ.length>0){
                    $.each(res.DanJuXX.DanJuFJ,function (index,val){
                        fjList+="<li>\n" +
                            "     <div class=\"item-content\">\n" +
                            "          <div class=\"item-media\"><i class=\"icon icon-form-email\"></i></div>\n" +
                            "          <div class=\"item-inner\">\n" +
                            "               <a  href='"+val.FuJianLJ+"' download>"+val.FuJianMC+"</a>\n" +
                            "          </div>\n" +
                            "     </div>\n" +
                            "</li>"
                    });
                    $(".fjLists").html(fjList);
                }else{
                    $(".djfj").hide();
                }
                $(".bxje").html(res.DanJuXX.ShenQingJE);

                // 支出明细
                var str='';
                $.each(res.ZhiChuMX,function (index,val){
                    str+="<li>\n" +
                        "      <div class=\"item-content\">\n" +
                        "          <div class=\"item-media\"><i class=\"icon icon-form-email\"></i></div>\n" +
                        "          <div class=\"item-inner\">\n" +
                        "              <div class=\"item-title label\">"+val.MingXiMC+"</div>\n" +
                        "                  <div class=\"item-input\">\n" +
                        "                       <span>"+val.MingXiJE+"</span>\n" +
                        "                  </div>\n" +
                        "             </div>\n" +
                        "         </div>\n" +
                        "</li>"
                });
                $("#zcmx").html(str);
                $(".img img").attr("src",res.DanJuXX.LiuChengTuLJ);
                //审批
                var ysxx="";
                if(res.YaoSuXX.length>0){
                    $.erch(res.YaoSuXX,function (index,val) {
                        ysxx+="<li ysbh='"+val.BianHao+"'>\n" +
                            "      <div class=\"item-content\">\n" +
                            "         <div class=\"item-media\"><i class=\"icon icon-form-gender\"></i></div>\n" +
                            "            <div class=\"item-inner\">\n" +
                            "              <div class=\"item-title ys label\">"+val.YaoSuMC+"</div>\n" +
                            "              <div class=\"item-input\">\n" +
                            "                 <select class='selYs_"+index+"'>\n";
                                $.earch(val.YaoSuZ,function (i,o) {
                                        ysxx+="<option>"+o[i]+"</option>\n" ;
                                })
                                ysxx+="      </select>\n" +
                            "            </div>\n" +
                            "         </div>\n" +
                            "      </div>\n" +
                            "</li>"
                    })
                }
                $(".ysXX").html(ysxx);

               var liList=$(".ysXX li");
               if(liList.length>0){
                   for(var i=0;i<liList.length ;i++){
                       var li=liList.get(i);
                       var obj = {};
                       obj.YaoSuBH = $(li).attr('ysbh');
                       obj.YaoSuZ = $(".selYs_"+i).val();
                       arr.push(obj);
                   }
               }else{

               }

                
                var spFjLists = "";
                if(res.ShenPiXX.length>0){
                    $.each(res.ShenPiXX,function (index,val) {
                        spFjLists+="<div class='list-block'>"+
                            "<div class=\"weui-cells weui-cells_form\">\n" +
                            "           <div class=\"weui-cell\">\n" +
                            "               <div class=\"weui-cell__bd\">\n";
                        if(val.ShenPiYJ){
                            spFjLists+="<textarea style='height:2rem;font-size:16px;' class=\"weui-textarea\" rows=\"3\">"+val.ShenPiYJ+"</textarea>\n";
                        }
                        spFjLists+="                      <div class=\"weui-textarea-counter clearfix\"><label class=\"fl\">处理时长："+val.ChuLiSC+"</label><span class=\"fr\">"+val.ShenPiR+"</span></div>\n" +
                            "                      <div class=\"weui-textarea-counter\"><time>"+val.ShenPiSJ+"</time></div>\n" +
                            "               </div>\n" +
                            "           </div>\n" +
                            "       </div>\n" +
                            "       <ul class=\"ysValue\">\n";
                            $.each(val.ShenPiYS,function (i,o) {
                                    spFjLists+="<li>\n" +
                                        "             <div class=\"item-content\">\n" +
                                        "                <div class=\"item-media\"><i class=\"icon icon-form-email\"></i></div>\n" +
                                        "                        <div class=\"item-inner\">\n" +
                                        "                        <div class=\"item-title label\">"+o.YaoSuMC+"</div>\n" +
                                        "                        <div class=\"item-input\">\n" +
                                        "                           <span>"+o.YaoSuZ+"</span>\n" +
                                        "                       </div>\n" +
                                        "                 </div>\n" +
                                        "           </div>\n" +
                                        "   </li>\n" ;
                                });
                            if(!val.ShenPiFJ){
                                spFjLists+=" </ul>\n" +
                                    "          <ul>\n" +
                                    "             <li>\n" +
                                    "                 <div class=\"item-content\">\n" +
                                    "                      <div class=\"item-media\"><i class=\"icon icon-form-email\"></i></div>\n" +
                                    "                        <div class=\"item-inner\">\n" +
                                    "                          <a class=\"colorBlue\" href='"+val.ShenPiFJ.FuJianLJ+"' download=\"\">"+val.ShenPiFJ.FuJianMC+"</a>\n" +
                                    "                       </div>\n" +
                                    "                  </div>\n" +
                                    "               </li>\n" +
                                    "           </ul>";
                            }

                        spFjLists+="</div>";
                    });
                    $(".spFjLists").html(spFjLists);
                }
            }
        }
    });

    // 允许上传的图片类型
    var allowTypes = ['image/jpg', 'image/jpeg', 'image/png', 'image/gif'];
    //上传大小
    var maxSize = 2048 * 2048;
    // 图片最大宽度
    var maxWidth = 10000;
    // 最大上传图片数量
    var maxCount = 1;
  //  var tmpl = '<li class="weui-uploader__file" style="background-image:url(#url#)"></li>';

       var $gallery = $("#gallery"),
        $galleryImg = $("#galleryImg"),
        $uploaderInput = $("#uploaderInput"),
        $uploaderFiles = $("#uploaderFiles");
    $uploaderInput.on('change', function (event) {

        var files = event.target.files;
        //console.log(files);return false;
        // 如果没有选中文件，直接返回
            if (files.length === 0) {
            return;
            }
            var file = files[0];
            var reader = new FileReader();
            var base64;
            // 如果类型不在允许的类型范围内
            if (allowTypes.indexOf(file.type) === -1) {
                weui.topTips("该类型不允许上传！", "警告！");
                return;
            }
            if (file.size > maxSize) {
                weui.topTips("图片太大，不允许上传", "警告！");
                return;
            }
           /* if ($('.weui-uploader__file').length >= maxCount) {
                weui.topTips( '最多只能上传' + maxCount + '张图片');
                return;
            }*/
            reader.readAsDataURL(file);
            reader.onload = function (e) {
                //console.log(e);
                var img = new Image();
                img.src = e.target.result;
                img.onload = function () {
                    // 不要超出最大宽度
                    var w = Math.min(maxWidth, img.width);
                    // 高度按比例计算
                    var h = img.height * (w / img.width);
                    var canvas = document.createElement('canvas');
                    var ctx = canvas.getContext('2d');
                    // 设置 canvas 的宽度和高度
                    canvas.width = w;
                    canvas.height = h;
                    ctx.drawImage(img, 0, 0, w, h);

                    base64 = canvas.toDataURL('image/jpeg',0.8);

                    // 插入到预览区
                    var $preview = $('<li class="weui-uploader__file"><img style="width:100%;" src="'+ img.src +'" /></li>');
                    $uploaderFiles.html($preview);

                    var loading = weui.loading('正在提交...', {
                        className: 'custom-classname'
                    });
                    $.ajax({
                        url: Global.baseUrl +"/bpm/common/upload",
                        type: 'POST',
                        dataType:"json",
                        contentType:'application/json',
                        data: JSON.stringify({
                            value:base64
                        }),
                        success: function(res){
                            loading.hide();
                            weui.toast("上传成功", function() {
                                //console.log('close');

                            });
                            fj = res.get(0)
                        },
                        error: function(xhr, type){
                            loading.hide();
                            weui.topTips('Ajax error!')
                        }
                    });
                };

            };


    });

    var index; //第几张图片
    //点击查看大图
    $uploaderFiles.on("click", "li", function() {
        index = $(this).index();
        var pic = $(this).children("img");
        $galleryImg.attr("src", pic[0].getAttribute("src"));
        $gallery.show(100);
        $galleryImg.get(0).onload = function (){
            var picH=$("#galleryImg").height();
            var picW=$("#galleryImg").width();
            $galleryImg.css({"margin-top":-parseFloat(picH)/2+"px","margin-left":-parseFloat(picW)/2+"px"})
        };

    });
    //点击关闭，大图浮层关闭
    $(".weui-closed").on("click", function() {
        $gallery.hide(100);
    });


    var submitdata = {
        "YongHuBH":_userinfo.YongHuBH,
        //"YongHuBH":'XTYH201905300002',
        "ShenQingBMBH":$("#sqbmbh").val(),
        "BaoXiaoJE":$(".sqje").html(),
        "DanJuLX":theRequest.LeiXing,
        "DanJuBH":theRequest.BianHao,
        "LiuChengId":theRequest.LiuChengId,
        "TaskId":messStr.rwid,
        "DangQianJD":messStr.jd,
        "Next":"pass",//有效值  pass:通过,退回:back
        "ShenPiYJ":$("#option").val(),
       /* "FileList"://附件信息
            {
                "FuJianMC":"",
                "FuJianLJ":""
            },*/
        /*"ShenPiYS":arr*/
    };

    $("#submit").on("click",function () {
        submitdata.BaoXiaoJE=$(".sqje").html();
        submitdata.ShenQingBMBH=$("#sqbmbh").val();
        submitdata.ShenPiYJ=$("#option").val();
        //submitdata.DanJuLX=$("#bxlx").val();
        submitdata.Next="pass";
        console.info(submitdata);
        if(fj){
            submitdata.FileList=fj;
        }
        if(arr.length>0){
            submitdata.ShenPiYS=arr
        }
        var loading = weui.loading('正在提交...', {
            className: 'custom-classname'
        });
        $.ajax({
            type: "post",
            url:Global.baseUrl +'/bpm/dbsp/approve',
            data:JSON.stringify(submitdata),
            contentType:'application/json',
            xhrFields: {
                withCredentials: false
            },
            success: function(data) {
                loading.hide();
                if(data.msgCode == "1") {
                    location.href = "applyLists.html";
                } else {
                    loading.hide();
                    weui.topTips(data.msg);
                }
            },
            error: function(XMLHttpRequest, textStatus, errorThrown) {

            }
        })
    });

    $("#back").on("click",function () {
        submitdata.BaoXiaoJE=$(".sqje").html();
        submitdata.ShenQingBMBH=$("#sqbmbh").val();
        submitdata.ShenPiYJ=$("#option").val();
        submitdata.Next="back";
        console.info(submitdata);
        var loading = weui.loading('正在提交...', {
            className: 'custom-classname'
        });
        $.ajax({
            type: "post",
            url:Global.baseUrl +'/bpm/dbsp/approve',
            data:JSON.stringify(submitdata),
            contentType: false,
            xhrFields: {
                withCredentials: false
            },
            success: function(data) {
                loading.hide();
                if(data.msgCode == "1") {
                    location.href = "applyLists.html";
                } else {
                    loading.hide();
                    weui.topTips(data.msg);
                }
            },
            error: function(XMLHttpRequest, textStatus, errorThrown) {

            }
        })
    })

});


