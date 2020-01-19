define(['vue', 'weui'], function (Vue, weui) {
    return Vue.extend({
        name: 'WeuiUploader',
        template: `<div :id="id" class="weui-panel weui-panel_access">
            <div class="weui-gallery"></div>
            <div class="weui-panel__hd">{{title}} <span>{{images.length}}/{{options.max}}</span></div>
            <div class="weui-panel__bd">
                <div class="weui-uploader" style="padding: 0px 0px 15px 15px">
                    <div class="weui-uploader__bd">
                        <ul class="weui-uploader__files"></ul>
                        <div class="weui-uploader__input-box">
                            <input class="weui-uploader__input" type="file" accept="image/*" capture="camera" multiple="" />
                        </div>
                    </div>
                </div>
            </div>
        </div>`,
        props: {
            id: String, // id
            title: String, // 标题
            options: {}, // 其他配置项
            images: {
                type: Array,
                default: function () {
                    return []
                }
            }
        },
        model: {
            prop: "images", // 绑定的值,通过父组件传递
            event: "update" // 自定义事件名
        },
        watch: {
            images : function(val, oldVal) {
                this.$emit('update', val)
            }
        },
        mounted: function () {
            var self = this
            weui.uploader('#' + self.id, {
                url: self.options.url,
                auto: self.options.auto,
                type: self.options.type || 'file',
                fileVal: self.options.fileVal || 'file',
                compress: {
                    width: 1600,
                    height: 1600,
                    quality: .8
                },
                onBeforeQueued: function(files) {
                    // `this` 是轮询到的文件, `files` 是所有文件
                    if(["image/jpg", "image/jpeg", "image/png", "image/gif"].indexOf(this.type) < 0){
                        weui.alert('请上传图片');
                        return false; // 阻止文件添加
                    }
                    if(this.size > self.options.maxM * 1024 * 1024){
                        weui.alert('请上传不超过10M的图片');
                        return false;
                    }
                    if (files.length > 5) { // 防止一下子选择过多文件
                        weui.alert('单次最多只能选择5张图片，请重新选择');
                        return false;
                    }
                    if (self.images.length + 1 > self.options.max) {
                        weui.alert('最多只能上传'+self.options.max+'张图片');
                        return false;
                    }
                    // return true; // 阻止默认行为，不插入预览图的框架
                },
                onQueued: function(){
                    console.log(this);
                    // console.log(this.status); // 文件的状态：'ready', 'progress', 'success', 'fail'
                    // console.log(this.base64); // 如果是base64上传，file.base64可以获得文件的base64

                    // this.upload(); // 如果是手动上传，这里可以通过调用upload来实现；也可以用它来实现重传。
                    // this.stop(); // 中断上传

                    // return true; // 阻止默认行为，不显示预览图的图像
                    $(".weui-uploader__file").on("click", function () {
                        var url = function (str) {
                            return str;
                        };
                        var li = this;
                        var gallery = weui.gallery(eval($(li).css('background-image')), {
                            className: 'weui-gallery',
                            onDelete: function(){
                                // console.log("onBeforeDelete: ", self.files);
                                if(confirm('确定删除该图片?')){
                                    var filekey = $(li).attr("filekey");
                                    var deleteIndex = -1;
                                    $.each(self.images, function(index, item){
                                        if(filekey === item[self.options.filekey]) {
                                            deleteIndex = index;
                                        }
                                    })
                                    if(deleteIndex !== -1){
                                        self.images.splice(deleteIndex, 1);
                                        // console.log("onDelete: ", self.files);
                                    }
                                    $(li).remove();
                                }
                                gallery.hide(function() {
                                    // console.log('gallery has been hidden');
                                });
                            }
                        });
                    });
                },
                onBeforeSend: function(data, headers){
                    console.log(this, data, headers);
                    // $.extend(data, { test: 1 }); // 可以扩展此对象来控制上传参数
                    // $.extend(headers, { Origin: 'http://127.0.0.1' }); // 可以扩展此对象来控制上传头部

                    // return false; // 阻止文件上传
                },
                onProgress: function(procent){
                    console.log(this, procent);
                    // return true; // 阻止默认行为，不使用默认的进度显示
                },
                onSuccess: function (ret) {
                    var file = self.options.onSuccess(ret);
                    $(".weui-uploader__file[data-id='"+this.id+"']").attr("filekey", file[self.options.filekey]);
                    self.images.push(file);
                    // return true; // 阻止默认行为，不使用默认的成功态
                },
                onError: function(err){
                    console.log(this, err);
                    // return true; // 阻止默认行为，不使用默认的失败态
                }
            })
        }
    })
})