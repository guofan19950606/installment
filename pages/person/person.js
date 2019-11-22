// pages/person/person.js
let util = require('../../utils/util.js')
const app = getApp()
Page({
  data: {
    isShow: false
  },
  clickBtn_course() { //管理员管理
    wx.navigateTo({
      url: '/pages/adminList/adminList',
    })
  },
  clickBtn_name() { //账户管理
    wx.navigateTo({
      url: '/pages/addnum/addnum',
    })
  },
  onLoad() {

  },
  sureBtn() {
    var that = this;
    wx.showLoading({
      title: '加载中',
    })
    var userinfo = wx.getStorageSync('userinfo');
    util.rePost('/certificate/signOut', {
        identifying: 0,
        userNum: userinfo.userNum,
        platform: 1
      },
      function(res) {
        wx.hideLoading()
        if (res.code == 1) {
          wx.showModal({
            title: '温馨提示',
            content: '您，确定要退出吗？',
            showCancel: true,
            success(res) {
              if (res.confirm) {
                wx.removeStorage({
                  key: 'userinfo',
                  success: function(res) {
                    wx: wx.navigateTo({
                      url: '/pages/login/login',
                    })
                  },
                })
              } else if (res.cancel) {
              }
            }
          })
        } else {
          wx.showToast({
            title: res.message,
            icon: 'none',
          })
        }
      })
  },
  onShow: function(options) {
    var userinfo = wx.getStorageSync('userinfo');
    console.log(userinfo.user.userNum)
    this.setData({
      userNum: userinfo.userNum
    })
    userinfo.user.roleList.forEach((item, index) => {
      console.log(item, "1111")
      if (item == 1) {
        this.setData({
          isShow: true
        })
      } else {
        this.setData({
          isShow: false
        })
      }
    })
  }
})