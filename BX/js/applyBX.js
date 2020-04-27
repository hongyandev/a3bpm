define(['vue', 'config', 'baseData', 'weui', 'lodash', 'account', 'moment', 'components/SelectDialog', 'components/SeaDialog', 'components/WeuiUploader', 'components/ZjzcMx', 'components/ZhiChuMingXi', 'components/JieSuanFS'], function (Vue, config, baseData, weui, _, account, moment, SelectDialog, SeaDialog, WeuiUploader, ZjzcMx, ZhiChuMingXi, JieSuanFS) {
config.jsApi({
    onSuccess: function (userinfo) { //"YongHuBH":"XTYH201806130020","NianDu":"2019","BuMenBH":"GLZZ201806130002"
        var NianDu = $.fn.cookie('NianDu') || userinfo.NianDu;
        var DanWeiBH = JSON.parse($.fn.cookie('DanWei')).DanWeiBH || userinfo.DanWeiBH;
        var BuMenBH =  JSON.parse($.fn.cookie('DanWei')).BuMenBH || userinfo.BuMenBH;
        /*var userinfo = {
            "YongHuBH":"XTYH201806130020",
            "DanWeiBH":"GLZZ201806130001",
            "NianDu":"2019",
            "BuMenBH":"GLZZ201806130002",
            "GangWeiBH":"YWGW201806130001",
            "debug": true,
            "DengLuM": "test0103"
        }*/
        new Vue({
            el: '#applybx',
            components: {
                'select-dialog': SelectDialog,
                'sea-dialog': SeaDialog,
                'weui-uploader': WeuiUploader,
                'zjzc-mx': ZjzcMx,
                'zhichu-mingxi': ZhiChuMingXi,
                'jiesuan-fs': JieSuanFS
            },
            template: `<div id="root">
                <!--第一页-->
                <div v-show="currentPage === 1">
                    <div class="list-block">
                        <ul>
                            <!--报销类型-->
                            <li>
                                <div class="item-content">
                                    <div class="item-media"><i class="icon icon-form-name"></i></div>
                                    <div class="item-inner">
                                        <div class="item-title label"><span class="iconfont btIcon">&#xe7ff;</span>报销类型</div>
                                        <div class="item-input">
                                            <select-dialog ref="BaoXiaoLX" title="报销类型" :options="bxlxOptions" v-model="formData.BaoXiaoLX"></select-dialog>
                                        </div>
                                        <span class="icon icon-right"></span>
                                    </div>
                                </div>
                            </li>
                            <!--资金申请单-->
                            <li v-show="formData.BaoXiaoLX === '2'">
                                <div class="item-content">
                                    <div class="item-media"><i class="icon icon-form-name"></i></div>
                                    <div class="item-inner">
                                        <div class="item-title label"><span class="iconfont btIcon">&#xe7ff;</span>资金申请单</div>
                                        <div class="item-input">
                                            <sea-dialog ref="zjApply" title="资金申请单" :options="zjApplyOptions" v-model="formData.DuiYingDJ"></sea-dialog>
                                        </div>
                                        <span class="icon icon-right"></span>
                                    </div>
                                </div>
                            </li>
                            <!--执行申请单-->
                            <li v-show="formData.BaoXiaoLX === '3'">
                                <div class="item-content">
                                    <div class="item-media"><i class="icon icon-form-name"></i></div>
                                    <div class="item-inner">
                                        <div class="item-title label"><span class="iconfont btIcon">&#xe7ff;</span>执行申请单</div>
                                        <div class="item-input">
                                            <select-dialog ref="zxApply" title="执行申请单" :options="zxApplyOptions" v-model="formData.DuiYingDJ"></select-dialog>
                                        </div>
                                        <span class="icon icon-right"></span>
                                    </div>
                                </div>
                            </li>
                            <!--合同(名称,阶段)-->
                            <li v-show="formData.BaoXiaoLX === '4'">
                                <div class="item-content">
                                    <div class="item-media"><i class="icon icon-form-name"></i></div>
                                    <div class="item-inner">
                                        <div class="item-title label"><span class="iconfont btIcon">&#xe7ff;</span>合同名称</div>
                                        <div class="item-input">
                                            <select-dialog ref="htmc" title="合同名称" :options="htmcOptions" v-model="formData.DuiYingDJ"></select-dialog>
                                        </div>
                                        <span class="icon icon-right"></span>
                                    </div>
                                </div>
                            </li>
                            <li v-show="formData.BaoXiaoLX === '4'">
                                <div class="item-content">
                                    <div class="item-media"><i class="icon icon-form-name"></i></div>
                                    <div class="item-inner">
                                        <div class="item-title label"><span class="iconfont btIcon">&#xe7ff;</span>合同阶段</div>
                                        <div class="item-input">
                                            <select-dialog ref="htjd" title="合同阶段" :options="htjdOptions" v-model="formData.HeTongJD"></select-dialog>
                                        </div>
                                        <span class="icon icon-right"></span>
                                    </div>
                                </div>
                            </li>
                            <!--指标名称-->
                            <li>
                                <div class="item-content">
                                    <div class="item-media"><i class="icon icon-form-gender"></i></div>
                                    <div class="item-inner">
                                        <div class="item-title label"><span class="iconfont btIcon">&#xe7ff;</span>指标名称</div>
                                        <div class="item-input">
                                            <sea-dialog ref="ZhiBiaoBH" title="指标名称" :options="zbmcOptions" v-model="formData.ZhiBiaoBH"></sea-dialog>
                                        </div>
                                        <span class="icon icon-right"></span>
                                    </div>
                                </div>
                            </li>
                            <!--可用余额-->
                            <li>
                                <div class="item-content">
                                    <div class="item-media"><i class="icon icon-form-gender"></i></div>
                                    <div class="item-inner">
                                        <div class="item-title label"><span class="iconfont btIcon">&#xe7ff;</span>可用余额</div>
                                        <div class="item-input">{{formData.KeYongYE | formatNumber}}</div>
                                    </div>
                                </div>
                            </li>
                        </ul>    
                    </div>
                    <div class="card"></div>
                    <div class="list-block">
                        <ul>
                            <!--报销部门-->
                            <li>
                                <div class="item-content">
                                    <div class="item-media"><i class="icon icon-form-gender"></i></div>
                                    <div class="item-inner">
                                        <div class="item-title label"><span class="iconfont btIcon">&#xe7ff;</span>报销部门</div>
                                        <div class="item-input">
                                            <select-dialog ref="BaoXiaoBM" title="报销部门" :options="bxbmOptions" v-model="formData.BaoXiaoBM"></select-dialog>
                                        </div>
                                        <span class="icon icon-right"></span>
                                    </div>
                                </div>
                            </li>
                            <!--报销人-->
                            <li>
                                <div class="item-content">
                                    <div class="item-media"><i class="icon icon-form-gender"></i></div>
                                    <div class="item-inner">
                                        <div class="item-title label"><span class="iconfont btIcon">&#xe7ff;</span>报销人</div>
                                        <div class="item-input">
                                            {{formData.BaoXiaoR}}
                                        </div>
                                    </div>
                                </div>
                            </li>
                            <!--报销日期-->
                            <li>
                                <div class="item-content">
                                    <div class="item-media"><i class="icon icon-form-calendar"></i></div>
                                    <div class="item-inner">
                                        <div class="item-title label"><span class="iconfont btIcon">&#xe7ff;</span>报销日期</div>
                                        <div class="item-input">
                                            <input type="date" class="font14 inputDate" v-model="formData.BaoXiaoRQ"/>
                                        </div>
                                    </div>
                                </div>
                            </li>
                            <!--报销事由-->
                            <li class="align-top">
                                <div class="item-content">
                                    <div class="item-media"><i class="icon icon-form-comment"></i></div>
                                    <div class="item-inner">
                                        <div class="item-title label"><span class="iconfont btIcon">&#xe7ff;</span>报销事由</div>
                                        <div class="item-input">
                                            <textarea style="margin:5px 0;border:1px solid #e5e5e5" v-model="formData.BaoXiaoSY"></textarea>
                                        </div>
                                    </div>
                                </div>
                            </li>
                            <!--支出事项-->
                            <li>
                                <div class="item-content">
                                    <div class="item-media"><i class="icon icon-form-gender"></i></div>
                                    <div class="item-inner">
                                        <div class="item-title label"><span class="iconfont btIcon">&#xe7ff;</span>支出事项</div>
                                        <div class="item-input">
                                            <sea-dialog ref="ZhiChuSX" title="支出事项" :options="zcsxOptions" v-model="formData.ZhiChuSX"></sea-dialog>
                                        </div>
                                        <span class="icon icon-right"></span>
                                    </div>
                                </div>
                            </li>
                            <!--备注-->
                            <li class="align-top">
                                <div class="item-content">
                                    <div class="item-media"><i class="icon icon-form-comment"></i></div>
                                    <div class="item-inner">
                                        <div class="item-title label">备注</div>
                                        <div class="item-input">
                                            <textarea style="margin:5px 0;border:1px solid #e5e5e5" v-model="formData.BeiZhu"></textarea>
                                        </div>
                                    </div>
                                </div>
                            </li>
                        </ul>
                        <weui-uploader id="FuJianXX" title="上传附件" :options="fujianxxOptions" v-model="formData.FuJianXX"></weui-uploader>
                    </div>
                    <div class="content-block">
                        <a @click="showSecondPage" href="javascript:void(0);" class="weui-btn weui-btn_primary">下一步</a>
                    </div>
                    <br/>
                </div>
                
                <!--第二页-->
                <div v-show="currentPage === 2">
                    <!-- 资金申请单调整 
                    <div v-if="formData.BaoXiaoLX === '2'">
                        <zjzc-mx v-for="(item, index) in ZhiChuMX" :key="item.ZCMXBianHao" :item="item"></zjzc-mx>
                    </div>
                    <div v-else>
                        <zhichu-mingxi v-for="(item, index) in ZhiChuMX" :key="item.BianHao" :item="item" :ocrOptions="ocrOptions"></zhichu-mingxi>
                    </div>
                    -->
                    
                    <!--支出明细-->
                    <zhichu-mingxi v-for="(item, index) in ZhiChuMX" :key="item.BianHao" :item="item" :ocrOptions="ocrOptions"></zhichu-mingxi>
                    
                    <div class="weui-cells weui-cells_form">
                        <div  class="weui-cell">
                            <div class="weui-cell__hd"><label class="weui-label">报销金额</label></div>
                            <div class="weui-cell__bd">
                                <!--  资金申请单调整                       
                                <template v-if="formData.BaoXiaoLX === '2'">
                                    {{total}}
                                </template>
                                <template v-else>
                                     <input type="text" @click="getTotalMoney" readonly="readonly" :value="total" class="weui-input inputTotal"/>     
                                </template>
                                -->
                                <input type="text" @click="getTotalMoney" readonly="readonly" :value="total" class="weui-input inputTotal"/>
                            </div>
                        </div>
                    </div>
                    <div class="weui-flex" style="padding: 7px">
                        <div class="weui-flex__item" style="padding: 7px">
                            <a class="weui-btn weui-btn_ding" @click="currentPage = 1" href="javascript:">上一步</a>
                        </div>
                        <div class="weui-flex__item" style="padding: 7px">
                            <a class="weui-btn weui-btn_ding" @click="goThirdPage" href="javascript:">下一步</a>
                        </div>
                    </div>
                </div>
                
                <!--第三页-->
                <div v-show="currentPage === 3">
                    <div v-if="FuZhuSX.length > 0">
                        <template v-for="item in FuZhuSX">
                            <div class="list-block">
                                <ul>
                                    <li v-if="item.Type=='1'">
                                        <div class="item-content">
                                            <div class="item-media"><i class="icon icon-form-gender"></i></div>
                                            <div class="item-inner">
                                                <div class="item-title label">{{item.MingCheng}}</div>
                                                <div class="item-input">
                                                    <input type="number" v-number-only value="" v-model.number="item.FuZhuZ">
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                    <li v-else-if="item.Type=='2'">
                                        <div class="item-content">
                                            <div class="item-media"><i class="icon icon-form-gender"></i></div>
                                            <div class="item-inner">
                                                <div class="item-title label">{{item.MingCheng}}</div>
                                                <div class="item-input">
                                                    <input type="text" value="" v-model="item.FuZhuZ">
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                    <li v-else-if="item.Type=='3'">
                                        <div class="item-content">
                                            <div class="item-media"><i class="icon icon-form-gender"></i></div>
                                            <div class="item-inner">
                                                <div class="item-title label">{{item.MingCheng}}</div>
                                                <div class="item-input">
                                                    <input type="date" value="" v-model="item.FuZhuZ" class="inputDate">
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                    <li v-else-if="item.Type=='4'">
                                        <div class="item-content">
                                        <div class="item-media"><i class="icon icon-form-gender"></i></div>
                                            <div class="item-inner">
                                                <div class="item-title label">{{item.MingCheng}}</div>
                                                <div class="item-input">
                                                    <select v-model="item.FuZhuZ">
                                                        <option v-for="opt in item.Options" :selected="opt.ShiFouXZ" :value="opt.Value">{{opt.Text}}</option>
                                                    </select>
                                                </div>
                                                <span class="icon icon-right"></span>
                                            </div>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </template>
                    </div>
                    <div class="list-block" v-else>
                        <ul>
                            <li class="item-content">
                                <div class="item-media"><i class="icon icon-form-gender"></i></div>
                                <div class="item-inner">
                                    <div class="item-title label">辅助事项</div>
                                    <div class="item-input">
                                        <input type="text" value="" readonly>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <div class="weui-flex" style="padding: 7px">
                        <div class="weui-flex__item" style="padding: 7px">
                            <a class="weui-btn weui-btn_ding" @click="currentPage = 2" href="javascript:">上一步</a>
                        </div>
                        <div class="weui-flex__item" style="padding: 7px">
                            <a class="weui-btn weui-btn_ding" @click="goFourthPage" href="javascript:">下一步</a>
                        </div>
                    </div>
                </div>
                
                <!--第四页-->
                <div v-show="currentPage === 4">
                    <div class="list-block">
                        <template v-for="(item, index) in JieSuanXX">
                            <jiesuan-fs :item="item" :zref="index" @update:item-content="content => item.Content = content" :key="index">
                                <li class="row" style="text-align: right;line-height:45px;">
                                    <div class="col-80">
                                        <a v-show="index == JieSuanXX.length - 1" href="#" @click="doAddJieSuanXX">
                                            <i><span style='color:#3cc51f' class="iconfont">&#xe61e;</span></i>增加
                                        </a>
                                    </div>
                                    <div class="col-20" style="text-align: center;float: right">
                                        <a v-show="JieSuanXX.length > 1" href="#" @click="doDelJieSuanXX(index)"><i><span style='color:#3cc51f' class="iconfont">&#xe695;</span></i>删除</a>
                                    </div>
                                </li>
                            </jiesuan-fs>
                        </template>
                    </div>
                    <select-dialog v-show="showFlow" ref="flow" title="流程信息" :options="flowOptions"></select-dialog>
                    <div class="weui-flex" style="padding: 7px">
                        <div class="weui-flex__item" style="padding: 7px">
                            <a class="weui-btn weui-btn_ding" @click="currentPage = 3" href="javascript:">上一步</a>
                        </div>
                        <div class="weui-flex__item" style="padding: 7px">
                            <a class="weui-btn weui-btn_ding" @click="save()" href="javascript:">完成</a>
                        </div>
                    </div>
                </div>
            </div>`,
            data: function () {
              return {
                  currentPage: 1,
                  formData: {
                      "GangWeiBH": userinfo.GangWeiBH,  //"岗位编号",
                      "FlowId": "",     //"流程部署id",
                      "BiaoXiaoBH":"",  //"报销编号",//新增单据:无报销编号;编辑单据:有报销编号
                      "BaoXiaoLX":"",   //"报销类型",
                      "ZhiBiaoBH":"",   //"指标编号",
                      "ShenQingR":userinfo.YongHuBH,   //"申请人-（经办人）编号",
                      "NianDu":NianDu,  //"年度",
                      "ShenQingDW":DanWeiBH,  //"申请单位编号-（管理组织）",
                      "ShenQingBM":BuMenBH,   //"申请部门编号",
                      "ShenQingJE":0,         //"申请金额-（报销金额）",
                      "BaoXiaoR":userinfo.DengLuM,     //"报销人",
                      "BaoXiaoBM":"",   //"报销部门编号",
                      "BaoXiaoRQ":"",   //"报销日期",
                      "BaoXiaoSY":"",   //"报销事由",
                      "ZhiChuSX":"",    //"支出事项编号",
                      "BeiZhu":"",      //"备注",
                      "DuiYingDJ":"",   //"对应单据编号(合同/执行申请单/资金申请单)",
                      "KeYongYE":"",    //"指标可用余额",
                      "HeTongJD":"",    //"合同阶段编号",
                      "FuJianXX":[],    //"附件信息" {"FuJianMC":"附件名称","FuJianLJ":"附件路径"}
                      "ZhiChuXX":[//支出明细
                          /*{
                              "ZhiChuMXBH":"支出明细编号",
                              "JinE":"申请金额",
                              "BiaoZhuFY":"标准费用",
                              "FeiYongMX":[
                                  {
                                      "MingXiBH":"费用明细编号",
                                      "MingXiZ":[             //明细值
                                          "值1","值2"
                                      ]
                                  }
                              ]
                          }*/
                      ],
                      "FuZhuSX":[//辅助信息
                          /*{
                              "FuZhuSXBH":"辅助事项编号",
                              "FuZhuSXZ":"辅助事项值"
                          }*/
                      ],
                      "JieSuanXX":[//结算信息
                          /*{
                              "JieSuanFS":"结算方式",
                              "JieSuanJE":"结算金额",
                              "Content":[
                                  {
                                      "Key":"结算方式对应的key",
                                      "Value":"填写的值"
                                  }
                              ]
                           }*/
                      ]
                  },
                  ZhiChuMX: [],  //支出明细
                  FuZhuSX: [],   //辅助事项
                  JieSuanXX: [
                      {
                          "JieSuanFS" : "", //结算方式
                          "JieSuanJE" : "0",  //结算金额
                          "JieSuanType": [], //结算类型
                          "Content": [] //结算拓展
                      }
                  ], //结算信息
                  loadJieSuanXX: false, //false表示还未加载结算方式
                  bxlxOptions: {    // 报销类型 {"BianHao":"1","MingCheng":"直接报销","ISDefault":"1"}
                      store: [],
                      key: 'BianHao',
                      name: 'MingCheng',
                      sured: function (record, oldRecord) {
                          if (!_.isEqual(record, oldRecord)) {  // 变更报销类型
                              if (!oldRecord.BianHao) return
                              var self = this
                              switch (oldRecord.BianHao) {
                                  case "1" : { //重置直接报销     指标名称/可用余额
                                      self.$refs['ZhiBiaoBH'].select({bianHao:'', zhiBiaoMC:'', keYongYE:''})
                                      break
                                  }
                                  case "2" : {//重置资金申请单     资金申请单号     可用余额      指标编号       指标名称       报销事由      支出事项编号      支出事项名称       支出明细
                                      self.$refs["zjApply"].select({BianHao:'', ZiJinSQJE:'', ZhiBiaoBH:'', ZhiBiaoMC:'', BaoXiaoSY:'', ZCSXBianHao:'', ZCSXMingCheng:'', ZCMXlist:[]})
                                      break
                                  }
                                  case "3" : {//重置执行申请单       执行申请单号 执行申请名称  指标名称
                                      self.$refs["zxApply"].select({BianHao:'', BiaoTi:'', ZhiBiaoMC:''}).sure()
                                      // 指标名称/可用余额
                                      self.$refs["ZhiBiaoBH"].select({bianHao:'', zhiBiaoMC:'', keYongYE:''})
                                      break
                                  }
                                  case "4" : {//重置 合同 因为ht使用 v-if 所以,self.refs['htmc']获取不到
                                      self.$refs["htmc"].select({BianHao:'', HeTongMC:'', ZhiBiaoMC:'', HeTongJD:[]}).sure()
                                      // 指标名称/可用余额
                                      self.$refs["ZhiBiaoBH"].select({bianHao:'', zhiBiaoMC:'', keYongYE:''})
                                      break
                                  }
                              }
                          }
                      }
                  },
                  zjApplyOptions: { // 资金申请单 {"ZhiBiaoMC": "0901奖励金","BianHao": "JKDH201901230021"}
                      store: [],
                      key: 'BianHao',
                      name: 'BianHao',
                      fields: [
                          {
                              key: 'BianHao',
                              name: '单据编号'
                          },
                          {
                              key: 'ZhiBiaoMC',
                              name: '指标名称'
                          }
                      ],
                      zjApplyParams: {
                          BuMenBH: BuMenBH,
                          YongHuBH: userinfo.YongHuBH,
                          YuSuanND: NianDu
                      },
                      beforeShow: function () {
                          var loading = weui.loading('loading'), self = this;
                          fetch(config.baseUrl + '/bpm/common/getZiJinSQDXX', {
                              method: 'post',
                              body: JSON.stringify(self.zjApplyOptions.zjApplyParams),
                              headers: {
                                  'Content-Type': 'application/json'
                              }
                          })
                          .then(res => res.json())
                          .then(json => {
                              loading.hide();
                              if (json.list)
                                  self.zjApplyOptions.store = json.list
                              if (self.zjApplyOptions.store.length < 1 && userinfo.debug)
                                  self.zjApplyOptions.store = baseData.zjApply.list
                          })
                          .catch(function (err) {
                              loading.hide();
                              weui.topTips(err, 3000);
                          })
                      },
                      selected: function (record, oldRecord) {
                          if (!_.isEqual(record, oldRecord)) {
                              var self = this
                              // 构建指标名称 record
                              var zbmcRecord = {keYongYE: record["ZiJinSQJE"], bianHao: record["ZhiBiaoBH"], zhiBiaoMC: record["ZhiBiaoMC"]}
                              self.$refs['ZhiBiaoBH'].select(zbmcRecord)
                              // 报销事由
                              self.formData.BaoXiaoSY = record["BaoXiaoSY"]
                              // 支出事项
                              var zcsxRecord = {BianHao: record["ZCSXBianHao"], MingCheng: record["ZCSXMingCheng"]}
                              self.$refs['ZhiChuSX'].select(zcsxRecord)
                              // 支出明细 -- 资金申请单调整
                              // self.ZhiChuMX = record["ZCMXlist"]
                          }
                      }
                  },
                  zxApplyOptions: { // 执行申请单 {"BianHao":"SQMX201910290002","ShenQingDH":"S201910290063","ZhiBiaoMC":"luzili指标（勿动）","ZhiBiaoBH":"NPZB201910290001","ShenQingJE":"3,100.00","BiaoTi":"luzili测试执行申请"}
                      store: [],
                      key: 'BianHao',
                      name: 'BiaoTi',
                      zxApplyParams: {
                          BuMenBH: BuMenBH,
                          YongHuBH: userinfo.YongHuBH,
                          YuSuanND: NianDu
                      },
                      beforeShow: function () {
                          var loading = weui.loading('loading'), self = this
                          fetch(config.baseUrl + '/bpm/common/getZhiXingSQDXX', {
                              method: 'post',
                              body:JSON.stringify(self.zxApplyOptions.zxApplyParams),
                              headers: {
                                  'Content-Type': 'application/json'
                              }
                          })
                          .then(res => res.json())
                          .then(json => {
                              loading.hide()
                              if (json.list)
                                  self.zxApplyOptions.store = json.list
                              if (self.zxApplyOptions.store.length < 1 && userinfo.debug)
                                  self.zxApplyOptions.store = baseData.zxApply.list
                          })
                          .catch(function (err) {
                              loading.hide()
                              weui.topTips(err, 3000)
                          })
                      },
                      sured: function (record, modify) {
                          if (modify) {
                              var self = this
                              self.zbmcOptions.zbmcParams.DanJuBH = record["BianHao"]
                              self.zbmcOptions.zbmcParams.ZhiBiaoMC = record["ZhiBiaoMC"]
                          }
                      }
                  },
                  htmcOptions: {    // 合同名称 {"BianHao": "HTZB201911200002","WeiZhiFJE": "1.00","HeTongMC": "移动端合同","ZhiBiaoMC": "luzili指标（勿动）","ZhiBiaoBH": "NPZB201910290001","HeTongJD": [{"JiHuaFuKJE": "15,000.00","IsUse": "true","JieDuanBH": "HTJH201911200001","HeTongJD": "全款"}],"HeTongBM": "Qtest0001-20191108-02","HeTongJE": "1.00"}
                      store: [],
                      key: 'BianHao',
                      name: 'HeTongMC',
                      htmcParams: {
                          "BuMenBH": BuMenBH,
                          "YongHuBH": userinfo.YongHuBH,
                      },
                      beforeShow: function () {
                          var loading = weui.loading('loading'), self = this
                          fetch(config.baseUrl + '/bpm/common/getHeTongXX', {
                              method: 'post',
                              headers: {
                                  'Content-Type': 'application/json'
                              },
                              body:JSON.stringify(self.htmcOptions.htmcParams)
                          })
                          .then(res => res.json())
                          .then(json => {
                              loading.hide()
                              if (json.list)
                                  self.htmcOptions.store = json.list
                              if (self.htmcOptions.store.length < 1 && userinfo.debug)
                                  self.htmcOptions.store = baseData.ht.list
                          })
                          .catch(function (err) {
                              loading.hide()
                              weui.topTips(err, 3000)
                          })
                      },
                      sured: function (record, oldRecord) {
                          if (!_.isEqual(record, oldRecord)) {
                              var self = this
                              self.zbmcOptions.zbmcParams.DanJuBH = record["BianHao"]
                              self.zbmcOptions.zbmcParams.ZhiBiaoMC = record["ZhiBiaoMC"]
                              if (record["HeTongJD"])
                                  self.htjdOptions.store = record["HeTongJD"]
                              // 重置合同阶段
                              self.$refs['htjd'].select({JieDuanBH:'', HeTongJD:''}).sure()
                          }
                      }
                  },
                  htjdOptions: {    // 合同阶段 {"JiHuaFuKJE": "15,000.00","IsUse": "true","JieDuanBH": "HTJH201911200001","HeTongJD": "全款"}
                      store: [],
                      key: 'JieDuanBH',
                      name: 'HeTongJD',
                      beforeShow: function () {
                          var self = this
                          if (!self.formData.DuiYingDJ) {
                              weui.topTips('请选择合同名称', 3000)
                              return false
                          }
                          return true
                      }
                  },
                  zbmcOptions: {    // 指标名称 {"keYongYE":"98,963.00","yuSuanSX":"奖励金","bianHao":"NPZB201901030022","zhiBiaoMC":"0901奖励金"}
                      store: [],
                      key: 'bianHao',
                      name: 'zhiBiaoMC',
                      fields: [
                          {
                              key: 'zhiBiaoMC',
                              name: '指标名称'
                          },
                          {
                              key: 'yuSuanSX',
                              name: '预算事项'
                          },
                          {
                              key: 'keYongYE',
                              name: '可用余额'
                          }
                      ],
                      searchable: true,
                      zbmcParams: {
                          BuMenBH: BuMenBH,
                          YongHuBH: userinfo.YongHuBH,
                          NianDu: NianDu,
                          BaoXiaoLX: "",
                          ZhiBiaoMC: "",
                          DanJuBH: ""
                      },
                      loadData: function () {
                          var self = this
                          var loading = weui.loading('loading')
                          fetch(config.baseUrl + '/bpm/common/getProjects', {
                              method: 'post',
                              body: JSON.stringify(self.zbmcOptions.zbmcParams),
                              headers: {
                                  'Content-Type': 'application/json'
                              }
                          })
                          .then(res => res.json())
                          .then(json => {
                              loading.hide()
                              if (json.list)
                                  self.zbmcOptions.store = json.list
                              if (self.zbmcOptions.store.length < 1 && userinfo.debug)
                                  self.zbmcOptions.store = baseData.zbmc.list
                          })
                          .catch(function (err) {
                              loading.hide()
                              weui.topTips(err, 3000)
                          })
                      },
                      beforeShow: function () {
                          var flag = false, self = this
                          self.zbmcOptions.zbmcParams.BaoXiaoLX = self.formData.BaoXiaoLX
                          switch (self.formData.BaoXiaoLX) {
                              case "1" : {  // 直接报销
                                  self.zbmcOptions.loadData.call(self)
                                  flag = true
                                  break
                              }
                              case "2" : {  // 自己申请单
                                  if (!self.formData.DuiYingDJ) {
                                      weui.topTips('请选择资金申请单', 3000)
                                      flag = false
                                  } else {
                                      self.zbmcOptions.loadData.call(self)
                                      flag = true
                                  }
                                  break
                              }
                              case "3" : {  // 执行申请单
                                  if (!self.formData.DuiYingDJ) {
                                      weui.topTips('请选择执行申请单', 3000)
                                      flag = false
                                  } else {
                                      self.zbmcOptions.loadData.call(self)
                                      flag = true
                                  }
                                  break
                              }
                              case "4" : {  // 合同
                                  if (!self.formData.DuiYingDJ) {
                                      weui.topTips('请选择合同名称', 3000)
                                      flag = false
                                  } else if (!self.formData.HeTongJD) {
                                      weui.topTips('请选择合同阶段', 3000)
                                      flag = false
                                  } else {
                                      self.zbmcOptions.loadData.call(self)
                                      flag = true
                                  }
                                  break
                              }
                          }
                          return flag
                      },
                      search: function (condition) {
                          var self = this
                          self.zbmcOptions.zbmcParams.ZhiBiaoMC = condition
                          self.zbmcOptions.loadData.call(self)
                      },
                      selected: function (record, oldRecord) {
                          if (!_.isEqual(record, oldRecord)) {
                              var self = this
                              self.formData.KeYongYE = record['keYongYE'].replace(/,/gi, '')
                              self.$refs['ZhiChuSX'].select({BianHao:'', MingCheng:''})
                              self.ZhiChuMX = []
                          }
                      }
                  },
                  bxbmOptions: {    // 报销部门
                      store: [],
                      key: 'BianHao',
                      name: 'MingCheng'
                  },
                  zcsxOptions: {    // 支出事项 {"BianHao": "ZCSX201812240001","ZhiChuFL": "工资福利支出","MingCheng": "社会保障缴费","FeiYongXE": "1,000.00"}
                      store: [],
                      key: 'BianHao',
                      name: 'MingCheng',
                      fields: [
                          {
                              key: 'MingCheng',
                              name: '名称'
                          },
                          {
                              key: 'ZhiChuFL',
                              name: '支出分类'
                          },
                          {
                              key: 'FeiYongXE',
                              name: '费用限额'
                          },
                          {
                              key: 'BianHao',
                              name: '编号'
                          }
                      ],
                      beforeShow: function () {
                          var self = this
                          if (!self.formData.ZhiBiaoBH) {
                              weui.topTips('请选择指标名称', 3000)
                              return false
                          }
                          var loading = weui.loading('loading');
                          fetch(config.baseUrl + '/bpm/common/getItems', {
                              method: 'post',
                              body: JSON.stringify({"ZhiBiaoBH": self.formData.ZhiBiaoBH}),
                              headers: {
                                  'Content-Type': 'application/json'
                              }
                          })
                          .then(res => res.json())
                          .then(json => {
                              loading.hide()
                              if (json.list)
                                  self.zcsxOptions.store = json.list
                              if (self.zcsxOptions.store.length < 1 && userinfo.debug)
                                  self.zcsxOptions.store = baseData.zcsx.list
                          })
                          .catch(function (err) {
                              loading.hide()
                              weui.topTips(err, 3000)
                          })
                      },
                      selected: function (record, oldRecord) {
                          var self = this
                          if (!_.isEqual(record, oldRecord) && record['BianHao']) {
                              // 资金申请单调整
                              // if (self.formData.BaoXiaoLX !== '2') {
                                  var loading = weui.loading('loading')
                                  // 支出明细
                                  fetch(config.baseUrl + '/bpm/common/getDetail', {
                                      method: 'post',
                                      body: JSON.stringify({ZhiChuSXBH: record['BianHao'], DanJuBH:''}),
                                      headers: {
                                          'Content-Type': 'application/json'
                                      }
                                  })
                                  .then(res => res.json())
                                  .then(json => {
                                      loading.hide()
                                      if (json.list)
                                          self.ZhiChuMX = json.list
                                      if (self.ZhiChuMX.length > 1 && userinfo.debug)
                                          self.ZhiChuMX = baseData.zcmx.list
                                      $.each(self.ZhiChuMX, function (j, p) {
                                          if (p.IsOcr) {
                                              $.each(p.FeiYongMX, function (k, q) {
                                                  q.push({
                                                      'Type': -1,
                                                      'OcrCode': 'FuJianXX',
                                                      'FeiYongMXMC': '附件',
                                                      'FeiYongMXZ': '',
                                                      'FuJianMC' : '',
                                                      'FuJianKey': ''
                                                  });
                                              });
                                          }
                                          if (p.IsShowBZZ === 'true') {
                                              $.each(p.FeiYongMX, function (k, q) {
                                                  q.push({
                                                      'Type': 0,
                                                      'FeiYongMXMC': '标准费用',
                                                      'FeiYongMXZ': ''
                                                  })
                                              });
                                          }
                                      });
                                  })
                                  .catch(function (err) {
                                      loading.hide();
                                      weui.topTips(err, 3000);
                                  })
                              //}
                              // 辅助事项
                              fetch(config.baseUrl + '/bpm/common/auxiliary', {
                                  method: 'post',
                                  body: JSON.stringify({ZhiChuSXBH: record['BianHao'], DanJuBH:''}),
                                  headers: {
                                      'Content-Type': 'application/json'
                                  }
                              })
                              .then(res => res.json())
                              .then(json => {
                                  if (json.list)
                                      self.FuZhuSX = json.list
                                  if (self.FuZhuSX.length < 1 && userinfo.debug)
                                      self.FuZhuSX = baseData.fzsx.list
                              })
                              .catch(function (err) {
                                  weui.topTips(err, 3000);
                              })
                          }
                      }
                  },
                  fujianxxOptions: { //附件信息
                      url: config.baseUrl + "/bpm/common/upload3", // 上传地址
                      auto: true, // 自动上传
                      type: 'file', // 上传类型, file为文件上传; base64为以base64上传
                      fileVal: 'file', // 文件上传域的name
                      filekey : "FuJianMC",
                      maxM: 20, // 单张 20M
                      max: 10, // 总张数
                      onSuccess: function (ret) {
                          if (ret.msgCode === "1") {
                              return ret.list[0];
                          }
                      }
                  },
                  ocrOptions: { // ocr配置项
                      url: config.baseUrl + "/bpm/common/ocrfile",
                      type: 'file',
                      fileVal: 'file',
                      auto: true,
                      compress: {
                          width: 1600,
                          height: 1600,
                          quality: .6
                      },
                      onSuccess(ret, FeiYongMX) {
                          // 成功回调
                          var msg = ret.msg;
                          if (msg.length > 0) {
                              weui.topTips(msg, 3000);
                              return;
                          }
                          // 检查此票据是否重复上传
                          _.forEach(FeiYongMX, function (feiyongmx) {
                              if (msg.length > 0)
                                  return false;
                              _.forEach(feiyongmx, function (value, key) {
                                  if (value.OcrCode == 'FuJianXX' && value.FuJianKey == ret.fuJianKey) {
                                      weui.topTips('请勿重复添加同一票据', 3000);
                                      msg = '请勿重复添加同一票据';
                                      return false;
                                  }
                              });
                          });
                          if (msg.length > 0) return;
                          // 添加扫描结果
                          var tempFeiYongMX = _.cloneDeep(FeiYongMX[0]);
                          _.forEach(tempFeiYongMX, function (value, key) {
                              switch (value.OcrCode) {
                                  case 'name': // 乘车人
                                      value.FeiYongMXZ = ret.name;
                                      break;
                                  case 'startStation' : // 出发站
                                      value.FeiYongMXZ = ret.startStation;
                                      break;
                                  case 'arriveStation' : // 到达站
                                      value.FeiYongMXZ = ret.arriveStation;
                                      break;
                                  case 'date' : // 出发日期
                                      value.FeiYongMXZ = ret.date;
                                      break;
                                  case 'seatCategory' : // 座位类型
                                      value.FeiYongMXZ = ret.seatCategory;
                                      break;
                                  case 'ticketPrice' : // 票价
                                      value.FeiYongMXZ = ret.ticketPrice;
                                      break;
                                  case 'trainNum' : // 车次
                                      value.FeiYongMXZ = ret.trainNum;
                                      break;
                                  case 'FuJianXX' : // 附件信息
                                      value.FeiYongMXZ = ret.fuJianLJ;
                                      value.FuJianMC = ret.fuJianMC;
                                      value.FuJianKey = ret.fuJianKey;
                                      value.api = ret.api;
                                      if (ret.api === 'vat_invoice') {
                                          value.FaPiaoDM = ret.code; //发票代码
                                          value.FaPiaoHM = ret.number; //发票号码
                                          value.KaiJuJE = ret.total; //开具金额
                                          value.KaiPiaoRQ = ret.issueDate; //开票日期
                                          value.JiaoYanM = ret.checkCode; //校验码
                                      }
                                      break;
                                  case 'sellerId' : // 销售方纳税人识别号
                                      value.FeiYongMXZ = ret.sellerId;
                                      break;
                                  case 'sellerBank' : // 销售方开户行及账号
                                      value.FeiYongMXZ = ret.sellerBank;
                                      break;
                                  case 'sellerName' : // 销售方名称
                                      value.FeiYongMXZ = ret.sellerName;
                                      break;
                                  case 'buyerId' : // 购买方纳税人识别号
                                      value.FeiYongMXZ = ret.buyerId;
                                      break;
                                  case 'buyerName' : // 购买方名称
                                      value.FeiYongMXZ = ret.buyerName;
                                      break;
                                  case 'issueDate' : // 开票日期
                                      value.FeiYongMXZ = ret.issueDate;
                                      break;
                                  case 'subtotalAmount' : // 合计金额
                                      value.FeiYongMXZ = ret.subtotalAmount;
                                      break;
                                  case 'subtotalTax' : // 合计税额
                                      value.FeiYongMXZ = ret.subtotalTax;
                                      break;
                                  case 'type' : // 发票类型
                                      value.FeiYongMXZ = ret.type;
                                      break;
                                  case 'checkCode' : // 发票校验码
                                      value.FeiYongMXZ = ret.checkCode;
                                      break;
                                  case 'number' : // 发票号
                                      value.FeiYongMXZ = ret.number;
                                      break;
                                  case 'code' : // 发票代码
                                      value.FeiYongMXZ = ret.code;
                                      break;
                                  case 'total' : // 价税合计
                                      value.FeiYongMXZ = ret.total;
                                      break;
                              }
                          })
                          FeiYongMX.push(tempFeiYongMX);
                      },
                      onError(err) {
                          weui.topTips(err, 3000);
                          console.log(err);
                      },
                      onRefreshBZFY: function (item) {
                          var self = this;
                          self.getDetailSumMoney([item], function (result) {
                              if (result.length < 1) return;
                              item.JinE = result[0].ZhiChuMXZJE
                              $.each(item.FeiYongMX, function (k, v) {
                                  $.each(v, function (p, q) {
                                      if (q.Type == 0) {
                                          q.FeiYongMXZ = result[0].bzzlist[k]
                                      }
                                  });
                              });
                          });
                      }
                  },
                  flowOptions: {    // 流程信息  {"BianHao": "910294","MingCheng": "报销--测试流程"}
                      store: [],
                      key: 'BianHao',
                      name: 'MingCheng',
                      sured: function (record, oldRecord) {
                          var self = this;
                          self.showFlow = false;
                          self.formData.FlowId = record.BianHao;
                          self.saveFlow();
                      }
                  },
                  showFlow: false // 默认隐藏流程信息
              }
            },
            computed: {
                total: function () {
                    var total = 0, self = this;
                    $.each(self.ZhiChuMX, function (index, item) {
                       total += parseFloat((item.ZCMXJinE || item.JinE || 0));
                    });
                    return _.toString(total);
                }
            },
            filters: {
                formatNumber: function(str){
                    if (!str) return str
                    return account.formatMoney(str, '￥')
                }
            },
            methods: {
                showSecondPage: function () {   // 显示第二页
                    var self = this
                    if (!self.formData.BaoXiaoLX || !self.formData.ZhiBiaoBH || !self.formData.KeYongYE || !self.formData.BaoXiaoBM
                        || !self.formData.BaoXiaoR || !self.formData.BaoXiaoRQ || !self.formData.BaoXiaoSY || !self.formData.ZhiChuSX) {
                        weui.topTips('必要信息未填写', 3000);
                        return;
                    }
                    self.currentPage ++;
                },
                getDetailSumMoney: function (params, callback) {
                    var _ZhiCuXX = [], loading = weui.loading('loading');
                    _.forEach(params, function (value, key) {
                        var c = _.flatMapDepth(value.FeiYongMX, function (value, key, collection) {
                            return value;
                        }, 1);
                        var _FeiYongMX = [];
                        _.forEach(_.groupBy(c, 'BianHao'), function (value, key) {
                            if (key != 'undefined' ) {
                                _FeiYongMX.push({
                                    'MingXiBH': key,
                                    'MingXiZ': _.map(value, function (v) {
                                        if (!v.FeiYongMXZ) {
                                            return "";
                                        }else{
                                            return v.FeiYongMXZ;
                                        }
                                    })
                                });
                            }
                        });
                        _ZhiCuXX.push({
                            'ZhiChuMXBH': value.BianHao,
                            'FeiYongMX': _FeiYongMX
                        })
                    });
                    fetch(config.baseUrl + "/bpm/common/getDetailSumMoney", {
                        method: 'post',
                        body: JSON.stringify({'ZhiChuXX':_ZhiCuXX}),
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    })
                    .then(res => res.json())
                    .then(json => {
                        loading.hide();
                        console.log('json>' + JSON.stringify(json.ZhiChuMX))
                        if (typeof callback === 'function')
                            callback(json.ZhiChuMX)
                    })
                    .catch(err => {
                        loading.hide();
                        weui.topTips(err, 3000);
                    })
                },
                getTotalMoney: function (callback) {  // 获取支出明细金额和标准值
                    var self = this;
                    self.getDetailSumMoney(self.ZhiChuMX, function (result) {
                        $.each(self.ZhiChuMX, function (i, v) {
                            $.each(result, function (p, q) {
                               if (v.BianHao === q.ZhiChuMXBH) {
                                   v.JinE = q.ZhiChuMXZJE;
                                   if (v.IsShowBZZ === 'true') {  //是否显示标准费用
                                       $.each(v.FeiYongMX, function (u, w) {
                                          $.each(w, function (x, y) {
                                             if (y.Type == 0) {
                                                 y.FeiYongMXZ = q.bzzlist[u]
                                             }
                                          });
                                       });
                                   }
                               }
                            });
                        });
                        if (self.total == 0) {
                            weui.topTips('报销金额不能为0');
                            return;
                        }
                        if (typeof callback === 'function')
                            callback()
                    });
                },
                goThirdPage: function () {
                    var self = this;
                    self.getTotalMoney(function () {
                        self.currentPage = 3;
                    });
                },
                goFourthPage: function () {
                    var self = this, flag = false;
                    $.each(self.FuZhuSX, function (i, v) {
                        if (!v.FuZhuZ) {
                            weui.topTips('辅助事项[' + v.MingCheng + ']未填写', 3000);
                            flag = true;
                            return false;
                        }
                    });
                    if (flag) return;
                    if (!self.loadJieSuanXX) {
                        var loading = weui.loading('loading');
                        self.loadJieSuanXX = true;
                        fetch(config.baseUrl + '/bpm/common/accounts', {
                            method: 'post',
                            headers: {
                                'Content-Type': 'application/json'
                            }
                        })
                        .then(res => res.json())
                        .then(json => {
                            loading.hide();
                            if (json.list)
                               self.JieSuanXX[0].JieSuanType  = json.list
                            if (self.JieSuanXX[0].JieSuanType.length < 1 && userinfo.debug)
                                self.JieSuanXX[0].JieSuanType = baseData.jsxx.list
                        })
                        .catch(err => {
                            loading.hide();
                            weui.topTips(err, 3000);
                            self.loadJieSuanXX = false;
                        })
                    }
                    self.currentPage = 4;
                },
                doAddJieSuanXX: function () {
                    var self = this;
                    var tempObj = _.cloneDeep(self.JieSuanXX[0]);
                    tempObj.JieSuanFS = "";
                    tempObj.JieSuanJE = 0;
                    tempObj.Content = [];
                    self.JieSuanXX.push(tempObj);
                },
                doDelJieSuanXX: function (index) {
                    var self = this;
                    self.JieSuanXX.splice(index, 1);
                },
                save: function () {
                    // 验证结算方式
                    var flag = false, self = this;
                    $.each(self.JieSuanXX, function (i, v) {
                        if (!v.JieSuanFS) {
                            weui.topTips('结算方式不能为空', 3000);
                            flag = true;
                            return false;
                        }
                    });
                    if (flag) return;
                    // 申请金额
                    self.formData.ShenQingJE = self.total;
                    // 辅助事项
                    if (self.FuZhuSX.length > 0) {
                        var tempFzs = self.FuZhuSX.map(function (fzsx) {
                            return {
                                FuZhuSXBH: fzsx.BianHao,
                                FuZhuSXZ: fzsx.FuZhuZ
                            }
                        });
                        self.formData.FuZhuSX = tempFzs;
                    }
                    //支出明细
                    var _ZhiChuXX = [];
                    _.forEach(self.ZhiChuMX, function(v, k){
                        //附件信息
                        if (v.IsOcr) {
                            _.forEach(v.FeiYongMX, function (q, p) {
                                _.forEach(q, function(x, y) {
                                    if (x.Type == -1 && x.FeiYongMXZ) {
                                        var fj = x.api !== 'vat_invoice' ? {
                                            FuJianMC: x.FuJianMC,
                                            FuJianLJ: x.FeiYongMXZ
                                        } : _.assign({
                                            FuJianMC: x.FuJianMC,
                                            FuJianLJ: x.FeiYongMXZ
                                        }, {
                                            FaPiaoDM: x.FaPiaoDM,
                                            FaPiaoHM: x.FaPiaoHM,
                                            KaiJuJE: x.KaiJuJE,
                                            KaiPiaoRQ: x.KaiPiaoRQ,
                                            JiaoYanM: x.JiaoYanM
                                        });
                                        self.formData.FuJianXX.push(fj);
                                    }
                                });
                            });
                        }
                        var c = _.flatMapDepth(v.FeiYongMX, function (v) {
                            return v;
                        }, 1);
                        var _FeiYongMX = []; //费用明细
                        var _BiaoZhuFY = 0; //标准费用
                        _.forEach(_.groupBy(c, 'BianHao'), function (x, y) {
                            if (y != 'undefined' ) {
                                _FeiYongMX.push({
                                    'MingXiBH': y,
                                    'MingXiZ': _.map(x, function (v) {
                                        if (!v.FeiYongMXZ) {
                                            return "";
                                        }else{
                                            return v.FeiYongMXZ;
                                        }
                                    })
                                });
                            } else {
                                _.forEach(_.map(x, function (v) {
                                    if (v.Type == 0 && v.FeiYongMXZ) {
                                        return v.FeiYongMXZ
                                    } else {
                                        return 0
                                    }
                                }), function (v) {
                                    _BiaoZhuFY += _.toNumber(v)
                                });
                            }
                        });
                        _ZhiChuXX.push({
                            ZhiChuMXBH: v.BianHao || v.ZCMXBianHao,
                            JinE: v.JinE || v.ZCMXJinE,
                            BiaoZhuFY: _BiaoZhuFY,
                            FeiYongMX: _FeiYongMX
                        });
                    });
                    self.formData.ZhiChuXX = _ZhiChuXX;
                    //结算信息
                    var _JieSuanXX = []; //结算信息
                    _.forEach(self.JieSuanXX, function (v, k) {
                        var _Content = [];
                        _.forEach(v.Content, function (q, p) {
                            _Content.push({
                                Key: q.key,
                                Value: q.Value
                            });
                        });
                        _JieSuanXX.push({
                            JieSuanFS: v.JieSuanFS,
                            JieSuanJE: v.JieSuanJE,
                            Content: _Content
                        });
                    });
                    self.formData.JieSuanXX = _JieSuanXX;

                    // 流程信息
                    var flowData = {
                        YuSuanND: NianDu,
                        DanWeiBH: DanWeiBH,
                        ZhiChuSX: self.formData.ZhiChuSX,
                        ZhiBiao: self.formData.ZhiBiaoBH,
                        DanJUBH: self.formData.BaoXiaoLX
                    };
                    fetch(config.baseUrl + "/bpm/common/getLiuChenXX", {
                        method: 'post',
                        body: JSON.stringify(flowData),
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    })
                    .then(res => res.json())
                    .then(json => {
                        if (json.list && json.list.length == 1) {
                            self.formData.FlowId = json.list[0].BianHao;
                            self.saveFlow();
                        } else {
                            self.flowOptions.store = json.list;
                            self.showFlow = true;
                            self.$refs['flow'].show();
                        }
                    })
                    .catch(function (err) {
                        weui.topTips(err, 3000);
                    })
                },
                saveFlow: function () {
                    var self = this, loading = weui.loading('loading')
                    fetch(config.baseUrl + "/bpm/bxsq/save", {
                        method: 'post',
                        body: JSON.stringify(self.formData),
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    })
                    .then(res => res.json())
                    .then(json => {
                        loading.hide();
                        if (json.msgCode == '0') {
                            weui.topTips(json.msg, 3000);
                        } else {
                            location.href = "../applyLists.html";
                        }
                    })
                    .catch(function (err) {
                        loading.hide();
                        weui.topTips(err, 3000);
                    })
                }
            },
            created: function () {
                var loading = weui.loading('loading'), self = this;
                //  报销日期
                self.formData.BaoXiaoRQ = moment().format('YYYY-MM-DD');
                // 加载报销类型
                fetch(config.baseUrl + '/bpm/common/getBaoXiaoLX',{
                    method: 'post',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                .then(res => res.json())
                .then(json => {
                    loading.hide();
                    if (json.list)
                        self.bxlxOptions.store = json.list;
                    if (self.bxlxOptions.store.length < 1 && userinfo.debug)
                        self.bxlxOptions.store = baseData.bxlx.list
                    $.each(self.bxlxOptions.store, function (i, record) {
                        if (record.ISDefault === "1")
                            self.$refs['BaoXiaoLX'].select(record).sure();
                    })
                })
                .catch(function (err) {
                    loading.hide();
                    weui.topTips(err, 3000);
                })

                // 报销部门
                fetch(config.baseUrl + '/bpm/common/getDept', {
                    method: 'post',
                    body: JSON.stringify({BuMenBH: BuMenBH}),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                .then(res => res.json())
                .then(json => {
                    if (json.list)
                        self.bxbmOptions.store = json.list
                    if (self.bxbmOptions.store.length < 1 && userinfo.debug)
                        self.bxbmOptions.store = baseData.bxbm.list
                    self.$refs['BaoXiaoBM'].select(self.bxbmOptions.store[0]).sure()
                })
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
    }
 })
})