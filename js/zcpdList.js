$(function () {
    config({
        // jsApiList: ['biz.util.open','device.geolocation.get'], // 需要鉴权使用的jsapi
        onSuccess: function (userinfo) {
            //alert("just du it!");
            var DanWeiBH = JSON.parse($.fn.cookie('DanWei')).DanWeiBH || userinfo.DanWeiBH;

            let data = {
                DanWeiBH: DanWeiBH,//"GLZZ201905240001",
            };
            let vm = new Vue({
                el: "#zcpdList",
                data: {
                    zcpdrw: [],
                },
                methods: {
                    gotoDetail: function (bh) {
                        console.info(bh);
                        document.location.href = Global.h5Url + "/bpmh5/zcpdDetail.html?bh="+bh;
                    }
                },
                filters: {
                    formatDate: function (date) {
                        return date.substring(0,10);
                    }
                },
                mounted: function () {
                    let vm = this;
                    /* vm.zcpdrw = [
                         {
                             "BianHao": "ZCPD201908290001",
                             "JingBanBM": "办公室",
                             "PanDianMC": "盘点单2019-08-29",
                             "startTime": "2019-08-29 00:00:00.0",
                             "JingBanR": "操作管理员",
                             "status": "1"
                         }
                     ];*/
                    fetch(Global.baseUrl + '/bpm/pan/panDianList', {
                        method: 'post',
                        body: JSON.stringify(data),
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    })
                        .then(res => res.json())
                        .then(json => {
                            if(json.msgCode=='1'){
                                if(json.list.length>0){
                                    vm.zcpdrw = json.list;
                                }else{
                                    $(".empty").show().html('当前没有资产盘点任务')
                                }
                            }
                        });
                }
            });

        }
    });
});