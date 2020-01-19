define(['vue', 'components/SelectDialog', 'lodash'], function (Vue, SelectDialog, _) {
    return Vue.extend({
        name: 'JieSuanFS',
        components: {
            'select-dialog' : SelectDialog
        },
        template: `<ul>
            <li>
                <div class="item-content">
                    <div class="item-media"><i class="icon icon-form-gender"></i></div>
                    <div class="item-inner">
                        <div class="item-title label">结算方式</div>
                        <div class="item-input">
                            <select-dialog :ref="zref" :title="title" :options="jsfsOptions" v-model="item.JieSuanFS"></select-dialog>
                        </div>
                        <span class="icon icon-right"></span>
                    </div>
                </div>
            </li>
            <li>
                <div class="item-content">
                    <div class="item-media"><i class="icon icon-form-gender"></i></div>
                    <div class="item-inner">
                        <div class="item-title label">结算金额</div>
                        <div class="item-input">
                            <input type="number" v-number-only placeholder="" v-model="item.JieSuanJE"/>
                        </div>
                    </div>
                </div>
            </li>
            <li v-for="content in item.Content">
                <div class="item-content">
                    <div class="item-media"><i class="icon icon-form-gender"></i></div>
                    <div class="item-inner">
                        <div class="item-title label">{{content.Text}}</div>
                        <div class="item-input">
                            <input v-if="content.DataTYPE === 'string'" type="text" placeholder="" value="" v-model="content.Value"/>
                            <input v-if="content.DataTYPE === 'date'" type="date" class="inputDate" v-model="content.Value"/>
                        </div>
                    </div>
                </div>
            </li>
            <slot></slot>
        </ul>`,
        props: {
            item: {
                type: Object
            },
            zref: {
                type: Number
            }
        },
        computed: {
            jsfsOptions: function () {
                return {
                    store: this.item.JieSuanType,
                    key: 'BianMa',
                    name: 'MingCheng',
                    sured: function (record, oldRecord) {
                        var self = this;
                        if (!_.isEqual(record, oldRecord)) {  // 变更结算方式
                            console.log('record>'+JSON.stringify(record))
                            self.$emit('update:item-content', record.Content)
                        }
                    }
                }
            }
        },
        data: function () {
            return {
                title: '结算方式'
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
        },
        beforeUpdate: function () {
            var self = this;
            if (self.item.JieSuanFS && !_.isEqual(self.$refs[self.zref].record.BianMa, self.item.JieSuanFS)){
                self.$refs[self.zref].select(self.item.JieSuanType.filter(type => type.BianMa === self.item.JieSuanFS)[0]).sure()
            }
        }
    })
})