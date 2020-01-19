define(['vue'], function (Vue) {
    return Vue.extend({
        name: 'SeaDialog',
        template: `<div class="item">
          <div class="item-select" @click="show">{{record[options.name]}}</div>
          <div class="seaDialog" v-show="display">
              <div class="seaDialogInfo">
                  <span @click="hide" class="icon icon-closed">×</span>
                  <h3>{{title}}</h3>
                  <div class="searchInput" v-show="options.searchable===true ? true : false">
                      <input @keyup.enter="search" :placeholder="'请输入' + title + '名称'"/>
                  </div>
                  <ul v-if="options.store.length > 0" class="seaLists">
                      <li v-for="record in options.store" class="row" @click="select(record)">
                          <div class="col-80">
                              <p v-for="field in options.fields">{{field.name}}：{{record[field.key]}}</p>
                          </div>
                          <div class="col-20 selectBtn">
                              <a class="" href="javascript:void(0)"><span class="icon icon-check"></span></a>
                          </div>
                      </li>
                  </ul>
                  <div v-else class="noSeaLists">无{{title}}</div>
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
            search: function (e) {
                var self = this
                self.$emit('search', e.target.value)
                if (typeof self.options.search === 'function')
                    self.options.search.call(self.$parent, e.target.value)
            },
            select: function (record) {
                var self = this, oldRecord = self.record
                self.record = record
                self.$emit('input', record[self.options.key])
                if (typeof self.options.selected === 'function')
                    self.options.selected.call(self.$parent, self.record, oldRecord)
                self.display = false
            },
            hide: function () {
                var self = this
                self.display = false
            }
        }
    })
})