// pages/bind_bankcard/bind_bankcard.js
// 数据请求接口
let util = require('../../utils/util.js')
let app = getApp();
Page({
  data: {
    inputCode: '',
    isClick: true, //是否可添加点击事件
    gettoto: "获取验证码", //按钮说明
    count: 60, // 秒数倒计时
    userNum: '',
    //查询
    // bankName_index: 0, //开户行名称
    // bankName: ['请选择', '中国工商银行', '中国农业银行', '中国银行', '中国建设银行', '交通银行', '招商银行', '浦发银行', '中信银行', '中国光大银行', '华夏银行', '中国民生银行', '广发银行', '兴业银行', '平安银行', '浙商银行', '恒丰银行'],
    // bankcardname: '', //真实姓名
    // bankNum: '', //银行卡号
    // phone: '', //预留手机号
    //获取验证码
    send: true,
    alreadySend: false,
    second: 60,

    // 提交
    contactsMsg_index: 0, //开户行名称
    contactsMsg_relation: ['请选择', '中国工商银行', '中国农业银行', '中国银行', '中国建设银行', '交通银行', '招商银行', '浦发银行', '中信银行', '中国光大银行', '华夏银行', '中国民生银行', '广发银行', '兴业银行', '平安银行', '浙商银行', '恒丰银行'],
    phone: '', //手机号
    inputCode: '', //验证码
    sendNum: '', //返回的验证码
    remarks: ''
  },
  contactsMsg_relation(e) { //开户行名称
    console.log(e)
    this.setData({
      contactsMsg_index: e.detail.value
    })
  },
  phone(e) { //手机号
    this.setData({
      phone: e.detail.value
    })
  },
  inputCode(e) { //验证码
    this.setData({
      inputCode: e.detail.value
    })
  },
  remarks(e) { //验证码
    this.setData({
      remarks: e.detail.value
    })
  },
  //发送验证码
  sendMsg: function() {
    var that = this;
    var phone = this.data.phone; //手机号
    var code = this.data.code; //验证码
    if (phone == '') {
      wx.showToast({
        title: '请输入您的手机号',
        icon: 'none',
      })
    } else {
      util.rePost('/message/smsSend', {
          phoneNo: phone,
          messageType: 2, //登录0，找回密码1，其他传2
        },
        function(res) {
          console.log(res)
          if (res.code == 1) {
            //设置验证码 并开始倒计时
            that.setData({
              sendNum: res.data.sendNum, //后端返回的验证码
              isClick: false,
              gettoto: "秒重新获取"
            })
            that.timer();
          } else {
            wx.showToast({
              title: res.message,
              icon: 'none',
              duration: 2000
            })
          }
        })
    }
  },
  timer: function() { //计时器
    var second = 60;
    var that = this;
    var appCount = setInterval(function() {
      second = second - 1;
      that.setData({
        count: second
      })
      if (second < 1) {
        clearInterval(appCount);
        //取消置顶的setInterval函数将要执行的代码
        that.setData({
          isClick: true,
          gettoto: "重新获取",
          count: 60
        })
      }
    }, 1000)
  },

  //提交表单
  formSubmit(e) {
    // wx.navigateTo({
    //   url: '/pages/contactsMsg/contactsMsg',
    // })
    var contactsMsg_index = this.data.contactsMsg_index; //开户行名称下标
    var contactsMsg_relation = this.data.contactsMsg_relation[contactsMsg_index] //开户行名称
    var bankcardname = e.detail.value.bankcardname; //真实姓名
    var bankcardnum = e.detail.value.bankcardnum; //银行卡号
    var phone = this.data.phone; //预留手机号
    var inputCode = this.data.inputCode; //验证码
    var sendNum = this.data.sendNum;
    var remarks = this.data.remarks;
    if (contactsMsg_relation == '请选择') {
      wx.showToast({
        title: '请选择开户行名称',
        icon: 'none',
        duration: 1500
      })
      return false;
    } else if (bankcardname == '') {
      wx.showToast({
        title: '请输入真实姓名',
        icon: 'none',
        duration: 1500
      })
      return false;
    } else if (bankcardnum == '' || !(/^[1-9]\d{9,29}$/.test(bankcardnum))) {
      wx.showToast({
        title: '请输入正确的银行卡号',
        icon: 'none',
        duration: 1500
      })
      return false;
    } else if (phone == '') {
      wx.showToast({
        title: '请输入预留手机号',
        icon: 'none',
        duration: 1500
      })
      return false;
    } else if (phone.length != 11 || !(/^1[3456789]\d{9}$/.test(phone))) {
      wx.showToast({
        title: '手机号格式不正确',
        icon: 'none',
        duration: 1500
      })
      return false;
    // } else if (inputCode == '') {
    //   wx.showToast({
    //     title: '请输入验证码',
    //     icon: 'none',
    //     duration: 1500
    //   })
    //   return false;
    } else if (remarks == null || remarks == "") {
      wx.showToast({
        title: '请输入备注信息',
        icon: 'none',
        duration: 1500
      })
      return false;
    } else {
      util.rePost('/bank/updateBankCard', {
        phoneNo: '18706741850', //手 机 号
        userNum: this.data.userNum,
        bcOpeningBank: contactsMsg_index, //开户行名称下标
        realName: bankcardname, //真实姓名
        bcCardNum: bankcardnum, //银行卡号
        bcPhone: phone, //预留手机
        // sendNum: sendNum, // 验证码
        // code: inputCode,
        remarks: remarks
      }, function(res) {
        console.log(res)
        if (res.code == 1) {
          wx.navigateBack({
            detail: 1
          })
          wx.hideLoading()
          wx.showToast({
            title: '修改成功',
          })
        } else {
          wx.showToast({
            title: '添加失败',
          })
        }
      })
    }
  },
  // 查询
  checkBank() {
    var that = this;
    wx.showLoading({
      title: '加载中...',
    })
    util.reGet('/bank/queryDetails', {
      userNum: this.data.userNum
    }, function(res) {
      console.log(res)
      if (res.code == 1) {
        wx.hideLoading()
        that.setData({
          contactsMsg_index: res.data.bcOpeningBank, //开户行名称
          bankcardname: res.data.realName, //真实姓名
          bankNum: res.data.bcCardNum, //银行卡号
          phone: res.data.bcPhone, //预留手机号
          remarks: res.data.remarks //备注信息
        })
      } else {

      }
    })

  },
  handlerGobackClick(delta) {
    const pages = getCurrentPages();
    if (pages.length >= 2) {
      wx.navigateBack({
        delta: delta
      });
    } else {
      wx.navigateTo({
        url: '/pages/home/home'
      });
    }
  },
  handlerGohomeClick() {
    console.log("ee")
    wx.navigateTo({
      url: '/pages/organization/organization'
    });
  },
  onShow: function() {

  },
  onLoad: function(options) {
    this.data.userNum = options.userNum
    this.checkBank(); //查询
  }
})