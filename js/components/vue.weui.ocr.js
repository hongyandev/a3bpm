Vue.component("weui-ocr", {
    data() {
        return {
            _id: 0,
            api: "",
            apis: [{
                index: '2',
                key: "vat_invoice",
                value: "增值税发票"
            }, {
                index: '1',
                key: "train_ticket",
                value: "火车票",
                title: "扫车票"
            }, {
                index: '3',
                key: "bankcard",
                value: "银行卡"
            }],
            options: {}
        }
    },
    computed: {
        apilist() {
            //var list = [];
            return this.apis.filter(api => api.index === this.ocr+'')[0];
            //list.push(_.find(this.apis, {'index': this.ocr+''}));
            //return list;
        }
    },
    props: ["id","config","ocr","target"],
    mounted: function () {
        this.$nextTick(function () {
            var self = this;
            var options = $.extend({
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
            $("#"+this.id).on("change", function (evt) {
                const files = evt.target.files;
                if (files.length === 0) {
                    return;
                }
                if(options.compress === false && options.type == 'file'){
                    // 以原文件方式上传，不压缩
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
        })

    },
    methods: {
        click: function () {
            this.selected(this.apilist);
        },
        selected: function(item) {
            this.api = item.key;
            //$(this.$el).find(".selectDialog").hide();
            $('#'+this.id).click();
        },
        close: function () {
            $(this.$el).find(".selectDialog").hide();
        },
        setUploadFile: function (file) {
            const self = this;
            file.url = URL.createObjectURL(file);
            file.status = 'ready';
            file.upload = function (target) {
                self.upload($.extend({
                    file: file
                }, self.options), target);
            };
            file.stop = function(){
                this.xhr.abort();
            };
            if(self.options.auto) file.upload(self.target);
        },
        upload: function(options, target) {
            var loading = weui.loading('识别中...', {
                className: 'custom-classname'
            });
            const {url, file, fileVal, onBeforeSend, onError, onSuccess, xhrFields} = options;
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
                            onError(file, new Error('识别失败，请拍摄清晰完整的票面。'));
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
                        loading.hide();
                        onSuccess(file, ret, target);
                    },
                    error: function (xhr, type) {
                        loading.hide();
                        onError(file, new Error('识别失败，请拍摄清晰完整的票面。'));
                    }
                });
            }
        }
    },
    template:
    '<div>' +
    '<button class="weui-btn" :class="config.class" @click="click()">扫一扫</button>' +
    '<input :id="id" class="weui-uploader__input" style="z-index: -999; width: 1px; height: 1px" type="file" accept="image/*" capture="camera" />' +
    '</div>'
    /*'    <div>\n' +
    '        <button class="weui-btn" :class="config.class" @click="click()">扫一扫</button>\n' +
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
    '        <input class="weui-uploader__input" style="z-index: -999; width: 1px; height: 1px" type="file" accept="image/!*" capture="camera" />\n' +
    '    </div>'*/

});