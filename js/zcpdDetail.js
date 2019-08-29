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
        "PanDianDBH":GetRequest('bh'),
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
            tempSave: function () {
                // 暂存
            },
            scanQrCode: function () {
                var code = 'ZCKP201908220001';
                let vm = this;
                let sign = false;
                $.each(vm.zcpddtl, function(index, item){
                    if(item.ZiChanKP === code) {
                        weui.confirm('<div style="line-height: 2.5em"><p>'+item.ZiChanMC+'</p><p>帐存数量：'+item.ShuLiang+'</p><label>实存数量：</label><input style="line-height: 2.5em;text-align: center;" type="number" value="'+(item.ShiCunSL||1)+'"></div>', {
                            title: item.ZiChanKP,
                            className: 'myConfirm',
                            buttons: [{
                                label: '取消',
                                type: 'default',
                                onClick: function(){ console.log('no') }
                            }, {
                                label: '确定',
                                type: 'primary',
                                onClick: function(){
                                    var ShiCunSL = $('.myConfirm input').val() || 0;
                                    item.ShiCunSL = ShiCunSL > 0 ? ShiCunSL : 0;
                                }
                            }]
                        });
                        sign = true;
                        return;
                    }
                })
                if(!sign) {
                    weui.topTips('此设备不在盘点清单內', 3000);
                }
            },
            complete: function () {
                // 盘点完成
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
                            vm.zcpddtl = json.list;
                        }
                    }
                });
            */
        }
    })

});