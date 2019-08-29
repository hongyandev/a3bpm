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
        "PanDianDBH":"ZCPD201908290001",//$.fn.cookie('DanWeiBH'),
    };
    let vm = new Vue({
        el: "#zcpdDetail",
        data: {
            zcpddtl: [],
        },
        methods: {
            add: function (item) {
                if(isNaN(item.ShiCunSL)){
                    item.ShiCunSL = 0
                } else {
                    item.ShiCunSL ++;
                }
            },
            sub: function (item) {
                if(isNaN(item.ShiCunSL) || item.ShiCunSL == 0){
                    item.ShiCunSL = 0
                } else {
                    item.ShiCunSL --;
                }
            },
            edit: function (item) {
                item.edited = true;
            },
            tempSave: function () {

            },
            scanQrCode: function () {

            },
            complete: function () {
                
            }
        },
        mounted: function () {
            let vm = this;
            vm.zcpddtl = [
                {
                    "BianHao": "PDMX201908290003",
                    "ZiChanKP": "ZCKP201908220001",
                    "ZiChanMC": "其他办公自动化设备",
                    "GuiGeXH": "hp20820-283",
                    "ShiCunSL": "",
                    "ShuLiang": "1"
                },
                {
                    "BianHao": "PDMX201908290002",
                    "ZiChanKP": "ZCKP201908100001",
                    "ZiChanMC": "Dell微塔式服务器",
                    "GuiGeXH": "PowerEdge T30",
                    "ShiCunSL": "",
                    "ShuLiang": "1"
                },
                {
                    "BianHao": "PDMX201908290001",
                    "ZiChanKP": "ZCKP201905300001",
                    "ZiChanMC": "高速打印机",
                    "GuiGeXH": "hp xxxxx203",
                    "ShiCunSL": "",
                    "ShuLiang": "1"
                }
            ];
            /*
            fetch(Global.baseUrl + '/bpm/panDetial', {
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
                        }
                    }
                });
            */
        }
    })

});