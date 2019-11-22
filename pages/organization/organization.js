let util = require('../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    eduName: '', //机构名称
    eduLegalPerson: '', //机构法人
    eduContacts: '', //机构联系人
    eduAddress: '', //机构地址
    eduConPhone: '', //机构联系人电话
    eduConEmail: '', //机构联系人邮箱
    eduBankName: '', //机构开户行名称
    eduBankNum: '', //机构开户行账号
    contactsMsg_index: 0, //开户行名称
    contactsMsg_relation: ['请选择', '中国工商银行', '中国农业银行', '中国银行', '中国建设银行', '交通银行', '招商银行', '浦发银行', '中信银行', '中国光大银行', '华夏银行', '中国民生银行', '广发银行', '兴业银行', '平安银行', '浙商银行', '恒丰银行'],
  },
  org_eduName(e) {
    this.setData({
      eduName: e.detail.value
    })
  },
  contactsMsg_relation(e) { //开户行名称
    console.log(e)
    this.setData({
      contactsMsg_index: e.detail.value
    })
  },
  org_eduLegalPerson(e) {
    this.setData({
      eduLegalPerson: e.detail.value
    })
  },
  org_eduContacts(e) {
    this.setData({
      eduContacts: e.detail.value
    })
  },
  org_eduAddress(e) {
    this.setData({
      eduAddress: e.detail.value
    })
  },
  org_eduConPhone(e) {
    this.setData({
      eduConPhone: e.detail.value
    })
  },
  org_eduConEmail(e) {
    this.setData({
      eduConEmail: e.detail.value
    })
  },
  org_eduBankName(e) {
    this.setData({
      eduBankName: e.detail.value
    })
  },
  org_eduBankNum(e) {
    this.setData({
      eduBankNum: e.detail.value
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
        url: '/pages/userDetail/userDetail'
      });
    }
  },
  //添加按钮
  jobwaiting() {
    var eduName = this.data.eduName;
    var eduLegalPerson = this.data.eduLegalPerson;
    var eduContacts = this.data.eduContacts;
    var eduAddress = this.data.eduAddress;
    var eduConPhone = this.data.eduConPhone;
    var eduConEmail = this.data.eduConEmail;
    var eduBankName = this.data.eduBankName;
    var eduBankNum = this.data.eduBankNum;
    var contactsMsg_index = this.data.contactsMsg_index; //开户行名称下标
    var contactsMsg_relation = this.data.contactsMsg_relation[contactsMsg_index] //开户行名称
    if (eduName == '') {
      wx.showToast({
        title: '请输入机构名称',
        icon: 'none',
        duration: 1500
      })
      return false;
    } else if (eduLegalPerson == "") {
      wx.showToast({
        title: '请输入机构法人',
        icon: 'none',
        duration: 1500
      })
      return false;
    } else if (eduContacts == "") {
      wx.showToast({
        title: '请输入机构联系人',
        icon: 'none',
        duration: 1500
      })
      return false;
    } else if (eduAddress == "") {
      wx.showToast({
        title: '请输入机构地址',
        icon: 'none',
        duration: 1500
      })
      return false;
    } else if (eduConPhone == "" || eduConPhone.length != 11 || !(/^1[3456789]\d{9}$/.test(eduConPhone))) {
      wx.showToast({
        title: '请输入正确的联系电话',
        icon: 'none',
        duration: 1500
      })
      return false;
    } else if (eduConEmail == "" || !(/^[a-zA-Z0-9_-]+@([a-zA-Z0-9]+\.)+(com|cn|net|org)$/).test(eduConEmail)) {
      wx.showToast({
        title: '请输入正确的邮箱',
        icon: 'none',
        duration: 1500
      })
      return false;
      // } else if (eduBankName == "") {
      //   wx.showToast({
      //     title: '请输入机构开户行名称',
      //     icon: 'none',
      //     duration: 1500
      //   })
      //   return false;
    }
    else if (contactsMsg_index == 0) {
      wx.showToast({
        title: '请选择银行卡',
        icon: 'none',
        duration: 1500
      })
      return false;
    } else if (eduBankNum == "") {
      wx.showToast({
        title: '请输入机构银行账户',
        icon: 'none',
        duration: 1500
      })
      return false;
    } else {
      util.rePost('/education/insertEdu', {
        eduName: eduName,
        eduLegalPerson: eduLegalPerson,
        eduContacts: eduContacts,
        eduAddress: eduAddress,
        eduConPhone: eduConPhone,
        eduConEmail: eduConEmail,
        eduBankName: contactsMsg_index,
        eduBankNum: eduBankNum,
      }, function (res) {
        console.log(JSON.stringify(res))
        wx.navigateTo({
          url: '/pages/joinorganization/jionorganization',
        })
        if (res.code == 1) {
          wx.showToast({
            title: res.message,
            icon: 'success',
          })
        }
      })
    }
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