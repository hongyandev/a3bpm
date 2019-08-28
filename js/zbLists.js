$(function () {
    config({
        // jsApiList: ['biz.util.open','device.geolocation.get'], // 需要鉴权使用的jsapi
        onSuccess: function (userinfo) {
            //alert("just du it!");
           // $.fn.cookie('ShenQingDW',userinfo.DanWeiBH);
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
            }
        }
    });
  /*  var zbmcdata = {
        BuMenBH: _userinfo.BuMenBH,//'GLZZ201905250002',
        NianDu: _userinfo.NianDu,//'2019',
        YongHuBH: _userinfo.YongHuBH,//'XTYH201905300002',
        BaoXiaoLX:'',
        ZhiBiaoMC: '',
        DanJuBH:''
    };*/
    var result = [];
    var formdata;
    var vm = new Vue({
        el: "#zbLists",
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
            zbmcConfig: {
                options: [],
                disField: "zhiBiaoMC",
                keyField: "bianHao",
                showsearch:true,
                fields: [{
                    name: '指标名称',
                    key: 'zhiBiaoMC'
                },{
                    name: '批复金额',
                    key: 'piFu'
                }, {
                    name: '可用余额',
                    key: 'keYongYE'
                },{
                    name: '执行率',
                    key: 'zhiXingLv'
                }],
                searchZbmc:function(e){
                    zbmcdata.BaoXiaoLX = vm.formData.bxlx;
                    zbmcdata.DanJuBH = "";
                    zbmcdata.ZhiBiaoMC = e.target.value;
                    console.info(e);
                    zbmcList(vm,zbmcdata);
                },
                showBeforeCallback:function () {

                },
                onclickCallback: function (res) {

                }
            },
        },
        mounted: function () {

        },
        methods:{


        },
        computed: {

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
