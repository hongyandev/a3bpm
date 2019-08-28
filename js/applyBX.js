$(function () {
    config({
        // jsApiList: ['biz.util.open','device.geolocation.get'], // 需要鉴权使用的jsapi
        onSuccess: function (userinfo) {
            //alert("just du it!");
            $.fn.cookie('ShenQingDW',userinfo.DanWeiBH);
        }
    });
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
            searchZbmc:function (e) {
                this.$emit('searchmc',e)
            },
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
            hide:function () {
                $('#' + this.id).hide();
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
        props: {
            id: String,
            title: String,
            config: Object,
            currentrecord:{
                required: false
            }
        },
        // props: ['id', 'title', 'config', 'currentRecord'],
        template: "#select-dialog",
        methods: {
            show:function () {
                $('#' + this.id).show();
                if(this.config.init)
                    this.config.init();
            },
            click: function (item) {
                this.record=item;

            },
            close: function () {
                $('#' + this.id).hide();
            },
            apply: function () {
                this.currentDisVal = this.record[this.config.dis];
                this.currentVal = this.record[this.config.key];
                this.$emit('update:currentrecord', this.record);
                this.$emit('input', this.currentVal);

                // $('#' + this.id).hide();

                if (this.config.callback)
                    this.config.callback(this.record);
                this.close();

            },
            set:function (r) {

            }
        }
    });
    Vue.component("zhichu-mingxi", {
        template: "#zhichu-mingxi",
        props: ["item", "ocrconfig"],
        methods: {
            callback: function (target) {
                this.$set(this.item, target);
            },
            add: function(FeiYongMX){
                var newFeiYongMX = _.cloneDeep(FeiYongMX[0]);
                $.each(newFeiYongMX, function (index, item) {
                    item.FeiYongMXZ = "";
                })
                FeiYongMX.push(newFeiYongMX);
            },
            del: function (FeiYongMX, index) {
                console.log(index)
                FeiYongMX.splice(index, 1);
            }
        }
    });
    Vue.component("zjzc-mx",{
        template:"#zjzc-mx",
        props:["items"],
    });
    Vue.component("jsfs-input",{
        template:"#jsfs-input",
        props:["item"],
    });
    var zbmcdata = {
        BuMenBH: _userinfo.BuMenBH,//'GLZZ201905250002',
        NianDu: _userinfo.NianDu,//'2019',
        YongHuBH: _userinfo.YongHuBH,//'XTYH201905300002',
        BaoXiaoLX:'',
        ZhiBiaoMC: '',
        DanJuBH:''
    };
    var result = [];
    var formdata;
    var vm = new Vue({
        el: "#applybx",
        data: {
            zj: false,
            zx: false,
            ht: false,
            lc:false,
            kyye:"",
            ZhiChuMX: [],
            fzsx:[],
            jsfsType:[],
            formData: {
                bxlx: "",
                zjApply: "",
                zxApply: "",
                kyye:"",
                bxDate:"",
                htmc: "",
                htjd: "",
                zbmc: "",
                zbmcbh:"",
                bxsy:"",
                bxbm:"",
                bzxx:"",
                zcsx:"",
                jsfs:[],
                FileList : []
            },
            uploaderFiles: [],
            uploaderOptions : {
                url : Global.baseUrl + "/bpm/common/upload2",
                type : "base64",
                fileval : "fileBase64",
                filekey : "FuJianMC",
                maxsize : 5,
                maxcount : 10,
                onSuccess : function (ret) {
                    if(ret.msgCode == "1") {
                        return ret.list[0];
                    }
                }
            },
            bxlxConfig: {
                options: [],
                key: "BianHao",
                dis: "MingCheng",
                callback: function (res) {
                    vm.zj = res.BianHao === "2";
                    vm.zx = res.BianHao === "3";
                    vm.ht = res.BianHao === "4";
                }
            },
            htmcConfig:{
                options: [],
                key: "BianHao",
                dis: "HeTongMC",
                init:function () {
                    var data = {
                        "BuMenBH":_userinfo.BuMenBH,// "GLZZ201905250002",
                        "YongHuBH": _userinfo.YongHuBH,//"XTYH201905300002",
                    };
                    fetch(Global.baseUrl + '/bpm/common/getHeTongXX',{
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
                callback:function (res) {
                    console.info(res);
                    zbmcdata.DanJuBH = res.BianHao;
                    zbmcdata.ZhiBiaoMC = res.ZhiBiaoMC;
                    zbmcdata.BaoXiaoLX = '4';
                }
            },
            htjdConfig: {
                options: [],
                key: "JieDuanBH",
                dis: "HeTongJD",
                init:function () {
                    if(vm.formData.htmc==""){
                        weui.topTips("请选择合同名称", 'error');
                        return false;
                    }else{
                        console.info(vm.htmcConfig.options);
                        $.each(vm.htmcConfig.options,function (i,o) {
                            vm.htjdConfig.options = o.HeTongJD;
                        })
                    }
                }
            },
            zbmcConfig: {
                options: [],
                disField: "zhiBiaoMC",
                keyField: "bianHao",
                showsearch:true,
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
                searchZbmc:function(e){
                    zbmcdata.BaoXiaoLX = vm.formData.bxlx;
                    zbmcdata.DanJuBH = "";
                    zbmcdata.ZhiBiaoMC = e.target.value;
                    console.info(e);
                    zbmcList(vm,zbmcdata);
                },
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
                            if(vm.formData.htmc.length == ""){
                                weui.topTips("请选择合同名称", 'error');
                                flag = false;

                            } else {

                                zbmcList(vm,zbmcdata);
                                flag = true;
                            }
                            break;
                        }
                    }
                    return flag;
                },
                onclickCallback: function (res) {
                    vm.kyye = res.keYongYE;
                    vm.formData.zbmcbh = res.bianHao
                    //console.log("callback",res)
                }
            },
            zjApplyConfig:{
                options:[],
                disField: "BianHao",
                keyField: "BianHao",
                fields: [{
                    name: '单据编号',
                    key: 'BianHao'
                },{
                    name: '指标名称',
                    key: 'ZhiBiaoMC'
                }],
                showAfterCallback:function () {
                    var zjsqdata={
                       "BuMenBH":_userinfo.BuMenBH, //"GLZZ201905250002","
                       "YongHuBH":_userinfo.YongHuBH, //"XTYH201905300002",
                       "YuSuanND": _userinfo.NianDu//"2019"
                    };
                    fetch(Global.baseUrl + '/bpm/common/getZiJinSQDXX',{
                        method: 'post',
                        body: JSON.stringify(zjsqdata),
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    })
                    .then(res =>res.json())
                    .then(json =>{
                            vm.zjApplyConfig.options = json.list;
                        });
                },
                onclickCallback: function (res) {
 /*                   fetch(Global.baseUrl + '/bpm/common/accounts',{
                        method: 'post',
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    })
                        .then(res => res.json())
                        .then(json => {
                            if (vm.formData.jsfs.length == 0 ) {
                                vm.formData.jsfs.push({
                                    options:json.list,
                                    currentVal: "",
                                    key: "BianMa",
                                    dis: "MingCheng",
                                    record: {"Content":[]}
                                })
                            }
                            /!*if(!json.list.Content && json.list.Content.length>0){
                                vm.jsfsType = json.list.Content;
                            }*!/
                        });*/

                    vm.kyye = res.ZiJinSQJE;
                    vm.formData.zbmcbh = res.ZhiBiaoBH;
                    vm.formData.zcsx = res.ZCSXBianHao;
                    vm.ZhiChuMX = res.ZCMXlist;
                    //console.log("callback",res)
                    vm.$refs.zbmc.currentDisVal = res.ZhiBiaoMC;
                    vm.$refs.zcsx.currentDisVal = res.ZCSXMingCheng;
                    vm.formData.bxsy = res.BaoXiaoSY;
                   // vm.formData.jsfs = res.JSFSlist;
                    /*$.each(res.JSFSlist,function (i,o) {
                        var r = {
                            options:[],
                            currentVal: "转账",
                            key: o.JieSuanFS,
                            dis: "MingCheng",
                            JinE:o.JieSuanJE,
                            record: {"Content":[]}
                        };
                        vm.formData.jsfs.push(r);
                        vm.$refs['jsfs_'+i].click(r);
                        vm.$refs['jsfs_'+i].apply();
                    });*/
                }
            },
            bxbmConfig:{
                options:[],
                key:"BianHao",
                dis:"MingCheng",
                init:function () {
                    //报销部门
                    var bxbmdata={
                        "BuMenBH": _userinfo.BuMenBH,//"GLZZ201905250002",
                    };
                    fetch(Global.baseUrl + '/bpm/common/getDept',{
                        method: 'post',
                        body: JSON.stringify(bxbmdata),
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    })
                        .then(res =>res.json())
                        .then(json =>{
                            vm.bxbmConfig.options = json.list;
                            this.$refs.bxbm.currentDisVal = json.list[0].MingCheng;
                        });
                },
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
                },
                onclickCallback:function (res) {
                    console.info(res);
                    vm.formData.zcsxbh = res.BianHao;
                }
            },
            zxApplyConfig:{
                options: [],
                key: "BianHao",
                dis: "BiaoTi",
                init:function () {
                    var data = {
                        "BuMenBH": _userinfo.BuMenBH,//"GLZZ201905250002",
                        "YongHuBH":_userinfo.YongHuBH,// "XTYH201905300002",
                        "YuSuanND":_userinfo.NianDu // "2019"
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
                callback: function (res) {
                    console.info(res);
                    zbmcdata.DanJuBH = res.BianHao;
                    zbmcdata.ZhiBiaoMC = res.ZhiBiaoMC;
                    zbmcdata.BaoXiaoLX = '3';

                    //zbmcList(vm,zbmcdata)
                    //console.log("callback",res)
                }
            },
            jsfsConfig:{
                options:[],
                key: "BianMa",
                dis: "MingCheng",
                init:function () {
                    vm.$refs['jsfs_'+i];
                },
                callback:function (res) {
                    console.info(res);
                    vm.jsfsType = res.Content;
                }
            },
            ocrConfig:{
                class: "weui-btn_mini weui-btn_default",
                useapi: ["train_ticket"], // 允许此组件扫描的类型，vat_invoice=增值税发票，train_ticket=火车票，bankcard=银行卡
                // useapi: ["train_ticket"],
                options : {
                    url : Global.baseUrl + "/bpm/common/ocrbase64", // type=file,url=/bpm/common/ocrfile
                    type : "base64", // 'base64' or 'file' type=file 需要服务端压缩图片<4M
                    fileVal : "file",
                    auto: true,
                    compress: { // base64方式图片压缩配置
                        width: 1600,
                        height: 1600,
                        quality: .8
                    },
                    onBeforeSend: function (data, headers) {
                        // 图片上传前调用
                        // $.extend(data, { test: 1 }); // 可以扩展此对象来控制上传参数
                        // $.extend(headers, { Origin: 'http://127.0.0.1' }); // 可以扩展此对象来控制上传头部
                        // return false; // 阻止上传
                        console.log('BeforeSend', data);
                    },
                    onSuccess: function (ret, target) {
                        // 成功的回调
                        console.log('Success', ret);
                        console.log('Target', target);
                        var setValues = function (fymx) {
                            _.forEach(fymx, function (value, key) {
                                switch (value.BianHao) {
                                    case 'FYMX201903240030': // 起点
                                        value.FeiYongMXZ = ret.origin;
                                        break;
                                    case 'FYMX201903240031':
                                        value.FeiYongMXZ = ret.destination;
                                        break;
                                    case 'FYMX201903240033':
                                        value.FeiYongMXZ = ret.price;
                                        break;
                                    case 'FYMX201903240034' :
                                        value.FeiYongMXZ = "1";
                                        break;
                                }
                            })
                        }
                        if (target.length == 1 && target[0][0].FeiYongMXZ == undefined){
                            setValues(target[0]);
                            console.log(target);
                        } else {
                            var newmx = _.cloneDeep(target[0]);
                            setValues(newmx)
                            target.push(newmx);
                        }
                    },
                    onError: function (err) {
                        weui.topTips(err);
                        // 失败的回调
                        console.log('Error', err);
                    }
                }
            },
            lcConfig:{
                options:[],
                key: "BianHao",
                dis: "MingCheng",
                showselect: false,
                callback:function (res) {
                    formdata.FlowId = res.BianHao;
                    saveData(formdata)
                }
            }
        },
        mounted: function () {

            //报销类型
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
            //报销部门
            var self = this;
            config({
                onSuccess: function (userinfo) {
                    var bxbmdata={
                        "BuMenBH": userinfo.BuMenBH,//"GLZZ201905250002",
                    };
                    fetch(Global.baseUrl + '/bpm/common/getDept',{
                        method: 'post',
                        body: JSON.stringify(bxbmdata),
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    })
                        .then(res =>res.json())
                        .then(json =>{
                            self.bxbmConfig.options = json.list;
                            self.$refs.bxbm.currentDisVal = json.list[0].MingCheng;
                            self.formData.bxbm = json.list[0].BianHao;
                        });
                       $("#bxr").val(userinfo.XingMing);
                }
            });
        },
        methods:{

            jsfsadd: function () {
                var newJsfs = _.cloneDeep(this.formData.jsfs[0]);
                newJsfs.currentVal="";
                newJsfs.JinE=0;
                this.formData.jsfs.push(newJsfs);
            },
            jsfsdel: function (index) {
                this.formData.jsfs.splice(index,1);
            },
            next:function () {
                if(this.formData.zcsx=="" || this.formData.bxsy=="" || this.formData.bxDate==""){
                    weui.topTips("填写信息不完整");
                    return false;
                }
                if(this.zj){
                    $(".pageSecond").show().siblings('.pageFirst').hide();
                    console.info(vm.ZhiChuMX);
                }else{
                    fetch(Global.baseUrl + "/bpm/common/getDetail",{
                        method: 'post',
                        body: JSON.stringify({'ZhiChuSXBH':this.formData.zcsx,"DanJuBH":""}),
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    })
                        .then(res =>res.json())
                        .then(json =>{
                            $(".pageSecond").show().siblings('.pageFirst').hide();
                            vm.ZhiChuMX = json.list;
                        });
                }
                //console.info("1:"+this.formData);
            },
            action: function (go) {
                if(go=='back'){
                    $(".pageSecond").hide().siblings('.pageFirst').show();
                }else{
                    if(this.total=='0'){
                        weui.topTips('报销金额不能为0');
                        return false;
                    }
                    $(".pageThird").show().siblings('.pageFirst,.pageSecond').hide();
                    console.info(this.ZhiChuMX);

                    if(this.ZhiChuMX.length>0){

                        var _ZhiCuXX = [];
                        _.forEach(this.ZhiChuMX, function (value, key) {
                            var c = _.flatMapDepth(value.FeiYongMX, function (value, key, collection) {
                                return value;
                            }, 1);
                            var _FeiYongMX = [];
                            _.forEach(_.groupBy(c,'BianHao'), function(value, key) {
                                _FeiYongMX.push({
                                    'MingXiBH': key,
                                    'MingXiZ': _.map(value,'FeiYongMXZ')
                                })
                            });
                            _ZhiCuXX.push({
                                'ZhiChuMXBH': value.BianHao,
                                'FeiYongMX': _FeiYongMX
                            });
                        });
                        console.log(_ZhiCuXX)
                    }


                    fetch(Global.baseUrl + "/bpm/common/getDetailSumMoney",{
                        method: 'post',
                        body: JSON.stringify({'ZhiChuXX':_ZhiCuXX}),
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    })
                        .then(res =>res.json())
                        .then(json =>{
                           $.each(this.ZhiChuMX,function (i,o) {
                               var ZhiChuMXBH = o.BianHao;
                               $.each(json.ZhiChuMX, function (j, p) {
                                   if(p.ZhiChuMXBH == ZhiChuMXBH) {
                                       $.each(o.FeiYongMX, function (k, q) {
                                           var index = -1;
                                           $.each(q, function (l, r) {
                                               if(r.Type==0){
                                                   index = l;
                                               }
                                           })
                                           if(index != -1) {
                                               q.splice(index, 1);
                                           }
                                           q.push({
                                               'Type': 0,
                                               'FeiYongMXMC': '标准费用',
                                               'FeiYongMXZ': p.list[k]
                                           })
                                           o.JinE = p.ZhiChuMXZJE;
                                           console.log(q)
                                       })
                                   }
                               })
                           })
                           
                        });

                    fetch(Global.baseUrl + "/bpm/common/auxiliary",{
                        method: 'post',
                        body: JSON.stringify({'ZhiChuSXBH':this.formData.zcsx,"DanJuBH":""}),
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    })
                    .then(res =>res.json())
                    .then(json =>{
                            $(".pageFirst,.pageSecond").hide().siblings('.pageThird').show();
                            vm.fzsx = json.list;
                    });
                }
            },
            thirdAction:function (go) {
                if(go=='back'){
                    $(".pageThird").hide().siblings('.pageSecond').show();
                }else{
                    $(".pageFour").show().siblings('.pageFirst,.pageSecond,.pageThird').hide();

                    fetch(Global.baseUrl + '/bpm/common/accounts',{
                        method: 'post',
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    })
                    .then(res => res.json())
                    .then(json => {
                           // if (vm.formData.jsfs.length == 0 ) {
                                vm.formData.jsfs.push({
                                    options:json.list,
                                    currentVal: "",
                                    key: "BianMa",
                                    dis: "MingCheng",
                                    record: {"Content":[]},
                                    JinE:this.total
                                });
                            //}
                            for(var i=0;i<json.list.length;i++){
                                if(json.list[i].Content != "" && json.list[i].Content.length>0){
                                    vm.jsfsType = json.list[i].Content;
                            }
                        }
                });

                }
            },
            save:function () {
                    if(this.jsfsType==''){
                        weui.topTips('结算方式不能为空');
                        return false;
                    }
                    formdata = {
                    "FlowId":"",
                    "BiaoXiaoBH":"",//新增单据:无报销编号;编辑单据:有报销编号
                    "BaoXiaoLX":this.formData.bxlx,
                    "ZhiBiaoBH":this.formData.zbmcbh,
                    "GangWeiBH":_userinfo.GangWeiBH,
                    "ShenQingR":_userinfo.YongHuBH,//"申请人-（经办人）编号",
                    "NianDu":_userinfo.NianDu,
                    "ShenQingDW":$.fn.cookie('ShenQingDW'),//"申请单位编号-（管理组织）",
                    "ShenQingBM":_userinfo.BuMenBH,
                    "ShenQingJE":this.total,//"申请金额-（报销金额）",
                    "BaoXiaoR":$("#bxr").val(),
                    "BaoXiaoBM":this.formData.bxbm,//"报销部门编号",
                    "BaoXiaoRQ":this.formData.bxDate,
                    "BaoXiaoSY":this.formData.bxsy,
                    "ZhiChuSX":this.formData.zcsx,//"支出事项编号",
                    "BeiZhu":this.formData.bzxx,
                    "DuiYingDJ":this.formData.htmc || this.formData.zxApply || this.formData.zjApply,//"对应单据编号(合同/执行申请单/资金申请单)",
                    "KeYongYE":this.kyye.replace(/,/gi, ''),
                    "HeTongJD":this.formData.htjd,//"合同阶段编号",
                    "FuJianXX":this.formData.FileList,
                    /*"ZhiChuXX":[//支出明细
                        {
                            "ZhiChuMXBH":"支出明细编号",
                            "JinE":"申请金额",
                            "BiaoZhuFY":"标准费用",
                            "FeiYongMX":[
                                {
                                    "MingXiBH":"费用明细编号",
                                    "MingXiZ":[             //明细值
                                        "值1","值2"
                                    ]
                                }
                            ]
                        }
                    ],*/
                    "FuZhuSX":[],
                    /*"FuZhuSX":[
                        {
                            "FuZhuSXBH":"辅助事项编号",
                            "FuZhuSXZ":"辅助事项值"
                        }
                    ],*/
                    /*"JieSuanXX":[{
                        "JieSuanFS":"结算方式",
                        "JieSuanJE":"结算金额",
                        "Content":[
                            {
                                "Key":"结算方式对应的key",
                                "Value":"填写的值"
                            }
                        ]
                    }]*/
                };
                if(this.ZhiChuMX.length>0){
                    var _ZhiCuXX = [];
                    _.forEach(this.ZhiChuMX, function (value, key) {
                        var c = _.flatMapDepth(value.FeiYongMX, function (value, key, collection) {
                            return value;
                        }, 1);
                        var _FeiYongMX = [];
                        var total = 0;
                        _.forEach(_.groupBy(c,'BianHao'), function(value, key) {
                            if(key == 'undefined'){
                                _.forEach(_.map(value,'FeiYongMXZ'),function (value,key) {
                                    total += _.toNumber(value);
                                });
                                console.info(total);
                            } else {
                                _FeiYongMX.push({
                                    'MingXiBH': key,
                                    'MingXiZ': _.map(value,'FeiYongMXZ')||[]
                                });
                            }
                        });
                        _ZhiCuXX.push({
                            'ZhiChuMXBH': value.BianHao || value.ZCMXBianHao,
                            'FeiYongMX': _FeiYongMX,
                            'JinE': value.JinE || value.ZCMXJinE,
                            'BiaoZhuFY':isNaN(total)? 0 : total
                        });
                    });
                    console.log(_ZhiCuXX);
                    formdata.ZhiChuXX = _ZhiCuXX;
                }
                if(this.formData.jsfs.length>0){
                    var JieSuanXX = [];
                    $.each(this.formData.jsfs,function (i,o) {
                        var jsxx = {};
                        jsxx.Content = [];
                        $.each(o.record.Content,function (j,k) {
                            jsxx.Content.push({
                                'Key': k.key,
                                'Value': k.Value
                            })
                        });
                        $.extend(jsxx, {
                            'JieSuanJE': o.JinE,
                            'JieSuanFS': o.currentVal
                        });
                        JieSuanXX.push(jsxx)
                    });
                    console.info(JieSuanXX);
                    formdata.JieSuanXX = JieSuanXX;
                }

                console.info(formdata);

                var lcData = {
                    YuSuanND:_userinfo.NianDu,
                    DanWeiBH:$.fn.cookie('ShenQingDW'),
                    ZhiChuSX:this.formData.zcsx,
                    ZhiBiao:this.formData.zbmcbh,
                    DanJuBH:this.formData.bxlx
                };
                fetch(Global.baseUrl + "/bpm/common/getLiuChenXX",{
                    method: 'post',
                    body: JSON.stringify(lcData),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                    .then(res =>res.json())
                    .then(json =>{
                        console.info(json);
                        if(json.msgCode=='1'){
                            if(json.list.length == 1){
                                formdata.FlowId = json.list[0].BianHao;
                                saveData(formdata);
                            }else if(json.list.length > 1){
                                vm.lc = true;
                                vm.lcConfig.options = json.list;
                                var lcxx = this.$refs.lcxx;
                                lcxx.show();

                            }
                        }
                    });


            }

        },
        computed: {
            total() {
                let total = 0;
                $.each(this.ZhiChuMX, function (index, item) {
                    total += parseFloat((item.ZCMXJinE || item.JinE || 0));
                });
                return _.toString(total);
            }
        },

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
function saveData(data) {
    fetch(Global.baseUrl + "/bpm/bxsq/save",{
        method: 'post',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(res =>res.json())
        .then(json =>{
            console.info(json);
            if(json.msgCode=='0'){
                weui.topTips(json.msg);
            }else if(json.msgCode=='1'){
                location.href="applyLists.html"
            }
        });
}
