$(function () {

    Vue.component("sea-dialog", {
        data: function () {
            return {
                currentDisVal: "",
                currentVal: "",
                record: {}
            }
        },
        props: ['id', 'title', 'config'],
        template: "#sea-dialog",
        methods:{
            show:function () {
                var sign = true;
                if(this.config.showBeforeCallback){
                    sign = this.config.showBeforeCallback();
                }
                if(this.config.showAfterCallback){
                    this.config.showAfterCallback()
                }
                if(sign) {
                    $('#' + this.id).show();
                }
            },
            click: function (item) {
                this.record = item;
                this.currentDisVal = item[this.config.disField];
                this.currentVal = item[this.config.keyField];
                this.$emit('input', this.currentVal);
                if (this.config.onclickCallback)
                    this.config.onclickCallback(item);
                $('#' + this.id).hide();
            },
        }
    });
    Vue.component("select-dialog", {
        data: function () {
            return {
                currentVal: "",
                currentDisVal: "",
                record:{}
            }
        },
        props: ['id', 'title', 'config'],
        template: "#select-dialog",
        methods: {
            show:function () {
                $('#' + this.id).show();
                if(this.config.init)
                    this.config.init();
            },
            click: function (item) {
                this.record=item;
                this.currentDisVal = item[this.config.dis];
                this.currentVal = item[this.config.key];
                this.$emit('input', this.currentVal);
                if (this.config.onclickCallback)
                    this.config.onclickCallback(item);
                $('#' + this.id).hide();
            },
            close: function () {
                $('#' + this.id).hide();
            },
            apply: function () {
                if (this.config.callback)
                    this.config.callback(this.currentVal);
                this.close();
            }
        }
    });
    var zbmcdata = {
        BuMenBH: 'GLZZ201905250002',//_userinfo.BuMenBH,
        NianDu: '2019',//_userinfo.NianDu,
        YongHuBH: 'XTYH201905300002',//_userinfo.YongHuBH,
        BaoXiaoLX:'',
        ZhiBiaoMC: '',
        DanJuBH:''
    };
    var vm = new Vue({
        el: "#applybx",
        data: {
            zj: false,
            zx: false,
            ht: false,
            kyye:"",
            formData: {
                bxlx: "",
                zjApply: "",
                zxApply: "",
                htmc: "",
                htjd: "",
                zbmc: ""
            },
            bxlxConfig: {
                options: [],
                key: "BianHao",
                dis: "MingCheng",
                onclickCallback: function (res) {
                    vm.zj = res.BianHao === "2";
                    vm.zx = res.BianHao === "3";
                    vm.ht = res.BianHao === "4";

                    vm.zbmcConfig.disField="";
                    vm.zbmcConfig.keyField="";

                    //console.log("callback",res)

                }
            },
            zbmcConfig: {
                options: [],
                disField: "zhiBiaoMC",
                keyField: "bianHao",
                fields: [{
                    name: '指标名称',
                    key: 'zhiBiaoMC'
                },{
                    name: '预算事项',
                    key: 'yuSuanSX'
                }, {
                    name: '可用余额',
                    key: 'keYongYE'
                }],
                showBeforeCallback:function () {
                    var flag = null;
                    switch (vm.formData.bxlx){
                        case "1" :{
                                zbmcdata.BaoXiaoLX = vm.formData.bxlx;
                                zbmcdata.DanJuBH = "";
                                zbmcdata.ZhiBiaoMC = "";
                                zbmcList(vm,zbmcdata);
                                flag = true;
                                break;
                        }
                        case "2" :{
                            if(vm.formData.zjApply.length == ""){
                                weui.topTips("请选择资金申请单", 'error');
                                flag = false;
                            } else {

                                zbmcList(vm,zbmcdata);
                                flag = true;
                            }
                            break;
                        }
                        case "3" : { //执行申请
                            if(vm.formData.zxApply.length == ""){
                                weui.topTips("请选择执行申请单", 'error');
                                flag = false;

                            } else {
                                zbmcdata.BaoXiaoLX = vm.formData.bxlx;
                                zbmcdata.DanJuBH = vm.formData.zxApply;
                                zbmcList(vm,zbmcdata);
                                flag = true;
                            }
                            break;
                        }
                        case "4" : {

                        }
                    }
                    return flag;


                },
                onclickCallback: function (res) {
                    vm.kyye = res.keYongYE;

                    //console.log("callback",res)
                }
            },
            zjApplyConfig:{
                options:[],
                disField: "zhiBiaoMC",
                keyField: "bianHao",
                fields: [{
                    name: '指标名称',
                    key: 'zhiBiaoMC'
                },{
                    name: '预算事项',
                    key: 'yuSuanSX'
                }, {
                    name: '可用余额',
                    key: 'keYongYE'
                }],
                onclickCallback: function (res) {
                    vm.kyye = res.KeYongYE;

                    //console.log("callback",res)
                }
            },
            bxbmConfig:{
                options:[{BuMenBH:"GLZZ201905250002",BuMenMC:"办公室"}],
                key:"BuMenBH",
                dis:"BuMenMC",
                callback: function (res) {
                    vm.bmmc = res;
                    //console.log("callback",res)
                }
            },
            zcsxConfig: {
                options: [],
                disField: "MingCheng",
                keyField: "BianHao",
                fields: [{
                    name: '名称',
                    key: 'MingCheng'
                },{
                    name: '支出分类',
                    key: 'ZhiChuFL'
                }, {
                    name: '费用限额',
                    key: 'FeiYongXE'
                }, {
                    name: '编号',
                    key: 'BianHao'
                }],
                showBeforeCallback: function () {
                    if(vm.formData.zbmc==""){
                        weui.topTips("请选择指标名称", 'error');
                        return false;
                    }
                    return true;
                },
                showAfterCallback:function () {
                    var zbbhdata={
                        "ZhiBiaoBH": vm.formData.zbmc
                    };
                    fetch(Global.baseUrl + '/bpm/common/getItems',{
                        method: 'post',
                        body: JSON.stringify(zbbhdata),
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    })
                    .then(res =>res.json())
                    .then(json =>{
                            vm.zcsxConfig.options = json.list;
                    });
                }
            },
            zxApplyConfig:{
                options: [],
                key: "BianHao",
                dis: "BiaoTi",
                init:function () {
                    var data = {
                        "BuMenBH": "GLZZ201905250002",//_userinfo.BuMenBH,
                        "YongHuBH": "XTYH201905300002",//_userinfo.YongHuBH,
                        "YuSuanND": "2019"//_userinfo.NianDu
                     };
                    fetch(Global.baseUrl + '/bpm/common/getZhiXingSQDXX',{
                        method: 'post',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body:JSON.stringify(data)
                    })
                    .then(res => res.json())
                    .then(json => {
                        this.options = json.list;
                    });
                },
                onclickCallback: function (res) {
                    console.info(res);
                    zbmcdata.DanJuBH = res.BianHao;
                    zbmcdata.ZhiBiaoMC = res.ZhiBiaoMC;
                    zbmcdata.BaoXiaoLX = '3';

                    //zbmcList(vm,zbmcdata)
                    //console.log("callback",res)
                }
            }
        },
        mounted: function () {
            fetch(Global.baseUrl + '/bpm/common/getBaoXiaoLX', {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(res => res.json())
            .then(json => {
                this.bxlxConfig.options = json.list;
                this.formData.bxlx = "1";
                var bxlx = this.$refs.bxlx;
                $.each(json.list, function (i, o) {
                    if (o.ISDefault == "1") {
                        bxlx.click(o);
                        bxlx.apply();
                    }
                })
            });

            $("#bxr").val(_userinfo.XingMing);
        }

    })





});
function zbmcList(vm,zbmcdata) {
    fetch(Global.baseUrl + '/bpm/common/getProjects', {
        method: 'post',
        body: JSON.stringify(zbmcdata),
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(res => res.json())
        .then(json => {
            vm.zbmcConfig.options = json.list;
        });
}