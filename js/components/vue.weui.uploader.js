Vue.component('weui-uploader', {
    data: function () {
        return {
            count: 0
        }
    },
    props: ['id', 'title', 'options', 'files'],
    mounted: function () {
        var self = this;
        weui.uploader('#' + self.id, {
            url: self.options.url,
            auto: true,
            type: self.options.type || 'file',
            fileVal: self.options.fileval || 'file',
            compress: {
                width: 1600,
                height: 1600,
                quality: .8
            },
            onBeforeQueued: function (files) {
                // 文件添加前的回调，return false则不添加
                // `this` 是轮询到的文件, `files` 是所有文件
                // console.log(this);
                if (["image/jpg", "image/jpeg", "image/png", "image/gif"].indexOf(this.type) < 0) {
                    weui.alert('请上传图片');
                    return false; // 阻止文件添加
                }
                if (this.size > self.options.maxsize * 1024 * 1024) {
                    weui.alert('请上传不超过' + self.options.maxsize + 'M的图片');
                    return false;
                }
                if (files.length > self.options.maxcount) { // 防止一下子选择过多文件
                    weui.alert('最多只能上传' + self.options.maxcount + '张图片，请重新选择');
                    return false;
                }
                if (self.count + 1 > self.options.maxcount) {
                    weui.alert('最多只能上传' + self.options.maxcount + '张图片');
                    return false;
                }
                ++self.count;
            },
            onQueued: self.options.onQueued || function () {
                // 文件添加成功的回调
                // console.log(this.status); // 文件的状态：'ready', 'progress', 'success', 'fail'
                // console.log(this.base64); // 如果是base64上传，file.base64可以获得文件的base64
                // this.upload(); // 如果是手动上传，这里可以通过调用upload来实现；也可以用它来实现重传。
                // this.stop(); // 中断上传
                // return true; // 阻止默认行为，不显示预览图的图像
                // console.log(this);
                $(".weui-uploader__file").on("click", function () {
                    var url = function (str) {
                        return str;
                    };
                    var li = this;
                    var gallery = weui.gallery(eval($(li).css('background-image')), {
                        className: 'weui-gallery',
                        onDelete: function(){
                            // console.log("onBeforeDelete: ", self.files);
                            if(confirm('确定删除该图片？')){
                                var filekey = $(li).attr("filekey");
                                var deleteIndex = -1;
                                $.each(self.files, function(index, item){
                                    if(filekey === item[self.options.filekey]) {
                                        deleteIndex = index;
                                    }
                                })
                                if(deleteIndex !== -1){
                                    self.files.splice(deleteIndex, 1);
                                    // console.log("onDelete: ", self.files);
                                }
                                $(li).remove();
                                self.count --;
                            }
                            gallery.hide(function() {
                                // console.log('gallery has been hidden');
                            });
                        }
                    });
                })
            },
            onBeforeSend: self.options.onBeforeSend || function (data, headers) {
                // 文件上传前调用
                // $.extend(data, { test: 1 }); // 可以扩展此对象来控制上传参数
                // $.extend(headers, { Origin: 'http://127.0.0.1' }); // 可以扩展此对象来控制上传头部
                // return false; // 阻止文件上传
            },
            onProgress: self.options.onProgress || function (procent) {
                // 上传进度的回调
                // return true; // 阻止默认行为，不使用默认的进度显示
            },
            onSuccess: function (ret) {
                // 上传成功的回调
                // return true; // 阻止默认行为，不使用默认的成功态
                // console.log(this);
                // console.log(ret);
                var file = self.options.onSuccess(ret);
                $(".weui-uploader__file[data-id='"+this.id+"']").attr("filekey", file[self.options.filekey]);
                self.files.push(file)
                // console.log("onSuccess: ", self.files);
            },
            onError: self.options.onError || function (err) {
                // 上传失败的回调
                // return true; // 阻止默认行为，不使用默认的失败态
            }
        });
    },
    template:
    '            <div v-bind:id="id" class="weui-panel weui-panel_access">\n' +
    '                <div class="weui-gallery"></div>' +
    '                <div class="weui-panel__hd">{{title}} <span>{{count}}/{{options.maxcount}}</span></div>\n' +
    '                <div class="weui-panel__bd">\n' +
    '                    <div class="weui-uploader" style="padding: 15px">\n' +
    '                        <div class="weui-uploader__bd">\n' +
    '                            <ul class="weui-uploader__files"></ul>\n' +
    '                            <div class="weui-uploader__input-box">\n' +
    '                                <input class="weui-uploader__input" type="file" accept="image/*" multiple="" />\n' +
    '                            </div>' +
    '                        </div>\n' +
    '                    </div>\n' +
    '                </div>\n' +
    '            </div>'
})