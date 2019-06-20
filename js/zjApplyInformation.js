$(function () {
    var vm = new Vue({
        el: "#tab",
        data: {
            formData: {}
        },
        methods: {
            gotoTab: function (index) {
                $($(".weui-navbar__item").get(index)).click();
            },
            getFormData: function (BianHao, RenWuID, LiuChengId, DangQianJD) {
                var loading = weui.loading('loading', {
                    className: 'custom-classname'
                });
                vm.formData = testData;
                loading.hide();
                /*
                $.ajax({
                    type: 'post',
                    url: Global.baseUrl + '/bpm/zjsqdbsp/detail',
                    contentType: 'application/json',
                    data: JSON.stringify({
                        "BianHao": BianHao,
                        "RenWuID": RenWuID || "",
                        "LiuChengId": LiuChengId,
                        "DangQianJD": DangQianJD || ""
                    }),
                    success: function (res) {
                        if(res.code==200){
                            this.formData = res.data;
                        }
                    },
                    complete: function () {
                        loading.hide();
                    },
                    context: this
                });
                */
            }
        }
    });
    weui.tab('#tab',{
        defaultIndex: 0,
        onChange: function(index){
            console.log(index);
        }
    });
    vm.getFormData(_request.BianHao, _request.RenWuID, _request.LiuChengId, _request.DangQianJD);
    /*
    config({
        onSuccess: function (userinfo) {
            vm.getFormData(_request.BianHao, _request.RenWuID, _request.LiuChengId, _request.DangQianJD);
        }
    });
    */
})