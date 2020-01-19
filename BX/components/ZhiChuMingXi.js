define(['vue', 'lodash', 'weui','components/WeuiOcr'], function (Vue, _, weui, WeuiOcr) {
    return Vue.extend({
        name: 'ZhiChuMingXi',
        components: {
            'weui-ocr': WeuiOcr
        },
        template: `<div class="weui-cells weui-cells_form">
            <div class="weui-cell" :class="{'weui-cell_vcode': item.FeiYongMX.length > 0}">
                <div class="weui-cell__hd">
                    <label class="weui-label">{{item.MingCheng}}</label>
                </div>
                <div class="weui-cell__bd">
                    <input class="weui-input" type="number" placeholder="请输入金额" v-model="item.JinE">
                </div>
                <div v-if="item.IsOcr != null && item.IsOcr.length > 0 && item.IsOcr != 0">
                    <weui-ocr :id="item.BianHao" :ocr="item.IsOcr" :options="ocrOptions" :target="item.FeiYongMX"></weui-ocr>
                </div>
                <div class="weui-cell__ft" v-if="item.FeiYongMX.length > 0">
                    <button class="weui-vcode-btn" @click="addFeiYongMX(item.FeiYongMX)">添加</button>
                </div>
            </div>
            <div v-if="item.FeiYongMX.length > 0">
                <template v-for="(row, index) in item.FeiYongMX">
                    <div v-for="field in row" :class="{'weui-cell_select weui-cell_select-after': field.Type == 4}" class="weui-cell feiyong-mx">
                        <div class="weui-cell__hd"><label class="weui-label">{{field.FeiYongMXMC}}</label></div>
                        <div class="weui-cell__bd">
                            <input v-if="field.Type == 1" class="weui-input" v-number-only type="number" v-model="field.FeiYongMXZ"/>
                            <input v-else-if="field.Type == 2" class="weui-input" type="text" v-model="field.FeiYongMXZ"/>
                            <input v-else-if="field.Type == 3" class="weui-input font14 inputDate" type="date" v-model="field.FeiYongMXZ"/>
                            <select v-else-if="field.Type == 4 || field.Type == 5" class="weui-input" v-model="field.FeiYongMXZ">
                                <option v-for="option in field.Options" :value="option.Value">{{option.Text}}</option>
                            </select>
                            <img v-else-if="field.Type == -1 && field.FuJianKey && field.FeiYongMXZ" :src="field.FeiYongMXZ" style="width: 50px;height: 50px;border: 1px solid #d9d9d9;" @click="showBigImg(field.FeiYongMXZ)" />
                            <span v-else-if="field.Type == 0" class="weui-input"><input type="text" readonly="readonly" :value="field.FeiYongMXZ" @click="onRefreshBZFY" class="weui-input inputBzfy"/></span>
                        </div>
                    </div>
                    <div class="weui-cell weui-cell_delete" @click="deleteFeiYongMX(item.FeiYongMX, index)" v-if="item.FeiYongMX.length > 1">
                        <div class="weui-cell__bd">删除</div>
                    </div>
                </template>
            </div>
        </div>`,
        props: {
            item: {
                type: Object,
                default: function () {
                    return {}
                }
            },
            ocrOptions: {
                type: Object,
                default: function () {
                    return {}
                }
            }
        },
        methods: {
            addFeiYongMX: function (FeiYongMX) {  // 添加费用明细
                var tempFeiYongMX = _.cloneDeep(FeiYongMX[0]);
                $.each(tempFeiYongMX, function (index, item) {
                    item.FeiYongMXZ = "";
                })
                FeiYongMX.push(tempFeiYongMX);
            },
            deleteFeiYongMX: function (FeiYongMX, index) { // 删除费用明细
                FeiYongMX.splice(index, 1);
            },
            showBigImg: function (url) {
                weui.gallery(url);
                document.getElementsByClassName("weui-gallery__del")[0].style.display = "none";
            },
            onRefreshBZFY: function () {
                var self = this;
                if (typeof self.ocrOptions.onRefreshBZFY === 'function')
                    self.ocrOptions.onRefreshBZFY.call(self.$parent, self.item)
            }
        },
        directives: {
            numberOnly: {
                bind: function (el) {
                    el.handler = function () {
                        el.value = el.value.replace(/\D+/, '')
                    }
                    el.addEventListener('input', el.handler)
                },
                unbind: function (el) {
                    el.removeEventListener('input', el.handler)
                }
            }
        }
    })
})