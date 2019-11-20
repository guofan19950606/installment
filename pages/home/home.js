Page({

  /**
   * 页面的初始数据
   */
  data: {
    // orginshow1: true,
    // orginshow2: true,
    // orginshow3: true,
    // orginshow4: true,
  },
  orginclick1() {
    wx.navigateTo({
      url: '/pages/joinorganization/jionorganization',
    })
  },
  orginclick2() {
    wx.navigateTo({
      url: '/pages/course/course',
    })
  },
  orginclick3() {
    wx.navigateTo({
      url: '/pages/customer/customer',
    })
  },
  orginclick4() {
    wx.navigateTo({
      url: '/pages/user/user',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onShow: function (options) {
    this.setData({
      orginshow1: false,
      orginshow2: false,
      orginshow3: false,
      orginshow4: false,
    })
    var userinfo = wx.getStorageSync('userinfo');
    console.log(userinfo)
    var roleList = userinfo.user.roleList
    roleList.forEach((item, index) => {
      console.log(item)
      if (item == 2) {
        this.setData({
          orginshow1: true
        })
      } else if (item == 3) {
        this.setData({
          orginshow2: true
        })
      } else if (item == 4) {
        this.setData({
          orginshow3: true
        })
      } else if (item == 5) {
        this.setData({
          orginshow4: true
        })
      } else if (item == 1) {
        this.setData({
          orginshow1: true,
          orginshow2: true,
          orginshow3: true,
          orginshow4: true
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
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
  onShareAppMessage: function () { },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */

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