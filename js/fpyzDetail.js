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
        "FaPiaoHM":GetRequest().fphm,
        "FaPiaoDM":GetRequest().fpdm,
    };
    let vm = new Vue({
        el: "#fpyzDetail",
        data: {
            item: {},
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
            //alert(JSON.stringify(data));
            fetch(Global.baseUrl + '/bpm/common/FaPiaoYZ', {
                method: 'post',
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then(res => res.json())
                .then(json => {
                    if(json.msgCode=='1'){
                            if(json.ShiFouBX=='FALSE'){
                                $("#fpyzDetail").hide();
                                $(".empty").show().html('此发票未报销过')
                            }else{
                                var list = {
                                    BaoXiaoBH: json.BaoXiaoBH,
                                    BaoXiaoRQ: json.BaoXiaoRQ,
                                    JingBanR: json.JingBanR,
                                    ShiFouBX:json.ShiFouBX
                                };
                                //alert(JSON.stringify(list));
                                vm.item = list;
                            }

                    }
                });
        }
    })

});