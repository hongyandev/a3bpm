Vue.component('shenpi-yaosu', {
    data: function() {
      return {
          ShenPiYS: []
      }
    },
    props: ['id', 'title', 'yaosuxx'],
    methods: {
        change: function (obj, target) {
            let changeIndex = -1;
            $.each(this.ShenPiYS, function (index, item) {
                if (item.YaoSuBH === obj.BianHao) {
                    changeIndex = index;
                }
            })
            if (changeIndex === -1) {
                this.ShenPiYS.push({
                    "YaoSuBH": obj.BianHao,
                    "YaoSuZ": $(target).val()
                })
            } else {
                this.ShenPiYS[changeIndex].YaoSuZ = $(target).val();
            }
            // console.log(this.ShenPiYS);
            this.$emit('input', this.ShenPiYS);
        }
    },
    template:
    '            <div :id="id" class="weui-panel weui-panel_access">\n' +
    '                <div class="weui-panel__hd">{{title}}</div>\n' +
    '                <div class="weui-panel__bd">\n' +
    '                    <div v-for="item in yaosuxx">\n' +
    '                        <div v-if="item.YaoSuZ && item.YaoSuZ.length > 0"\n' +
    '                             class="weui-cell weui-cell_select weui-cell_select-after">\n' +
    '                            <div class="weui-cell__hd">\n' +
    '                                <label class="weui-label" style="width: 100%">{{item.YaoSuMC}}：</label>\n' +
    '                            </div>\n' +
    '                            <div class="weui-cell__bd">\n' +
    '                                <select class="weui-select" @change="change(item, $event.target)">\n' +
    '                                    <option selected>请选择</option>\n' +
    '                                    <option v-for="opt in item.YaoSuZ" :value="opt">{{opt}}</option>\n' +
    '                                </select>\n' +
    '                            </div>\n' +
    '                        </div>\n' +
    '                        <div v-else class="weui-cell">\n' +
    '                            <div class="weui-cell__hd">\n' +
    '                                <label class="weui-label" style="width: 100%">{{item.YaoSuMC}}：</label>\n' +
    '                            </div>\n' +
    '                            <div class="weui-cell__bd">\n' +
    '                                <input class="weui-input" type="text" @change="change(item, $event.target)" placeholder="请输入">\n' +
    '                            </div>\n' +
    '                        </div>\n' +
    '                    </div>\n' +
    '                </div>\n' +
    '            </div>'
});