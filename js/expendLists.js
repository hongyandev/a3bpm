$(function () {
    config({
        // jsApiList: ['biz.util.open','device.geolocation.get'], // 需要鉴权使用的jsapi
        onSuccess: function (userinfo) {
            //alert("just du it!");
            var NianDu = $.fn.cookie('NianDu') || userinfo.NianDu;
            var DanWeiBH = JSON.parse($.fn.cookie('DanWei')).DanWeiBH || userinfo.DanWeiBH;
            Vue.component("li-expend", {
                props: {
                    lists:Array
                },
                template: "#li-expend",
                methods:{
                    click:function (index) {
                        let self = this;
                        self.$emit('lifun', index);
                    }
                }
            });
            var vm = new Vue({
                el:"#expendLists",
                data:{
                    lists:[]
                },
                methods:{
                    goDetail:function (res) {
                        console.info(res);
                        location.href='zcznDetail.html?bh='+res
                    }
                },
                mounted:function () {
                    let data={
                        DanWeiBH: DanWeiBH,//"GLZZ201905240001",
                        NianDu: NianDu,//'2019'
                    };
                    let self = this;
                    fetch(Global.baseUrl + '/bpm/zczn/list', {
                        method: 'post',
                        body: JSON.stringify(data),
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    }).then(res => res.json())
                        .then(json => {
                            console.info(json);
                            self.lists = json.list
                    });
                }
            });
        }
    });
})