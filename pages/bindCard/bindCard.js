// pages/bindCard/bindCard.js
Page({

  data: {
    bankName:'',
    bankNumber:'',
    phone:'',
    postScript:''
  },
  // 开户行信息
  bankName(e) {
    this.setData({
      bankName: e.detail.value
    })
  },
  // 银行卡号信息
  bankNumber(e) {
    this.setData({
      bankNumber: e.detail.value
    })
  },
  // 预留手机号信息
  phone(e) {
    this.setData({
      phone: e.detail.value
    })
  },
  // 备注信息
  postScript(e) {
    this.setData({
      postScript: e.detail.value
    })
  },
  
  // 修改开户行信息
  sureBtn(e) {
    var bankName = this.data.bankName;
    var bankNumber = this.data.bankNumber;
    var phone = this.data.phone;
    var postScript = this.data.postScript;
    if (bankName == '') {
      wx.showToast({
        title: '请输入开户行名称',
        icon: 'none'
      })
      return false
    } else if (bankNumber == '') {
      wx.showToast({
        title: '请输入银行卡号',
        icon: 'none'
      })
      return false
    } else if (phone == '') {
      wx.showToast({
        title: '请输入预留手机号',
        icon: 'none'
      })
      return false
    } else if (phone.length != 11 || !(/^1[3456789]\d{9}$/.test(phone))) {
      wx.showToast({
        title: '手机号格式不正确',
        icon: 'none',
      })
      return false
    } else if (postScript == '') {
      wx.showToast({
        title: '请输入备注信息',
        icon: 'none'
      })
      return false
    } 
    
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
   onLoad(options) {
 
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