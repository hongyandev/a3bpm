$(function () {
    config({
        // jsApiList: ['biz.util.open','device.geolocation.get'], // 需要鉴权使用的jsapi
        onSuccess: function (userinfo) {
            Vue.component("li-notice", {
                props: {
                    lists:Array
                },
                template: "#li-notice",
                methods:{
                    click:function (index) {
                        let self = this;
                        self.$emit('lifun', index);
                    }
                }
            });
            var DanWeiBH = JSON.parse($.fn.cookie('DanWei')).DanWeiBH || userinfo.DanWeiBH;
            var vm = new Vue({
                el:"#notice",
                data:{
                    lists:[]
                },
                methods:{
                    goDetail:function (res) {
                        console.info(res);
                        location.href='messageDetail.html?bh='+res
                    }
                },
                mounted:function () {
                    let data={
                        DanWeiBH:DanWeiBH,//"BXBH201906130002",
                        YongHuBH:userinfo.YongHuBH,//'XTYH201905300002'
                        pageNum:Number.MAX_VALUE
                    };
                    let self = this;
                    fetch(Global.baseUrl + '/bpm/tzgg/list', {
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