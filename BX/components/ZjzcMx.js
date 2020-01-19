define(['vue'], function (Vue) {
    return Vue.extend({
        name: 'ZjzcMx',
        template: `<div class="weui-cells weui-cells_form">
            <div class="weui-cell">
                <div class="weui-cell__hd"><label class="weui-label">{{item.ZCMXMingCheng}}</label></div>
                <div class="weui-cell__bd">
                    <input class="weui-input" type="text" v-model="item.ZCMXJinE">
            </div>
            </div>
        </div>`,
        props: {
            item: Object
        }
    })
})