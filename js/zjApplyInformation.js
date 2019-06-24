$(function () {
    var vm = new Vue({
        el: "#tab",
        data: {
            formData: {},
            submitData: {
                ShenPiYJ : "",
                ShenPiYS : [],
                FileList : []
            },
            uploaderFiles: [],
            uploaderOptions : {
                // url : Global.baseUrl + "/bpm/common/upload2",
                url : "http://localhost:8082/bpm/common/upload2",
                type : "base64",
                fileval : "fileBase64",
                filekey : "FuJianMC",
                maxsize : 5,
                maxcount : 9,
                onSuccess : function (ret) {
                    if(ret.msgCode == "1") {
                        return ret.list[0];
                    }
                }
            }
        },
        methods: {
            getValue: function (t) {
                console.log(t)
            },
            submitForm: function (next) {
                this.submitData.ShenQingBMBH = this.formData.DanJuXX.ShenQingBMBH;
                this.submitData.BaoXiaoJE = this.formData.DanJuXX.JieKuanJE.replace(/,/gi, '');
                this.submitData.DanJuLX = this.formData.DanJuXX.JieKuanDLX;
                this.submitData.Next = next;
                console.log(this.submitData);
                // $.ajax()
            },
            gotoTab: function (index) {
                $($(".weui-navbar__item").get(index)).click();
            },
            getFormData: function (BianHao, RenWuID, LiuChengId, DangQianJD) {
                this.submitData.YongHuBH = '用户编号';
                this.submitData.DanJuBH = BianHao;
                this.submitData.LiuChengId = LiuChengId;
                this.submitData.TaskId = RenWuID || "";
                this.submitData.DangQianJD = DangQianJD || "";
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