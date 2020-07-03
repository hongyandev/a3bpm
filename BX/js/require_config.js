define(function () {
    require.config({
        baseUrl: "../source/js",
        paths: {
            "vue": "lib/vue",
            "dingbase": "lib/jsapi",
            "dingtalk": "lib/dingtalk-adapter",
            // "dingtalk": "lib/dingtalk.open",
            "zepto": "lib/zepto.min",
            "zcookie": "lib/zepto.cookie.min",
            "weui": "lib/weui.min",
            "config": "config",
            "lodash": "lib/lodash.min",
            "account" : "lib/accounting.min",
            "moment": "lib/moment/2.24.0/moment.min",
            "moment_cn": "lib/moment/2.24.0/zh-cn",
            "photoswipe": "lib/photoswipe.min",
            "photoswipe-ui": "lib/photoswipe-ui-default.min",
            "compress": "image.compress",
            "components": "../../BX/components",
            "objectAssign": "../../BX/js/objectAssign",
            "baseData": "../../BX/js/baseData"
        },
        shim:{
            "zcookie":{
                deps:["zepto"]
            },
            "config":{
                deps:["zcookie"]
            },
            "dingtalk":{
                deps:["dingbase"]
            }
        }
    });
    require(["zepto", "zcookie"], function () {
        require(["../../BX/js/applyBX"])
    })
})