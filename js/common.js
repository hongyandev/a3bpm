$(function () {
    // 允许上传的图片类型
    var allowTypes = ['image/jpg', 'image/jpeg', 'image/png', 'image/gif'];
    //上传大小
    var maxSize = 2048 * 2048;
    // 图片最大宽度
    var maxWidth = 10000;
    // 最大上传图片数量
    var maxCount = 20;
    //  var tmpl = '<li class="weui-uploader__file" style="background-image:url(#url#)"></li>';

    var $gallery = $("#gallery"),
        $galleryImg = $("#galleryImg"),
        $uploaderInput = $("#uploaderInput"),
        $uploaderFiles = $("#uploaderFiles");
    var baseArrs = [];

    $uploaderInput.on('change', function (event) {

        var files = event.target.files;
        //console.log(files);return false;
        // 如果没有选中文件，直接返回
        if (files.length === 0) {
            return;
        }

        for (var i = 0, len = files.length; i < len; i++) {
            var file = files[i];
            var reader = new FileReader();
            // 如果类型不在允许的类型范围内
            if (allowTypes.indexOf(file.type) === -1) {
                weui.topTips("该类型不允许上传！", "警告！");
                return;
            }
            if (file.size > maxSize) {
                weui.topTips("图片太大，不允许上传", "警告！");
                return;
            }
            /* if ($('.weui-uploader__file').length >= maxCount) {
                 weui.topTips( '最多只能上传' + maxCount + '张图片');
                 return;
             }*/
            reader.readAsDataURL(file);
            reader.onload = function (e) {
                //console.log(e);
                var img = new Image();
                img.src = e.target.result;
                img.onload = function () {
                    // 不要超出最大宽度
                    var w = Math.min(maxWidth, img.width);
                    // 高度按比例计算
                    var h = img.height * (w / img.width);
                    var canvas = document.createElement('canvas');
                    var ctx = canvas.getContext('2d');
                    // 设置 canvas 的宽度和高度
                    canvas.width = w;
                    canvas.height = h;
                    ctx.drawImage(img, 0, 0, w, h);
                    var base64 = canvas.toDataURL('image/jpeg', 0.8);
                    // 插入到预览区
                    var $preview = $('<li class="weui-uploader__file"><img style="width:100%;" src="' + img.src + '" /></li>');
                    $uploaderFiles.html($preview);
                    var json = {"value": base64};

                    // console.info(base64)
                    baseArrs.pop();
                    baseArrs.push(json);
                    console.info(baseArrs);
                    return;
                    var loading = weui.loading('正在提交...', {
                        className: 'custom-classname'
                    });
                    $.ajax({
                        url: Global.baseUrl + "/bpm/common/upload",
                        type: 'POST',
                        dataType: "json",
                        contentType: 'application/json',
                        data: JSON.stringify(baseArrs),
                        success: function (res) {
                            loading.hide();
                            if (res.msgCode == '1') {
                                weui.toast("上传成功", function () {
                                    //console.log('close');

                                });
                                fj = res.list;
                            }


                        },
                        error: function (xhr, type) {
                            loading.hide();
                            weui.topTips('Ajax error!')
                        }
                    });
                };

            };

        }


    });

    var index; //第几张图片
    //点击查看大图
    $uploaderFiles.on("click", "li", function () {
        index = $(this).index();
        var pic = $(this).children("img");
        $galleryImg.attr("src", pic[0].getAttribute("src"));
        $gallery.show(100);
        $galleryImg.get(0).onload = function () {
            var picH = $("#galleryImg").height();
            var picW = $("#galleryImg").width();
            $galleryImg.css({"margin-top": -parseFloat(picH) / 2 + "px", "margin-left": -parseFloat(picW) / 2 + "px"})
        };

    });
    //点击关闭，大图浮层关闭
    $(".weui-closed").on("click", function () {
        $gallery.hide(100);
    });

});