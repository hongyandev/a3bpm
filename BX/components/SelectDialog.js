define(['vue'], function (Vue) {
    return Vue.extend({
        name: 'SelectDialog',
        template: `<div class="item">
            <div class="item-select" v-show="options.showselect===false ? false : true" @click="show">{{record[options.name]}}</div>
            <div class="selectDialog" v-show="display">
    
                <div class="dialogInfo">
                    <h3 class="selectTitle">{{title}}</h3>
                    <div class="selectCon">
                        <ul class="selList">
                            <li v-bind:class="{active: record[options.key]===selectedRecord[options.key]}" v-for="record in options.store" @click="select(record)">{{record[options.name]}}</li>
                        </ul>
                    </div>
                    <div class="selectBottom">
                        <ul class="row">
                            <li class="col-50" @click="cancel"><a href="javascript:void(0)">取消</a></li>
                            <li class="col-50" @click="sure"><a href="javascript:void(0)">确定</a></li>
                        </ul>
                    </div>
                </div>
                <div class="dialogBg"></div>
            </div>
        </div>`,
        props: {
            title: String,
            options: Object
        },
        data: function () {
            return {
                display: false,
                selectedRecord: {},
                record: {}
            }
        },
        methods: {
            show: function () {
                var flag = true, self = this
                if (typeof self.options.beforeShow === 'function') {
                    var res = self.options.beforeShow.call(self.$parent)
                    flag = res == null ? true : res
                }
                if (flag)
                    self.display = true
            },
            select: function (record) {
                var self = this
                self.selectedRecord = record
                return self
            },
            cancel: function () {
                var self = this
                self.display = false
            },
            sure: function () {
                var self = this, oldRecord = self.record
                self.record = self.selectedRecord
                self.$emit('input', self.record[self.options.key])
                if (typeof self.options.sured === 'function')
                    self.options.sured.call(self.$parent, self.record, oldRecord)
                self.display = false
            }
        }
    })
})