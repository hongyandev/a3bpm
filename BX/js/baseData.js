define(function () {
    /*用户对象*/
    var userinfo = {
        "YongHuDW": [
            {
                "BianHao": "GLZZ201806130001",
                "MingCheng": "test01",
                "Code": "001"
            }
        ],
        "XingMing": "test0102",
        "DengLuM": "test0102",
        "NianDu": "2019",
        "BuMenBH": "GLZZ201806130001",
        "GangWeiBH": "YWGW201806130003",
        "DanWeiBH": "GLZZ201806130001",
        "DanWeiMC": "test01",
        "YongHuBH": "XTYH201806140006",
        "Code": "001",
        "userid": "05504861765626",
        "buMenMC": "test01"
    }
    /*报销类型*/
    var bxlx = {
        "msg":"成功",
        "list":[
            {
                "BianHao":"1",
                "MingCheng":"直接报销",
                "ISDefault":"1"
            },
            {
                "BianHao":"2",
                "MingCheng":"资金申请报销",
                "ISDefault":"0"
            },
            {
                "BianHao":"3",
                "MingCheng":"执行申请报销",
                "ISDefault":"0"
            },
            {
                "BianHao":"4",
                "MingCheng":"合同支付报销",
                "ISDefault":"0"
            }
        ],
        "msgCode":"1"
    }
    /*资金申请单*/
    var zjApply = {
        "msg": "成功",
        "list": [
            {
                "ZiJinSQJE": "30.00",
                "ZCSXMingCheng": "社会保障缴费",
                "ZhiChuFL": "工资福利支出",
                "FZSXlist": [
                    {
                        "FZSXMingCheng": "数字",
                        "FZSXOptions": [],
                        "FZSXType": "1",
                        "FZSXBianHao": "FZMX201901030001"
                    },
                    {
                        "FZSXMingCheng": "文本",
                        "FZSXOptions": [],
                        "FZSXType": "2",
                        "FZSXBianHao": "FZMX201901030002"
                    },
                    {
                        "FZSXMingCheng": "日期",
                        "FZSXOptions": [],
                        "FZSXType": "3",
                        "FZSXBianHao": "FZMX201901030003"
                    },
                    {
                        "FZSXMingCheng": "数据字典",
                        "FZSXOptions": [
                            {
                                "Value": "0",
                                "Text": "一次性支付",
                                "ShiFouXZ": false
                            },
                            {
                                "Value": "1",
                                "Text": "分期支付",
                                "ShiFouXZ": false
                            },
                            {
                                "Value": "2",
                                "Text": "其他",
                                "ShiFouXZ": false
                            }
                        ],
                        "FZSXType": "4",
                        "FZSXBianHao": "FZMX201901030004"
                    }
                ],
                "JSFSlist": [
                    {
                        "JieSuanJE": "30.00",
                        "JieSuanFS": "1"
                    }
                ],
                "ZCMXlist": [
                    {
                        "ZCMXBianHao": "ZCMX201812240001",
                        "ZCMXJinE": "0.00",
                        "ZCMXMingCheng": "工伤险"
                    },
                    {
                        "ZCMXBianHao": "ZCMX201812240002",
                        "ZCMXJinE": "0.00",
                        "ZCMXMingCheng": "失业险"
                    },
                    {
                        "ZCMXBianHao": "ZCMX201812240003",
                        "ZCMXJinE": "0.00",
                        "ZCMXMingCheng": "住房公积金"
                    }
                ],
                "ZhiBiaoMC": "0901奖励金",
                "DuiYingDJLX": "1",
                "FeiYongXE": "",
                "BianHao": "JKDH201901230021",
                "HTJDlist": [],
                "DuiYingBH": "",
                "ZhiBiaoBH": "NPZB201901030022",
                "ZCSXBianHao": "ZCSX201812240001",
                "BaoXiaoSY": "JKDH201901230021"
            },
            {
                "ZiJinSQJE": "6,000.00",
                "ZCSXMingCheng": "luzili事项1",
                "ZhiChuFL": "luzili配备支出",
                "FZSXlist": [
                    {
                        "FZSXMingCheng": "辅助项",
                        "FZSXOptions": [
                            {
                                "Value": "0",
                                "Text": "采购合同",
                                "ShiFouXZ": false
                            },
                            {
                                "Value": "1",
                                "Text": "其他",
                                "ShiFouXZ": false
                            },
                            {
                                "Value": "2",
                                "Text": "执行申请合同",
                                "ShiFouXZ": false
                            },
                            {
                                "Value": "01",
                                "Text": "test",
                                "ShiFouXZ": false
                            }
                        ],
                        "FZSXType": "4",
                        "FZSXBianHao": "FZMX201910280001"
                    },
                    {
                        "FZSXMingCheng": "辅助项1",
                        "FZSXOptions": [],
                        "FZSXType": "1",
                        "FZSXBianHao": "FZMX201910280002"
                    },
                    {
                        "FZSXMingCheng": "辅助项2",
                        "FZSXOptions": [],
                        "FZSXType": "3",
                        "FZSXBianHao": "FZMX201910280003"
                    }
                ],
                "JSFSlist": [
                    {
                        "JieSuanJE": "6,000.00",
                        "JieSuanFS": "2"
                    }
                ],
                "ZCMXlist": [
                    {
                        "ZCMXBianHao": "ZCMX201910280001",
                        "ZCMXJinE": "0.00",
                        "ZCMXMingCheng": "城市交通费"
                    },
                    {
                        "ZCMXBianHao": "ZCMX201910280002",
                        "ZCMXJinE": "0.00",
                        "ZCMXMingCheng": "差旅费"
                    }
                ],
                "ZhiBiaoMC": "luzili指标（勿动）",
                "DuiYingDJLX": "1",
                "FeiYongXE": 400000,
                "BianHao": "JKDH201910290002",
                "HTJDlist": [],
                "DuiYingBH": "",
                "ZhiBiaoBH": "NPZB201910290001",
                "ZCSXBianHao": "ZCSX201910280007",
                "BaoXiaoSY": "报销"
            },
            {
                "ZiJinSQJE": "3,600.00",
                "ZCSXMingCheng": "luzili事项1",
                "ZhiChuFL": "luzili配备支出",
                "FZSXlist": [
                    {
                        "FZSXMingCheng": "辅助项",
                        "FZSXOptions": [
                            {
                                "Value": "0",
                                "Text": "采购合同",
                                "ShiFouXZ": false
                            },
                            {
                                "Value": "1",
                                "Text": "其他",
                                "ShiFouXZ": false
                            },
                            {
                                "Value": "2",
                                "Text": "执行申请合同",
                                "ShiFouXZ": false
                            },
                            {
                                "Value": "01",
                                "Text": "test",
                                "ShiFouXZ": false
                            }
                        ],
                        "FZSXType": "4",
                        "FZSXBianHao": "FZMX201910280001"
                    },
                    {
                        "FZSXMingCheng": "辅助项1",
                        "FZSXOptions": [],
                        "FZSXType": "1",
                        "FZSXBianHao": "FZMX201910280002"
                    },
                    {
                        "FZSXMingCheng": "辅助项2",
                        "FZSXOptions": [],
                        "FZSXType": "3",
                        "FZSXBianHao": "FZMX201910280003"
                    }
                ],
                "JSFSlist": [
                    {
                        "JieSuanJE": "3,600.00",
                        "JieSuanFS": "1"
                    }
                ],
                "ZCMXlist": [
                    {
                        "ZCMXBianHao": "ZCMX201910280001",
                        "ZCMXJinE": "0.00",
                        "ZCMXMingCheng": "城市交通费"
                    },
                    {
                        "ZCMXBianHao": "ZCMX201910280002",
                        "ZCMXJinE": "0.00",
                        "ZCMXMingCheng": "差旅费"
                    }
                ],
                "ZhiBiaoMC": "luzili指标（勿动）",
                "DuiYingDJLX": "1",
                "FeiYongXE": 400000,
                "BianHao": "JKDH201910300001",
                "HTJDlist": [],
                "DuiYingBH": "",
                "ZhiBiaoBH": "NPZB201910290001",
                "ZCSXBianHao": "ZCSX201910280007",
                "BaoXiaoSY": "报销"
            }
        ],
        "msgCode": "1"
    }
    /*执行申请单*/
    var zxApply = {
        "msg": "成功",
        "list": [
            {
                "BianHao": "SQMX201910310002",
                "ShenQingDH": "S201910310003",
                "ZhiBiaoMC": "luzili指标（勿动）",
                "ZhiBiaoBH": "NPZB201910290001",
                "ShenQingJE": "1,200.00",
                "BiaoTi": "验证预算执行申请"
            },
            {
                "BianHao": "SQMX201911260002",
                "ShenQingDH": "S201911260001",
                "ZhiBiaoMC": "20191101",
                "ZhiBiaoBH": "NPZB201911010002",
                "ShenQingJE": "21.00",
                "BiaoTi": "12"
            },
            {
                "BianHao": "SQMX201912090002",
                "ShenQingDH": "S201912090023",
                "ZhiBiaoMC": "自然科学资金赞助项目指标",
                "ZhiBiaoBH": "NPZB201912090001",
                "ShenQingJE": "2,000.00",
                "BiaoTi": "本部的指标"
            }
        ],
        "msgCode": "1"
    }
    /*合同*/
    var ht = {
        "msg": "成功",
        "list": [
            {
                "BianHao": "HTZB201911200002",
                "WeiZhiFJE": "1.00",
                "HeTongMC": "移动端合同",
                "ZhiBiaoMC": "luzili指标（勿动）",
                "ZhiBiaoBH": "NPZB201910290001",
                "HeTongJD": [
                    {
                        "JiHuaFuKJE": "15,000.00",
                        "IsUse": "true",
                        "JieDuanBH": "HTJH201911200001",
                        "HeTongJD": "全款"
                    }
                ],
                "HeTongBM": "Qtest0001-20191108-02",
                "HeTongJE": "1.00"
            },
            {
                "BianHao": "HTZB201911050001",
                "WeiZhiFJE": "1.00",
                "HeTongMC": "luzili合同",
                "ZhiBiaoMC": "luzili指标（勿动）",
                "ZhiBiaoBH": "NPZB201910290001",
                "HeTongJD": [
                    {
                        "JiHuaFuKJE": "5,000.00",
                        "IsUse": "true",
                        "JieDuanBH": "HTJH201911040001",
                        "HeTongJD": "全款"
                    }
                ],
                "HeTongBM": "Qtest0001-20191108-01",
                "HeTongJE": "1.00"
            },
            {
                "BianHao": "HTZB201901280022",
                "WeiZhiFJE": "1.00",
                "HeTongMC": "测试12801",
                "ZhiBiaoMC": "12801失业险",
                "ZhiBiaoBH": "NPZB201901280021",
                "HeTongJD": [
                    {
                        "JiHuaFuKJE": "800.00",
                        "IsUse": "true",
                        "JieDuanBH": "HTJH201901280022",
                        "HeTongJD": "全款"
                    }
                ],
                "HeTongBM": "Qtest0001-20190130-01Q",
                "HeTongJE": "1.00"
            },
            {
                "BianHao": "HTZB201901040001",
                "WeiZhiFJE": "1.00",
                "HeTongMC": "0901",
                "ZhiBiaoMC": "0901奖励金",
                "ZhiBiaoBH": "NPZB201901030022",
                "HeTongJD": [
                    {
                        "JiHuaFuKJE": "20.00",
                        "IsUse": "false",
                        "JieDuanBH": "HTJH201901040001",
                        "HeTongJD": "首款"
                    },
                    {
                        "JiHuaFuKJE": "40.00",
                        "IsUse": "false",
                        "JieDuanBH": "HTJH201901040002",
                        "HeTongJD": "尾款"
                    }
                ],
                "HeTongBM": "Qtest0001-20190124-01Q",
                "HeTongJE": "1.00"
            },
            {
                "BianHao": "HTZB201811070003",
                "WeiZhiFJE": "1.00",
                "HeTongMC": "测试110701",
                "ZhiBiaoMC": "090801",
                "ZhiBiaoBH": "NPZB201809080002",
                "HeTongJD": [
                    {
                        "JiHuaFuKJE": "300.00",
                        "IsUse": "false",
                        "JieDuanBH": "HTJH201811070003",
                        "HeTongJD": "尾款"
                    }
                ],
                "HeTongBM": "Qtest0001-20181101-01",
                "HeTongJE": "1.00"
            },
            {
                "BianHao": "HTZB201809080002",
                "WeiZhiFJE": "1.00",
                "HeTongMC": "090801",
                "ZhiBiaoMC": "090801",
                "ZhiBiaoBH": "NPZB201809080002",
                "HeTongJD": [
                    {
                        "JiHuaFuKJE": "100.00",
                        "IsUse": "false",
                        "JieDuanBH": "HTJH201809080001",
                        "HeTongJD": "全款"
                    }
                ],
                "HeTongBM": "Qtest0001-20180908-01",
                "HeTongJE": "1.00"
            }
        ],
        "msgCode": "1"
    }
    /*指标名称*/
    var zbmc = {
        "msg":"成功",
        "list":[
            {
                "yuSuanSXBH":"NBYS201910280006",
                "keYongYE":"18,900.00",
                "yuSuanSX":"luzili专项2",
                "bianHao":"NPZB201912110002",
                "zhiBiaoMC":"采购指标WB2"
            },
            {
                "yuSuanSXBH":"NBYS201910280006",
                "keYongYE":"19,000.00",
                "yuSuanSX":"luzili专项2",
                "bianHao":"NPZB201912110001",
                "zhiBiaoMC":"采购指标WB1"
            },
            {
                "yuSuanSXBH":"NBYS201912090002",
                "keYongYE":"1,773,000.00",
                "yuSuanSX":"科学技术人员开展基础研究专项预算",
                "bianHao":"NPZB201912090001",
                "zhiBiaoMC":"自然科学资金赞助项目指标"
            },
            {
                "yuSuanSXBH":"NBYS201910280004",
                "keYongYE":"1,799,200.00",
                "yuSuanSX":"luzili专项1",
                "bianHao":"NPZB201911270003",
                "zhiBiaoMC":"钉钉专用指标"
            },
            {
                "yuSuanSXBH":"NBYS201910280004",
                "keYongYE":"2.00",
                "yuSuanSX":"luzili专项1",
                "bianHao":"NPZB201911210061",
                "zhiBiaoMC":"1212121"
            },
            {
                "yuSuanSXBH":"NBYS201910280004",
                "keYongYE":"3,234.00",
                "yuSuanSX":"luzili专项1",
                "bianHao":"NPZB201911070001",
                "zhiBiaoMC":"111111"
            },
            {
                "yuSuanSXBH":"NBYS201910280004",
                "keYongYE":"654,806.00",
                "yuSuanSX":"luzili专项1",
                "bianHao":"NPZB201911050002",
                "zhiBiaoMC":"采购指标"
            },
            {
                "yuSuanSXBH":"NBYS201910280006",
                "keYongYE":"98,768.00",
                "yuSuanSX":"luzili专项2",
                "bianHao":"NPZB201911050001",
                "zhiBiaoMC":"采购专用指标"
            },
            {
                "yuSuanSXBH":"NBYS201910280004",
                "keYongYE":"4,991,781.70",
                "yuSuanSX":"luzili专项1",
                "bianHao":"NPZB201911010002",
                "zhiBiaoMC":"20191101"
            },
            {
                "yuSuanSXBH":"NBYS201910280004",
                "keYongYE":"49,999.00",
                "yuSuanSX":"luzili专项1",
                "bianHao":"NPZB201911010001",
                "zhiBiaoMC":"铅笔指标2019"
            },
            {
                "yuSuanSXBH":"NBYS201910280004",
                "keYongYE":"284,141.80",
                "yuSuanSX":"luzili专项1",
                "bianHao":"NPZB201910290001",
                "zhiBiaoMC":"luzili指标（勿动）"
            },
            {
                "yuSuanSXBH":"NBYS201812240008",
                "keYongYE":"200.00",
                "yuSuanSX":"失业险",
                "bianHao":"NPZB201901280021",
                "zhiBiaoMC":"12801失业险"
            },
            {
                "yuSuanSXBH":"NBYS201812240006",
                "keYongYE":"100,000.00",
                "yuSuanSX":"奖励金",
                "bianHao":"NPZB201901280001",
                "zhiBiaoMC":"12801"
            },
            {
                "yuSuanSXBH":"NBYS201812240006",
                "keYongYE":"98,963.00",
                "yuSuanSX":"奖励金",
                "bianHao":"NPZB201901030022",
                "zhiBiaoMC":"0901奖励金"
            }
        ],
        "msgCode":"1"
    }
    /*报销部门*/
    var bxbm = {
        "msg": "成功",
        "list": [
            {
                "BianHao": "ZZJG201806130001",
                "MingCheng": "test01"
            }
        ],
        "msgCode": "1"
    }
    /*支出事项*/
    var zcsx = {
        "msg": "成功",
        "list": [
            {
                "BianHao": "ZCSX201812240001",
                "ZhiChuFL": "工资福利支出",
                "MingCheng": "社会保障缴费",
                "FeiYongXE": "1,000.00"
            },
            {
                "BianHao": "ZCSX201812240002",
                "ZhiChuFL": "工资福利支出",
                "MingCheng": "工资福利",
                "FeiYongXE": "1,000.00"
            },
            {
                "BianHao": "ZCSX201812240007",
                "ZhiChuFL": "工资福利支出",
                "MingCheng": "项目支出",
                "FeiYongXE": "1,000.00"
            }
        ],
        "msgCode": "1"
    }
    /*支出明细*/
    var zcmx = {
        "msg": "成功",
        "list": [
            {
                "BianHao": "ZCMX201910280001",
                "IsShowBZZ": "false",
                "JinE": "0.00",
                "MingCheng": "城市交通费",
                "IsOcr": "1",
                "FeiYongMX": [
                    [
                        {
                            "BianHao": "FYMX201911190015",
                            "Options": [],
                            "Type": "2",
                            "BiaoZhunFZXH": "",
                            "OcrCode": "name",
                            "FeiYongMXMC": "乘车人"
                        },
                        {
                            "BianHao": "FYMX201911190016",
                            "Options": [],
                            "Type": "2",
                            "BiaoZhunFZXH": "",
                            "OcrCode": "startStation",
                            "FeiYongMXMC": "出发站"
                        },
                        {
                            "BianHao": "FYMX201911190017",
                            "Options": [],
                            "Type": "2",
                            "BiaoZhunFZXH": "",
                            "OcrCode": "arriveStation",
                            "FeiYongMXMC": "到达站"
                        },
                        {
                            "BianHao": "FYMX201911190018",
                            "Options": [],
                            "Type": "3",
                            "BiaoZhunFZXH": "",
                            "OcrCode": "date",
                            "FeiYongMXMC": "出发日期"
                        },
                        {
                            "BianHao": "FYMX201911190019",
                            "Options": [],
                            "Type": "2",
                            "BiaoZhunFZXH": "",
                            "OcrCode": "seatCategory",
                            "FeiYongMXMC": "座位类型"
                        },
                        {
                            "BianHao": "FYMX201911190020",
                            "Options": [],
                            "Type": "1",
                            "BiaoZhunFZXH": "",
                            "OcrCode": "ticketPrice",
                            "FeiYongMXMC": "票价"
                        },
                        {
                            "BianHao": "FYMX201911190021",
                            "Options": [],
                            "Type": "2",
                            "BiaoZhunFZXH": "",
                            "OcrCode": "trainNum",
                            "FeiYongMXMC": "车次"
                        }
                    ]
                ]
            },
            {
                "BianHao": "ZCMX201910280002",
                "IsShowBZZ": "false",
                "JinE": "0.00",
                "MingCheng": "差旅费",
                "IsOcr": "2",
                "FeiYongMX": [
                    [
                        {
                            "BianHao": "FYMX201911190022",
                            "Options": [],
                            "Type": "2",
                            "BiaoZhunFZXH": "",
                            "OcrCode": "sellerId",
                            "FeiYongMXMC": "销售方纳税人识别号"
                        },
                        {
                            "BianHao": "FYMX201911190023",
                            "Options": [],
                            "Type": "2",
                            "BiaoZhunFZXH": "",
                            "OcrCode": "sellerBank",
                            "FeiYongMXMC": "销售方开户行及账号"
                        },
                        {
                            "BianHao": "FYMX201911190024",
                            "Options": [],
                            "Type": "2",
                            "BiaoZhunFZXH": "",
                            "OcrCode": "sellerName",
                            "FeiYongMXMC": "销售方名称"
                        },
                        {
                            "BianHao": "FYMX201911190025",
                            "Options": [],
                            "Type": "2",
                            "BiaoZhunFZXH": "",
                            "OcrCode": "buyerId",
                            "FeiYongMXMC": "购买方纳税人识别号"
                        },
                        {
                            "BianHao": "FYMX201911190026",
                            "Options": [],
                            "Type": "2",
                            "BiaoZhunFZXH": "",
                            "OcrCode": "buyerName",
                            "FeiYongMXMC": "购买方名称"
                        },
                        {
                            "BianHao": "FYMX201911190027",
                            "Options": [],
                            "Type": "2",
                            "BiaoZhunFZXH": "",
                            "OcrCode": "del",
                            "FeiYongMXMC": "是否作废"
                        },
                        {
                            "BianHao": "FYMX201911190028",
                            "Options": [],
                            "Type": "3",
                            "BiaoZhunFZXH": "",
                            "OcrCode": "issueDate",
                            "FeiYongMXMC": "开票日期"
                        },
                        {
                            "BianHao": "FYMX201911190029",
                            "Options": [],
                            "Type": "1",
                            "BiaoZhunFZXH": "",
                            "OcrCode": "subtotalAmount",
                            "FeiYongMXMC": "合计金额"
                        },
                        {
                            "BianHao": "FYMX201911190030",
                            "Options": [],
                            "Type": "1",
                            "BiaoZhunFZXH": "",
                            "OcrCode": "subtotalTax",
                            "FeiYongMXMC": "合计税额"
                        },
                        {
                            "BianHao": "FYMX201911190031",
                            "Options": [],
                            "Type": "2",
                            "BiaoZhunFZXH": "",
                            "OcrCode": "type",
                            "FeiYongMXMC": "发票类型"
                        },
                        {
                            "BianHao": "FYMX201911190032",
                            "Options": [],
                            "Type": "2",
                            "BiaoZhunFZXH": "",
                            "OcrCode": "checkCode",
                            "FeiYongMXMC": "发票校验码"
                        },
                        {
                            "BianHao": "FYMX201911190033",
                            "Options": [],
                            "Type": "2",
                            "BiaoZhunFZXH": "",
                            "OcrCode": "number",
                            "FeiYongMXMC": "发票号"
                        },
                        {
                            "BianHao": "FYMX201911190034",
                            "Options": [],
                            "Type": "2",
                            "BiaoZhunFZXH": "",
                            "OcrCode": "code",
                            "FeiYongMXMC": "发票代码"
                        },
                        {
                            "BianHao": "FYMX201911190035",
                            "Options": [],
                            "Type": "1",
                            "BiaoZhunFZXH": "",
                            "OcrCode": "total",
                            "FeiYongMXMC": "价税合计"
                        }
                    ]
                ]
            },
            {
                "BianHao": "ZCMX201812240001",
                "IsShowBZZ": "true",
                "JinE": "0.00",
                "MingCheng": "工伤险",
                "FeiYongMX": [
                    [
                        {
                            "BianHao": "FYMX201912090016",
                            "Options": [
                                {
                                    "Value": "FZXXZ201912060004",
                                    "Text": "12"
                                },
                                {
                                    "Value": "FZXXZ201912060005",
                                    "Text": "121"
                                },
                                {
                                    "Value": "FZXXZ201912060006",
                                    "Text": "1212"
                                }
                            ],
                            "Type": 4,
                            "BiaoZhunFZXH": "1",
                            "FeiYongMXMC": "级别"
                        },
                        {
                            "BianHao": "FYMX201912090017",
                            "Options": [
                                {
                                    "Value": "FZXXZ201912060001",
                                    "Text": "1"
                                },
                                {
                                    "Value": "FZXXZ201912060003",
                                    "Text": "12"
                                }
                            ],
                            "Type": 4,
                            "BiaoZhunFZXH": "2",
                            "FeiYongMXMC": "差旅费"
                        },
                        {
                            "BianHao": "FYMX201912090018",
                            "Options": [
                                {
                                    "Value": "FZXXZ201912060002",
                                    "Text": "基本支出"
                                }
                            ],
                            "Type": 4,
                            "BiaoZhunFZXH": "3",
                            "FeiYongMXMC": "基本支出"
                        },
                        {
                            "BianHao": "FYMX201912090019",
                            "Options": [],
                            "Type": "1",
                            "BiaoZhunFZXH": "",
                            "FeiYongMXMC": "a"
                        },
                        {
                            "BianHao": "FYMX201912090020",
                            "Options": [],
                            "Type": "1",
                            "BiaoZhunFZXH": "",
                            "FeiYongMXMC": "v"
                        }
                    ]
                ]
            },
            {
                "BianHao": "ZCMX201812240002",
                "IsShowBZZ": "false",
                "JinE": "0.00",
                "MingCheng": "失业险",
                "FeiYongMX": []
            },
            {
                "BianHao": "ZCMX201812240003",
                "IsShowBZZ": "false",
                "JinE": "0.00",
                "MingCheng": "住房公积金",
                "FeiYongMX": [
                    [
                        {
                            "BianHao": "FYMX201912090003",
                            "Options": [],
                            "Type": "1",
                            "BiaoZhunFZXH": "",
                            "FeiYongMXMC": "a"
                        },
                        {
                            "BianHao": "FYMX201912090004",
                            "Options": [],
                            "Type": "1",
                            "BiaoZhunFZXH": "",
                            "FeiYongMXMC": "b"
                        }
                    ]
                ]
            }
        ],
        "msgCode": "1"
    }
    /*阿里ocr识别结果--火车票*/
    var aliocr_train = {
        "date": "2016年10月15日14:10",
        "number": "G7608",
        "level": "二等座",
        "price": 117.5,
        "success": true,
        "origin": "杭州东站",
        "destination": "南京南站",
        "name": "曹思培",
        "place": "12车05F号",
        "request_id": "20191226165903_b951dd8df93d59405b1b5a9b5dc5621c"
    }
    /*阿里ocr识别结果--增值税*/
    var aliocr_invoice = {
        "data": {
            "受票方税号": "91330100143054524X",
            "开票日期": "2019年7月24日",
            "销售方名称": "北京中科三方网络技术有限公司",
            "联次": "第二联：抵扣联",
            "不含税金额": "2641.51",
            "受票方名称": "杭州鸿雁电器有限公司",
            "销售方税号": "91110108723969982M",
            "发票代码解析": {
                "文字版": "1",
                "印刷批次": "1",
                "年份": "2019",
                "联次": "3",
                "金额版": "电脑版",
                "行政区划代码": "北京市"
            },
            "校验码": "",
            "发票号码": "02237701",
            "受票方开户行、账号": "工行莫干山路支行1202026109005470890",
            "发票金额": "2800",
            "销售方地址、电话": "北京市海淀区中关村南四街四号中科院软件园：号楼313室010-83028087",
            "发票详单": [
                {
                    "税额": "158.49",
                    "单位": "",
                    "数量": "10",
                    "规格型号": "",
                    "税率": "6%",
                    "货物或应税劳务、服务名称": "*信息技术服务*域名费",
                    "单价": "264.151",
                    "金额": "2641.51"
                }
            ],
            "大写金额": "2800",
            "销售方开户行、账号": "中国工商银行股份有限公司北京海淀支行营业部020004961920005330B",
            "发票税额": "158.49",
            "受票方地址、电话": "杭州市西湖区天目山路248号华鸿大厦85899805",
            "发票类型": "专用发票",
            "发票代码": "1100191130"
        },
        "orgWidth": 900,
        "width": 1600,
        "angle": 90,
        "orgHeight": 1600,
        "sid": "e3e38ba25836e393a648a2ab1c1e80640643c6b8055f62a87813fcb50d58f469f7d76147",
        "height": 900
    }
    /*自定义ocr-火车票接口返回*/
    var ocr_train = {
        "arriveStation":"南京南站",
        "buyerId":"",
        "buyerName":"",
        "code":"",
        "date":"2016-10-15",
        "fuJianKey":"94b484373a523f62899683f32efcac45", // MD5Util.encrypt(aliocr.getDate()+aliocr.getName()+aliocr.getTrainNum())
        "fuJianLJ":"http://119.18.195.153:8089/bpm/image//upload/FJ191227103300012.jpg",
        "fuJianMC":"FJ191227103300012.jpg",
        "issueDate":"",
        "msg":"",
        "name":"曹思培",
        "number":"",
        "seatCategory":"二等座",
        "sellerBank":"",
        "sellerId":"",
        "sellerName":"",
        "startStation":"杭州东站",
        "subtotalAmount":"",
        "subtotalTax":"",
        "ticketPrice":"117.5",
        "total":"",
        "trainNum":"G7608",
        "type":""
    }
    /*自定义ocr-增值税接口返回*/
    var ocr_invoice = {
        "buyerId": "91330100143054524X",
        "buyerName": "杭州鸿雁电器有限公司",
        "code": "1100191130",
        "fuJianKey": "b2966f058c736f40897bf21e92d97ece",
        "fuJianLJ": "http://119.18.195.153:8089/bpm/image//upload/FJ191229191700024.jpg",
        "fuJianMC": "FJ191229191700024.jpg",
        "issueDate": "2019-07-24",
        "msg": "",
        "number": "02237701",
        "sellerBank": "中国工商银行股份有限公司北京海淀支行营业部020004961920005330B",
        "sellerId": "91110108723969982M",
        "sellerName": "北京中科三方网络技术有限公司",
        "subtotalAmount": "2641.51",
        "subtotalTax": "158.49",
        "total": "2800",
        "type": "专用发票"
    }
    /*标准费用*/
    var bzfy = {
        "msg":"成功",
        "msgCode":"1",
        "ZhiChuMX":[
            {
                "ZhiChuMXZJE":"130",
                "bzzlist":[
                    "1"
                ],
                "list":[
                    "-30"
                ],
                "ZhiChuMXBH":"ZCMX201812240001"
            },
            {
                "ZhiChuMXZJE":"110",
                "bzzlist":[
                    null
                ],
                "list":[
                    "3000"
                ],
                "ZhiChuMXBH":"ZCMX201812240003"
            }
        ]
    }
    /*辅助事项*/
    var fzsx = {
        "msg":"成功",
        "list":[
            {
                "BianHao":"FZMX201901030001",
                "Options":[],
                "Type":"1",
                "MingCheng":"数字"
            },
            {
                "BianHao":"FZMX201901030002",
                "Options":[],
                "Type":"2",
                "MingCheng":"文本"
            },
            {
                "BianHao":"FZMX201901030003",
                "Options":[],
                "Type":"3",
                "MingCheng":"日期"
            },
            {
                "BianHao":"FZMX201901030004",
                "Options":[
                    {
                        "Value":"0",
                        "Text":"一次性支付",
                        "ShiFouXZ":false
                    },
                    {
                        "Value":"1",
                        "Text":"分期支付",
                        "ShiFouXZ":false
                    },
                    {
                        "Value":"2",
                        "Text":"其他",
                        "ShiFouXZ":false
                    }
                ],
                "Type":"4",
                "MingCheng":"数据字典"
            }
        ],
        "msgCode":"1"
    }
    /*结算信息*/
    var jsxx = {
        "msg":"成功",
        "list":[
            {
                "Content":"",
                "MingCheng":"现金",
                "BianMa":"1"
            },
            {
                "Content":"",
                "MingCheng":"支票",
                "BianMa":"2"
            },
            {
                "Content":[
                    {
                        "DataTYPE":"string",
                        "Text":"收款方账户名",
                        "key":"ShouKuanFZHM"
                    },
                    {
                        "DataTYPE":"string",
                        "Text":"开户行",
                        "key":"KaiHuH"
                    },
                    {
                        "DataTYPE":"string",
                        "Text":"账号",
                        "key":"ZhangHao"
                    }
                ],
                "MingCheng":"转账",
                "BianMa":"3"
            },
            {
                "Content":[
                    {
                        "DataTYPE":"string",
                        "Text":"公务卡号",
                        "key":"GongWuKH"
                    },
                    {
                        "DataTYPE":"date",
                        "Text":"消费日期",
                        "key":"XiaoFeiRQ"
                    },
                    {
                        "DataTYPE":"date",
                        "Text":"记账日期",
                        "key":"JiZhangRQ"
                    },
                    {
                        "DataTYPE":"date",
                        "Text":"还款日期",
                        "key":"HuanKuanRQ"
                    },
                    {
                        "DataTYPE":"string",
                        "Text":"备注",
                        "key":"BeiZhu"
                    }
                ],
                "MingCheng":"公务卡",
                "BianMa":"4"
            }
        ],
        "msgCode":"1"
    }
    /*流程信息*/
    var lcxx = {
        "msg": "成功",
        "list": [
            {
                "BianHao": "910294",
                "MingCheng": "报销--测试流程"
            },
            {
                "BianHao": "910294",
                "MingCheng": "流程自定义条件"
            },
            {
                "BianHao": "970038",
                "MingCheng": "报销申请-my"
            },
            {
                "BianHao": "20183",
                "MingCheng": "报销申请2个节点"
            }
        ],
        "msgCode": "1"
    }
    return {
        userinfo: userinfo,
        bxlx: bxlx,
        zjApply: zjApply,
        zxApply: zxApply,
        ht: ht,
        zbmc: zbmc,
        bxbm: bxbm,
        zcsx: zcsx,
        zcmx: zcmx,
        fzsx: fzsx,
        jsxx: jsxx
    }
})
