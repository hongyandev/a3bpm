$(function () {
    config({
        // jsApiList: ['biz.util.open','device.geolocation.get'], // 需要鉴权使用的jsapi
        onSuccess: function (userinfo) {
            //alert("just du it!");
             $.fn.cookie('ShenQingDW',userinfo.DanWeiBH);

        }
    });
    let data = {
        "PanDianDBH":GetRequest().bh,
    };

    let vm = new Vue({
        el: "#zcpdDetail",
        data: {
            zcpddtl: [],
        },
        computed:{
            formdata:function () {
                let zcpdlist = [];
                zcpdlist = vm.zcpddtl.map(item=>{return {PanDianMXBH: item.BianHao,ZiChanBH: item.ZiChanKP,ShuLiang:((item.ShiCunSL || 0)+"")}});
                return {
                    "PanDianDBH":GetRequest().bh,
                    "panList": zcpdlist
                    }
            }
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
                fetch(Global.baseUrl + '/bpm/pan/panConfirm', {
                    method: 'post',
                    body: JSON.stringify(vm.formdata),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                    .then(res => res.json())
                    .then(json => {
                        if(json.msgCode=='1'){
                            weui.toast('保存成功', {
                                duration: 3000,
                                className: 'custom-classname',
                            });
                        }else{
                            weui.topTips(json.msg)
                        }
                    })
            },
            scanQrCode: function () {
                var code;
                let vm = this;
                dd.ready(function() {
                    dd.biz.util.scan({
                        type: 'qrCode' , // type 为 all、qrCode、barCode，默认是all。
                        onSuccess: function(data) {
                            code =  data.text;
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
                            });
                            if(!sign) {
                                weui.topTips('此设备不在盘点清单內', 3000);
                            }
                        },
                        onFail : function(err) {}
                    })
                });


            },
            complete: function () {
                weui.confirm('<p>将提交本次盘点最终结果，<br/>请确认盘点完成。</p>', {
                    title: '提醒',
                    buttons: [{
                        label: '取消',
                        type: 'default',
                        onClick: function(){

                        }
                    }, {
                        label: '盘点完成',
                        type: 'primary',
                        onClick: function(){
                            fetch(Global.baseUrl + '/bpm/pan/panConfirm', {
                                method: 'post',
                                body: JSON.stringify(vm.formdata),
                                headers: {
                                    'Content-Type': 'application/json'
                                }
                                })
                                .then(res => res.json())
                                .then(json => {
                                    if(json.msgCode=='1'){
                                        weui.toast('盘点成功', {
                                            duration: 3000,
                                            className: 'custom-classname',
                                            callback: function(){
                                                location.href="zcpdList.html"
                                            }
                                        });

                                    }else{
                                        weui.topTips(json.msg)
                                    }
                                });
                        }
                    }]
                });
            }
        },

        mounted: function () {
            let vm = this;
            /*vm.zcpddtl = [
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
            ];*/
            fetch(Global.baseUrl + '/bpm/pan/panDetial', {
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
        }
    })

});