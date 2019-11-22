//logs.js
// 数据请求接口
let util = require('../../utils/util.js')
let app = getApp();
Page({
  data: {
    phone: '',
    password: '',
    hidenphone: true,
    hidenpassword: true
  },
  password(e) { //密码
    this.setData({
      password: e.detail.value
    })
    console.log(this.data.password)
  },
  EnterInput() {
    this.loginBtn();
  },
  loginBtn() { //登录按钮
    var phone = this.data.phone;
    var password = this.data.password;
    console.log(phone, password)
    wx.showLoading({
      title: '登录中...',
    })
    if (phone == '') {
      wx.showToast({
        title: '请输入您的手机号',
        icon: 'none'
      })
      return false
    } else if (phone.length != 11 || !(/^1[3456789]\d{9}$/.test(phone))) {
      wx.showToast({
        title: '手机号格式不正确',
        icon: 'none',
      })
      return false
    } else if (password == '') {
      wx.showToast({
        title: '请输入您的密码',
        icon: 'none'
      })
      return false
    } else {
      var that = this;
      console.log(util.rootDocment)
      wx.request({
        url: util.rootDocment+"/user/login",
        data: {
          phoneNo: phone,
          password: password,
          platform: 1,
        },
        method: 'POST',
        dataType: 'json',
        header: {
          'content-Type': 'application/json'
        },
        success: function(res) {
          if (res.data.code == 200) {
            wx.hideLoading()
            wx.setStorageSync('userinfo', res.data.data)
            wx.setStorageSync('Token', res.data.data.token)
            wx.switchTab({
              url: '/pages/home/home'
            })
          } else {
            wx.hideLoading()
            wx.showToast({
              title: res.data.message,
              icon: 'none',
              duration: 2000
            })
          }
        }
      })

      // util.rePost('/user/login', {
      //     phoneNo: phone,
      //     password: password,
      //     platform: 1,
      //   },
      //   function(res) {
      //     if (res.code == 200) {
      //       wx.hideLoading()
      //       wx.setStorageSync('userinfo', res.data)
      //       wx.setStorageSync('Token', res.data.token)
      //       wx.switchTab({
      //         url: '/pages/home/home'
      //       })
      //     } else {
      //       wx.hideLoading()
      //       wx.showToast({
      //         title: res.message,
      //         icon: 'none',
      //         duration: 2000
      //       })
      //     }
      //     console.log(res)
      //   }, "noAuth")
    }
  },
  phone(e) { //手机号
    if (e.detail.value != '') {
      if (e.detail.value.length == 11 && (/^1[3456789]\d{9}$/.test(e.detail.value))) {
        this.setData({
          hidenphone: true,
          phone: e.detail.value
        })
      } else {
        this.setData({
          hidenphone: false,
        })
      }
    } else {
      this.setData({
        hidenphone: true
      })
    }
  },
  password(e) { //密码
    this.setData({
      password: e.detail.value
    })
  },
  onShow: function() {

  },
  onLoad: function(options) {

  }
})