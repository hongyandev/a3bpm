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
    var messObj = $.fn.cookie('zxmessStr');
    var messStr = JSON.parse(messObj);
    var yb = theRequest.yb;
    if(yb=='1'||!theRequest.RenWuID){
        $(".buttons-tab .last,.spyj,.spys,.scfj").hide()
    }else{
        $(".buttons-tab .last,.spyj,.spys,.scfj").show()
    }
    $(".buttons-tab a").click(function () {
        $(this).addClass('active').siblings().removeClass('active');
        var idx = $(this).index();
        $(".tabs .tab").eq(idx).show().siblings().hide();
    });
    console.info(JSON.stringify({
        "BianHao": theRequest.BianHao,
        "RenWuID": theRequest.RenWuID,
        "LiuChengId": theRequest.LiuChengId,
        "DangQianJD": messStr.jd
    }));
    $.ajax({
        type: 'post',
        url: Global.baseUrl + '/bpm/zxsqdbsp/detail',
        //url: "http://172.30.8.95:8082/bpm/zxsqdbsp/detail",
        contentType: 'application/json',
        data: JSON.stringify({
            "BianHao": theRequest.BianHao,
            "RenWuID": theRequest.RenWuID,
            "LiuChengId": theRequest.LiuChengId,
            "DangQianJD": messStr.jd
        }),
        success: function (res) {
            //console.info(res);
            if (res.msgCode == '1') {
                $(".qbbt").html(res.DanJuXX.QianBaoBT);
                $(".sqje").html(res.DanJuXX.ShenQingJE.replace(/,/gi, ''));
                $(".ShenQingBM").html(res.DanJuXX.ShenQingBM);
                $(".jbr").html(res.DanJuXX.JingBanR);
                $(".sqdh").html(res.DanJuXX.ShenQingDH);
                $(".sqDate").html(res.DanJuXX.ShenQingRQ);
                $(".yqjzDate").html(res.DanJuXX.YuQiJieZhiRQ);
                $(".sybm").html(res.DanJuXX.ShiYongBM);
                $(".jbDate").html(res.DanJuXX.JingBanSJ);
                $(".syr").html(res.DanJuXX.ShiYongR);
                $("#sqbmbh").val(res.DanJuXX.ShenQingBMBH);
                $("#sqje").val(res.DanJuXX.ShenQingJE);
                $(".img img").attr("src",res.DanJuXX.LiuChengTuLJ);
                var csLists = ""
                if (res.FeiYongCS.length > 0) {
                    for (var i = 0; i < res.FeiYongCS.length; i++) {
                        csLists += "<ul>\n" +
                                        "<li>\n" +
                                        "   <div class=\"item-content\">\n" +
                                        "   <div class=\"item-media\"><i class=\"icon icon-form-email\"></i></div>\n" +
                                        "           <div class=\"item-inner\">\n" +
                                        "                <div class=\"item-title label\">费用名称</div>\n" +
                                        "                     <div class=\"item-input\">\n" +
                                        "                          <span class='fymc'>" + res.FeiYongCS[i].FeiYongMC + "</span>" +
                                        "                     </div>\n" +
                                        "                </div>\n" +
                                        "           </div>\n" +
                                        "</li>\n" ;
                        if(res.FeiYongCS[i].FeiYongBZ){
                            csLists +=  "<li>\n" +
                                "            <div class=\"item-content\">\n" +
                                "            <div class=\"item-media\"><i class=\"icon icon-form-email\"></i></div>\n" +
                                "                 <div class=\"item-inner\">\n" +
                                "                      <div class=\"item-title label\">费用标准</div>\n" +
                                "                          <div class=\"item-input\">\n" +
                                "                               <span class=\"fybz\">" + res.FeiYongCS[i].FeiYongBZ + "</span>\n" +
                                "                          </div>\n" +
                                "                      </div>\n" +
                                "                 </div>\n" +
                                "         </li>\n" ;
                        }
                        if(res.FeiYongCS[i].ShenQingJE){
                            csLists += "<li>\n" +
                                "          <div class=\"item-content\">\n" +
                                "          <div class=\"item-media\"><i class=\"icon icon-form-email\"></i></div>\n" +
                                "               <div class=\"item-inner\">\n" +
                                "                    <div class=\"item-title label\">申请金额</div>\n" +
                                "                         <div class=\"item-input\">\n" +
                                "                              <span class=\"cssqje\">" + res.FeiYongCS[i].ShenQingJE + "</span>\n" +
                                "                         </div>\n" +
                                "                    </div>\n" +
                                "               </div>\n" +
                                "         </li>\n" ;
                        }

                        if(res.FeiYongCS[i].CeSuanYJJJE){
                            csLists +="<li>\n" +
                                "          <div class=\"item-content\">\n" +
                                "          <div class=\"item-media\"><i class=\"icon icon-form-email\"></i></div>\n" +
                                "              <div class=\"item-inner\">\n" +
                                "                   <div class=\"item-title label\">测算依据及金额</div>\n" +
                                "                        <div class=\"item-input\">\n" +
                                "                             <span class=\"CeSuanYJJJE\">" + res.FeiYongCS[i].CeSuanYJJJE + "</span>\n" +
                                "                        </div>\n" +
                                "                   </div>\n" +
                                "              </div>\n" +
                                "      </li>\n" ;
                        }

                        if(res.FeiYongCS[i].DingDianGYS){
                            csLists +="<li>\n" +
                                "          <div class=\"item-content\">\n" +
                                "          <div class=\"item-media\"><i class=\"icon icon-form-email\"></i></div>\n" +
                                "               <div class=\"item-inner\">\n" +
                                "                   <div class=\"item-title label\">定点供应商</div>\n" +
                                "                        <div class=\"item-input\">\n" +
                                "                             <span class=\"DingDianGYS\">" + res.FeiYongCS[i].DingDianGYS + "</span>\n" +
                                "                        </div>\n" +
                                "                   </div>\n" +
                                "               </div>\n" +
                                "          </li>\n" ;
                        }
                        csLists+="</ul>"
                    }
                    $(".cardItemYs").html(csLists);
                }
                var fyxxLists = ""
                if (res.FeiYongXX.length > 0) {
                    for (var i = 0; i < res.FeiYongXX.length; i++) {
                        fyxxLists += "<ul>\n" +
                            "<li>\n" +
                            "   <div class=\"item-content\">\n" +
                            "   <div class=\"item-media\"><i class=\"icon icon-form-email\"></i></div>\n" +
                            "           <div class=\"item-inner\">\n" +
                            "                <div class=\"item-title label\">名称</div>\n" +
                            "                     <div class=\"item-input\">\n" +
                            "                          <span class='fymc'>" + res.FeiYongXX[i].MingCheng + "</span>" +
                            "                     </div>\n" +
                            "                </div>\n" +
                            "           </div>\n" +
                            "</li>\n" +
                            "<li>\n" +
                                "            <div class=\"item-content\">\n" +
                                "            <div class=\"item-media\"><i class=\"icon icon-form-email\"></i></div>\n" +
                                "                 <div class=\"item-inner\">\n" +
                                "                      <div class=\"item-title label\">预算事项</div>\n" +
                                "                          <div class=\"item-input\">\n" +
                                "                               <span class=\"fybz\">" + res.FeiYongXX[i].YuSuanSX + "</span>\n" +
                                "                          </div>\n" +
                                "                      </div>\n" +
                                "                 </div>\n" +
                                "         </li>\n"+
                                "<li>\n" +
                                "          <div class=\"item-content\">\n" +
                                "          <div class=\"item-media\"><i class=\"icon icon-form-email\"></i></div>\n" +
                                "               <div class=\"item-inner\">\n" +
                                "                    <div class=\"item-title label\">本次申请金额</div>\n" +
                                "                         <div class=\"item-input\">\n" +
                                "                              <span class=\"cssqje\">" + res.FeiYongXX[i].BenCiSQJE + "</span>\n" +
                                "                         </div>\n" +
                                "                    </div>\n" +
                                "               </div>\n" +
                                "</li>\n"+
                                "<li>\n" +
                                "          <div class=\"item-content\">\n" +
                                "          <div class=\"item-media\"><i class=\"icon icon-form-email\"></i></div>\n" +
                                "              <div class=\"item-inner\">\n" +
                                "                   <div class=\"item-title label\">已批复金额</div>\n" +
                                "                        <div class=\"item-input\">\n" +
                                "                             <span class=\"CeSuanYJJJE\">" +res.FeiYongXX[i].YiPiFJE+ "</span>\n" +
                                "                        </div>\n" +
                                "                   </div>\n" +
                                "              </div>\n" +
                                "</li>\n"+
                                "</ul>"
                    }
                    $(".cardItemFyxx").html(fyxxLists);
                }
                var fjList = '';
                if (res.DanJuXX.DanJuFJ.length > 0) {
                    $.each(res.DanJuXX.DanJuFJ, function (index, val) {
                        fjList += "<li>\n" +
                            "     <div class=\"item-content\">\n" +
                            "          <div class=\"item-media\"><i class=\"icon icon-form-email\"></i></div>\n" +
                            "          <div class=\"item-inner\">\n" +
                            "               <a  href='" + val.FuJianLJ + "' download>" + val.FuJianMC + "</a>\n" +
                            "          </div>\n" +
                            "     </div>\n" +
                            "</li>"
                    });
                    $(".fjLists").html(fjList);
                } else {
                    $(".djfj").hide();
                }
               // $(".bxje").html(res.DanJuXX.ShenQingJE);

                //审批
                var ysxx = "";
                if (res.YaoSuXX.length > 0) {
                    $.each(res.YaoSuXX, function (index, val) {
                        ysxx += "<li ysbh='" + val.BianHao + "'>\n" +
                            "      <div class=\"item-content\">\n" +
                            "         <div class=\"item-media\"><i class=\"icon icon-form-gender\"></i></div>\n" +
                            "            <div class=\"item-inner\">\n" +
                            "              <div class=\"item-title ys label\">" + val.YaoSuMC + "</div>\n" +
                            "              <div class=\"item-input\">\n" +
                            "              <select id='selYs_" + index + "'>";
                                            $.each(val.YaoSuZ, function (i, o) {
                                                ysxx += "<option value='"+o+"'>" + o + "</option>";
                                            })
                        ysxx += "      </select>\n" +
                            "            </div>\n" +
                            "         </div>\n" +
                            "      </div>\n" +
                            "</li>"
                    })
                }
                $(".ysXX").html(ysxx);

                var spFjLists = "";
                if (res.ShenPiXX.length > 0) {
                    $.each(res.ShenPiXX, function (index, val) {
                        spFjLists += "<div class='list-block'>" +
                            "<div class=\"weui-cells weui-cells_form\">\n" +
                            "           <div class=\"weui-cell\">\n" +
                            "               <div class=\"weui-cell__bd\">\n";
                        if (val.ShenPiYJ) {
                            spFjLists += "<textarea style='height:2rem;font-size:16px;' class=\"weui-textarea\" rows=\"3\">" + val.ShenPiYJ + "</textarea>\n";
                        }
                        spFjLists += "                      <div class=\"weui-textarea-counter clearfix\"><label class=\"fl\">处理时长：" + val.ChuLiSC + "</label><span class=\"fr\">" + val.ShenPiR + "</span></div>\n" +
                            "                      <div class=\"weui-textarea-counter\"><time>" + val.ShenPiSJ + "</time></div>\n" +
                            "               </div>\n" +
                            "           </div>\n" +
                            "       </div>\n" +
                            "       <ul class=\"ysValue\">\n";
                        $.each(val.ShenPiYS, function (i, o) {
                            spFjLists += "<li>\n" +
                                "             <div class=\"item-content\">\n" +
                                "                <div class=\"item-media\"><i class=\"icon icon-form-email\"></i></div>\n" +
                                "                        <div class=\"item-inner\">\n" +
                                "                        <div class=\"item-title label\">" + o.YaoSuMC + "</div>\n" +
                                "                        <div class=\"item-input\">\n" +
                                "                           <span>" + o.YaoSuZ + "</span>\n" +
                                "                       </div>\n" +
                                "                 </div>\n" +
                                "           </div>\n" +
                                "   </li>\n";
                        });
                        if (!val.ShenPiFJ) {
                            spFjLists += " </ul>\n" +
                                "          <ul>\n" +
                                "             <li>\n" +
                                "                 <div class=\"item-content\">\n" +
                                "                      <div class=\"item-media\"><i class=\"icon icon-form-email\"></i></div>\n" +
                                "                        <div class=\"item-inner\">\n" +
                                "                          <a class=\"colorBlue\" href='" + val.ShenPiFJ.FuJianLJ + "' download=\"\">" + val.ShenPiFJ.FuJianMC + "</a>\n" +
                                "                       </div>\n" +
                                "                  </div>\n" +
                                "               </li>\n" +
                                "           </ul>";
                        }

                        spFjLists += "</div>";
                    });
                    $(".spFjLists").html(spFjLists);
                }
            }
        }
    });

    //var fj;
    upload({
        el: "#gallery",
        callback: function (fjList) {
            fj = fjList;
        }
    })

    var submitdata = {
        "YongHuBH": _userinfo.YongHuBH,
        //"YongHuBH":'XTYH201905300002',
        "ShenQingBMBH": $("#sqbmbh").val(),
        "BaoXiaoJE": $("#sqje").val(),
        "DanJuBH": theRequest.BianHao,
        "LiuChengId": theRequest.LiuChengId,
        "TaskId": messStr.rwid,
        "DangQianJD": messStr.jd,
        "Next": "pass",//有效值  pass:通过,退回:back
        "ShenPiYJ": $("#option").val(),
        /* "FileList"://附件信息
             {
                 "FuJianMC":"",
                 "FuJianLJ":""
             },*/
        /*"ShenPiYS":arr*/
    };

    $("#submit").on("click", function () {
        submitdata.ShenPiYS = [];
        submitdata.BaoXiaoJE = $(".sqje").html();
        submitdata.ShenQingBMBH = $("#sqbmbh").val();
        submitdata.ShenPiYJ = $("#option").val();
        submitdata.Next = "pass";
        var liList = $(".ysXX li");
        for (var i = 0; i < liList.length; i++) {
            var li = liList.get(i);
            var obj = {};
            obj.YaoSuBH = $(li).attr('ysbh');
            var sel = document.getElementById('selYs_'+i);
            var index = sel.selectedIndex; // 选中索引
            obj.YaoSuZ = sel.options[index].value; // 选中值
            console.info(obj.YaoSuZ);
            submitdata.ShenPiYS[i] = obj;
        }

        if (fj) {
            submitdata.FileList = fj[0];
        }
        console.info(submitdata);
        //return;
        var loading = weui.loading('正在提交...', {
            className: 'custom-classname'
        });
        $.ajax({
            type: "post",
            url: Global.baseUrl + '/bpm/zxsqdbsp/approve',
            data: JSON.stringify(submitdata),
            contentType: 'application/json',
            xhrFields: {
                withCredentials: false
            },
            success: function (data) {
                loading.hide();
                if (data.msgCode == "1") {
                    location.href = "applyLists.html";
                } else {
                    loading.hide();
                    weui.topTips(data.msg);
                }
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {

            }
        })
    });

    $("#back").on("click", function () {
        submitdata.BaoXiaoJE = $(".sqje").html();
        submitdata.ShenQingBMBH = $("#sqbmbh").val();
        submitdata.ShenPiYJ = $("#option").val();
        submitdata.Next = "back";
        if (fj) {
            submitdata.FileList = fj[0];
        }
        if (arr.length > 0) {
            submitdata.ShenPiYS = arr
        }
        console.info(submitdata);
       // return;
        var loading = weui.loading('正在提交...', {
            className: 'custom-classname'
        });
        $.ajax({
            type: "post",
            url: Global.baseUrl + '/bpm/zxsqdbsp/approve',
            data: JSON.stringify(submitdata),
            contentType: "application/json",
            xhrFields: {
                withCredentials: false
            },
            success: function (data) {
                loading.hide();
                if (data.msgCode == "1") {
                    location.href = "applyLists.html";
                } else {
                    loading.hide();
                    weui.topTips(data.msg);
                }
            }
        })
    })
});