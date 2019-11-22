let util = require('../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    size: 10, //默认一页十天信息
    pageNumber: 1, //默认第一页
    pages: null, //获取页面页数
    inputValue: '',
    inputLength: '',
    ctnumlist: [],
    customerlist: [],
  },
  //查询客户信息
  checkList() {
    wx.showLoading({
      title: '加载中...',
    })
    var that = this;
    // var customerlist = that.data.customerlist;
    util.reGet("/userCourse/queryUserList", {
      current: that.data.pageNumber,
      size: that.data.size,
      fuzzy: that.data.inputValue
    }, function(res) {
      // that.setData({
      //   size: res.data.size
      // })
      var customerlist = res.data.records
      if (res.code == 1) {
        console.log(res.data)
        for (var i = 0; i < res.data.records.length; i++) {
          res.data.records[i]["registerTime"] = util.tsFormatTime(res.data.records[i]["registerTime"], 'Y-M-D h:m:s')
        }
        wx.hideLoading();
        that.setData({
          customerlist: customerlist,
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

  //监听用户输入搜索框内容
  EnterInput: function(event) {
    let num = event.detail.value.length
    this.setData({
      inputLength: num,
      inputValue: event.detail.value
    })
    this.checkList()
  },
  //清除搜索框内容
  clearInputEvent: function(e) {
    this.setData({
      'inputValue': '',
      inputLength: 0,
      pageNumber: 1,
    });
    this.checkList()
  },
  handlerGobackClick(delta) {
    const pages = getCurrentPages();
    if (pages.length >= 2) {
      wx.navigateBack({
        delta: delta
      });
    } else {
      wx.navigateTo({
        url: '/pages/userDetail/userDetail'
      });
    }
  },
  //选择机构
  selectclick(e) {
    console.log(e)
    wx.navigateTo({
      url: '/pages/selectOrgan/selectOrgan?userNum=' + e.currentTarget.dataset.num + "&courseNum=" + e.currentTarget.dataset.coursenum,
    })
  },
  //实名认证
  msgclick(e) {
    wx.navigateTo({
      url: '/pages/realname/realname?userNum=' + e.currentTarget.dataset.num,
    })
  },
  // 银行卡
  bindclick(e) {
    console.log(e)
    wx.navigateTo({
      url: '/pages/bindBankcard/bindBankcard?userNum=' + e.currentTarget.dataset.num
    })
  },
  //联系人
  conclick(e) {
    wx.navigateTo({
      url: '/pages/contactsMsg/contactsMsg?userNum=' + e.currentTarget.dataset.num,
    })
  },
  //证件资料
  renzMsgclick(e) {
    wx.navigateTo({
      url: '/pages/renzMsg/renzMsg?userNum=' + e.currentTarget.dataset.num,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    this.setData({
      pageNumber: 1
    })
    this.checkList();
  },
  lower: function() {
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
      util.reGet('/manager/getManagerList', {
          current: that.data.pageNumber,
          size: that.data.size,
        },
        function(res) {
          var customerlist = res.data.records
          if (res.code == 1) {
            wx.hideLoading()
            that.setData({
              customerlist: that.data.customerlist.concat(res.data.records)
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
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})