$(function () {
    /*
    config({
        // jsApiList: ['biz.util.open','device.geolocation.get'], // 需要鉴权使用的jsapi
        onSuccess: function (userinfo) {
            //alert("just du it!");
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
            sfbx:true
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
                        vm.sfbx = json.ShiFouBX=='TRUE';
                        vm.item = vm.sfbx ? json : {
                            BaoXiaoBH: GetRequest().fpdm,
                            BaoXiaoHM: GetRequest().fphm,
                            BaoXiaoRQ: GetRequest().sj,
                            JiaoYanMa:GetRequest().jym,
                            Jine:GetRequest().jg,
                        };

                    }
                });
        }
    })

});