$(function () {
    var vm = new Vue({
        el: "#tab",
        data: {
            formData: {},
            yb: 0 || !_request.RenWuID,
            submitData: {
                ShenPiYJ : "",
                ShenPiYS : [],
                FileList : []
            },
            uploaderFiles: [],
            uploaderOptions : {
                url : Global.baseUrl + "/bpm/common/upload3",
                type : "file",
                fileval : "file",
                filekey : "FuJianMC",
                maxsize : 5,
                maxcount : 1,
                onSuccess : function (ret) {
                    if(ret.msgCode == "1") {
                        return ret.list[0];
                    }
                }
            }
        },
        methods: {
            submitForm: function (next) {
                this.submitData.ShenQingBMBH = this.formData.DanJuXX.ShenQingBMBH;
                this.submitData.HeTongJE = this.formData.DanJuXX.HeTongJE.replace(/,/gi, '');
                this.submitData.DanJuLX = this.formData.DanJuXX.JieKuanDLX;
                this.submitData.FileList = this.submitData.FileList[0] || {};
                this.submitData.Next = next;
                // console.log(this.submitData);
                var loading = weui.loading('正在提交', {
                    className: 'weui-tab'
                });
                $.ajax({
                    type: "post",
                    url: Global.baseUrl +'/bpm/htgldbsp/bgapprove',
                    data: JSON.stringify(this.submitData),
                    contentType: 'application/json',
                    xhrFields: {
                        withCredentials: false
                    },
                    success: function(data) {
                        if(data.msgCode === "1") {
                            weui.toast("审批成功",3000);
                            location.href = "applyLists.html";
                        } else {
                            weui.topTips(data.msg);
                        }
                    },
                    error: function(XMLHttpRequest, textStatus, errorThrown) {
                    },
                    complete: function () {
                        loading.hide();
                    }
                })
            },
            gotoTab: function (index) {
                $($(".weui-navbar__item").get(index)).click();
            },
            getFormData: function (YongHuBH, BianHao, RenWuID, LiuChengId, DangQianJD) {
                this.submitData.YongHuBH = YongHuBH;
                this.submitData.DanJuBH = BianHao;
                this.submitData.LiuChengId = LiuChengId;
                this.submitData.TaskId = RenWuID;
                this.submitData.DangQianJD = DangQianJD;
                var loading = weui.loading('正在加载', {
                    className: 'weui-tab'
                });
                /*vm.formData = testData;
                loading.hide();*/
                $.ajax({
                    type: 'post',
                    url: Global.baseUrl + '/bpm/htgldbsp/bgdetail',
                    contentType: 'application/json',
                    data: JSON.stringify({
                        "BianHao": BianHao,
                        "RenWuID": RenWuID || "",
                        "LiuChengId": LiuChengId,
                        "DangQianJD": DangQianJD || ""
                    }),
                    success: function (res) {
                        if(res.msgCode==="1"){
                            this.formData = res;
                        }
                    },
                    complete: function () {
                        loading.hide();
                    },
                    context: this
                });
            }
        },

    });
    weui.tab('#tab',{
        defaultIndex: 0,
        onChange: function(index){
            // console.log(index);
        }
    });
    // vm.getFormData("XTYH201905300002", "JKDH201906190001", "510225", "2019318155749.510217", "单位财务负责人");
    config({
        onSuccess: function (userinfo) {
            //const messObj = $.fn.cookie('messStr');
            //const messStr = messObj ? JSON.parse(messObj) : "";
            vm.yb = (_request.yb==1) || (!_request.RenWuID) || false;
            vm.getFormData(userinfo.YongHuBH, _request.BianHao, _request.RenWuID, _request.LiuChengId, decodeURI(_request.DangQianJD));
        }
    });
})