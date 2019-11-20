// pages/adminList/adminList.js
let util = require('../../utils/util.js')
Page({
  data: {
    lists: [], //管理员列表信息
    size: 10, //默认一页十天信息
    pageNumber: 1, //默认第一页
    pages: null, //获取页面页数
  },
  //点击返回上一页
  handlerGobackClick(delta) {
    const pages = getCurrentPages();
    if (pages.length >= 2) {
      wx.navigateBack({
        delta: delta
      });
    } else {
      wx.navigateTo({
        url: '/pages/person/person'
      });
    }
  },
  //点击跳转至添加管理员页面
  handlerGohomeClick() {
    wx.navigateTo({
      url: '/pages/addadmin/addadmin'
    });
  },
  //点击跳转至对应的编辑页面，并且传递用户编码，跳转页根据传参获取用户详情
  updateclick(e) {
    var dataDetailInfo = JSON.stringify(e.currentTarget.dataset.text.userNum);
    console.log(dataDetailInfo)
    wx.navigateTo({
      url: '/pages/editAdmin/editAdmin?data=' + dataDetailInfo,
    })
  },
  //获取用户信息列表
  getAdminInfo: function() {
    var that = this;
    wx.showLoading({
      title: '加载中',
    })
    util.rePost('/manager/getManagerList', {
        current: this.data.pageNumber,
        size: that.data.size,
      },
      function(res) {
        var lists = res.data.records
        if (res.code == 1) {
          wx.hideLoading()
          that.setData({
            lists: lists,
            pages: res.data.pages
          })
        } else {
          wx.showToast({
            title: res.message,
            icon: 'none',
          })
        }
      })
  },
  //生命周期函数--监听页面显示
  onShow: function() {
    this.setData({
      pageNumber: 1
    })
    this.getAdminInfo();
  },
  //页面上拉触底事件的处理函数
  onReachBottom: function() {
    if (this.data.pageNumber < this.data.pages) {
      console.log("jiazai")
      var that = this;
      // 当前页+1
      var pageNumber = that.data.pageNumber + 1;
      that.setData({
        pageNumber: pageNumber,
      })
      wx.showLoading({
        title: '加载中',
      })
      console.log(this.data.pageNumber, "33333")
      util.rePost('/manager/getManagerList', {
          current: that.data.pageNumber,
          size: that.data.size,
        },
        function(res) {
          var lists = res.data.records
          if (res.code == 1) {
            wx.hideLoading()
            that.setData({
              lists: that.data.lists.concat(res.data.records)
            })
          } else {
            wx.showToast({
              title: res.message,
              icon: 'none',
            })
          }
        })
    } else {
      wx.showToast({
        title: '亲，已经是最后一页了',
        icon: 'none',
        duration: 2000
      })
    }
  }
})