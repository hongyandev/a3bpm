$(function () {
    /*
    config({
        // jsApiList: ['biz.util.open','device.geolocation.get'], // 需要鉴权使用的jsapi
        onSuccess: function (userinfo) {
            //alert("just du it!");
            // $.fn.cookie('ShenQingDW',userinfo.DanWeiBH);
        }
    });
    */
    let data = {
        "ZiChanKPBH":GetRequest().bh,
    };
    let vm = new Vue({
        el: "#zckpDetail",
        data: {
            item: [],
        },
        methods: {
            closePage: function () {
                dd.ready(function() {
                    dd.biz.navigation.close({
                        onSuccess : function(result) {},
                        onFail : function(err) {}
                    })
                })
            }
        },
        mounted: function () {
            let vm = this;
            /*vm.item = {
                "DanWeiMC": "xxx局",
                "ZiChanBH": "ZCKP201908100001",
                "ZiChanMC": "Dell微塔式服务器",
                "ChanPinXH": "PowerEdge T30",
                "ZiChanFL": "计算机设备",
                "CunFangDD": "xxx中心机房",
                "GuanLiBM": "xxx科室",
                "ShiYongR": "管理员",
                "JiLiangDW": "台",
                "DanJia": "88888",
                "ShuLiang": "1",
                "YuanZhi": "88888"
            };*/
            fetch(Global.baseUrl + '/bpm/common/ZiChanXiangXiXX', {
                method: 'post',
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then(res => res.json())
                .then(json => {
                   // alert(JSON.stringify(json.list));
                    if(json.msgCode=='1'){
                        if(json.list.length>0){
                            debugger
                            vm.item = json.list;
                        }else{
                            $("#zckpDetail").hide();
                            $(".empty").show().html("没有与此编号对应的资产！")
                        }
                    }
                });
        }
    })

});