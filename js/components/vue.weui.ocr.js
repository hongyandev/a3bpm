Vue.component("weui-ocr", {
    data() {
        return {
            _id: 0,
            api: "",
            apis: [{
                index: 2,
                key: "vat_invoice",
                value: "增值税发票",
                title: "扫发票"
            }, {
                index: 1,
                key: "train_ticket",
                value: "火车票",
                title: "扫车票"
            }, {
                index: 3,
                key: "bankcard",
                value: "银行卡",
                title: "银行卡"
            }],
            options: {}
        }
    },
    computed: {
        apilist() {
            var list = [];
            var self = this;
            list.push(_.find(self.apis, {'index': self.ocr}));
            return list;
        }
    },
    props: ["id","config","ocr","target"],
    mounted: function () {
        var self = this;
        var options = $.extend({
            target: this.target,
            url: '',
            auto: true,
            type: 'file',
            fileVal: 'file',
            xhrFields: {},
            onBeforeSend: $.noop,
            onSuccess: $.noop,
            onError: $.noop
        }, this.config.options);
        if(options.compress !== false){
            options.compress = $.extend({
                width: 1600,
                height: 1600,
                quality: .8
            }, options.compress);
        }
        if(options.onBeforeSend){
            const onBeforeSend = options.onBeforeSend;
            options.onBeforeSend = function(file, data, headers){
                $.extend(data, {api: self.api});
                const ret = onBeforeSend.call(file, data, headers);
                if(ret === false){
                    return false;
                }
            };
        }
        if(options.onSuccess){
            const onSuccess = options.onSuccess;
            options.onSuccess = function(file, ret, target){
                file.status = 'success';
                if(!onSuccess.call(file, ret, target)){
                    if(self.$parent.callback)
                        self.$parent.callback(target);
                }
            };
        }
        if(options.onError){
            const onError = options.onError;
            options.onError = function(file, err){
                file.status = 'fail';
                if(!onError.call(file, err)){
                }
            };
        }
        this.options = options;
        $(".weui-uploader__input").on("change", function (evt) {
            const files = evt.target.files;
            if (files.length === 0) {
                return;
            }
            if(options.compress === false && options.type == 'file'){
                // 以原文件方式上传
                Array.prototype.forEach.call(files, (file) => {
                    file.id = ++self._id;
                    self.setUploadFile(file);
                });
            }else{
                // base64上传 和 压缩上传
                Array.prototype.forEach.call(files, (file) => {
                    file.id = ++self._id;
                    compress(file, options, function(blob){
                        if(blob) self.setUploadFile(blob);
                    });
                });
            }
            this.value = '';
        })
    },
    methods: {
        click: function () {
            if(this.apilist.length > 1) {
                $(this.$el).find(".selectDialog").show();
            } else {
                this.selected(this.apilist[0]);
            }
        },
        selected: function(item) {
            this.api = item.key;
            $(this.$el).find(".selectDialog").hide();
            $(this.$el).find('input[type="file"]').click();
        },
        close: function () {
            $(this.$el).find(".selectDialog").hide();
        },
        setUploadFile: function (file) {
            const self = this;
            file.url = URL.createObjectURL(file);
            file.status = 'ready';
            file.upload = function () {
                self.upload($.extend({
                    file: file
                }, self.options));
            };
            file.stop = function(){
                this.xhr.abort();
            };
            if(self.options.auto) file.upload();
        },
        upload: function(options) {
            var loading = weui.loading('loading', {
                className: 'custom-classname'
            });
            const {url, file, fileVal, onBeforeSend, onError, onSuccess, xhrFields, target} = options;
            const {name, type, lastModifiedDate} = file;
            const data = {
                name: name,
                type: type,
                size: options.type == 'file' ? file.size : file.base64.length,
                lastModifiedDate: lastModifiedDate
            };
            const headers = {};
            if(onBeforeSend(file, data, headers) === false) return;
            file.status = 'progress';
            if(options.type == 'file'){
                const formData = new FormData();
                const xhr = new XMLHttpRequest();
                file.xhr = xhr;
                // 设置参数
                Object.keys(data).forEach((key) => {
                    formData.append(key, data[key]);
                });
                formData.append(fileVal, file, name);
                xhr.onreadystatechange = function () {
                    if (xhr.readyState == 4) {
                        if (xhr.status == 200) {
                            try {
                                // 只支持json
                                const ret = JSON.parse(xhr.responseText);
                                onSuccess(file, ret, target);
                            } catch (err) {
                                onError(file, err);
                            }
                        } else {
                            onError(file, new Error('XMLHttpRequest response status is ' + xhr.status));
                        }
                    }
                };
                xhr.open('POST', url);
                Object.keys(xhrFields).forEach((key) => {
                    xhr[key] = xhrFields[key];
                });
                // 设置头部信息
                Object.keys(headers).forEach((key) => {
                    xhr.setRequestHeader(key, headers[key]);
                });
                xhr.send(formData);
            }else{
                data[fileVal] = file.base64;
                $.ajax({
                    url: url,
                    type: 'POST',
                    dataType: "json",
                    headers: headers || {},
                    contentType: 'application/json',
                    data: JSON.stringify(data),
                    success: function (ret) {
                        loading.hide(function() {
                            console.log('`loading` has been hidden');
                        });
                        onSuccess(file, ret, target);
                    },
                    error: function (xhr, type) {
                        loading.hide(function() {
                            console.log('`loading` has been hidden');
                        });
                        onError(file, new Error('XMLHttpRequest response status is ' + xhr.status));
                    }
                });
            }
        }
    },
    template:
    '    <div>\n' +
    '        <button class="weui-btn" :class="config.class" @click="click()">{{apilist.length==1 ? apilist[0].title : "扫一扫"}}</button>\n' +
    '        <div v-if="apilist.length > 1" class="selectDialog" style="display: none;">\n' +
    '            <div class="dialogInfo">\n' +
    '                <h3 class="selectTitle">请选择</h3>\n' +
    '                <div class="selectCon">\n' +
    '                    <ul class="selList">\n' +
    '                        <li v-for="item in apilist" @click="selected(item)">{{item.value}}</li>\n' +
    '                    </ul>\n' +
    '                </div>\n' +
    '                <div class="selectBottom">\n' +
    '                    <ul class="row">\n' +
    '                        <li class="" @click="close()"><a href="javascript:void(0)">取消</a></li>\n' +
    '                    </ul>\n' +
    '                </div>\n' +
    '            </div>\n' +
    '            <div class="dialogBg"></div>\n' +
    '        </div>\n' +
    '        <input class="weui-uploader__input" style="z-index: -999; width: 1px; height: 1px" type="file" accept="image/*" capture="camera" />\n' +
    '    </div>'
});