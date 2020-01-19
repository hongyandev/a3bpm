define(['vue', 'weui'], function (Vue, weui) {
    return Vue.extend({
        name: 'WeuiOcr',
        template: `<div :id="uploaderid">
            <label :for="id">
                <img class="weui-uploader__image" src="css/images/scan.png"/>
             </label>
            <input :id="id" class="weui-uploader__input" style="display: none" type="file" accept="image/*" capture="camera" />
        </div>`,
        props: {
            id: {
                type: String,
                default: ''
            },
            ocr: {
                type: String,
                default: ''
            },
            options: {
                type: Object,
                default: function () {
                    return {}
                }
            },
            target: {
                type: Array,
                default: function () {
                    return []
                }
            }
        },
        data: function () {
            return {
                _id : 0,
                apis: [
                    {
                        index: '2',
                        key: "vat_invoice",
                        value: "增值税发票"
                    },
                    {
                        index: '1',
                        key: "train_ticket",
                        value: "火车票",
                        title: "扫车票"
                    },
                    {
                        index: '3',
                        key: "bankcard",
                        value: "银行卡"
                    }
                ]
            }
        },
        computed: {
            api: function() {
                var self = this;
                return self.apis.filter(function(api){
                    return api.index === self.ocr;
                })[0]['key'];
            },
            uploaderid: function () {
                return this.id + Math.ceil(Math.random() * 10)
            }
        },
        mounted: function () {
            var self = this;
            weui.uploader('#' + self.uploaderid, {
                url: self.options.url,
                auto: self.options.auto,
                type: self.options.type,
                fileVal: self.options.fileVal,
                compress: self.options.compress,
                onBeforeQueued: function (files) {
                    // `this` 是轮询到的文件, `files` 是所有文件

                    if(["image/jpg", "image/jpeg", "image/png", "image/gif"].indexOf(this.type) < 0){
                        weui.alert('请上传图片');
                        return false; // 阻止文件添加
                    }

                    if (files.length > 1) { // 防止一下子选择过多文件
                        weui.alert('单次只能识别1张图片，请重新选择');
                        return false;
                    }
                },
                onQueued: function(){
                    // console.log(this.status); // 文件的状态：'ready', 'progress', 'success', 'fail'
                    // console.log(this.base64); // 如果是base64上传，file.base64可以获得文件的base64

                    // this.upload(); // 如果是手动上传，这里可以通过调用upload来实现；也可以用它来实现重传。
                    // this.stop(); // 中断上传

                    return true; // 阻止默认行为，不显示预览图的图像
                },
                onBeforeSend: function (data, headers) {
                    // $.extend(data, { test: 1 }); // 可以扩展此对象来控制上传参数
                    $.extend(data, {api: self.api});
                    // $.extend(headers, { Origin: 'http://127.0.0.1' }); // 可以扩展此对象来控制上传头部
                    // return false; // 阻止文件上传
                    self.loading = weui.loading('识别中...');
                    return true;
                },
                onSuccess: function (ret) {
                    self.loading.hide();
                    console.log(this, ret);
                    if (typeof self.options.onSuccess === 'function')
                        self.options.onSuccess(ret, self.target)
                    // return true; // 阻止默认行为，不使用默认的成功态
                    return true;
                },
                onError: function(err){
                    self.loading.hide();
                    console.log(this, err);
                    if (typeof self.options.onError === 'function')
                        self.options.onError(err)
                    // return true; // 阻止默认行为，不使用默认的失败态
                    return true;
                }
            })
        }
    })
})
