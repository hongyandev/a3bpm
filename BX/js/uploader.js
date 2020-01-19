define(['zepto'], function($){
    return function uploader(selector, options) {
        var $uploader = $(selector);
        var URL = window.URL || window.webkitURL || window.mozURL;

        // 找到DOM里file-content，若无，则插入一个。
        function findFileCtn($uploader, id){
            const $file = $uploader.find('[data-id="' + id + '"]');
            let $fileCtn = $file.find('.weui-uploader__file-content');

            if(!$fileCtn.length){
                $fileCtn = $('<div class="weui-uploader__file-content"></div>');
                $file.append($fileCtn);
            }
            $file.addClass('weui-uploader__file_status');
            return $fileCtn;
        }

        // 清除DOM里的上传状态
        function clearFileStatus($uploader, id){
            var $file = $uploader.find('[data-id="' + id + '"]').removeClass('weui-uploader__file_status');
            $file.find('.weui-uploader__file-content').remove();
        }

        // 设置上传
        function setUploadFile(file) {
            file.url = URL.createObjectURL(file);
            file.status = 'ready';
            file.upload = function () {
                upload($.extend({
                    $uploader: $uploader,
                    file: file
                }, options));
            };
            file.stop = function(){
                this.xhr.abort();
            };

            options.onQueued(file);
            if(options.auto) file.upload();
        }

        options = $.extend({
            url: '',
            auto: true,
            type: 'file',
            fileVal: 'file',
            xhrFields: {},
            onBeforeQueued: $.noop,
            onQueued: $.noop,
            onBeforeSend: $.noop,
            onSuccess: $.noop,
            onProgress: $.noop,
            onError: $.noop
        }, options);

        if(options.compress !== false){
            options.compress = $.extend({
                width: 1600,
                height: 1600,
                quality: .8
            }, options.compress);
        }

        if(options.onBeforeQueued){
            const onBeforeQueued = options.onBeforeQueued;
            options.onBeforeQueued = function(file, files){
                const ret = onBeforeQueued.call(file, files);
                if(ret === false){
                    return false;
                }
                if(ret === true){
                    return;
                }

                const $item = $($.render(tplItem, {
                    id: file.id
                }));
                $uploader.find('.weui-uploader__files').append($item);
            };
        }

        if(options.onQueued){
            const onQueued = options.onQueued;
            options.onQueued = function(file){
                if(!onQueued.call(file)){
                    const $file = $uploader.find('[data-id="' + file.id + '"]');
                    $file.css({
                        backgroundImage: 'url("' + (file.base64 || file.url) + '")'
                    });
                    if(!options.auto) {
                        clearFileStatus($uploader, file.id);
                    }
                }
            };
        }

        if(options.onBeforeSend){
            const onBeforeSend = options.onBeforeSend;
            options.onBeforeSend = function(file, data, headers){
                const ret = onBeforeSend.call(file, data, headers);
                if(ret === false){
                    return false;
                }
            };
        }

        if(options.onSuccess){
            const onSuccess = options.onSuccess;
            options.onSuccess = function(file, ret){
                file.status = 'success';
                if(!onSuccess.call(file, ret)){
                    clearFileStatus($uploader, file.id);
                }
            };
        }

        if(options.onProgress){
            const onProgress = options.onProgress;
            options.onProgress = function(file, percent){
                if(!onProgress.call(file, percent)){
                    findFileCtn($uploader, file.id).html(percent + '%');
                }
            };
        }

        if(options.onError){
            const onError = options.onError;
            options.onError = function(file, err){
                file.status = 'fail';
                if(!onError.call(file, err)){
                    findFileCtn($uploader, file.id).html('<i class="weui-icon-warn"></i>');
                }
            };
        }

        $uploader.find('input[type="file"]').on('change', function (evt) {
            const files = evt.target.files;

            if (files.length === 0) {
                return;
            }

            if(options.compress === false && options.type == 'file'){
                // 以原文件方式上传
                Array.prototype.forEach.call(files, (file) => {
                    file.id = ++_id;

                    if(options.onBeforeQueued(file, files) === false) return;

                    setUploadFile(file);
                });
            }else{
                // base64上传 和 压缩上传
                Array.prototype.forEach.call(files, (file) => {
                    file.id = ++_id;

                    if(options.onBeforeQueued(file, files) === false) return;

                    compress(file, options, function(blob){
                        if(blob) setUploadFile(blob);
                    });
                });
            }

            this.value = '';
        });
    }
})