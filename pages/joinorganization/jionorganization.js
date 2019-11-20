// pages/joinorganization/jionorganization.js
let util = require('../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    inputValue: null,
    inputLength: '',
    size: 10,
    pages: null, //获取页面页数
    pageNumber: 1, //默认第一页
    roginlist: []
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
    wx.navigateTo({
      url: '/pages/organization/organization'
    });
  },
  //监听用户输入搜索框内容
  EnterInput: function (event) {
    let num = event.detail.value.length
    this.setData({
      inputLength: num,
      inputValue: event.detail.value
    })
    this.checkList()
  },
  //机构列表查询
  checkList() {
    wx.showLoading({
      title: '加载中...',
    })
    var that = this;
    util.rePost("/education/findEducationPage", {
      current: this.data.pageNumber,
      size: that.data.size,
      parameter: this.data.inputValue
    }, function (res) {
      var roginlist = res.data.records
      if (res.code == 1) {
        console.log(res)
        wx.hideLoading();
        that.setData({
          roginlist: roginlist,
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
  orginclick(e) {
    console.log(e)
    wx.navigateTo({
      url: '/pages/checkorganization/checkorganization?eduNum=' + e.currentTarget.dataset.edunum,
    })
  },
  //清除搜索框内容
  clearInputEvent: function (e) {
    this.setData({
      inputValue: '',
      inputLength: 0,
      pageNumber: 1,
    });
    this.checkList()
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.setData({
      pageNumber: 1
    })
    this.checkList()
  },
  //页面上拉触底事件的处理函数
  lower: function () {
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
      util.rePost('/education/findEducationPage', {
        current: that.data.pageNumber,
        size: that.data.size,
      },
        function (res) {
          var roginlist = res.data.records
          if (res.code == 1) {
            wx.hideLoading()
            that.setData({
              roginlist: that.data.roginlist.concat(res.data.records)
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
  },
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})